export const preview = (content: string) => {
  const pattern = /```mermaid([\s\S]*?)```/
  let regex = new RegExp(pattern)
  let match = regex.exec(content)
  // if (match) console.log(match[0])
  if (match) return match[0]
  return ''
}

export const extract = (content: string) => {
  return content.replace('```mermaid', '').replace('```', '')
}
