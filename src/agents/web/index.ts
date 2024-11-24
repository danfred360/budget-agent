import Web from "./Web";
import Logger from "../../common/services/Logger";
import OpenAIClient from "../../common/clients/OpenAIClient";
import CommandGenerator from "../../common/services/commander/CommandGenerator";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || "";
const openAIClient = new OpenAIClient(apiKey);
const commandGenerator = new CommandGenerator(openAIClient);
const logger = new Logger();

const web = new Web(commandGenerator, logger);

web.start();
