import MarkdownIt from 'markdown-it'

export const useMarkdown = () => {
  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })

  const parse = (markdown: string): string => {
    return md.render(markdown)
  }

  return {
    parse,
  }
}
