import CentralController, { CentralControllerSettings } from "./CentralController";
import Logger from "../../common/services/Logger";
import OpenAIClient from "../../common/clients/OpenAIClient";
import CommandGenerator from "../../common/services/commander/CommandGenerator";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || "";
const openAIClient = new OpenAIClient(apiKey);
const commandGenerator = new CommandGenerator(openAIClient);
const logger = new Logger();

const settings: CentralControllerSettings = {
  port: parseInt(process.env.PORT || "3000"),
  executeAgentUrl: process.env.EXECUTE_AGENT_URL || `http://localhost:4000`,
};

const agent = new CentralController(commandGenerator, logger, settings);

agent.start();

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Stopping the agent...");
  await agent.stop();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Stopping the agent...");
  await agent.stop();
  process.exit(0);
});
