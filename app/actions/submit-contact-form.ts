"use server";

import { createContact } from "@/lib/firebaseAdmin";

export async function submitContactForm(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const subject = formData.get("subject") as string;
        const message = formData.get("message") as string;

        // Validate the required fields
        if (!name || !email || !message) {
            return {
                success: false,
                error: "Please fill in all required fields",
            };
        }

        // Create the contact document in Firebase
        const result = await createContact({ name, email, subject, message });

        return {
            success: result.success,
            data: result.id,
            error: result.error ?? null,
        };
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return {
            success: false,
            error: "Failed to submit the form. Please try again later.",
        };
    }
}