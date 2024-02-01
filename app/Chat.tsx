'use client'
import React from 'react'
import Mermaid from './components/Mermaid'
import Markdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useChat, Message } from 'ai/react'
import { useTheme } from 'next-themes'
import { useCode } from './CodeContext'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Role } from './lib/rolesvg'
import { preview, extract } from './lib/markdown'

async function helper(conversation: Message[], image: string): Promise<string> {
  if (conversation.length < 2)
    return 'Please start a new conversation to retrieve a recommendation prompt.'

  let body = ''
  const prependMes =
    'Given the following context, please validate the mermaidjs graph given by assistent and either confirm it or tell the assistent how to improve in first person.'
  body += prependMes + '['
  conversation.forEach((value) => {
    body += '{role:"' + value.role + '",content: "' + value.content + '"}'
  })
  body += ']'

  const res = await fetch('/api/recommend', {
    method: 'POST',
    body: JSON.stringify({ conversation: body, url: image }),
  })
  const { message } = await res.json()

  return message
}

export default function Chat({ className }: { className?: string }) {
  const [isFinished, setIsFinished] = React.useState(false)
  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat({
      onFinish: () => setIsFinished(true),
    })
  const [imageUrl, setImageUrl] = React.useState<string>('')
  const [recommendedPrompt, setRecommendedPrompt] = React.useState<string>('')
  const [recImageUrl, setRecImageUrl] = React.useState<string>('')
  const { theme } = useTheme()
  const { setCode } = useCode()

  React.useEffect(() => {
    setRecommendedPrompt('Generating ...')
    async function getPromptRecommend() {
      const recommended = await helper(messages, recImageUrl)
      setRecommendedPrompt(recommended)
    }
    getPromptRecommend()
    setIsFinished(false)
  }, [isFinished])

  function promptSubmit(e: React.FormEvent<HTMLFormElement>, url: string) {
    setRecImageUrl(url)
    setImageUrl('')
    if (url == '') return handleSubmit(e)
    // return handleSubmit(e)
    return handleSubmit(e, {
      data: { imageUrl: url },
    })
  }

  function detectSubmit(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key == 'Enter' && e.shiftKey == false && 'form' in e.target) {
      e.preventDefault()
      ;(e.target.form as HTMLFormElement).requestSubmit()
    }
  }

  return (
    <main className={className}>
      {messages.map((m) => (
        <div key={m.id}>
          <Role role={m.role} />
          <Markdown>{m.content}</Markdown>
          {m.role == 'assistant' && preview(m.content) != '' && (
            <div>
              <Mermaid
                text={extract(preview(m.content))}
                mermaidId={m.id}
                theme={theme ?? 'default'}
              />
              <Button onClick={() => setCode(extract(preview(m.content)))}>
                Edit
              </Button>
            </div>
          )}
        </div>
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Button>Open recommendation</Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[90vw] max-h-[50vh] bg-secondary overflow-scroll">
          <Markdown>{recommendedPrompt}</Markdown>
          <PopoverClose asChild>
            <Button onClick={() => setInput(recommendedPrompt)}>
              Use recommendation
            </Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>

      <div className="w-full bottom-0 sticky p-2">
        <Input
          className="w-full"
          value={imageUrl}
          placeholder="Image URL"
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <form onSubmit={(e) => promptSubmit(e, imageUrl)}>
          <Textarea
            className="w-full"
            value={input}
            placeholder="Please give me a graph illustrating ..."
            onChange={handleInputChange}
            onKeyDown={(e) => detectSubmit(e)}
          />
        </form>
      </div>
    </main>
  )
}
