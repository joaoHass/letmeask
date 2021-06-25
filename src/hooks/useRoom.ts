import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isAnswered: boolean
    isHighlighted: boolean
    likes: Record<
      string,
      {
        authorId: string
      }
    >
  }
>

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  likeId: string | undefined
}

export function useRoom(roomId: string) {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState("")

  // busca uma vez ao componente ser criado os dados sobre as perguntas
  useEffect(() => {
    const roomRef = database.ref(`/rooms/${roomId}`)

    roomRef.on("value", (room) => {
      // retorna os valores da room
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      // transforma de object para array
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          }
        }
      )

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    // remove os listeners
    return () => {
      roomRef.off("value")
    }
  }, [roomId, user?.id]) // se houver alteração no roomId ou no user?.id, o useEffect executa denovo

  return { questions, title }
}
