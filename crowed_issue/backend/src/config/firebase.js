import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// -------------------------------
// Fix __dirname for ES Modules
// -------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------------------
// Load Firebase Service Account
// -------------------------------
const serviceAccountPath = path.join(
  __dirname,
  "../../firebase-service-account.json"
);

if (!fs.existsSync(serviceAccountPath)) {
  console.warn("⚠️  Firebase service account file not found. Please add 'firebase-service-account.json' to the backend directory.");
  console.warn("🔗 Get it from: https://console.firebase.google.com/project/YOUR_PROJECT/settings/serviceaccounts/adminsdk");
  process.exit(1);
}

let serviceAccount = null;
if (fs.existsSync(serviceAccountPath)) {
  serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
  );
}

// -------------------------------
// Initialize Firebase Admin (SAFE)
// -------------------------------
if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

// -------------------------------
// Exports
// -------------------------------
const db = admin.firestore();
const bucket = admin.storage().bucket();

export { admin, db, bucket };


