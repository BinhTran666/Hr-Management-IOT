import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));

