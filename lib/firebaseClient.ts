// Client-side Firebase initializer
// Uses NEXT_PUBLIC_FIREBASE_* environment variables. Do NOT hardcode keys here.
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;

export function initFirebaseClient() {
    // If already initialized, return existing instances
    if (app) return { app, analytics };

    // Basic guard: require an apiKey to attempt client-side init
    if (!clientCredentials.apiKey) {
        // Not configured in env; return nulls so callers can handle gracefully
        return { app: null, analytics: null };
    }

    try {
        app = !getApps().length ? initializeApp(clientCredentials as any) : getApp();
        if (typeof window !== "undefined") {
            try {
                analytics = getAnalytics(app);
            } catch (e) {
                // Analytics may fail if blocked or unavailable; ignore silently
                analytics = null;
            }
        }

        return { app, analytics };
    } catch (e) {
        // If initialization fails, keep values null and return an object indicating failure
        app = null;
        analytics = null;
        return { app: null, analytics: null };
    }
}

// Auto-initialize when this module is imported on the client
if (typeof window !== "undefined") {
    initFirebaseClient();
}

export { app, analytics };

