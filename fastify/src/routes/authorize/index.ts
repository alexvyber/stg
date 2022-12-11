import { FastifyPluginAsync } from "fastify"
import { UserData } from "../../entities/user"
import { authorizeUser } from "../../utils/authorize"

const register: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: UserData; Reply: any }>(
    "/",
    async function (request, reply) {
      const { email, password } = request.body

      // reply with 400 if no password or email provided
      if (!email || !password) {
        reply.code(400).send({
          data: {
            status: "FAILED"
          }
        })
      }

      // const userId = await registerUser(fastify, { email, password })
      const { isAuthorized, userId } = await authorizeUser(fastify, {
        email,
        password
      })

      if (!isAuthorized) {
        throw new Error("User isn't autrized!") // TODO: handle later
      }

      if (!userId) {
        reply.code(400).send({
          data: {
            status: "FAILED",
            message: "Failed to register"
          }
        })
      }

      reply.send({
        data: {
          status: "SUCCESS",
          user: {
            _id: userId
          }
        }
      })
    }
  )
}

export default register
