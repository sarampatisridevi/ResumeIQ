
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: process.env.AI_BASE_URL,
  apiKey: process.env.AI_API_KEY,
});

export async function analyzeResume(resumeText, jobDescription) {
  const prompt = `You are an expert ATS and recruiter.
Compare the RESUME with the JOB DESCRIPTION.
Return ONLY valid JSON in this exact format:
{"score": number 0-100, "strengths": [string], "missingSkills": [string], "suggestions": [string]}

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}`;

  const response = await client.chat.completions.create({
    model: process.env.AI_MODEL,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  let text = response.choices[0].message.content;
  // remove ```json fences if the model adds them
  text = text.replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}