import OpenAIClient from "../../common/clients/OpenAIClient";
import CommandGenerator from "./CommandGenerator";
import CommandExecutor from "../../common/services/commander/CommandExecutor";
import Commander from "../../common/services/commander/Commander";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || "";

const openAIClient = new OpenAIClient(apiKey);

const commandGenerator = new CommandGenerator(openAIClient);
const commandExecutor = new CommandExecutor();
const commander = new Commander(commandExecutor);

const promptUser = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

(async () => {
  try {
    const goal = "A command that prints the current working directory to the console";

    const command = await commandGenerator.generateCommand({ goal });

    console.log("Proposed Command:");
    console.log(`Command: ${command.command}`);
    console.log(`Arguments: ${command.args.join(" ")}`);

    const userApproval = await promptUser("Do you approve this command? (y/N): ");

    if (userApproval.toLowerCase() === "y") {
      console.log("Executing the command...");
      command.approved = true;
      const result = await commander.runCommand(command);
      debugger;
      console.log("Command executed successfully.");
      console.log(`Standard out: ${result.stdOut}`);
    } else {
      console.log("Command execution cancelled.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
