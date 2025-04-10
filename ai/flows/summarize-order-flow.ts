'use server';
/**
 * @fileOverview Order summarization agent.
 *
 * - summarizeOrder - A function that handles the order summarization process.
 * - SummarizeOrderInput - The input type for the summarizeOrder function.
 * - SummarizeOrderOutput - The return type for the summarizeOrder function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeOrderInputSchema = z.object({
  orderDetails: z.string().describe('The order details to summarize.'),
});
export type SummarizeOrderInput = z.infer<typeof SummarizeOrderInputSchema>;

const SummarizeOrderOutputSchema = z.object({
  summary: z.string().describe('The summary of the order.'),
});
export type SummarizeOrderOutput = z.infer<typeof SummarizeOrderOutputSchema>;

export async function summarizeOrder(input: SummarizeOrderInput): Promise<SummarizeOrderOutput> {
  return summarizeOrderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeOrderPrompt',
  input: {
    schema: z.object({
      orderDetails: z.string().describe('The order details to summarize.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('The summary of the order.'),
    }),
  },
  prompt: `You are an expert order summarizer.

You will use the order details provided to create a concise summary of the order.

Order Details: {{{orderDetails}}}`,
});

const summarizeOrderFlow = ai.defineFlow<
  typeof SummarizeOrderInputSchema,
  typeof SummarizeOrderOutputSchema
>(
  {
    name: 'summarizeOrderFlow',
    inputSchema: SummarizeOrderInputSchema,
    outputSchema: SummarizeOrderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

    