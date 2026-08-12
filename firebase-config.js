// ============================================================
//  HerHealth — Firebase Configuration
//
//  SETUP STEPS:
//  1. Go to https://console.firebase.google.com
//  2. Click "Add project" and name it (e.g. herhealth)
//  3. In the project, click "Web" (</>) to register an app
//  4. Copy the firebaseConfig values below
//  5. In the console sidebar: Authentication → Sign-in method → Email/Password → Enable
//  6. In the console sidebar: Firestore Database → Create database → Start in production mode
//     Then in Rules tab paste:
//       rules_version = '2';
//       service cloud.firestore {
//         match /databases/{database}/documents {
//           match /users/{userId}/{document=**} {
//             allow read, write: if request.auth != null && request.auth.uid == userId;
//           }
//         }
//       }
// ============================================================

const firebaseConfig = {
  apiKey:            "AIzaSyDrQC0g2lOt_9aCVS88YxMsSsnBvrHtfIU",
  authDomain:        "herhealth-22620.firebaseapp.com",
  projectId:         "herhealth-22620",
  storageBucket:     "herhealth-22620.firebasestorage.app",
  messagingSenderId: "595704397909",
  appId:             "1:595704397909:web:2d9636a0ccd909266014dc"
};

firebase.initializeApp(firebaseConfig);
