'use server';
/**
 * @fileOverview A Genkit flow for generating personalized carbon footprint reduction recommendations.
 *
 * - personalizeCarbonFootprintRecommendations - A function that generates recommendations based on user assessment results.
 * - PersonalizedCarbonFootprintRecommendationsInput - The input type for the personalizeCarbonFootprintRecommendations function.
 * - PersonalizedCarbonFootprintRecommendationsOutput - The return type for the personalizeCarbonFootprintRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCarbonFootprintRecommendationsInputSchema = z.object({
  transportationScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A score (0-100) representing the user\'s carbon footprint in transportation. Lower is better.'
    ),
  energyScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A score (0-100) representing the user\'s carbon footprint in energy consumption. Lower is better.'
    ),
  waterScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A score (0-100) representing the user\'s carbon footprint in water usage. Lower is better.'
    ),
  wasteScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      'A score (0-100) representing the user\'s carbon footprint in waste generation. Lower is better.'
    ),
  currentEcoLevel: z
    .string()
    .describe(
      'The user\'s current eco-level (e.g., Eco Beginner, Green Champion).' Proxies the overall score.
    ),
});
export type PersonalizedCarbonFootprintRecommendationsInput = z.infer<
  typeof PersonalizedCarbonFootprintRecommendationsInputSchema
>;

const PersonalizedCarbonFootprintRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A detailed, personalized list of actionable recommendations to reduce the carbon footprint.'
    ),
});
export type PersonalizedCarbonFootprintRecommendationsOutput = z.infer<
  typeof PersonalizedCarbonFootprintRecommendationsOutputSchema
>;

export async function personalizeCarbonFootprintRecommendations(
  input: PersonalizedCarbonFootprintRecommendationsInput
): Promise<PersonalizedCarbonFootprintRecommendationsOutput> {
  return personalizedCarbonFootprintRecommendationsFlow(input);
}

const recommendationsPrompt = ai.definePrompt({
  name: 'personalizedCarbonFootprintRecommendationsPrompt',
  input: {schema: PersonalizedCarbonFootprintRecommendationsInputSchema},
  output: {schema: PersonalizedCarbonFootprintRecommendationsOutputSchema},
  prompt: `You are an AI assistant specializing in sustainability and carbon footprint reduction.
Your goal is to provide personalized, actionable recommendations to help users reduce their environmental impact.

Here are the user's current assessment results:
- Transportation Carbon Footprint Score (0-100, lower is better): {{{transportationScore}}}
- Energy Consumption Carbon Footprint Score (0-100, lower is better): {{{energyScore}}}
- Water Usage Carbon Footprint Score (0-100, lower is better): {{{waterScore}}}
- Waste Generation Carbon Footprint Score (0-100, lower is better): {{{wasteScore}}}
- Current Eco-Level: {{{currentEcoLevel}}}

Based on these scores, generate a comprehensive list of personalized recommendations. Focus on specific, easy-to-implement actions that the user can take in their daily life. Prioritize areas where the user's score is higher (indicating a larger footprint) and suggest improvements relevant to their current eco-level.

Recommendations should be:
1. Actionable and practical.
2. Categorized by impact area (e.g., Transportation, Home Energy, Water, Waste).
3. Encouraging and positive in tone.
4. Aim for about 5-7 distinct recommendations, each with a brief explanation.

Format the recommendations clearly, perhaps using bullet points or numbered lists within each category.
`,
});

const personalizedCarbonFootprintRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCarbonFootprintRecommendationsFlow',
    inputSchema: PersonalizedCarbonFootprintRecommendationsInputSchema,
    outputSchema: PersonalizedCarbonFootprintRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await recommendationsPrompt(input);
    return output!;
  }
);
