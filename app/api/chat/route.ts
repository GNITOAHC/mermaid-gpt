// ./app/api/chat/route.js
import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
const model = openai.chat('gpt-4-vision-preview')

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

  if (!data || !data.imageUrl) {
    const result = await streamText({
      model: model,
      messages,
    })
    return result.toAIStreamResponse()
  }

  const initialMessages = messages.slice(0, -1)
  const currentMessage = messages[messages.length - 1]
  const result = await streamText({
    model: model,
    messages: [
      ...initialMessages,
      {
        ...currentMessage,
        content: [
          { type: 'text', text: currentMessage.content },

          // forward the image information to OpenAI:
          {
            type: 'image',
            image: new URL(data.imageUrl),
          },
        ],
      },
    ],
  })
  return result.toAIStreamResponse()
}
