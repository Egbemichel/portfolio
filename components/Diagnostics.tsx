"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";

export function Diagnostics() {
    const { isSignedIn, user } = useUser();

    const envInfo = {
        CLERK_PUBLISHABLE: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "(missing)",
        FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "(missing)",
        OPENAI_KEY_PRESENT: !!process.env.OPENAI_API_KEY,
    };

    // Use client-only state and effect to determine theme to avoid hydration mismatch
    const [themeIsDark, setThemeIsDark] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        setThemeIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    return (
        <div className="fixed left-4 top-4 z-50 w-72 rounded-md border bg-card p-3 text-xs text-muted-foreground shadow-lg">
            <div className="font-semibold mb-2">Diagnostics</div>
            <div className="mb-1">Signed in: <strong className="text-foreground">{String(isSignedIn)}</strong></div>
            <div className="mb-1">User ID: <code className="break-all">{user?.id ?? "-"}</code></div>
            {/* suppressHydrationWarning prevents React from warning if this value changes after hydration */}
            <div className="mb-1" suppressHydrationWarning>Theme dark: <strong>{themeIsDark === null ? "-" : String(themeIsDark)}</strong></div>
            <div className="mt-2 font-medium">Env</div>
            <div className="break-all text-[11px]">
                <div>CLERK_PUB: {envInfo.CLERK_PUBLISHABLE}</div>
                <div>FIREBASE_API_KEY: {envInfo.FIREBASE_API_KEY}</div>
                <div>OPENAI_KEY_PRESENT: {String(envInfo.OPENAI_KEY_PRESENT)}</div>
            </div>
        </div>
    );
}

export default Diagnostics;
