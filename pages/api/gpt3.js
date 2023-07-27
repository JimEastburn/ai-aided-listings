import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {

  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  //const searchSentence = "Im looking for a 2019 Camry in New Jersey";
  const searchSentence = req.query.searchSentence;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: 'user',
        content: 'Output only JSON - parse this response in format `year: `,`make: `, `model: `, `trim: `, `body_style: suv, sedan, or truck`, `location: city,  ST` as a json: '+searchSentence
      }
    ],
    temperature: 0,
    max_tokens: 500,
  });

  res.status(200).json({ answer: JSON.parse(response.data.choices[0].message.content) });

}
