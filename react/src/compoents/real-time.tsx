import { useSocket } from "../hooks/use-socket"

const url = "ws://localhost/api/real-time"

export const RealTimeField = () => {
  const [socket, text, sendMessage] = useSocket(url)

  console.log(socket)

  return (
    <div>
      <h3>Real time field: {text}</h3>
      <input
        type="text"
        value={text}
        onChange={({ target }) => sendMessage(target.value)}
      />

      <h2>{socket ? "Connected" : "Not Connected"}</h2>
    </div>
  )
}
