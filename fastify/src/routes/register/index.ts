import { FastifyPluginAsync } from "fastify"
import { UserData } from "../../entities/user"
import { registerUser } from "../../utils/register"

const register: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post<{ Body: UserData; Reply: any }>("/", async function (request, reply) {
    // reply with 400 if user already logen in
    if (request.cookies.accessToken || request.cookies.refreshToken) {
      reply.code(400).send({
        data: {
          status: "FAILED",
          message: "Already loged in"
        }
      })
    }

    const { email, password } = request.body

    // reply with 400 if no password or email provided
    if (!email || !password) {
      reply.code(400).send({
        data: {
          status: "FAILED"
        }
      })
    }

    const userId = await registerUser(fastify, { email, password })

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
  })
}

export default register
