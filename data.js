// ============================================================
//  HerHealth Guide – Content Data (concise)
// ============================================================

const healthData = {

  ageGroups: {
    child:      { label: "Child",       sub: "Ages 5–12", icon: "🌱" },
    teen:       { label: "Teen",        sub: "Ages 13–17", icon: "🌸" },
    youngAdult: { label: "Young Adult", sub: "Ages 18–25", icon: "🌺" },
    adult:      { label: "Adult",       sub: "Ages 26–40", icon: "🌻" },
    middleAge:  { label: "Midlife",     sub: "Ages 41–55", icon: "🌷" },
    senior:     { label: "Senior",      sub: "Ages 56+",   icon: "🌼" }
  },

  ethnicities: {
    southAsian:    "South Asian",
    eastAsian:     "East / Southeast Asian",
    african:       "African / African American",
    latinx:        "Latin American / Hispanic",
    middleEastern: "Middle Eastern / North African",
    european:      "European / Caucasian",
    indigenous:    "Indigenous / Native American",
    other:         "Other / Prefer not to say"
  },

  diets: {
    omnivore:    "Omnivore",
    vegetarian:  "Vegetarian",
    vegan:       "Vegan",
    halal:       "Halal",
    kosher:      "Kosher",
    glutenFree:  "Gluten-Free",
    lactoseFree: "Lactose-Free"
  },

  // ── HYGIENE ─────────────────────────────────────────────
  hygiene: {
    child: {
      intro: "Good habits now = a lifetime of health.",
      tips: [
        { icon: "🦷", title: "Brush Twice Daily",   body: "2 minutes, morning & night. Fluoride toothpaste only." },
        { icon: "🙌", title: "Wash Your Hands",     body: "Before meals, after the toilet. 20 seconds minimum." },
        { icon: "🚿", title: "Daily Shower",         body: "Every day after play. Mild, fragrance-free soap." },
        { icon: "✂️", title: "Trim Your Nails",     body: "Short, clean nails. Long nails trap bacteria." },
        { icon: "👙", title: "Fresh Underwear",      body: "Cotton underwear changed daily." },
        { icon: "🌸", title: "Puberty Prep (10–12)", body: "Body odour, breast buds & periods are coming — all normal. Ask a trusted adult." }
      ]
    },
    teen: {
      intro: "Puberty changes your hygiene needs. Stay ahead of it.",
      tips: [
        { icon: "🚿", title: "Daily Shower",         body: "Every day, always after sport. Use deodorant." },
        { icon: "💧", title: "Intimate Care",        body: "Warm water only — no douching, no scented products." },
        { icon: "🩸", title: "Period Products",      body: "Change pads every 4–6 h. Tampons: max 8 hours." },
        { icon: "✨", title: "Skincare",             body: "Gentle cleanser, twice daily. Non-comedogenic for acne." },
        { icon: "👙", title: "Cotton Underwear",     body: "Breathable cotton reduces infections." },
        { icon: "🦷", title: "Dental Care",          body: "Dentist every 6 months. Extra care around braces.", action: { label: "Find a dentist", url: "https://maps.google.com/?q=dentist+near+me" } }
      ]
    },
    youngAdult: {
      intro: "Regular check-ups and daily care protect your future health.",
      tips: [
        { icon: "🩺", title: "First Gynaecological Visit", body: "First Pap smear at 21 or when sexually active — whichever is sooner.", action: { label: "Find a gynaecologist", url: "https://maps.google.com/?q=gynecologist+near+me" } },
        { icon: "🔬", title: "Pap Smear + HPV",     body: "Every 3 years from age 21. HPV vaccine most effective before 26.", action: { label: "Find a clinic", url: "https://maps.google.com/?q=gynecologist+near+me" } },
        { icon: "🤲", title: "Breast Self-Exam",    body: "Monthly, a few days after your period. Know your normal." },
        { icon: "🛡️", title: "Safe Sex",            body: "Use condoms consistently. STI testing if sexually active.", action: { label: "Find a sexual health clinic", url: "https://maps.google.com/?q=sexual+health+clinic+near+me" } },
        { icon: "🌿", title: "Vaginal Health",      body: "No douching. Probiotics (yoghurt, kefir) support healthy flora." },
        { icon: "☀️", title: "Daily SPF",           body: "SPF 30+ every single day. Sun damage starts in your 20s." }
      ]
    },
    adult: {
      intro: "Busy life — don't skip your check-ups.",
      tips: [
        { icon: "🩺", title: "Gynaecological Check-Up", body: "Pap smear every 3 years. Annual well-woman exam.", action: { label: "Find a gynaecologist", url: "https://maps.google.com/?q=gynecologist+near+me" } },
        { icon: "🎀", title: "Mammogram",           body: "Start at 40–50 depending on your risk. Ask your doctor.", action: { label: "Find a mammogram centre", url: "https://maps.google.com/?q=mammogram+screening+near+me" } },
        { icon: "💪", title: "Pelvic Floor",        body: "Kegel exercises daily. Pelvic floor PT after childbirth.", action: { label: "Find a pelvic floor physio", url: "https://maps.google.com/?q=pelvic+floor+physical+therapist+near+me" } },
        { icon: "🌸", title: "Postpartum Care",     body: "Peri bottle, breathable pads, 6 weeks healing." },
        { icon: "☀️", title: "Skin & Pigmentation", body: "Pregnancy can cause melasma. SPF 50+ is non-negotiable." },
        { icon: "🦷", title: "Dental in Pregnancy", body: "Pregnancy raises gum disease risk. Keep dental appointments." }
      ]
    },
    middleAge: {
      intro: "Perimenopause is real. These habits help.",
      tips: [
        { icon: "💧", title: "Vaginal Dryness",     body: "OTC vaginal moisturisers daily. Lubricants for intimacy." },
        { icon: "🎀", title: "Mammogram",           body: "Annual or biennial from 40–50. Don't skip.", action: { label: "Find a mammogram centre", url: "https://maps.google.com/?q=mammogram+screening+near+me" } },
        { icon: "🦴", title: "Bone Density Scan",   body: "Oestrogen protects bones. Baseline DEXA scan now.", action: { label: "Find a DEXA scan centre", url: "https://maps.google.com/?q=DEXA+bone+density+scan+near+me" } },
        { icon: "💪", title: "Pelvic Floor",        body: "Daily Kegels. Incontinence is common but treatable." },
        { icon: "🌿", title: "Skin Hydration",      body: "Richer moisturiser, daily SPF, retinol at night." },
        { icon: "🌡️", title: "Hot Flush Triggers",  body: "Alcohol, caffeine, spicy food. Keep a log." }
      ]
    },
    senior: {
      intro: "Healthy ageing is an active choice — you have this.",
      tips: [
        { icon: "💧", title: "Vaginal & Urinary",   body: "Vaginal oestrogen cream safely treats dryness and urgency." },
        { icon: "🚽", title: "Continence",          body: "Bladder training and pelvic PT work. Talk to your doctor." },
        { icon: "🌿", title: "Gentle Skincare",     body: "Rich emollients, gentle cleanser, SPF daily. Watch moles." },
        { icon: "🦷", title: "Oral Health",         body: "Dry mouth raises cavity risk. Hydrate well. 6-monthly dentist." },
        { icon: "🧘", title: "Fall Prevention",     body: "Non-slip mats, good lighting, balance exercise (yoga, tai chi)." },
        { icon: "🩺", title: "Screenings",          body: "Pap until 65, eye tests, hearing, bone density — annually.", action: { label: "Find a women's health clinic", url: "https://maps.google.com/?q=women%27s+health+clinic+near+me" } }
      ]
    }
  },

  // ── MENSTRUAL HEALTH ─────────────────────────────────────
  menstrual: {
    child: {
      title: "Your First Period — What to Expect",
      intro: "Usually arrives between ages 10–15. Totally normal and healthy.",
      sections: [
        { heading: "What Is a Period?",    body: "Your uterine lining sheds each month. Lasts 3–7 days. Colours range from pink to dark red — all normal." },
        { heading: "How to Use a Pad",     body: "Peel backing, stick to underwear, change every 4–6 hours. Keep a spare in your school bag." },
        { heading: "What You Might Feel",  body: "Light cramps, mood changes, bloating. Mild pain is normal." },
        { heading: "Talk to Someone",      body: "Ask your mum, aunt, school nurse, or any trusted woman. You are not alone." }
      ]
    },
    teen: {
      title: "Owning Your Cycle",
      intro: "Your cycle is yours. Understanding it gives you real power.",
      sections: [
        { heading: "What's Normal?",       body: "Cycles run 21–35 days. Irregular for the first 2 years — expected." },
        { heading: "Period Products",      body: "Pads (easiest), tampons (max 8 h), menstrual cups (eco), period underwear. Try what works for you." },
        { heading: "Cramps",              body: "Heat pack + ibuprofen with food. Walking and light yoga help too." },
        { heading: "PMS",                 body: "Mood swings, bloating, tender breasts the week before. Less salt and caffeine helps." },
        { heading: "Track Your Cycle",    body: "Use Clue or Flo. Tracking patterns helps you plan and spot issues early.", action: { label: "Download Clue", url: "https://helloclue.com" } },
        { heading: "See a Doctor If…",   body: "No period by 16. Soaking a pad per hour for 2+ hours. Pain that stops daily life." }
      ]
    },
    youngAdult: {
      title: "Reproductive Health in Your 20s",
      intro: "Know your cycle, know your options.",
      sections: [
        { heading: "Cycle Awareness",     body: "Ovulation happens mid-cycle. Tracking helps with family planning — whether avoiding or trying to conceive." },
        { heading: "Contraception",       body: "Pill, IUD, implant, injection, condom, diaphragm. Ask a GP or sexual health clinic.", action: { label: "Find a sexual health clinic", url: "https://maps.google.com/?q=sexual+health+clinic+near+me" } },
        { heading: "PCOS",               body: "1 in 10 women. Signs: irregular periods, acne, excess hair, weight changes. Diagnosable by blood test + ultrasound.", action: { label: "Find a gynaecologist", url: "https://maps.google.com/?q=gynecologist+near+me" } },
        { heading: "Endometriosis",       body: "Severe period pain that disrupts life = red flag. Takes years to diagnose — advocate for yourself.", action: { label: "Learn more", url: "https://endometriosisassn.org" } },
        { heading: "STI Testing",        body: "Many STIs have no symptoms. Regular testing is normal and responsible." },
        { heading: "Abnormal Bleeding",  body: "Bleeding between periods, after sex, or a sudden change in flow? Get it checked." }
      ]
    },
    adult: {
      title: "Periods, Pregnancy & Perimenopause",
      intro: "This decade brings big changes. Stay informed.",
      sections: [
        { heading: "Planning for Pregnancy", body: "Start folic acid 3 months before. Track ovulation. See your GP for a preconception check.", action: { label: "Find an OB-GYN", url: "https://maps.google.com/?q=obgyn+near+me" } },
        { heading: "Fibroids & Polyps",  body: "Common in your 30s. Can cause heavy bleeding or nothing at all. Diagnosed by ultrasound." },
        { heading: "Postpartum Periods", body: "Returns in 6–8 weeks (if not breastfeeding). First cycles can be irregular." },
        { heading: "Early Perimenopause", body: "Irregular cycles, increased PMS, mood shifts in your late 30s are common. You're not imagining it." },
        { heading: "Cervical Screening", body: "Pap smear every 3–5 years. Don't skip — cervical cancer is largely preventable." }
      ]
    },
    middleAge: {
      title: "Perimenopause & Menopause",
      intro: "A natural transition — not an illness. Average transition: 4–10 years.",
      sections: [
        { heading: "What Is Perimenopause?", body: "Oestrogen gradually drops. Irregular periods, hot flushes, sleep issues, mood shifts." },
        { heading: "Menopause",           body: "Confirmed after 12 consecutive months without a period. Average age: 51." },
        { heading: "Hot Flushes",         body: "Loose clothing, a fan, avoid alcohol/caffeine/stress. HRT and some herbs can help." },
        { heading: "Sleep & Mood",        body: "Night sweats disrupt sleep → mood and focus. CBT is proven effective for this." },
        { heading: "HRT",                body: "Modern HRT relieves many symptoms and is safe for most women under 60. Discuss with your doctor.", action: { label: "Find a menopause specialist", url: "https://maps.google.com/?q=menopause+specialist+near+me" } },
        { heading: "Heart Health",        body: "Oestrogen's protective effect fades after menopause. Monitor blood pressure and cholesterol." }
      ]
    },
    senior: {
      title: "Post-Menopause Health",
      intro: "Menopause is behind you. Your hormonal health still matters.",
      sections: [
        { heading: "Vaginal & Urinary",  body: "Genitourinary syndrome (dryness, urgency) is very treatable. Ask about localised oestrogen." },
        { heading: "Bone Health",        body: "Bone loss accelerates post-menopause. Weight-bearing exercise + calcium + vitamin D + possibly medication." },
        { heading: "Heart Health",       body: "Leading cause of death in women 65+. Know your numbers: blood pressure, cholesterol, blood sugar." },
        { heading: "Regular Pelvic Care", body: "Pap smears until 65. Annual wellness exams for bladder, bowel, and pelvic health." },
        { heading: "Intimacy",           body: "Lower oestrogen can reduce libido. Lubricants, localised oestrogen, and open conversation help." }
      ]
    }
  },

  // ── NUTRITION ────────────────────────────────────────────
  nutrition: {
    stageFocusByAge: {
      child: [
        { icon: "🦴", title: "Build Bones Now",          body: "Ages 5–12 are a critical window for bone mass. Prioritise calcium and vitamin D every single day." },
        { icon: "🚫", title: "Limit Sugar Early",        body: "Habits formed now last a lifetime. Choose whole foods over packaged snacks and sugary drinks." },
        { icon: "🌈", title: "Eat the Rainbow",          body: "5 different colours of fruit and veg daily gives you the full range of vitamins growing bodies need." }
      ],
      teen: [
        { icon: "🩸", title: "Iron When Periods Start",  body: "Iron needs jump to 15 mg once your cycle begins. Red meat, lentils or spinach — always with vitamin C." },
        { icon: "🦴", title: "Peak Bone Mass Window",    body: "Ages 13–17 are your biggest bone-building window. Hit 1300 mg calcium daily — don't skip it." },
        { icon: "🚫", title: "Don't Skip Meals",         body: "Crash dieting in your teens disrupts hormones and bone density for life. Fuel your body properly." }
      ],
      youngAdult: [
        { icon: "💊", title: "Start Folic Acid Now",     body: "Take 400 mcg daily if there's any chance of pregnancy — neural tube defects form before you know you're pregnant." },
        { icon: "🩸", title: "Replace Period Losses",    body: "18 mg iron daily. Always pair plant iron with vitamin C and avoid tea or coffee around iron-rich meals." },
        { icon: "🦠", title: "Gut = Hormone Health",     body: "Daily fermented foods (yoghurt, kefir, kimchi) support gut flora, which directly affects oestrogen metabolism." }
      ],
      adult: [
        { icon: "🤰", title: "Preconception Nutrition",  body: "Start prenatal vitamins before conceiving. Folate, iron, DHA and iodine are non-negotiable from day one." },
        { icon: "⚡", title: "Postpartum Recovery",      body: "You need +500 calories while breastfeeding. Protein, iron and DHA are depleted by birth — replenish actively." },
        { icon: "🦴", title: "Bone Density Foundation",  body: "What you build or lose in your 30s affects your 60s. Calcium, vitamin D and weight-bearing exercise now." }
      ],
      middleAge: [
        { icon: "🫀", title: "Protect Your Heart",       body: "Oestrogen's protective effect fades at menopause. A Mediterranean diet — fish, olive oil, whole grains, legumes — is your best defence." },
        { icon: "🦴", title: "Fight Bone Loss",          body: "Bone loss accelerates in perimenopause. Calcium 1000–1200 mg + vitamin D 600–800 IU + weight-bearing exercise daily." },
        { icon: "💪", title: "Preserve Muscle",          body: "Aim for 1.2 g protein per kg of body weight. Muscle loss starts now and accelerates without protein and resistance training." }
      ],
      senior: [
        { icon: "🥩", title: "Protein Every Meal",       body: "Muscle loss is the biggest nutritional threat after 65. Aim for 25–30 g protein per meal — eggs, fish, legumes, dairy." },
        { icon: "💧", title: "Drink Without Thirst",     body: "The thirst signal weakens with age. Sip water consistently — dehydration causes falls, confusion and UTIs." },
        { icon: "🔬", title: "Supplement Strategically", body: "Vitamin D 800 IU, B12 and calcium are commonly deficient after 65. Most seniors need all three as supplements." }
      ]
    },
    byAge: {
      child: {
        intro: "Growing bodies need real fuel — not just calories.",
        keyNutrients: [
          { name: "Calcium",   amount: "1000–1300 mg",  why: "Builds bones & teeth",       sources: "Milk, yoghurt, cheese, fortified plant milk" },
          { name: "Iron",      amount: "8–10 mg",       why: "Energy & oxygen in blood",   sources: "Meat, beans, lentils, fortified cereal" },
          { name: "Vitamin D", amount: "600 IU",        why: "Absorbs calcium, immunity",  sources: "Sunlight, fatty fish, fortified milk" },
          { name: "Protein",   amount: "19–34 g",       why: "Growth & muscle",            sources: "Eggs, chicken, fish, dairy, tofu, beans" },
          { name: "Zinc",      amount: "5–8 mg",        why: "Immune & growth",            sources: "Meat, pumpkin seeds, legumes" },
          { name: "Omega-3",   amount: "0.9 g",         why: "Brain development",          sources: "Salmon, walnuts, chia, flaxseed" }
        ],
        tips: ["Offer 5 colours of veg and fruit every day", "Water and milk over sugary drinks", "Healthy snack: fruit + yoghurt + handful of nuts"]
      },
      teen: {
        intro: "Adolescence is peak bone-building time. Iron needs jump once periods start.",
        keyNutrients: [
          { name: "Calcium",     amount: "1300 mg",    why: "Peak bone mass is built now",    sources: "Dairy, fortified plant milk, leafy greens, tofu" },
          { name: "Iron",        amount: "15 mg",      why: "Replaces period losses",          sources: "Red meat, beans, spinach + vitamin C" },
          { name: "Folic Acid",  amount: "400 mcg",    why: "Cell growth & DNA",              sources: "Leafy greens, beans, fortified cereals" },
          { name: "Vitamin D",   amount: "600 IU",     why: "Bone & immune health",           sources: "Sunlight, fatty fish, fortified foods" },
          { name: "Protein",     amount: "46 g",       why: "Muscle & development",           sources: "Eggs, meat, fish, dairy, legumes, quinoa" },
          { name: "Omega-3",     amount: "1.1 g",      why: "Brain health, reduces cramps",   sources: "Salmon, mackerel, chia, flaxseed, walnuts" }
        ],
        tips: ["Don't skip breakfast — it improves focus and mood", "Heavy periods? Check your iron levels with a doctor", "Fermented foods (yoghurt, kefir) support skin and gut"]
      },
      youngAdult: {
        intro: "Fuel fertility, energy, and long-term health in your 20s.",
        keyNutrients: [
          { name: "Iron",        amount: "18 mg",      why: "Energy, period losses",         sources: "Lean meat, lentils, tofu, fortified cereal" },
          { name: "Folic Acid",  amount: "400–800 mcg",why: "Essential before pregnancy",    sources: "Supplement + leafy greens, legumes" },
          { name: "Calcium",     amount: "1000 mg",    why: "Maintain bone density",         sources: "Dairy, fortified plant milk, almonds" },
          { name: "Vitamin D",   amount: "600 IU",     why: "Bone, immune, mood",            sources: "Sunlight, fortified foods — supplement if deficient" },
          { name: "Omega-3",     amount: "1.1 g",      why: "Reduces inflammation",          sources: "Salmon, sardines, chia, walnuts" },
          { name: "Magnesium",   amount: "310–320 mg", why: "PMS, sleep, muscle",            sources: "Dark chocolate, almonds, spinach, avocado" }
        ],
        tips: ["Take folic acid daily if pregnancy is possible", "Limit alcohol — it depletes B vitamins and disrupts hormones", "Fermented foods (yoghurt, kimchi, miso) for gut and vaginal health"]
      },
      adult: {
        intro: "Pregnancy, postpartum, and pre-perimenopause demand intentional eating.",
        keyNutrients: [
          { name: "Iron",        amount: "18 mg (27 mg pregnant)", why: "Critical during pregnancy",      sources: "Lean meat, fish, legumes, leafy greens" },
          { name: "Folic Acid",  amount: "400–800 mcg",why: "Prevents neural tube defects",  sources: "Supplement + leafy greens, lentils" },
          { name: "Calcium",     amount: "1000 mg",    why: "Baby draws from your stores",   sources: "Dairy, fortified plant milk, sardines with bones" },
          { name: "DHA",         amount: "200–300 mg", why: "Baby's brain & eye development",sources: "Fatty fish (low-mercury), algae DHA supplement" },
          { name: "Iodine",      amount: "220–290 mcg",why: "Baby's brain & thyroid",        sources: "Iodised salt, dairy, seafood" },
          { name: "Protein",     amount: "46–71 g",    why: "Growth, repair, milk production",sources: "Meat, fish, eggs, legumes, tofu" }
        ],
        tips: ["Take a quality prenatal vitamin when pregnant or planning", "Avoid high-mercury fish (shark, swordfish, king mackerel)", "Breastfeeding? +500 calories and stay very well hydrated"]
      },
      middleAge: {
        intro: "Support bones, heart, and hormones through perimenopause.",
        keyNutrients: [
          { name: "Calcium",     amount: "1000–1200 mg",why: "Bone loss accelerates now",     sources: "Dairy, fortified plant milk, leafy greens, sardines" },
          { name: "Vitamin D",   amount: "600–800 IU", why: "Essential for calcium absorption",sources: "Sunlight, fatty fish — most women need a supplement" },
          { name: "Magnesium",   amount: "320 mg",     why: "Sleep, bone, hot flushes",      sources: "Seeds, nuts, leafy greens, dark chocolate" },
          { name: "Omega-3",     amount: "1.1 g",      why: "Heart & inflammation",          sources: "Fatty fish, flaxseed, chia, walnuts, fish oil" },
          { name: "Vitamin B12", amount: "2.4 mcg",    why: "Nerve & brain health",          sources: "Meat, fish, dairy, eggs; supplement if vegan" },
          { name: "Phytoestrogens", amount: "Moderate",why: "May ease menopausal symptoms",  sources: "Edamame, tofu, tempeh, flaxseed, chickpeas" }
        ],
        tips: ["Mediterranean diet is well-evidenced for midlife health", "Reduce salt and alcohol to protect bones and heart", "Protein helps preserve muscle — aim for 1.2 g per kg of body weight"]
      },
      senior: {
        intro: "Maintain muscle, protect bones, keep your brain sharp.",
        keyNutrients: [
          { name: "Calcium",     amount: "1200 mg",    why: "Prevents fractures",            sources: "Dairy, fortified plant milk, tinned fish with bones" },
          { name: "Vitamin D",   amount: "800 IU",     why: "Bone + immune — supplement recommended", sources: "Supplement, fortified foods, fatty fish" },
          { name: "Vitamin B12", amount: "2.4 mcg",    why: "Absorption drops with age",     sources: "Supplement or fortified foods; meat, dairy, eggs" },
          { name: "Protein",     amount: "1.0–1.2 g/kg",why: "Prevents muscle loss",          sources: "Lean meat, fish, eggs, dairy, legumes, soy" },
          { name: "Omega-3",     amount: "1.1 g",      why: "Heart & brain health",          sources: "Fatty fish 2x/week, walnuts, fish oil supplement" },
          { name: "Fibre",       amount: "21 g",       why: "Gut, heart, blood sugar",       sources: "Whole grains, fruits, veg, beans, seeds" }
        ],
        tips: ["Focus on nutrient-dense foods — appetite often decreases with age", "8+ glasses of water daily — thirst sense fades as you age", "Regular meals prevent muscle breakdown"]
      }
    },

    byEthnicity: {
      southAsian: {
        title: "South Asian Food Traditions",
        strengths: ["Dal & lentils — protein, iron, folate", "Turmeric — anti-inflammatory", "Fenugreek — menstrual & blood sugar support", "Fermented foods (idli, dosa, lassi) — gut health"],
        watchOut: ["Vegetarian diets — monitor iron, B12, omega-3", "Vitamin D deficiency — very common", "Tea/coffee with meals — blocks iron absorption", "Excessive ghee/coconut oil — heart health"],
        supplements: ["Vitamin D (nearly universal need)", "Iron (if vegetarian)", "B12 (if vegetarian/vegan)", "Algae-based omega-3 (if vegetarian)"],
        recipeTips: ["Add spinach or moringa to dal for iron + calcium boost", "Cook in cast-iron pans to increase dietary iron", "Pair iron foods with lemon or tomato (vitamin C = better absorption)", "Soak and sprout legumes to improve mineral uptake"]
      },
      eastAsian: {
        title: "East & Southeast Asian Food Traditions",
        strengths: ["Fish — omega-3, iodine, protein", "Tofu, edamame, tempeh — plant protein", "Seaweed — minerals & iodine", "Green tea — antioxidants"],
        watchOut: ["Lactose intolerance common — non-dairy calcium sources needed", "High sodium in soy sauce/pickles — blood pressure", "White rice-heavy diets — add fibre and protein", "Vitamin D deficiency common"],
        supplements: ["Vitamin D", "Calcium (if low dairy intake)", "Omega-3 (if fish intake has decreased)"],
        recipeTips: ["Choose calcium-sulphate-set tofu for more calcium", "Sesame seeds on meals — excellent calcium source", "Swap white rice for brown or add more vegetables", "Miso soup provides probiotics — choose low-sodium varieties"]
      },
      african: {
        title: "African & African American Food Traditions",
        strengths: ["Black-eyed peas, cowpeas — iron & folate", "Collard greens, okra, sweet potato — nutrient-dense", "Peanuts/groundnuts — protein & healthy fat", "Fish stews — omega-3 & protein"],
        watchOut: ["Lactose intolerance common — fortified plant milk for calcium", "Vitamin D deficiency very common in darker skin tones", "High blood pressure risk — reduce salt and processed meat", "Folate deficiency more common in this group"],
        supplements: ["Vitamin D (strongly recommended)", "Calcium (if dairy-limited)", "Folate (especially reproductive-age women)", "Iron (if heavy periods)"],
        recipeTips: ["Cook collard greens with lemon — preserves vitamin C and boosts iron absorption", "Beans as protein base daily", "Whole grain over white bread", "Moringa powder in soups and sauces — a traditional superfood"]
      },
      latinx: {
        title: "Latin American & Hispanic Food Traditions",
        strengths: ["Beans + rice — complete protein and fibre", "Avocado — folate, potassium, healthy fat", "Papaya, guava, citrus — vitamin C", "Nixtamalised corn (masa) — calcium source"],
        watchOut: ["Higher diabetes risk — watch refined carb intake", "Calcium can be low if dairy is limited", "Vitamin D deficiency in northern latitudes", "Fried foods (chicharrones) — limit for heart health"],
        supplements: ["Vitamin D", "Calcium", "Folic acid (reproductive-age women)"],
        recipeTips: ["Corn tortillas over flour — more calcium, less fat", "Load soups with beans and veg for fibre and protein", "Fresh salsa = vitamin C-rich topping on everything", "Cauliflower rice to reduce refined carbs"]
      },
      middleEastern: {
        title: "Middle Eastern & North African Food Traditions",
        strengths: ["Chickpeas & lentils — protein, iron, folate", "Tahini — excellent calcium source", "Olive oil — heart-healthy fats", "Dates — iron and energy"],
        watchOut: ["Vitamin D deficiency despite sunny climate (sun avoidance)", "White bread and rice dominant — add whole grains", "Low calcium if dairy is limited", "Anaemia relatively common — monitor iron"],
        supplements: ["Vitamin D (very commonly needed)", "Iron", "B12 (if minimal animal products)"],
        recipeTips: ["Tahini daily for calcium", "Whole wheat pita or bulgur over white varieties", "Dates with nuts — iron + healthy fat combo", "More hummus, ful, lentil soup for protein and iron"]
      },
      european: {
        title: "European & Caucasian Food Traditions",
        strengths: ["Dairy consumption often meets calcium needs", "Oily fish (salmon, herring, mackerel) — omega-3", "Whole grain bread — fibre", "Varied diet = broad nutrient coverage"],
        watchOut: ["Vitamin D low in northern latitudes — supplement autumn/winter", "Over-reliance on processed foods in modern diets", "High saturated fat from dairy/meat — balance with plants", "Iron deficiency if vegetarian or heavy periods"],
        supplements: ["Vitamin D (October–March minimum in northern latitudes)", "Iron (if heavy periods or vegetarian)", "Omega-3 (if low oily fish intake)"],
        recipeTips: ["5 portions of fruit and veg daily", "Oily fish 2x per week for omega-3", "Olive oil instead of butter where possible", "Whole grain versions of bread, pasta, rice"]
      },
      indigenous: {
        title: "Indigenous & Native American Food Traditions",
        strengths: ["Traditional game, fish, wild plants — highly nutritious", "Three Sisters (corn, beans, squash) — complete nutrition", "Wild berries — antioxidant-rich", "Salmon and fish — omega-3 and vitamin D"],
        watchOut: ["Transition to Western processed foods increases diabetes risk", "Vitamin D deficiency common in northern regions", "Diabetes risk elevated — limit refined sugar and processed carbs", "Food access and insecurity vary by community"],
        supplements: ["Vitamin D", "Omega-3 (if fatty fish access is limited)", "Folic acid (reproductive-age women)"],
        recipeTips: ["Return to traditional foods where possible — adapted to your needs", "Wild rice, beans, squash as staple base", "Berries (fresh, frozen, dried) as daily snack", "Seek culturally appropriate food programmes in your community"]
      },
      other: {
        title: "General Nutrition Guidance",
        strengths: ["Traditional diets are often more nutritious than modern alternatives", "Variety is the best strategy for full micronutrient coverage"],
        watchOut: ["Universal women's deficiencies: iron, vitamin D, calcium, B12 (vegan), omega-3", "Ultra-processed food overreliance"],
        supplements: ["Vitamin D", "Iron (if heavy periods or vegetarian)", "B12 (if vegan)", "Folic acid (if of reproductive age)"],
        recipeTips: ["Eat the rainbow — different colours = different nutrients", "Pair iron plant foods with vitamin C for better absorption", "Fermented foods daily for gut health"]
      }
    },

    byDiet: {
      omnivore: {
        title: "Omnivore — Use Your Advantage",
        notes: [
          "Aim for 30 different plant foods per week for microbiome diversity",
          "Red meat: good iron and B12 source — limit to 2–3 portions per week",
          "Oily fish 2x/week naturally meets omega-3 needs",
          "Even with variety: Vitamin D, iron (heavy periods), and folic acid are commonly low in women",
          "Limit ultra-processed foods regardless of overall diet quality"
        ]
      },
      vegetarian: {
        title: "Vegetarian — Key Watch-Outs",
        notes: [
          "Iron: eat plant iron (lentils, beans, spinach, tofu) always with vitamin C — avoid tea/coffee with meals",
          "Protein: combine legumes + grains (rice + beans, hummus + pitta). Dairy and eggs fill gaps",
          "Calcium: dairy meets needs. Otherwise: fortified plant milk, tofu, almonds, leafy greens",
          "Omega-3: walnuts, chia, flaxseed — or an algae-based DHA supplement",
          "Supplements: Vitamin D, iron check, algae omega-3"
        ]
      },
      vegan: {
        title: "Vegan — Non-Negotiables",
        notes: [
          "B12: supplement daily (25 mcg cyanocobalamin minimum). This is not optional",
          "Omega-3 DHA: algae-based supplement. Flaxseed provides ALA but conversion to DHA is poor",
          "Calcium: fortified plant milks (120 mg per 100 ml), tofu set with calcium sulphate, kale",
          "Iodine: iodised salt or specific iodine supplement — kelp is inconsistent",
          "Iron + Zinc: from legumes, seeds, oats — always pair iron with vitamin C",
          "Supplements: B12 (essential), vitamin D, algae DHA, consider vegan multivitamin"
        ]
      },
      halal: {
        title: "Halal Diet",
        notes: [
          "Nutritionally comprehensive — pork exclusion has minimal impact on overall nutrition",
          "Red meat is an excellent iron and zinc source — limit to 2–3 times per week for heart health",
          "Vitamin D: still commonly deficient — supplement recommended especially in less sunny climates",
          "Supplements: Vitamin D, iron check (if heavy periods), folic acid (if planning pregnancy)"
        ]
      },
      kosher: {
        title: "Kosher Diet",
        notes: [
          "Meat and dairy cannot be combined — plan calcium separately (fortified OJ, broccoli, almonds) at meat meals",
          "Shellfish excluded — iodised salt or supplement fills the iodine gap",
          "Fish is pareve (neutral) — excellent for omega-3, protein, and iodine",
          "Supplements: Vitamin D, calcium (if dairy and meat are never together), iodine"
        ]
      },
      glutenFree: {
        title: "Gluten-Free Diet",
        notes: [
          "Choose whole GF grains: quinoa, brown rice, buckwheat, millet, teff — not just GF processed products",
          "Iron deficiency is more common in coeliac disease — get levels checked",
          "B vitamins and folate can be low when avoiding fortified wheat — compensate with legumes and eggs",
          "Fibre: increase vegetables, fruits, legumes, and seeds to compensate",
          "Supplements: iron, B vitamins, vitamin D"
        ]
      },
      lactoseFree: {
        title: "Lactose-Free Diet",
        notes: [
          "Hard cheeses and yoghurt are often tolerated even with lactose intolerance",
          "Calcium alternatives: fortified plant milk, broccoli, kale, tinned salmon/sardines with bones, fortified OJ",
          "Check plant milk labels — only buy calcium-fortified varieties",
          "Vitamin D: often added to dairy — ensure you supplement or use fortified plant milk",
          "Supplements: calcium, vitamin D"
        ]
      }
    }
  },

  // ── SAFETY & SUPPORT ─────────────────────────────────────
  safety: {
    domestic: {
      title: "Domestic Violence — You Are Not Alone",
      description: "Abuse includes physical, emotional, financial, and sexual harm. It can happen to anyone. Help is free and confidential.",
      hotlines: [
        { name: "National DV Hotline",        number: "1-800-799-7233",  text: "Text START to 88788",   web: "thehotline.org",    hours: "24/7", languages: "Multiple languages" },
        { name: "RAINN Sexual Assault",       number: "1-800-656-4673",  text: "Chat at rainn.org",     web: "rainn.org",         hours: "24/7", languages: "En Español available" },
        { name: "Crisis Text Line",           number: "Text HOME → 741741", text: null,                web: "crisistextline.org", hours: "24/7", languages: "English & Spanish" },
        { name: "Childhelp Child Abuse",      number: "1-800-422-4453",  text: null,                   web: "childhelp.org",     hours: "24/7", languages: "170+ languages" }
      ],
      safetyTips: [
        "Immediate danger? Call 911 — or use Emergency SOS on your phone",
        "Can't speak? Text 911 or use Siri/Google Assistant hands-free",
        "Safety bag: ID, documents, medication, money, phone charger",
        "Tell one trusted person — friend, neighbour, coworker",
        "Clear browser history on shared devices after visiting this page"
      ]
    },
    hotlinesByAge: {
      child: [
        { name: "Childhelp Child Abuse",  number: "1-800-422-4453",     text: null,                   web: "childhelp.org",      hours: "24/7",                 languages: "170+ languages" },
        { name: "Crisis Text Line",       number: "Text HOME → 741741", text: null,                   web: "crisistextline.org", hours: "24/7",                 languages: "English & Spanish" },
        { name: "988 Crisis Lifeline",    number: "Call or text 988",   text: null,                   web: "988lifeline.org",    hours: "24/7",                 languages: null }
      ],
      teen: [
        { name: "Love Is Respect",        number: "1-866-331-9474",     text: "Text LOVEIS → 22522",  web: "loveisrespect.org",  hours: "24/7",                 languages: "En Español available" },
        { name: "National DV Hotline",    number: "1-800-799-7233",     text: "Text START → 88788",   web: "thehotline.org",     hours: "24/7",                 languages: "Multiple languages" },
        { name: "RAINN Sexual Assault",   number: "1-800-656-4673",     text: "Chat at rainn.org",    web: "rainn.org",          hours: "24/7",                 languages: "En Español available" },
        { name: "Crisis Text Line",       number: "Text HOME → 741741", text: null,                   web: "crisistextline.org", hours: "24/7",                 languages: "English & Spanish" }
      ],
      youngAdult: [
        { name: "National DV Hotline",    number: "1-800-799-7233",     text: "Text START → 88788",   web: "thehotline.org",     hours: "24/7",                 languages: "Multiple languages" },
        { name: "RAINN Sexual Assault",   number: "1-800-656-4673",     text: "Chat at rainn.org",    web: "rainn.org",          hours: "24/7",                 languages: "En Español available" },
        { name: "Crisis Text Line",       number: "Text HOME → 741741", text: null,                   web: "crisistextline.org", hours: "24/7",                 languages: "English & Spanish" }
      ],
      adult: [
        { name: "National DV Hotline",    number: "1-800-799-7233",     text: "Text START → 88788",   web: "thehotline.org",     hours: "24/7",                 languages: "Multiple languages" },
        { name: "RAINN Sexual Assault",   number: "1-800-656-4673",     text: "Chat at rainn.org",    web: "rainn.org",          hours: "24/7",                 languages: "En Español available" },
        { name: "Postpartum Support Intl",number: "1-800-944-4773",     text: null,                   web: "postpartum.net",     hours: "Callback within hours",languages: null },
        { name: "Crisis Text Line",       number: "Text HOME → 741741", text: null,                   web: "crisistextline.org", hours: "24/7",                 languages: "English & Spanish" }
      ],
      middleAge: [
        { name: "National DV Hotline",    number: "1-800-799-7233",     text: "Text START → 88788",   web: "thehotline.org",     hours: "24/7",                 languages: "Multiple languages" },
        { name: "NAMI Helpline",          number: "1-800-950-6264",     text: null,                   web: "nami.org",           hours: "Mon–Fri 10am–10pm ET", languages: null },
        { name: "Crisis Text Line",       number: "Text HOME → 741741", text: null,                   web: "crisistextline.org", hours: "24/7",                 languages: "English & Spanish" }
      ],
      senior: [
        { name: "Elder Care Locator",     number: "1-800-677-1116",     text: null,                   web: "eldercare.acl.gov",  hours: "Mon–Fri 9am–8pm ET",   languages: "Multiple languages" },
        { name: "National DV Hotline",    number: "1-800-799-7233",     text: "Text START → 88788",   web: "thehotline.org",     hours: "24/7",                 languages: "Multiple languages" },
        { name: "NAMI Helpline",          number: "1-800-950-6264",     text: null,                   web: "nami.org",           hours: "Mon–Fri 10am–10pm ET", languages: null }
      ]
    },
    legal: {
      title: "Free & Pro-Bono Legal Help",
      description: "Restraining orders, custody, divorce, immigration tied to abuse — free help exists for all of it.",
      resources: [
        { name: "WomensLaw.org",           web: "womenslaw.org",           number: null, description: "Plain-language legal info for survivors in all 50 US states." },
        { name: "Legal Aid USA",           web: "lawhelp.org",             number: null, description: "Free civil legal help for low-income individuals. Find your local office." },
        { name: "ABA Free Legal Answers",  web: "abafreelegalanswers.org", number: null, description: "Submit civil legal questions — answered free by volunteer attorneys." },
        { name: "VINE — Offender Alerts",  web: "vinelink.com",            number: "1-877-411-8463", description: "Register for automatic notification of offender status changes." }
      ]
    },
    mental: {
      title: "Mental Health Support",
      hotlines: [
        { name: "988 Suicide & Crisis Lifeline", number: "Call or text 988",    web: "988lifeline.org",   hours: "24/7" },
        { name: "NAMI Helpline",                 number: "1-800-950-6264",      web: "nami.org",          hours: "Mon–Fri, 10am–10pm ET" },
        { name: "Postpartum Support Intl",       number: "1-800-944-4773",      web: "postpartum.net",    hours: "Callback within hours" }
      ]
    },
    byAge: {
      child:      "Feel scared or unsafe at home? Tell a teacher, school nurse, or call Childhelp at 1-800-422-4453. You will be believed and protected.",
      teen:       "Dating violence is still abuse — control, jealousy, and put-downs are red flags. Text loveis.org (loveisrespect.org) or call the DV Hotline.",
      youngAdult: "Abuse starts subtly. Isolation, jealousy, and control are warning signs. Free counselling, housing, and legal help are available.",
      adult:      "If children are involved: leaving is safer than staying. Legal aid can get emergency custody and protective orders at no cost.",
      middleAge:  "Financial abuse — controlling money, preventing work — is domestic violence. Financial counsellors and legal aid can help you rebuild.",
      senior:     "Elder abuse includes financial, physical, and emotional harm by family or carers. Elder Care Locator: 1-800-677-1116."
    }
  }
};
