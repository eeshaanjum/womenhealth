// ============================================================
//  HerHealth — Firestore Database Operations
// ============================================================
(function () {
  "use strict";

  const db = firebase.firestore();

  window.dbOps = {

    // ── Profile ────────────────────────────────────────────
    async saveProfile(uid, data) {
      await db.collection("users").doc(uid).set(data, { merge: true });
    },

    async loadProfile(uid) {
      const doc = await db.collection("users").doc(uid).get();
      return doc.exists ? doc.data() : null;
    },

    // ── Goals ──────────────────────────────────────────────
    async addGoal(uid, text, category) {
      const ref = await db.collection("users").doc(uid).collection("goals").add({
        text,
        category,
        completed: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return ref.id;
    },

    async getGoals(uid) {
      const snap = await db.collection("users").doc(uid).collection("goals")
        .orderBy("createdAt", "desc").get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },

    async toggleGoal(uid, goalId, completed) {
      await db.collection("users").doc(uid).collection("goals").doc(goalId)
        .update({ completed });
    },

    async deleteGoal(uid, goalId) {
      await db.collection("users").doc(uid).collection("goals").doc(goalId).delete();
    },

    // ── Diary ──────────────────────────────────────────────
    async saveDiaryEntry(uid, date, text) {
      // One entry per date — upsert by date
      const snap = await db.collection("users").doc(uid).collection("diary")
        .where("date", "==", date).limit(1).get();

      if (!snap.empty) {
        await snap.docs[0].ref.update({ text, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
        return snap.docs[0].id;
      } else {
        const ref = await db.collection("users").doc(uid).collection("diary").add({
          date,
          text,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return ref.id;
      }
    },

    async getDiaryEntries(uid) {
      const snap = await db.collection("users").doc(uid).collection("diary")
        .orderBy("date", "desc").get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },

    async deleteDiaryEntry(uid, entryId) {
      await db.collection("users").doc(uid).collection("diary").doc(entryId).delete();
    }
  };
})();
