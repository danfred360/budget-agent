import { z } from "zod";

export default interface OpenAIClient {
  generateResponse(prompt: string): Promise<string>;
  generateJsonResponse<T>(systemPrompt: string, userPrompt: string, schema: z.ZodType<T>): Promise<T>;
}
