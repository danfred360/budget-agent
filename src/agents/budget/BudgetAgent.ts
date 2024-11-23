import BudgetMonitor from "./BudgetMonitor";
import PromptBuilder from "../../common/services/PromptBuilder";
import OpenAIClient from "../../common/clients/OpenAIClient";
import fs from "fs";

export default class BudgetAgent {
  private monitor: BudgetMonitor;
  private openaiClient: OpenAIClient;

  constructor(apiKey: string) {
    const sheetId = process.env.GOOGLE_SHEET_ID || "";
    if (!sheetId) {
      throw new Error("Google Sheet ID is not set in environment variables");
    }
    this.monitor = new BudgetMonitor(sheetId);
    this.openaiClient = new OpenAIClient(apiKey);
  }

  async analyzeAndSuggest() {
    const transactions = await this.monitor.getTransactions();

    // Build and send the prompt to OpenAI for report generation
    const reportPrompt = PromptBuilder.generateReportPrompt(transactions);
    const report = await this.openaiClient.generateResponse(reportPrompt);
    console.log("Report:", report);

    // Generate suggestions based on the report
    const suggestionPrompt = PromptBuilder.generateSuggestionPrompt(report);
    const suggestions = await this.openaiClient.generateResponse(suggestionPrompt);
    console.log("Suggestions:", suggestions);

    // Save results if needed
    fs.writeFileSync("report.txt", report);
    fs.writeFileSync("suggestions.txt", suggestions);
  }
}
