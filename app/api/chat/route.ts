// ./app/api/chat/route.js
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

const systemPrompt: string =
  'The following conversation is specific to MermaidJs. If the user ask for any kind of graphical representation, please reply with MermaidJs code.'

export async function POST(req: any) {
  const { messages } = await req.json()

  if (messages[0].role !== 'system') {
    messages.unshift({
      role: 'system',
      content: systemPrompt,
    })
  }

  // console.log(messages)

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
