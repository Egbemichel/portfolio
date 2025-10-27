import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { draftMode } from "next/headers";
import Script from "next/script";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/DarkModeToggle";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { FloatingDock } from "@/components/FloatingDock";
import SidebarToggle from "@/components/SidebarToggle";
import { ThemeProvider } from "@/components/ThemeProvider";
import Diagnostics from "@/components/Diagnostics";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "EGBE_MICHEL",
    description: "Welcome to EGBE_MICHEL's personal portfolio website.",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Diagnostics />

                {/* Clerk auth header: shows sign-in/up when signed out, and user menu when signed in */}
                <header className="w-full flex items-center justify-end p-4 gap-3">
                    <SignedOut>
                        <SignInButton>
                            <button className="px-3 py-1 rounded-md bg-muted/20">Sign in</button>
                        </SignInButton>
                        <SignUpButton>
                            <button className="px-3 py-1 rounded-md border">Sign up</button>
                        </SignUpButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </header>

                <Script
                    src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
                    strategy="afterInteractive"
                />

                <SidebarProvider defaultOpen={false}>
                    <SidebarInset className="">{children}</SidebarInset>

                    <AppSidebar side="right" />

                    <FloatingDock />
                    <SidebarToggle />

                    {/* Mode Toggle - Desktop: bottom right next to AI chat, Mobile: top right next to burger menu */}
                    <div className="fixed md:bottom-6 md:right-24 top-4 right-18 md:top-auto md:left-auto z-20">
                        <div className="w-10 h-10 md:w-12 md:h-12">
                            <ModeToggle />
                        </div>
                    </div>
                </SidebarProvider>

                {/* When draft mode is enabled, show controls to disable it. Sanity live editing removed. */}
                {(await draftMode()).isEnabled && <DisableDraftMode />}
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>
    );
}