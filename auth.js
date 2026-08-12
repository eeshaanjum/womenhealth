// ============================================================
//  HerHealth — Authentication
// ============================================================
(function () {
  "use strict";

  const auth = firebase.auth();

  // ── Auth tab switching ────────────────────────────────────
  document.querySelectorAll(".auth-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      document.querySelectorAll(".auth-tab").forEach(t => t.classList.toggle("active", t.dataset.tab === target));
      document.getElementById("auth-login").hidden  = (target !== "login");
      document.getElementById("auth-signup").hidden = (target !== "signup");
      clearAuthErrors();
    });
  });

  // ── Login ─────────────────────────────────────────────────
  document.getElementById("login-btn").addEventListener("click", async () => {
    const email    = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    if (!email || !password) { showAuthErr("login", "Please enter your email and password."); return; }

    const btn = document.getElementById("login-btn");
    btn.textContent = "Logging in…";
    btn.disabled = true;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      // onAuthStateChanged in app.js handles the rest
    } catch (e) {
      showAuthErr("login", friendlyError(e.code));
      btn.textContent = "Log In →";
      btn.disabled = false;
    }
  });

  // ── Sign up ───────────────────────────────────────────────
  document.getElementById("signup-btn").addEventListener("click", async () => {
    const email    = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    if (!email)          { showAuthErr("signup", "Please enter your email."); return; }
    if (password.length < 6) { showAuthErr("signup", "Password must be at least 6 characters."); return; }

    const btn = document.getElementById("signup-btn");
    btn.textContent = "Creating account…";
    btn.disabled = true;

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // onAuthStateChanged in app.js handles the rest
    } catch (e) {
      showAuthErr("signup", friendlyError(e.code));
      btn.textContent = "Create Account →";
      btn.disabled = false;
    }
  });

  // Enter key on password fields
  document.getElementById("login-password").addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("login-btn").click();
  });
  document.getElementById("signup-password").addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("signup-btn").click();
  });

  // ── Helpers ───────────────────────────────────────────────
  function showAuthErr(form, msg) {
    const id = form === "login" ? "auth-error-login" : "auth-error-signup";
    const el = document.getElementById(id);
    el.textContent = msg;
    el.hidden = false;
  }

  function clearAuthErrors() {
    document.getElementById("auth-error-login").hidden  = true;
    document.getElementById("auth-error-signup").hidden = true;
  }

  function friendlyError(code) {
    const map = {
      "auth/user-not-found":       "No account found with that email.",
      "auth/wrong-password":       "Incorrect password. Try again.",
      "auth/invalid-email":        "Please enter a valid email address.",
      "auth/email-already-in-use": "An account with that email already exists.",
      "auth/weak-password":        "Password must be at least 6 characters.",
      "auth/too-many-requests":    "Too many attempts. Please try again later.",
      "auth/invalid-credential":   "Incorrect email or password."
    };
    return map[code] || "Something went wrong. Please try again.";
  }

  // ── Expose logout ─────────────────────────────────────────
  window.authLogout = () => auth.signOut();

  // ── Auth state → app bootstrap ────────────────────────────
  auth.onAuthStateChanged(user => {
    if (typeof window.onAuthUser === "function") window.onAuthUser(user);
  });
})();
