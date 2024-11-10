import dotenv from "dotenv";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

dotenv.config();

router.get("/:foodname", async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const foodName = req.params.foodname;

    // Construct the prompt with the specific food name
    const prompt = `Tell me the nutritional value of ${foodName} for a 1 serving in 50 words.`;
    const result = await model.generateContent(prompt);
    res.status(200).send(result.response.text());
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

export default router;
