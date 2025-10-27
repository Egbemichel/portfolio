import type {
    ColorScheme,
    StartScreenPrompt,
    ThemeOption,
} from "@openai/chatkit-react";

export const WORKFLOW_ID =
    process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
    {
        label: "What can you do?",
        prompt: "What can you do?",
        icon: "circle-question",
    },
];

export const PLACEHOLDER_INPUT = "Ask anything...";

export const GREETING = "How can I help you today?";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
    color: {
        grayscale: {
            hue: 220,
            tint: 6,
            shade: theme === "dark" ? -1 : -4,
        },
        accent: {
            primary: theme === "dark" ? "#f1f5f9" : "#0f172a",
            level: 1,
        },
    },
    radius: "round",
    // Add other theme options here
    // chatkit.studio/playground to explore config options
});

// Added Cloudinary and Firebase env helpers
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
export const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "";
export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL || "";
export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY || "";
