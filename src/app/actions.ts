"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors and try again.",
      success: false,
    };
  }

  // In a real application, you would send an email here.
  // For this example, we'll just log it and simulate success.
  console.log("New contact form submission:");
  console.log("Name:", validatedFields.data.name);
  console.log("Email:", validatedFields.data.email);
  console.log("Message:", validatedFields.data.message);

  const timestamp = new Date().toLocaleString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    message: `Message sent successfully at ${timestamp}. Thank you!`,
    success: true,
    errors: null,
  };
}
