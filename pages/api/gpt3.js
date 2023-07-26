import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: "",
  });

  const openai = new OpenAIApi(configuration);

  const search = "looking for a 2019 camry in New Jersey";

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: 'user',
        content: 'Output only JSON - parse this response in format `year: `,`make: `, `model: `, `trim: `, `body_style: suv, sedan, or truck`, `location: city,  ST` as a json: ${search}'
      }
    ],
    temperature: 0,
    max_tokens: 500,
  });

  res.status(200).json({ answer: JSON.parse(response.data.choices[0].message.content) });

}
