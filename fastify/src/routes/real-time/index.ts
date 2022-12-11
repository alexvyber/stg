import { SocketStream } from "@fastify/websocket"
import { FastifyPluginAsync, FastifyRequest } from "fastify"

const realTime: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.register(async fastify => {
    fastify.get(
      "/",
      { websocket: true },
      (connection: SocketStream, _request: FastifyRequest) => {
        connection.socket.on("message", async message => {
          fastify.websocketServer.clients.forEach(client => {
            try {
              if (client.readyState === 1) {
                client.send(message.toString())
              }
            } catch (error) {
              fastify.log.error({
                error
              })
            }
          })
        })
      }
    )
  })
}

export default realTime
