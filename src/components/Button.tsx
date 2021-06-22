import { ButtonHTMLAttributes } from "react"

import "../styles/button.scss"

// <HTMLButtonElement> passa o elemento do botão
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
  return <button className="button" {...props} />
}
