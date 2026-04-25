import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

let chatHistory = [];

export async function askGemini(userInput) {
  const model = 'gemini-2.5-flash'; 

  chatHistory.push({
    role: 'user',
    parts: [{ text: userInput }]
  });

  try {
    const response = await ai.models.generateContent({
      model,
      contents: chatHistory, 
    });
    
    chatHistory.push({
      role: 'model',
      parts: [{ text: response.text }]
    });
    
    return response.text;
    
  } catch (error) {
    console.error(error);
    chatHistory.pop(); 
    return "Error: Could not fetch response.";
  }
}

export function clearChatHistory() {
  chatHistory = [];
}