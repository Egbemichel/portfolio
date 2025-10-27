import admin from "firebase-admin";
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID } from "./config";

// Initialize the Firebase Admin SDK (server-side)
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: FIREBASE_PROJECT_ID,
                clientEmail: FIREBASE_CLIENT_EMAIL,
                // replace escaped newlines if present
                privateKey: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            } as any),
        });
    } catch (e) {
        // Fail silently in dev if env not configured
        // console.warn("Firebase admin init error", e);
    }
}

// Lazily get Firestore instance only if app initialized to avoid throwing during module evaluation
let db: any = null;
if (admin.apps && admin.apps.length) {
    try {
        db = admin.firestore();
    } catch (e) {
        // in case firestore call fails, leave db as null
    }
}

export async function getProfile() {
    if (!db) return { data: null, error: new Error("Firebase admin not initialized") };
    try {
        const doc = await db.collection("profile").doc("singleton-profile").get();
        return { data: doc.exists ? doc.data() : null };
    } catch (e) {
        return { data: null, error: e };
    }
}

export async function getNavigation() {
    if (!db) return { data: [], error: new Error("Firebase admin not initialized") };
    try {
        const snapshot = await db.collection("navigation").orderBy("order", "asc").get();
        const data = snapshot.docs.map((d: any) => ({ id: d.id, ...(d.data() as Record<string, any>) }));
        return { data };
    } catch (e) {
        return { data: [], error: e };
    }
}

export async function getProjects(limit = 6) {
    if (!db) return { data: [], error: new Error("Firebase admin not initialized") };
    try {
        const snapshot = await db.collection("projects").where("featured", "==", true).orderBy("order", "asc").limit(limit).get();
        const data = snapshot.docs.map((d: any) => ({ id: d.id, ...(d.data() as Record<string, any>) }));
        return { data };
    } catch (e) {
        return { data: [], error: e };
    }
}

export async function getCollection(name: string) {
    if (!db) return { data: [], error: new Error("Firebase admin not initialized") };
    try {
        const snapshot = await db.collection(name).get();
        const data = snapshot.docs.map((d: any) => ({ id: d.id, ...(d.data() as Record<string, any>) }));
        return { data };
    } catch (e) {
        return { data: [], error: e };
    }
}

export async function createContact(data: Record<string, unknown>) {
    if (!db) return { success: false, error: new Error("Firebase admin not initialized") };
    try {
        const docRef = await db.collection("contacts").add({ ...data, createdAt: admin.firestore.FieldValue.serverTimestamp(), status: "new" });
        return { success: true, id: docRef.id };
    } catch (e) {
        return { success: false, error: e };
    }
}
