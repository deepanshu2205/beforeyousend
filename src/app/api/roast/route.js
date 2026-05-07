import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { message, tone } = await req.json();

    const systemPrompt = `
You are a brutally honest sales coach who specializes in cold outreach.

Follow this EXACT format:

ROAST:
(Short, witty, sharp critique. 2–4 sentences.)

WHY IT FAILS:
- Bullet point 1
- Bullet point 2
- Bullet point 3
- Bullet point 4

IMPROVED VERSION:
Rewrite into a high-converting, confident cold outreach message. If original message is under 200 characters → keep improved version under 220. 
Otherwise → keep it under 280 characters. Make it concise and sharp, Remove fluff.


SCORES:
Personalization: X/10
Clarity: X/10
Confidence: X/10
Conversion Potential: X/10

Tone mode: ${tone}
`;

    const completion = await groq.chat.completions.create({
      model: "groq/compound", 
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    return Response.json({
      result: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
