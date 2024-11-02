import cron from 'node-cron';
import BudgetAgent from './BudgetAgent.js';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || '';
const budgetAgent = new BudgetAgent(apiKey);

budgetAgent.analyzeAndSuggest();

// // Run every day at 9:00 AM
// cron.schedule('0 9 * * *', () => {
//   budgetAgent.analyzeAndSuggest();
// });
