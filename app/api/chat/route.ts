// ./app/api/chat/route.js
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

const systemPrompt: string =
  'The following conversation is specific to MermaidJs. If the user ask for any kind of graphical representation, please reply with MermaidJs code. Note that the code should start with three backtick followed by keyword "mermiad" and end with three backtick, and do not use nested brackets in the code.'

export async function POST(req: Request) {
  const { messages, data } = await req.json()

  if (messages[0].role !== 'system') {
    messages.unshift({
      role: 'system',
      content: systemPrompt,
    })
  }

  const initialMessages = messages.slice(0, -1)
  const currentMessage = messages[messages.length - 1]

  // console.log(messages)

  console.log(data)
  if (!data || !data.imageUrl) {
    console.log('No image')
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      stream: true,
      max_tokens: 500,
      messages,
    })
    return new StreamingTextResponse(OpenAIStream(response))
  }

  console.log('Yes imageUrl')

  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    stream: true,
    max_tokens: 500,
    messages: [
      ...initialMessages,
      {
        ...currentMessage,
        content: [
          { type: 'text', text: currentMessage.content },

          // forward the image information to OpenAI:
          {
            type: 'image_url',
            image_url: data.imageUrl,
          },
        ],
      },
    ],
  })
  const stream = OpenAIStream(response) // Convert the response into a friendly text-stream
  return new StreamingTextResponse(stream) // Respond with the stream
}
