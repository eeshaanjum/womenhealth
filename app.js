// ============================================================
//  HerHealth Guide — App Logic
// ============================================================
(function () {
  "use strict";

  let state = { uid: null, ageGroup: null, ethnicity: null, diet: null, name: "" };

  // ── Auth gate ─────────────────────────────────────────────
  window.onAuthUser = async function (user) {
    if (!user) {
      showScreen("auth");
      return;
    }
    state.uid = user.uid;

    try {
      const profile = await dbOps.loadProfile(user.uid);
      if (!profile || !profile.ageGroup) {
        showScreen("welcome");
        buildForm();
      } else {
        state.ageGroup  = profile.ageGroup;
        state.ethnicity = profile.ethnicity;
        state.diet      = profile.diet;
        state.name      = profile.name || "";
        applyTheme(state.ageGroup);
        renderDashboard();
      }
    } catch (e) {
      // Firebase not configured yet — show setup so app is usable
      showScreen("welcome");
      buildForm();
    }
  };

  function showScreen(name) {
    document.getElementById("screen-auth").hidden      = (name !== "auth");
    document.getElementById("screen-welcome").hidden   = (name !== "welcome");
    document.getElementById("screen-dashboard").hidden = (name !== "dashboard");
  }

  // ── Build welcome / setup form ────────────────────────────
  function buildForm() {
    const ageContainer = document.getElementById("age-buttons");
    ageContainer.innerHTML = "";
    Object.entries(healthData.ageGroups).forEach(([key, val]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.dataset.value = key;
      btn.innerHTML = `
        <span class="choice-btn-icon">${val.icon}</span>
        <span>${val.label}</span>
        <span class="choice-btn-sub">${val.sub}</span>`;
      btn.addEventListener("click", () => {
        ageContainer.querySelectorAll(".choice-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        state.ageGroup = key;
        applyTheme(key);
      });
      ageContainer.appendChild(btn);
    });

    const ethSel = document.getElementById("ethnicity-select");
    ethSel.innerHTML = '<option value="">Select background…</option>';
    Object.entries(healthData.ethnicities).forEach(([k, v]) => {
      const o = document.createElement("option"); o.value = k; o.textContent = v;
      ethSel.appendChild(o);
    });
    ethSel.addEventListener("change", () => { state.ethnicity = ethSel.value || null; });

    const dietSel = document.getElementById("diet-select");
    dietSel.innerHTML = '<option value="">Select diet…</option>';
    Object.entries(healthData.diets).forEach(([k, v]) => {
      const o = document.createElement("option"); o.value = k; o.textContent = v;
      dietSel.appendChild(o);
    });
    dietSel.addEventListener("change", () => { state.diet = dietSel.value || null; });

    const nameInput = document.getElementById("name-input");
    nameInput.value = state.name;
    nameInput.addEventListener("input", () => { state.name = nameInput.value.trim(); });

    const btn = document.getElementById("get-guide-btn");
    const fresh = btn.cloneNode(true);
    btn.replaceWith(fresh);
    fresh.addEventListener("click", handleProfileSubmit);
  }

  function applyTheme(ageGroup) {
    document.body.className = document.body.className.replace(/\bage-\S+/g, "").trim();
    if (ageGroup) document.body.classList.add("age-" + ageGroup);
  }

  async function handleProfileSubmit() {
    if (!state.ageGroup)  { showErr("Please select your age group."); return; }
    if (!state.ethnicity) { showErr("Please select your background."); return; }
    if (!state.diet)      { showErr("Please select your dietary practice."); return; }
    clearErr();

    const btn = document.getElementById("get-guide-btn");
    btn.textContent = "Saving…";
    btn.disabled = true;

    try {
      await dbOps.saveProfile(state.uid, {
        name: state.name,
        ageGroup: state.ageGroup,
        ethnicity: state.ethnicity,
        diet: state.diet
      });
    } catch (e) {
      // Offline or not configured — still allow use
    }

    setTimeout(renderDashboard, 100);
  }

  function showErr(m) { const e = document.getElementById("form-error"); e.textContent = m; e.hidden = false; }
  function clearErr() { document.getElementById("form-error").hidden = true; }

  // ── Dashboard ─────────────────────────────────────────────
  function renderDashboard() {
    showScreen("dashboard");

    const ag = healthData.ageGroups[state.ageGroup];
    document.getElementById("hero-ring").textContent = ag.icon;
    typeWrite(document.getElementById("dashboard-greeting"),
      state.name ? `Hi, ${state.name} 👋` : "Your Health Guide", 40);
    document.getElementById("dashboard-subtitle").textContent =
      `${ag.label} · ${healthData.ethnicities[state.ethnicity]} · ${healthData.diets[state.diet]}`;

    // Edit profile
    const editBtn = document.getElementById("edit-profile-btn");
    const freshEdit = editBtn.cloneNode(true);
    editBtn.replaceWith(freshEdit);
    freshEdit.addEventListener("click", () => {
      showScreen("welcome");
      buildForm();
    });

    // Logout
    const logoutBtn = document.getElementById("logout-btn");
    const freshLogout = logoutBtn.cloneNode(true);
    logoutBtn.replaceWith(freshLogout);
    freshLogout.addEventListener("click", () => window.authLogout && window.authLogout());

    buildTabs();
    switchTab("hygiene");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Tabs ──────────────────────────────────────────────────
  function buildTabs() {
    const bar = document.getElementById("tab-bar");
    bar.innerHTML = "";
    [
      { id: "hygiene",   icon: "🧼", label: "Hygiene"   },
      { id: "menstrual", icon: "🩸", label: "Cycles"    },
      { id: "nutrition", icon: "🥗", label: "Nutrition"  },
      { id: "safety",    icon: "🛡️", label: "Safety"    },
      { id: "goals",     icon: "🎯", label: "Goals"     },
      { id: "recipes",   icon: "🍳", label: "Recipes"   },
      { id: "diary",     icon: "📔", label: "Diary"     }
    ].forEach(t => {
      const btn = document.createElement("button");
      btn.className = "tab-btn";
      btn.dataset.tab = t.id;
      btn.innerHTML = `<span>${t.icon}</span><span>${t.label}</span>`;
      btn.addEventListener("click", () => switchTab(t.id));
      bar.appendChild(btn);
    });
  }

  function switchTab(id) {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.toggle("active", b.dataset.tab === id));
    const area = document.getElementById("tab-content");
    area.innerHTML = "";
    area.classList.remove("tab-fade");
    void area.offsetWidth;
    area.classList.add("tab-fade");

    const builders = {
      hygiene:   hygieneSection,
      menstrual: menstrualSection,
      nutrition: nutritionSection,
      safety:    safetySection,
      goals:     goalsSection,
      recipes:   recipesSection,
      diary:     diarySection
    };

    const built = builders[id]();
    if (built instanceof Promise) {
      built.then(el => { area.appendChild(el); revealCards(area); });
    } else {
      area.appendChild(built);
      revealCards(area);
    }
    area.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ── HYGIENE ───────────────────────────────────────────────
  function hygieneSection() {
    const d = healthData.hygiene[state.ageGroup];
    const wrap = div("section-wrap");
    wrap.appendChild(sHdr("🧼", "Hygiene", d.intro));
    const grid = div("card-grid");
    d.tips.forEach(t => {
      const card = div("h-card");
      let actionHTML = "";
      if (t.action) {
        if (t.action.image) {
          actionHTML = `<button class="card-action-btn" data-img="${t.action.image}">${t.action.label} ↗</button>`;
        } else {
          actionHTML = `<a class="card-action-btn" href="${t.action.url}" target="_blank" rel="noopener noreferrer">${t.action.label} ↗</a>`;
        }
      }
      card.innerHTML = `
        <div class="h-card-title">
          <span>${t.icon}</span><span class="h-card-dot"></span><span>${t.title}</span>
        </div>
        <p>${t.body}</p>${actionHTML}`;
      if (t.action && t.action.image) {
        card.querySelector("[data-img]").addEventListener("click", () => openImgModal(t.action.image));
      }
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  // ── MENSTRUAL ─────────────────────────────────────────────
  function menstrualSection() {
    const d = healthData.menstrual[state.ageGroup];
    const wrap = div("section-wrap");
    wrap.appendChild(sHdr("🩸", d.title, d.intro));
    const list = div("topic-list");
    d.sections.forEach(s => {
      const card = div("t-card");
      card.innerHTML = `<h3>${s.heading}</h3><p>${s.body}</p>
        ${s.action ? `<a class="card-action-btn" href="${s.action.url}" target="_blank" rel="noopener noreferrer">${s.action.label} ↗</a>` : ""}`;
      list.appendChild(card);
    });
    wrap.appendChild(list);
    return wrap;
  }

  // ── NUTRITION ─────────────────────────────────────────────
  function nutritionSection() {
    const ageD  = healthData.nutrition.byAge[state.ageGroup];
    const ethD  = healthData.nutrition.byEthnicity[state.ethnicity] || healthData.nutrition.byEthnicity.other;
    const dietD = healthData.nutrition.byDiet[state.diet] || healthData.nutrition.byDiet.omnivore;
    const wrap  = div("section-wrap");
    wrap.appendChild(sHdr("🥗", "Nutrition", ageD.intro));

    const sfData = healthData.nutrition.stageFocusByAge[state.ageGroup] || [];
    if (sfData.length) {
      wrap.appendChild(lbl("PRIORITIES FOR YOUR LIFE STAGE"));
      const sfGrid = div("card-grid");
      sfData.forEach(f => {
        const card = div("h-card");
        card.innerHTML = `
          <div class="h-card-title"><span>${f.icon}</span><span class="h-card-dot"></span><span>${f.title}</span></div>
          <p>${f.body}</p>`;
        sfGrid.appendChild(card);
      });
      wrap.appendChild(sfGrid);
    }

    wrap.appendChild(lbl("KEY NUTRIENTS — DAILY TARGETS"));
    const grid = div("nutrient-grid");
    ageD.keyNutrients.forEach(n => {
      const tile = div("n-tile");
      tile.innerHTML = `
        <div class="n-name">${n.name}</div>
        <div class="n-amount">${n.amount}</div>
        <div class="n-why">${n.why}</div>
        <div class="n-src">${n.sources}</div>`;
      grid.appendChild(tile);
    });
    wrap.appendChild(grid);

    if (ageD.tips && ageD.tips.length) {
      const tipList = document.createElement("ul");
      tipList.className = "arrow-list";
      ageD.tips.forEach(t => { const li = document.createElement("li"); li.textContent = t; tipList.appendChild(li); });
      wrap.appendChild(tipList);
    }

    const ethCard = div("sub-card");
    ethCard.innerHTML = `<span class="sub-card-lbl">🌍 ${ethD.title}</span>`;
    const twoCols = div("two-col");
    const sCol = div("div"); sCol.innerHTML = `<div class="col-hd">Strengths</div>`;
    const sTags = document.createElement("ul"); sTags.className = "tags green";
    ethD.strengths.forEach(s => { const li = document.createElement("li"); li.textContent = s; sTags.appendChild(li); });
    sCol.appendChild(sTags);
    const wCol = div("div"); wCol.innerHTML = `<div class="col-hd">Watch Out For</div>`;
    const wTags = document.createElement("ul"); wTags.className = "tags amber";
    ethD.watchOut.forEach(s => { const li = document.createElement("li"); li.textContent = s; wTags.appendChild(li); });
    wCol.appendChild(wTags);
    twoCols.appendChild(sCol); twoCols.appendChild(wCol);
    ethCard.appendChild(twoCols);

    const supLbl = document.createElement("div"); supLbl.className = "col-hd"; supLbl.style.marginTop = "1rem";
    supLbl.textContent = "Common Supplements"; ethCard.appendChild(supLbl);
    const supTags = document.createElement("ul"); supTags.className = "tags pri";
    ethD.supplements.forEach(s => { const li = document.createElement("li"); li.textContent = s; supTags.appendChild(li); });
    ethCard.appendChild(supTags);

    const recLbl = document.createElement("div"); recLbl.className = "col-hd"; recLbl.style.marginTop = "0.85rem";
    recLbl.textContent = "Food Tips"; ethCard.appendChild(recLbl);
    const recList = document.createElement("ul"); recList.className = "arrow-list";
    ethD.recipeTips.forEach(t => { const li = document.createElement("li"); li.textContent = t; recList.appendChild(li); });
    ethCard.appendChild(recList);
    wrap.appendChild(ethCard);

    const dietCard = div("sub-card");
    dietCard.innerHTML = `<span class="sub-card-lbl">🍽️ ${dietD.title}</span>`;
    const dietList = document.createElement("ul"); dietList.className = "arrow-list";
    dietD.notes.forEach(n => { const li = document.createElement("li"); li.textContent = n; dietList.appendChild(li); });
    dietCard.appendChild(dietList);
    wrap.appendChild(dietCard);
    return wrap;
  }

  // ── SAFETY ────────────────────────────────────────────────
  function safetySection() {
    const wrap = div("section-wrap");
    wrap.appendChild(sHdr("🛡️", "Safety & Support", "Help is free, confidential, and available 24/7."));

    const ageTxt = healthData.safety.byAge[state.ageGroup];
    const ageMsg = div("age-msg"); ageMsg.innerHTML = `<p>${ageTxt}</p>`; wrap.appendChild(ageMsg);

    const dv = healthData.safety.domestic;
    const emCard = div("em-card");
    emCard.innerHTML = `<span class="em-card-lbl">${state.ageGroup === "child" ? "🏠 Safety at Home & School" : "🚨 " + dv.title}</span><p>${dv.description}</p>`;
    const hlGrid = div("hotline-grid");
    const ageHotlines = healthData.safety.hotlinesByAge[state.ageGroup] || dv.hotlines;
    ageHotlines.forEach(h => {
      const hc = div("hl-card");
      const phoneHref = parsePhoneHref(h.number);
      const smsHref = parseSmsHref(h.text);
      hc.innerHTML = `
        <div class="hl-org">${h.name}</div>
        <div class="hl-num">${phoneHref ? `<a href="${phoneHref}">${h.number}</a>` : h.number}</div>
        <div class="hl-meta">
          ${smsHref ? `<a class="card-action-btn" href="${smsHref}">${h.text}</a><br>` : (h.text ? h.text + "<br>" : "")}
          <a href="https://${h.web}" target="_blank" rel="noopener noreferrer">${h.web}</a>
          <br>${h.hours}${h.languages ? "<br>" + h.languages : ""}
        </div>`;
      hlGrid.appendChild(hc);
    });
    emCard.appendChild(hlGrid);
    const tipLbl = document.createElement("div"); tipLbl.className = "col-hd"; tipLbl.style.marginTop = "1rem";
    tipLbl.textContent = "Safety Tips"; emCard.appendChild(tipLbl);
    const tipList = document.createElement("ul"); tipList.className = "safe-tips";
    dv.safetyTips.forEach(t => { const li = document.createElement("li"); li.textContent = t; tipList.appendChild(li); });
    emCard.appendChild(tipList);
    wrap.appendChild(emCard);

    if (state.ageGroup === "child") return wrap;

    const legal = healthData.safety.legal;
    const lCard = div("legal-card");
    lCard.innerHTML = `<span class="legal-card-lbl">⚖️ ${legal.title}</span><p>${legal.description}</p>`;
    const lList = div("legal-list");
    legal.resources.forEach(r => {
      const item = div("legal-item");
      const phoneHref = r.number ? parsePhoneHref(r.number) : null;
      item.innerHTML = `
        <div class="legal-name">${r.name}</div>
        ${r.number ? `<div class="legal-num">${phoneHref ? `<a href="${phoneHref}">${r.number}</a>` : r.number}</div>` : ""}
        <div class="legal-web">🌐 <a href="https://${r.web}" target="_blank" rel="noopener noreferrer">${r.web}</a></div>
        <div class="legal-desc">${r.description}</div>`;
      lList.appendChild(item);
    });
    lCard.appendChild(lList); wrap.appendChild(lCard);

    const mental = healthData.safety.mental;
    const mCard = div("mental-card");
    mCard.innerHTML = `<span class="mental-card-lbl">💜 ${mental.title}</span>`;
    const mGrid = div("mental-grid");
    const postpartumAges = new Set(["youngAdult", "adult"]);
    mental.hotlines.filter(h => h.name !== "Postpartum Support Intl" || postpartumAges.has(state.ageGroup))
      .forEach(h => {
        const mc = div("m-card");
        const phoneHref = parsePhoneHref(h.number);
        mc.innerHTML = `
          <div class="m-org">${h.name}</div>
          <div class="m-num">${phoneHref ? `<a href="${phoneHref}">${h.number}</a>` : h.number}</div>
          <div class="m-hours">${h.hours}</div>
          <a class="card-action-btn" href="https://${h.web}" target="_blank" rel="noopener noreferrer">${h.web} ↗</a>`;
        mGrid.appendChild(mc);
      });
    mCard.appendChild(mGrid); wrap.appendChild(mCard);
    return wrap;
  }

  // ── GOALS ─────────────────────────────────────────────────
  async function goalsSection() {
    const wrap = div("section-wrap");
    wrap.appendChild(sHdr("🎯", "Goals", "Track what you're working towards. Check off wins as they happen."));

    // Add goal form
    const formCard = div("goal-form-card");
    formCard.innerHTML = `
      <input type="text" id="goal-input" class="form-input" placeholder="e.g. Drink 2L of water daily" maxlength="120" />
      <div class="goal-form-row">
        <select id="goal-cat" class="form-input goal-cat-select">
          <option value="fitness">🏃 Fitness</option>
          <option value="nutrition">🥗 Nutrition</option>
          <option value="mental">🧠 Mental Health</option>
          <option value="other">✨ Other</option>
        </select>
        <button id="goal-add-btn" class="btn-add-goal">Add Goal</button>
      </div>
      <p id="goal-error" class="auth-error" hidden></p>`;
    wrap.appendChild(formCard);

    const listWrap = div("goals-list");
    listWrap.id = "goals-list";
    wrap.appendChild(listWrap);

    // Load and render goals
    await renderGoals(listWrap);

    // Add goal handler
    formCard.querySelector("#goal-add-btn").addEventListener("click", async () => {
      const input = formCard.querySelector("#goal-input");
      const cat   = formCard.querySelector("#goal-cat").value;
      const text  = input.value.trim();
      const errEl = formCard.querySelector("#goal-error");
      if (!text) { errEl.textContent = "Please type a goal first."; errEl.hidden = false; return; }
      errEl.hidden = true;
      input.value = "";
      try {
        await dbOps.addGoal(state.uid, text, cat);
        await renderGoals(listWrap);
      } catch (e) {
        errEl.textContent = "Could not save goal. Check your connection.";
        errEl.hidden = false;
      }
    });

    formCard.querySelector("#goal-input").addEventListener("keydown", e => {
      if (e.key === "Enter") formCard.querySelector("#goal-add-btn").click();
    });

    return wrap;
  }

  async function renderGoals(container) {
    container.innerHTML = "";
    let goals = [];
    try {
      goals = await dbOps.getGoals(state.uid);
    } catch (e) {
      container.innerHTML = `<p class="empty-state">Connect to Firebase to save goals.</p>`;
      return;
    }

    if (!goals.length) {
      container.innerHTML = `<p class="empty-state">No goals yet — add your first one above.</p>`;
      return;
    }

    const catLabels = { fitness: "🏃 Fitness", nutrition: "🥗 Nutrition", mental: "🧠 Mental Health", other: "✨ Other" };

    const active    = goals.filter(g => !g.completed);
    const completed = goals.filter(g =>  g.completed);

    if (active.length) {
      const hdr = document.createElement("span");
      hdr.className = "dim-lbl"; hdr.textContent = "ACTIVE"; container.appendChild(hdr);
      active.forEach(g => container.appendChild(goalCard(g, catLabels, container)));
    }
    if (completed.length) {
      const hdr = document.createElement("span");
      hdr.className = "dim-lbl"; hdr.style.marginTop = "1rem"; hdr.textContent = "COMPLETED";
      container.appendChild(hdr);
      completed.forEach(g => container.appendChild(goalCard(g, catLabels, container)));
    }
  }

  function goalCard(g, catLabels, container) {
    const card = div("goal-card" + (g.completed ? " goal-done" : ""));
    card.innerHTML = `
      <label class="goal-check-label">
        <input type="checkbox" class="goal-checkbox" ${g.completed ? "checked" : ""} />
        <span class="goal-text">${escHtml(g.text)}</span>
      </label>
      <div class="goal-meta">
        <span class="goal-cat-badge">${catLabels[g.category] || g.category}</span>
        <button class="goal-delete-btn" aria-label="Delete goal">✕</button>
      </div>`;

    card.querySelector(".goal-checkbox").addEventListener("change", async e => {
      await dbOps.toggleGoal(state.uid, g.id, e.target.checked);
      await renderGoals(container);
    });
    card.querySelector(".goal-delete-btn").addEventListener("click", async () => {
      if (!confirm("Delete this goal?")) return;
      await dbOps.deleteGoal(state.uid, g.id);
      await renderGoals(container);
    });
    return card;
  }

  // ── RECIPES ───────────────────────────────────────────────
  async function recipesSection() {
    const wrap = div("section-wrap");
    wrap.appendChild(sHdr("🍳", "Recipes", "Matched to your goals and dietary practice."));

    // Get active goal categories to filter recipes
    let activeGoalCats = new Set();
    try {
      const goals = await dbOps.getGoals(state.uid);
      goals.filter(g => !g.completed).forEach(g => activeGoalCats.add(g.category));
    } catch (e) { /* offline */ }

    // Category → recipe goal tags mapping
    const catToTags = {
      fitness:   ["fitness", "weightLoss", "muscle", "energy"],
      nutrition: ["iron", "protein", "gut", "bone", "sugar", "energy"],
      mental:    ["stress", "mood", "sleep"],
      other:     []
    };

    let relevantTags = new Set();
    activeGoalCats.forEach(cat => (catToTags[cat] || []).forEach(t => relevantTags.add(t)));

    // Filter by diet compatibility
    const dietKey = state.diet;
    let filtered = recipeData.filter(r => r.diet.includes(dietKey));

    // Sort: matching goal tags first, then others
    if (relevantTags.size > 0) {
      filtered.sort((a, b) => {
        const aMatch = a.goals.some(g => relevantTags.has(g)) ? 0 : 1;
        const bMatch = b.goals.some(g => relevantTags.has(g)) ? 0 : 1;
        return aMatch - bMatch;
      });
    }

    if (activeGoalCats.size > 0) {
      const note = div("recipe-note");
      note.textContent = `Showing recipes matched to your active goals first.`;
      wrap.appendChild(note);
    }

    if (!filtered.length) {
      const empty = div("empty-state");
      empty.textContent = "No recipes match your current diet. Try updating your profile.";
      wrap.appendChild(empty);
      return wrap;
    }

    const grid = div("recipe-grid");
    filtered.forEach(r => {
      const card = div("recipe-card");
      const goalTagsHtml = r.goals.slice(0, 3).map(g =>
        `<span class="recipe-tag ${relevantTags.has(g) ? "recipe-tag-match" : ""}">${g}</span>`
      ).join("");
      card.innerHTML = `
        <div class="recipe-emoji">${r.emoji}</div>
        <div class="recipe-body">
          <div class="recipe-name">${r.name}</div>
          <p class="recipe-desc">${r.desc}</p>
          <div class="recipe-meta">
            <span class="recipe-time">⏱ ${r.time}</span>
            <span class="recipe-diff">${r.diff}</span>
          </div>
          <div class="recipe-tags">${goalTagsHtml}</div>
          <a class="card-action-btn recipe-yt-btn" href="${r.yt}" target="_blank" rel="noopener noreferrer">▶ Watch on YouTube</a>
        </div>`;
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  // ── DIARY ─────────────────────────────────────────────────
  async function diarySection() {
    const wrap = div("section-wrap");
    wrap.appendChild(sHdr("📔", "Diary", "Log your days — thoughts, symptoms, moods, or anything on your mind."));

    const today = todayStr();

    const formCard = div("diary-form-card");
    formCard.innerHTML = `
      <div class="diary-date-row">
        <label class="form-lbl" for="diary-date">Date</label>
        <input type="date" id="diary-date" class="form-input diary-date-input" value="${today}" max="${today}" />
      </div>
      <textarea id="diary-text" class="diary-textarea" placeholder="How are you feeling today? What did you eat, do, notice?"></textarea>
      <div class="diary-form-footer">
        <span id="diary-char-count" class="diary-char">0 / 2000</span>
        <button id="diary-save-btn" class="btn-primary diary-save-btn">Save Entry</button>
      </div>
      <p id="diary-msg" class="diary-msg" hidden></p>`;
    wrap.appendChild(formCard);

    const pastWrap = div("diary-past");
    pastWrap.id = "diary-past";
    wrap.appendChild(pastWrap);

    // Load existing entries & pre-fill today's if it exists
    await renderDiaryEntries(pastWrap, formCard);

    // Char counter
    const textarea = formCard.querySelector("#diary-text");
    const counter  = formCard.querySelector("#diary-char-count");
    textarea.addEventListener("input", () => {
      counter.textContent = `${textarea.value.length} / 2000`;
    });

    // Date change → load that day's entry if exists
    formCard.querySelector("#diary-date").addEventListener("change", async e => {
      const snap = await tryGetDiaryEntries();
      const entry = snap.find(d => d.date === e.target.value);
      textarea.value = entry ? entry.text : "";
      counter.textContent = `${textarea.value.length} / 2000`;
    });

    // Save
    formCard.querySelector("#diary-save-btn").addEventListener("click", async () => {
      const date = formCard.querySelector("#diary-date").value;
      const text = textarea.value.trim();
      const msgEl = formCard.querySelector("#diary-msg");
      if (!text) { msgEl.textContent = "Write something first."; msgEl.hidden = false; return; }
      if (text.length > 2000) { msgEl.textContent = "Entry too long (max 2000 characters)."; msgEl.hidden = false; return; }
      msgEl.hidden = true;

      const btn = formCard.querySelector("#diary-save-btn");
      btn.textContent = "Saving…"; btn.disabled = true;
      try {
        await dbOps.saveDiaryEntry(state.uid, date, text);
        btn.textContent = "Saved ✓";
        setTimeout(() => { btn.textContent = "Save Entry"; btn.disabled = false; }, 1500);
        await renderDiaryEntries(pastWrap, formCard);
      } catch (e) {
        msgEl.textContent = "Could not save. Check your connection.";
        msgEl.hidden = false;
        btn.textContent = "Save Entry"; btn.disabled = false;
      }
    });

    return wrap;
  }

  async function tryGetDiaryEntries() {
    try { return await dbOps.getDiaryEntries(state.uid); } catch (e) { return []; }
  }

  async function renderDiaryEntries(container, formCard) {
    container.innerHTML = "";
    const entries = await tryGetDiaryEntries();

    // Pre-fill today's entry into textarea
    const todayEntry = entries.find(e => e.date === formCard.querySelector("#diary-date").value);
    if (todayEntry) {
      const ta = formCard.querySelector("#diary-text");
      if (!ta.value) {
        ta.value = todayEntry.text;
        formCard.querySelector("#diary-char-count").textContent = `${ta.value.length} / 2000`;
      }
    }

    if (!entries.length) {
      container.innerHTML = `<p class="empty-state">No diary entries yet. Write your first one above.</p>`;
      return;
    }

    const hdr = document.createElement("span");
    hdr.className = "dim-lbl"; hdr.textContent = "PAST ENTRIES"; container.appendChild(hdr);

    entries.forEach(entry => {
      const card = div("diary-entry-card");
      const preview = entry.text.length > 160 ? entry.text.slice(0, 160) + "…" : entry.text;
      card.innerHTML = `
        <div class="diary-entry-head">
          <span class="diary-entry-date">${formatDate(entry.date)}</span>
          <button class="diary-delete-btn" aria-label="Delete entry">✕</button>
        </div>
        <p class="diary-entry-preview">${escHtml(preview)}</p>`;

      card.querySelector(".diary-delete-btn").addEventListener("click", async () => {
        if (!confirm("Delete this diary entry?")) return;
        await dbOps.deleteDiaryEntry(state.uid, entry.id);
        await renderDiaryEntries(container, formCard);
      });

      // Click to load full entry into editor
      card.querySelector(".diary-entry-preview").addEventListener("click", () => {
        const dateInput = formCard.querySelector("#diary-date");
        const ta = formCard.querySelector("#diary-text");
        dateInput.value = entry.date;
        ta.value = entry.text;
        formCard.querySelector("#diary-char-count").textContent = `${ta.value.length} / 2000`;
        formCard.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      container.appendChild(card);
    });
  }

  // ── Helpers ───────────────────────────────────────────────
  function todayStr() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });
  }

  function escHtml(str) {
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  function openImgModal(src) {
    const modal = document.getElementById("img-modal");
    document.getElementById("img-modal-img").src = src;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeImgModal() {
    document.getElementById("img-modal").hidden = true;
    document.getElementById("img-modal-img").src = "";
    document.body.style.overflow = "";
  }

  function parsePhoneHref(str) {
    const digits = str.replace(/[^\d+]/g, "");
    return digits.length >= 3 ? "tel:" + digits : null;
  }

  function parseSmsHref(str) {
    if (!str) return null;
    const m = str.match(/Text\s+(\w+)\s*(?:→|to)\s*(\d+)/i);
    return m ? "sms:" + m[2] + "?body=" + encodeURIComponent(m[1]) : null;
  }

  function typeWrite(el, text, speed) {
    el.textContent = "";
    const chars = Array.from(text);
    let i = 0;
    (function tick() {
      if (i < chars.length) { el.textContent += chars[i++]; setTimeout(tick, speed); }
    })();
  }

  function revealCards(container) {
    const cards = container.querySelectorAll(
      ".h-card,.t-card,.n-tile,.hl-card,.m-card,.sub-card,.legal-item,.age-msg,.em-card,.legal-card,.mental-card,.goal-card,.recipe-card,.diary-entry-card,.goal-form-card,.diary-form-card"
    );
    cards.forEach((c, i) => {
      c.classList.add("reveal-card");
      c.style.transitionDelay = Math.min(i * 45, 270) + "ms";
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("revealed"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.05 });
    cards.forEach(c => obs.observe(c));
  }

  function div(cls) { const e = document.createElement("div"); if (cls) e.className = cls; return e; }

  function sHdr(icon, title, intro) {
    const h = div("s-hdr");
    h.innerHTML = `
      <div class="s-hdr-top"><span class="s-hdr-icon">${icon}</span><h2>${title}</h2></div>
      ${intro ? `<p>${intro}</p>` : ""}`;
    return h;
  }

  function lbl(text) {
    const s = document.createElement("span");
    s.className = "dim-lbl"; s.textContent = text;
    return s;
  }

  // ── Init ──────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("img-modal-close").addEventListener("click", closeImgModal);
    document.querySelector(".img-modal-backdrop").addEventListener("click", closeImgModal);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeImgModal(); });
  });
})();
