import WebAgent from "../../common/infra/WebAgent";
import { Request, Response } from "express";
import ICommandGenerator from "../../common/services/commander/ICommandGenerator";
import ILogger from "../../common/services/Logger";

export default class Web extends WebAgent {
  private commandGenerator: ICommandGenerator;

  constructor(commandGenerator: ICommandGenerator, logger: ILogger) {
    super(logger);
    this.commandGenerator = commandGenerator;
  }

  protected registerRoutes(): void {
    this.registerFunction("/generate-command", this.generateCommandHandler.bind(this));
    this.registerFunction("/hello", this.helloHandler);
  }

  private helloHandler(req: Request, res: Response): void {
    res.send("Hello, world!");
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
}
