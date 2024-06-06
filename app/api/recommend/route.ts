import { NextResponse } from 'next/server'
import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { conversation, url } = await req.json()

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  let content: any
  if (url == '') content = conversation
  else {
    content = [
      { type: 'text', text: conversation },
      { type: 'image', image: new URL(url) },
    ]
  }

  const result = await generateText({
    model: openai.chat('gpt-4-vision-preview'),
    messages: [
      {
        role: 'user',
        content: content,
      },
    ],
  })

  return NextResponse.json({
    message: result.text ?? 'No recommendation',
  })
}
