import { ButtonHTMLAttributes } from "react"

import "../styles/button.scss"

// <HTMLButtonElement> passa o elemento do botão
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

export function Button({ isOutlined, ...props }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...props} />
  )
}
