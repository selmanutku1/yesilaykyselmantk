require('dotenv').config();
const { GoogleGenAI, Type } = require('@google/genai');

async function run() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Merhaba',
      config: {
        systemInstruction: 'Test',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING }
          },
          required: ["text"]
        }
      }
    });

    console.log(response.text);
  } catch (err) {
    console.error("ERROR", err);
  }
}
run();
