'use server';
/**
 * @fileOverview An AI agent that summarizes uploaded text into a concise podcast script.
 *
 * - summarizeUploadedText - A function that handles the summarization process.
 * - SummarizeUploadedTextInput - The input type for the summarizeUploadedText function.
 * - SummarizeUploadedTextOutput - The return type for the summarizeUploadedText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUploadedTextInputSchema = z.object({
  text: z
    .string()
    .describe('The text content extracted from the uploaded file.'),
  summaryLength: z.enum(['short', 'medium', 'detailed']).default('medium').describe('The desired length of the summary.'),
  tone: z.enum(['neutral', 'academic', 'friendly']).default('neutral').describe('The desired tone of the summary.'),
});
export type SummarizeUploadedTextInput = z.infer<typeof SummarizeUploadedTextInputSchema>;

const SummarizeUploadedTextOutputSchema = z.object({
  podcastScript: z.string().describe('The summarized text content formatted as a podcast script.'),
});
export type SummarizeUploadedTextOutput = z.infer<typeof SummarizeUploadedTextOutputSchema>;

export async function summarizeUploadedText(input: SummarizeUploadedTextInput): Promise<SummarizeUploadedTextOutput> {
  return summarizeUploadedTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUploadedTextPrompt',
  input: {schema: SummarizeUploadedTextInputSchema},
  output: {schema: SummarizeUploadedTextOutputSchema},
  prompt: `You are an AI expert in creating podcast scripts from uploaded text content.

You will summarize the provided text content into a concise podcast script, considering the desired summary length and tone.

Text Content: {{{text}}}
Summary Length: {{{summaryLength}}}
Tone: {{{tone}}}

Create a podcast script that is appropriate for the specified text, summary length, and tone.
`,
});

const summarizeUploadedTextFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedTextFlow',
    inputSchema: SummarizeUploadedTextInputSchema,
    outputSchema: SummarizeUploadedTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
