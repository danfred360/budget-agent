import axios from "axios";

export default class OpenAIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "gpt-3.5-turbo-instruct", // Or any other model you prefer
          prompt: prompt,
          max_tokens: 150, // Adjust based on desired response length
          temperature: 0.7, // Controls response creativity
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error("Error communicating with OpenAI API:", error);
      throw error;
    }
  }
}
