// ============================================================
//  HerHealth Guide — App Logic
// ============================================================
(function () {
  "use strict";

  let state = { ageGroup: null, ethnicity: null, diet: null, name: "" };

  // ── Build welcome form ─────────────────────────────────────
  function buildForm() {
    // Age buttons
    const ageContainer = document.getElementById("age-buttons");
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
        // Apply theme immediately so the button glow uses the right colour
        applyTheme(key);
      });
      ageContainer.appendChild(btn);
    });

    // Ethnicity select
    const ethSel = document.getElementById("ethnicity-select");
    Object.entries(healthData.ethnicities).forEach(([k, v]) => {
      const o = document.createElement("option"); o.value = k; o.textContent = v;
      ethSel.appendChild(o);
    });
    ethSel.addEventListener("change", () => { state.ethnicity = ethSel.value || null; });

    // Diet select
    const dietSel = document.getElementById("diet-select");
    Object.entries(healthData.diets).forEach(([k, v]) => {
      const o = document.createElement("option"); o.value = k; o.textContent = v;
      dietSel.appendChild(o);
    });
    dietSel.addEventListener("change", () => { state.diet = dietSel.value || null; });

    // Name
    const nameInput = document.getElementById("name-input");
    nameInput.addEventListener("input", () => { state.name = nameInput.value.trim(); });

    // Submit
    document.getElementById("get-guide-btn").addEventListener("click", handleSubmit);
  }

  function applyTheme(ageGroup) {
    // Remove any existing age class
    document.body.className = document.body.className.replace(/\bage-\S+/g, "").trim();
    if (ageGroup) document.body.classList.add("age-" + ageGroup);
  }

  function handleSubmit() {
    if (!state.ageGroup)  { showErr("Please select your age group."); return; }
    if (!state.ethnicity) { showErr("Please select your background / ethnicity."); return; }
    if (!state.diet)      { showErr("Please select your dietary practice."); return; }
    clearErr();
    const btn = document.getElementById("get-guide-btn");
    btn.textContent = "Loading…";
    btn.disabled = true;
    setTimeout(renderDashboard, 100);
  }

  function showErr(m) { const e = document.getElementById("form-error"); e.textContent = m; e.hidden = false; }
  function clearErr() { document.getElementById("form-error").hidden = true; }

  // ── Dashboard ───────────────────────────────────────────────
  function renderDashboard() {
    const welcome   = document.getElementById("screen-welcome");
    const dashboard = document.getElementById("screen-dashboard");

    welcome.classList.add("is-leaving");

    setTimeout(() => {
      welcome.hidden = true;
      welcome.classList.remove("is-leaving");
      dashboard.hidden = false;

      const ag = healthData.ageGroups[state.ageGroup];
      document.getElementById("hero-ring").textContent = ag.icon;
      typeWrite(document.getElementById("dashboard-greeting"),
        state.name ? `Hi, ${state.name} 👋` : "Your Health Guide", 40);
      document.getElementById("dashboard-subtitle").textContent =
        `${ag.label} · ${healthData.ethnicities[state.ethnicity]} · ${healthData.diets[state.diet]}`;

      buildTabs();
      switchTab("hygiene");

      // Replace node to avoid stacking listeners on repeated visits
      const backBtn = document.getElementById("back-btn");
      const fresh   = backBtn.cloneNode(true);
      backBtn.replaceWith(fresh);
      fresh.addEventListener("click", handleBack);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  }

  function handleBack() {
    const dashboard = document.getElementById("screen-dashboard");
    dashboard.style.cssText =
      "opacity:0;transform:translateY(8px);transition:opacity 0.25s ease,transform 0.25s ease;pointer-events:none;";
    setTimeout(() => {
      dashboard.hidden = true;
      dashboard.style.cssText = "";
      document.getElementById("screen-welcome").hidden = false;
      const btn = document.getElementById("get-guide-btn");
      btn.textContent = "Get My Guide →";
      btn.disabled = false;
    }, 260);
  }

  function buildTabs() {
    const bar = document.getElementById("tab-bar");
    bar.innerHTML = "";
    [
      { id: "hygiene",   icon: "🧼", label: "Hygiene"  },
      { id: "menstrual", icon: "🩸", label: "Cycles"   },
      { id: "nutrition", icon: "🥗", label: "Nutrition" },
      { id: "safety",    icon: "🛡️", label: "Safety"   }
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
    void area.offsetWidth; // force reflow to restart animation
    area.classList.add("tab-fade");
    const builders = { hygiene: hygieneSection, menstrual: menstrualSection, nutrition: nutritionSection, safety: safetySection };
    area.appendChild(builders[id]());
    revealCards(area);
    area.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ── HYGIENE ─────────────────────────────────────────────────
  function hygieneSection() {
    const d = healthData.hygiene[state.ageGroup];
    const wrap = div("section-wrap");

    wrap.appendChild(sHdr("🧼", "Hygiene", d.intro));

    const grid = div("card-grid");
    d.tips.forEach(t => {
      const card = div("h-card");
      card.innerHTML = `
        <div class="h-card-title">
          <span>${t.icon}</span>
          <span class="h-card-dot"></span>
          <span>${t.title}</span>
        </div>
        <p>${t.body}</p>
        ${t.action ? `<a class="card-action-btn" href="${t.action.url}" target="_blank" rel="noopener noreferrer">${t.action.label} ↗</a>` : ""}`;
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  // ── MENSTRUAL ────────────────────────────────────────────────
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

  // ── NUTRITION ────────────────────────────────────────────────
  function nutritionSection() {
    const ageD  = healthData.nutrition.byAge[state.ageGroup];
    const ethD  = healthData.nutrition.byEthnicity[state.ethnicity] || healthData.nutrition.byEthnicity.other;
    const dietD = healthData.nutrition.byDiet[state.diet] || healthData.nutrition.byDiet.omnivore;
    const wrap  = div("section-wrap");

    wrap.appendChild(sHdr("🥗", "Nutrition", ageD.intro));

    // Life-stage priorities
    const sfData = healthData.nutrition.stageFocusByAge[state.ageGroup] || [];
    if (sfData.length) {
      wrap.appendChild(lbl("PRIORITIES FOR YOUR LIFE STAGE"));
      const sfGrid = div("card-grid");
      sfData.forEach(f => {
        const card = div("h-card");
        card.innerHTML = `
          <div class="h-card-title">
            <span>${f.icon}</span>
            <span class="h-card-dot"></span>
            <span>${f.title}</span>
          </div>
          <p>${f.body}</p>`;
        sfGrid.appendChild(card);
      });
      wrap.appendChild(sfGrid);
    }

    // Nutrient tiles
    const nlbl = lbl("KEY NUTRIENTS — DAILY TARGETS");
    wrap.appendChild(nlbl);
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

    // Quick tips
    if (ageD.tips && ageD.tips.length) {
      const tipList = document.createElement("ul");
      tipList.className = "arrow-list";
      ageD.tips.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t;
        tipList.appendChild(li);
      });
      wrap.appendChild(tipList);
    }

    // Ethnicity card
    const ethCard = div("sub-card");
    ethCard.innerHTML = `<span class="sub-card-lbl">🌍 ${ethD.title}</span>`;

    const twoCols = div("two-col");

    const strengths = div("div");
    strengths.innerHTML = `<div class="col-hd">Strengths</div>`;
    const sTagList = document.createElement("ul");
    sTagList.className = "tags green";
    ethD.strengths.forEach(s => { const li = document.createElement("li"); li.textContent = s; sTagList.appendChild(li); });
    strengths.appendChild(sTagList);

    const watchCol = div("div");
    watchCol.innerHTML = `<div class="col-hd">Watch Out For</div>`;
    const wTagList = document.createElement("ul");
    wTagList.className = "tags amber";
    ethD.watchOut.forEach(s => { const li = document.createElement("li"); li.textContent = s; wTagList.appendChild(li); });
    watchCol.appendChild(wTagList);

    twoCols.appendChild(strengths);
    twoCols.appendChild(watchCol);
    ethCard.appendChild(twoCols);

    // Supplements
    const supLbl = document.createElement("div");
    supLbl.className = "col-hd"; supLbl.style.marginTop = "1rem";
    supLbl.textContent = "Common Supplements";
    ethCard.appendChild(supLbl);
    const supTags = document.createElement("ul");
    supTags.className = "tags pri";
    ethD.supplements.forEach(s => { const li = document.createElement("li"); li.textContent = s; supTags.appendChild(li); });
    ethCard.appendChild(supTags);

    // Recipe tips
    const recLbl = document.createElement("div");
    recLbl.className = "col-hd"; recLbl.style.marginTop = "0.85rem";
    recLbl.textContent = "Food Tips";
    ethCard.appendChild(recLbl);
    const recList = document.createElement("ul");
    recList.className = "arrow-list";
    ethD.recipeTips.forEach(t => { const li = document.createElement("li"); li.textContent = t; recList.appendChild(li); });
    ethCard.appendChild(recList);

    wrap.appendChild(ethCard);

    // Diet card
    const dietCard = div("sub-card");
    dietCard.innerHTML = `<span class="sub-card-lbl">🍽️ ${dietD.title}</span>`;
    const dietList = document.createElement("ul");
    dietList.className = "arrow-list";
    dietD.notes.forEach(n => { const li = document.createElement("li"); li.textContent = n; dietList.appendChild(li); });
    dietCard.appendChild(dietList);
    wrap.appendChild(dietCard);

    return wrap;
  }

  // ── SAFETY ───────────────────────────────────────────────────
  function safetySection() {
    const wrap = div("section-wrap");
    wrap.appendChild(sHdr("🛡️", "Safety & Support", "Help is free, confidential, and available 24/7."));

    // Age-specific message
    const ageTxt = healthData.safety.byAge[state.ageGroup];
    const ageMsg = div("age-msg");
    ageMsg.innerHTML = `<p>${ageTxt}</p>`;
    wrap.appendChild(ageMsg);

    // DV + emergency
    const dv = healthData.safety.domestic;
    const emCard = div("em-card");
    const dvTitle = state.ageGroup === "child" ? "🏠 Safety at Home & School" : `🚨 ${dv.title}`;
    emCard.innerHTML = `<span class="em-card-lbl">${dvTitle}</span><p>${dv.description}</p>`;

    const hlGrid = div("hotline-grid");
    const ageHotlines = healthData.safety.hotlinesByAge[state.ageGroup] || dv.hotlines;
    ageHotlines.forEach(h => {
      const hc = div("hl-card");
      const phoneHref = parsePhoneHref(h.number);
      const smsHref   = parseSmsHref(h.text);
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

    const tipLbl = document.createElement("div");
    tipLbl.className = "col-hd"; tipLbl.style.marginTop = "1rem";
    tipLbl.textContent = "Safety Tips";
    emCard.appendChild(tipLbl);
    const tipList = document.createElement("ul");
    tipList.className = "safe-tips";
    dv.safetyTips.forEach(t => { const li = document.createElement("li"); li.textContent = t; tipList.appendChild(li); });
    emCard.appendChild(tipList);
    wrap.appendChild(emCard);

    // Legal (not relevant for children)
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
    lCard.appendChild(lList);
    wrap.appendChild(lCard);

    // Mental health
    const mental = healthData.safety.mental;
    const mCard = div("mental-card");
    mCard.innerHTML = `<span class="mental-card-lbl">💜 ${mental.title}</span>`;
    const mGrid = div("mental-grid");
    const postpartumAges = new Set(["youngAdult", "adult"]);
    const mentalHotlines = mental.hotlines.filter(h =>
      h.name !== "Postpartum Support Intl" || postpartumAges.has(state.ageGroup)
    );
    mentalHotlines.forEach(h => {
      const mc = div("m-card");
      const phoneHref = parsePhoneHref(h.number);
      mc.innerHTML = `
        <div class="m-org">${h.name}</div>
        <div class="m-num">${phoneHref ? `<a href="${phoneHref}">${h.number}</a>` : h.number}</div>
        <div class="m-hours">${h.hours}</div>
        <a class="card-action-btn" href="https://${h.web}" target="_blank" rel="noopener noreferrer">${h.web} ↗</a>`;
      mGrid.appendChild(mc);
    });
    mCard.appendChild(mGrid);
    wrap.appendChild(mCard);

    return wrap;
  }

  // ── Helpers ──────────────────────────────────────────────────
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
      ".h-card,.t-card,.n-tile,.hl-card,.m-card,.sub-card,.legal-item,.age-msg,.em-card,.legal-card,.mental-card"
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
      <div class="s-hdr-top">
        <span class="s-hdr-icon">${icon}</span>
        <h2>${title}</h2>
      </div>
      ${intro ? `<p>${intro}</p>` : ""}`;
    return h;
  }

  function lbl(text) {
    const s = document.createElement("span");
    s.className = "dim-lbl"; s.textContent = text;
    return s;
  }

  // ── Init ─────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", buildForm);
})();
