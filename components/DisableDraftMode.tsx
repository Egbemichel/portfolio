"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { disableDraftMode } from "@/app/actions/disableDraftMode";
import { Button } from "./ui/button";

export function DisableDraftMode() {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    // Note: original implementation used next-sanity hook to detect live editing environment.
    // With Sanity removed, always render the button so users can disable draft mode when active.

    const disable = () =>
        startTransition(async () => {
            await disableDraftMode();
            router.refresh();
        });

    return (
        <div className="fixed top-2 left-2 z-50">
            {pending ? (
                "Disabling draft mode..."
            ) : (
                <Button type="button" variant="destructive" onClick={disable}>
                    Disable draft mode
                </Button>
            )}
        </div>
    );
}