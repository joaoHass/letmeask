import { ReactNode } from "react"

import "./styles.scss"

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
}

// desestrutruração do QuestionProps
export function Question({ author, content, children }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="likes-info">{children}</div>
      </footer>
    </div>
  )
}
