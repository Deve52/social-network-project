import { GoogleGenAI } from "@google/genai";
import { config } from "../dotenv/config.js";

const ai = new GoogleGenAI({
   apiKey: config.GOOGLE_GEMINI_API_KEY
});

export const generateCaption = async (file)=> {

  let base64Image = new Buffer.from(file.buffer).toString('base64') //converts the image to string of base64 type

  let content =[
    {
        inlineData:{
            mimeType: file.mimetype,// kis format ke image ha jpeg, jpg// mimetype is file property , mimeType is ai property
            data: base64Image
        },

        
    },
    {
        text: "Caption this image, without any filler words! just give me the caption only with less than 6 to 7 words. Make it quite deep meaning of the image without giving the spoiler",
    }
  ]




  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content,
  });
  return response.text;
}

