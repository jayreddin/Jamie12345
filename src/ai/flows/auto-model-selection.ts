// auto-model-selection.ts
'use server';
/**
 * @fileOverview Automatically selects the most appropriate AI model for the chat based on user input.
 *
 * - autoModelSelection - A function that handles the automatic model selection process.
 * - AutoModelSelectionInput - The input type for the autoModelSelection function.
 * - AutoModelSelectionOutput - The return type for the autoModelSelection function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AutoModelSelectionInputSchema = z.object({
  userInput: z.string().describe('The user input for the chat message.'),
  availableModels: z.array(z.string()).describe('The list of available models to choose from.'),
});
export type AutoModelSelectionInput = z.infer<typeof AutoModelSelectionInputSchema>;

const AutoModelSelectionOutputSchema = z.object({
  selectedModel: z.string().describe('The automatically selected model for the chat.'),
  reason: z.string().describe('The reason for selecting the specific model.')
});
export type AutoModelSelectionOutput = z.infer<typeof AutoModelSelectionOutputSchema>;

export async function autoModelSelection(input: AutoModelSelectionInput): Promise<AutoModelSelectionOutput> {
  return autoModelSelectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoModelSelectionPrompt',
  input: {
    schema: z.object({
      userInput: z.string().describe('The user input for the chat message.'),
      availableModels: z.array(z.string()).describe('The list of available models to choose from.'),
    }),
  },
  output: {
    schema: z.object({
      selectedModel: z.string().describe('The automatically selected model for the chat.'),
      reason: z.string().describe('The reason for selecting the specific model.')
    }),
  },
  prompt: `Given the user input: {{{userInput}}}, and the available models: {{{availableModels}}}, select the most appropriate model for the chat. Explain your reasoning.
`,
});

const autoModelSelectionFlow = ai.defineFlow<
  typeof AutoModelSelectionInputSchema,
  typeof AutoModelSelectionOutputSchema
>(
  {
    name: 'autoModelSelectionFlow',
    inputSchema: AutoModelSelectionInputSchema,
    outputSchema: AutoModelSelectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
