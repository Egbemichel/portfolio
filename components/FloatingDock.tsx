import { getNavigation } from "@/lib/firebaseAdmin";
import { FloatingDockClient } from "./FloatingDockClient";

export async function FloatingDock() {
    const { data: navItems } = await getNavigation();

    if (!navItems || navItems.length === 0) {
        return null;
    }

    return <FloatingDockClient navItems={navItems} />;
}