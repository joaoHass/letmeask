import { useHistory } from "react-router-dom"
import { useState, FormEvent } from "react"
import { database } from "../services/firebase"

import { useAuth } from "../hooks/useAuth"

import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import { Button } from "../components/Button"

import "../styles/auth.scss"

export function Home() {
  // a const history é um HOOK do REACT e precisa ficar dentro do componente
  // já que ela utiliza do contexto do mesmo, fora não funciona!
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState("")

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }
    history.push("/rooms/new")
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === "") {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert("Room does not exist!")
      return
    }

    if (roomRef.val().closedAt) {
      alert("Room is already closed!")
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <Button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </Button>
          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              onChange={(event) => setRoomCode(event.target.value)}
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
