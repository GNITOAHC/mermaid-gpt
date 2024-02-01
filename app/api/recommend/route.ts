import OpenAI from 'openai'

export const runtime = 'edge'

import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  const { conversation, url } = await req.json()

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  let content: any
  if (url == '') content = conversation
  else {
    content = [
      { type: 'text', text: conversation },
      { type: 'image_url', image_url: { url: url } },
    ]
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4-vision-preview',
    stream: false,
    max_tokens: 500,
    messages: [
      {
        content: content,
        role: 'user',
      },
    ],
  })

  return NextResponse.json({
    message: response.choices[0].message.content ?? 'No recommendation',
  })
}
