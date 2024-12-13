import ExecutionNode, { ExecuteAgentSettings } from "./ExecutionNode";
import Commander from "../../common/services/commander/Commander";
import CommandExecutor from "../../common/services/commander/CommandExecutor";
import Logger from "../../common/services/Logger";

const logger = new Logger();
const commandExecutor = new CommandExecutor();
const commander = new Commander(commandExecutor);

console.log("foo bar");
const args = process.argv.slice(2);
let port = parseInt(process.env.PORT || "4000");

args.forEach((arg, index) => {
  if (arg === "--port" && args[index + 1]) {
    port = parseInt(args[index + 1]);
  }
});

const settings: ExecuteAgentSettings = {
  port,
};

const executeAgent = new ExecutionNode(commander, logger, settings);
executeAgent.start();
