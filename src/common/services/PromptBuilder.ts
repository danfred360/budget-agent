export default class PromptBuilder {
  static generateReportPrompt(transactions: Array<{ date: string; description: string; amount: number }>): string {
    const transactionText = transactions.map((t) => `Date: ${t.date}, Description: ${t.description}, Amount: ${t.amount}`).join("\n");

    return `
        Analyze the following transactions, and generate a categorized spending report.
        Transactions:
        ${transactionText}
  
        Please provide a summary of spending by category, and note any unusual spending patterns.
      `;
  }

  static generateSuggestionPrompt(report: string): string {
    return `
          Based on this spending report:
          ${report}
    
          Please generate suggestions for improving the user's budget. Consider ways to reduce spending or optimize categories.
        `;
  }
}
