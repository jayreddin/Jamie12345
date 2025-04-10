// 'use server';
/**
 * @fileOverview Summarizes the current chat conversation.
 *
 * - summarizeChat - A function that summarizes the chat conversation.
 * - SummarizeChatInput - The input type for the summarizeChat function.
 * - SummarizeChatOutput - The return type for the summarizeChat function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeChatInputSchema = z.object({
  chatHistory: z.string().describe('The complete chat history to summarize.'),
});
export type SummarizeChatInput = z.infer<typeof SummarizeChatInputSchema>;

const SummarizeChatOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the chat history.'),
});
export type SummarizeChatOutput = z.infer<typeof SummarizeChatOutputSchema>;

export async function summarizeChat(input: SummarizeChatInput): Promise<SummarizeChatOutput> {
  return summarizeChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeChatPrompt',
  input: {
    schema: z.object({
      chatHistory: z.string().describe('The complete chat history to summarize.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise summary of the chat history.'),
    }),
  },
  prompt: `You are an AI assistant tasked with summarizing chat conversations.

  Please provide a concise and informative summary of the following chat history:

  Chat History:
  {{chatHistory}}

  Summary: `,
});

const summarizeChatFlow = ai.defineFlow<
  typeof SummarizeChatInputSchema,
  typeof SummarizeChatOutputSchema
>({
  name: 'summarizeChatFlow',
  inputSchema: SummarizeChatInputSchema,
  outputSchema: SummarizeChatOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
