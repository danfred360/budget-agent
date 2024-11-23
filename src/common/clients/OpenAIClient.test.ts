import OpenAIClient from "./OpenAIClient";
import dotenv from "dotenv";
import { z } from "zod";

xit("works", async () => {
  dotenv.config();
  const apiKey = process.env.OPENAI_API_KEY || "";

  const client = new OpenAIClient(apiKey);

  const schema = z.object({
    command: z.string(),
    args: z.array(z.string()),
  });

  const systemPrompt = "You are a command generator that generates a command based on a goal.";
  const userPrompt = "A command that prints 'Hello, World!' to the console.";

  await client.generateJsonResponse(systemPrompt, userPrompt, schema);
});
