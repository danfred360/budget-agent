import WebAgent from "../../common/infra/WebAgent";
import { Request, Response } from "express";
import ICommandGenerator from "../../common/services/commander/ICommandGenerator";
import ILogger from "../../common/services/Logger";

export default class Web extends WebAgent {
  private commandGenerator: ICommandGenerator;

  constructor(commandGenerator: ICommandGenerator, logger: ILogger) {
    super(logger);
    this.commandGenerator = commandGenerator;

    this.registerRemoteAgent("ExecuteAgent", "http://localhost:4000");
  }

  protected registerRoutes(): void {
    this.registerFunction("/generate-command", this.generateCommandHandler.bind(this));
    this.registerFunction("/execute-command", this.executeCommandHandler.bind(this));
  }

  private async generateCommandHandler(req: Request, res: Response): Promise<void> {
    try {
      const { goal } = req.body;

      if (!goal) {
        res.status(400).send({ error: "Goal is required." });
        return;
      }

      const command = await this.commandGenerator.generateCommand({ goal });
      res.status(200).send(command);
    } catch (error) {
      this.log(`Error generating command: ${error}`);
      res.status(500).send({ error: "Failed to generate command." });
    }
  }

  private async executeCommandHandler(req: Request, res: Response): Promise<void> {
    try {
      const { command, args, approved } = req.body;

      const result = await this.callRemoteAgent("ExecuteAgent", "/execute", {
        command,
        args,
        approved,
      });

      res.status(200).send(result);
    } catch (error) {
      this.log(`Error calling ExecuteAgent: ${error}`);
      res.status(500).send({ error: "Failed to execute command via remote agent." });
    }
  }
}
