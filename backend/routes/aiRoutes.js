import express from "express";
import protect from "../middleware/auth.js";
import { businessFunctions, toolDefinitions } from "../utils/businessFunctions.js";

const router = express.Router();

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// @route  POST /api/ai/ask
// @desc   Business owner AI se natural language mein sawaal poochega.
//
// STEP-BY-STEP FLOW (document ke section 17 wala "Tool Calling" idea):
//   1. User ka message Groq ko bhejo, saath mein "tools" (available functions) ki list
//   2. Groq decide karega ki kaunsa function chahiye (ya seedha reply de dega)
//   3. Agar function chahiye -> hum wo function chalate hain -> MongoDB se real data aata hai
//   4. Wo data wapas Groq ko dete hain -> Groq usse insaani Hindi/English mein samjhata hai
router.post("/ask", protect, async (req, res) => {
  try {
    const { message } = req.body;

    const systemPrompt = `You are a helpful business assistant for a small shop owner in India.
Answer in simple, friendly Hinglish/English mix when useful. Use the provided tools to fetch
real data before answering questions about sales, stock, or customers. Never make up numbers.`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ];

    // STEP 1 & 2: Groq ko message + tools bhejo
    let response = await callGroq(messages, toolDefinitions);
    let choice = response.choices[0].message;

    // STEP 3: Agar AI ne function call maanga hai
    if (choice.tool_calls && choice.tool_calls.length > 0) {
      messages.push(choice); // assistant ka "main function call karna chahta hoon" wala message

      for (const toolCall of choice.tool_calls) {
        const fnName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments || "{}");

        const fn = businessFunctions[fnName];
        let result = { error: "Function not found" };

        if (fn) {
          // req.userId isliye pass karte hain taaki AI sirf isi
          // owner ka data dekhe, kisi aur business ka nahi
          result = await fn(req.userId, args.customerName);
        }

        // Function ka result AI ko wapas bhejna hai
        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      }

      // STEP 4: Final natural-language answer lo
      response = await callGroq(messages, toolDefinitions);
      choice = response.choices[0].message;
    }

    res.json({ reply: choice.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI request failed", error: error.message });
  }
});

// Helper function - Groq API ko call karta hai
async function callGroq(messages, tools) {
  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b", // Groq ka fast free model
      messages,
      tools,
      tool_choice: "auto",
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API error: ${errText}`);
  }

  return response.json();
}

export default router;
