import IOpenAIClient from "./IOpenAIClient";
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

export default class OpenAIClient implements IOpenAIClient {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await this.client.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
      });
      return response.choices[0].text.trim();
    } catch (error) {
      console.error("Error communicating with OpenAI API:", error);
      throw error;
    }
  }

  async generateJsonResponse<T>(systemPrompt: string, userPrompt: string, schema: z.ZodType<T>): Promise<T> {
    try {
      const response = await this.client.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: zodResponseFormat(schema, "response"),
      });

      const message = response.choices[0]?.message;
      if (message?.parsed) {
        return message.parsed;
      } else {
        throw new Error("Failed to parse response.");
      }
    } catch (error) {
      console.error("Error communicating with OpenAI API:", error);
      throw error;
    }
  }
}
