"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { createSession } from "@/app/actions/create-session";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
type Profile = { firstName?: string; lastName?: string } | null;
import { useSidebar } from "../ui/sidebar";

export function Chat({
                         profile,
                     }: {
    profile: Profile;
}) {
    const { toggleSidebar } = useSidebar();
    const { isSignedIn } = useUser();

    // Provide a greeting based on profile; define before using in useChatKit
    const getGreeting = () => {
        if (!profile?.firstName) {
            return "Hi there! Ask me anything about my work, experience, or projects.";
        }

        const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ");
        return `Hi! I'm ${fullName}. Ask me anything about my work, experience, or projects.`;
    };

    const { control } = useChatKit({
        api: {
            getClientSecret: async (_existingSecret) => {
                // If user is not signed in, return an empty string to avoid calling the server action
                if (!isSignedIn) {
                    return "";
                }

                // Called on initial load and when session needs refresh
                return await createSession();
            },
        },
        // https://chatkit.studio/playground
        theme: {},
        header: {
            title: {
                text: `Chat with ${profile?.firstName || "Me"} `,
            },
            leftAction: {
                icon: "close",
                onClick: () => {
                    toggleSidebar();
                },
            },
        },
        startScreen: {
            greeting: getGreeting(),
            prompts: [
                {
                    icon: "suitcase",
                    label: "What's your experience?",
                    prompt:
                        "Tell me about your professional experience and previous roles",
                },
                {
                    icon: "square-code",
                    label: "What skills do you have?",
                    prompt:
                        "What technologies and programming languages do you specialize in?",
                },
                {
                    icon: "cube",
                    label: "What have you built?",
                    prompt: "Show me some of your most interesting projects",
                },
                {
                    icon: "profile",
                    label: "Who are you?",
                    prompt: "Tell me more about yourself and your background",
                },
            ],
        },
        composer: {
            models: [
                {
                    id: "crisp",
                    label: "Crisp",
                    description: "Concise and factual",
                },
                {
                    id: "clear",
                    label: "Clear",
                    description: "Focused and helpful",
                },
                {
                    id: "chatty",
                    label: "Chatty",
                    description: "Conversational companion",
                },
            ],
        },

        disclaimer: {
            text: "Disclaimer: This is my AI-powered twin. It may not be 100% accurate and should be verified for accuracy.",
        },
    });

    // Render a lightweight prompt to sign in if user is not authenticated
    if (!isSignedIn) {
        return (
            <div className="flex h-full w-full items-center justify-center p-6">
                <div className="max-w-md w-full text-center bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3">Sign in to use the AI chat</h3>
                    <p className="text-sm text-muted-foreground mb-4">You need to sign in to start a secure Chat session.</p>
                    <div className="flex items-center justify-center gap-3">
                        <SignInButton>
                            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Sign in</button>
                        </SignInButton>
                        <SignUpButton>
                            <button className="px-4 py-2 rounded-md border">Sign up</button>
                        </SignUpButton>
                    </div>
                </div>
            </div>
        );
    }

    return <ChatKit control={control} className="h-full w-full z-50" />;
}

export default Chat;