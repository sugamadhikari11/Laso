import express from 'express';
import { GoogleGenAI, Modality } from '@google/genai';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-preview-image-generation',
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    let imageBase64 = null;

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        imageBase64 = part.inlineData.data; // base64 string
        break;
      }
    }

    if (!imageBase64) {
      return res.status(500).json({ error: 'No image returned' });
    }

    res.status(200).json({ photo: imageBase64 });
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    res.status(500).json({ error: 'Image generation failed' });
  }
});

export default router;
