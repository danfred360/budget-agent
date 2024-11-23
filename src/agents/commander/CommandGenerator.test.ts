import CommandGenerator from "./CommandGenerator";
import OpenAIClient from "../../common/clients/OpenAIClient";
import dotenv from "dotenv";

xit("generates a command", async () => {
  dotenv.config();
  const apiKey = process.env.OPENAI_API_KEY || "";

  const openAIClient = new OpenAIClient(apiKey);

  const commandGenerator = new CommandGenerator(openAIClient);

  const goal = "A command that prints 'Hello, World!' to the console";

  const command = await commandGenerator.generateCommand({ goal });

  expect(command.command).toBe("echo");
  expect(command.args).toEqual(["Hello", "World!"]);
});
