'use server';
/**
 * @fileOverview Generates a personalized greeting based on the time of day.
 *
 * - personalizedGreeting - A function that returns a personalized greeting string.
 * - PersonalizedGreetingOutput - The output type for the personalizedGreeting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedGreetingOutputSchema = z.object({
  greeting: z.string().describe('A personalized greeting based on the time of day.'),
});

export type PersonalizedGreetingOutput = z.infer<typeof PersonalizedGreetingOutputSchema>;

export async function personalizedGreeting(): Promise<PersonalizedGreetingOutput> {
  return personalizedGreetingFlow();
}

const personalizedGreetingPrompt = ai.definePrompt({
  name: 'personalizedGreetingPrompt',
  output: {schema: PersonalizedGreetingOutputSchema},
  prompt: `You are a friendly assistant that greets website visitors with a personalized message based on the time of day.

  Current time: {{currentTime}}

  Generate a short, engaging greeting message that makes the visitor feel welcome. Be concise. Do not be too formal or informal.
  The greeting should be appropriate for a personal portfolio website.
  Do not ask any questions like "How can I help you?".
  The greeting should not be more than 20 words.
  The greeting should be casual but professional.
  Examples of great greetings:
  "Welcome to Radulescu.org!"
  "Hi there! Welcome to my personal website."
  "Welcome! Feel free to explore this portfolio."
  Examples of bad greetings:
  "Good morning! How can I help you today?"
  "Welcome to my website! I hope you enjoy your stay."
  "Hello! Thanks for visiting my portfolio."
  `, 
});

const personalizedGreetingFlow = ai.defineFlow(
  {
    name: 'personalizedGreetingFlow',
    outputSchema: PersonalizedGreetingOutputSchema,
  },
  async () => {
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const {output} = await personalizedGreetingPrompt({currentTime});
    return output!;
  }
);
