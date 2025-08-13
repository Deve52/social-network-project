import { GoogleGenAI } from "@google/genai";
import { config } from "../dotenv/config.js";

const ai = new GoogleGenAI({
  apiKey: config.GOOGLE_GEMINI_API_KEY
});

export const generateCaption = async (file) => {

  let base64Image = new Buffer.from(file.buffer).toString('base64') //converts the image to string of base64 type

  let content = [
    {
      inlineData: {
        mimeType: file.mimetype,// kis format ke image ha jpeg, jpg// mimetype is file property , mimeType is ai property
        data: base64Image
      },


    },
    {
      text: "Caption this image",
    }
  ]




  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content,
    config: {
      systemInstruction:  // it tells how the model should behave, we can shape a model with systemInstruction.// alag se folder banta ha boohut imortant ha ye (rail guarding ma help hote ha mtlb ai ko batana ke kya nahi krna ha!)
        `
      give one output which should be long more than 20 words.
      use can use many hashtags and emojies.
      it is caption of instagram post.
      `

    }
  });
  return response.text;
}

