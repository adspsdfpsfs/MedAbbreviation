import { GoogleGenAI, Type } from "@google/genai";
import { AiResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const explainAbbreviation = async (abbr: string, contextHint?: string): Promise<AiResponse | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a medical expert assistant. The user is asking about the medical abbreviation "${abbr}".
      ${contextHint ? `\nCONTEXT PROVIDED BY USER: "${contextHint}". Please prioritize meanings related to this context.\n` : ''}
      
      Please provide:
      1. The most common Full English Name${contextHint ? ' (fitting the context if possible)' : ''}.
      2. The Chinese Meaning (translation).
      3. A professional description.
      4. A "Layman's Term" explanation (大白话解释) in Chinese.
      5. The most appropriate Category from this list: 'Diagnosis', 'Procedure', 'Anatomy', 'Medication', 'General', 'Management', 'Ortho'. If unsure, use 'General'.
      6. Optional context usage.

      Respond in valid JSON format only.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            abbr: { type: Type.STRING },
            full_name: { type: Type.STRING },
            chinese: { type: Type.STRING },
            description: { type: Type.STRING, description: "Professional medical description" },
            layman_term: { type: Type.STRING, description: "Simple Chinese explanation with English key terms in parentheses" },
            context_usage: { type: Type.STRING, description: "Optional notes on context" },
            category: { type: Type.STRING, enum: ['Diagnosis', 'Procedure', 'Anatomy', 'Medication', 'General', 'Management', 'Ortho'] }
          },
          required: ["abbr", "full_name", "chinese", "description", "layman_term", "category"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as AiResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};