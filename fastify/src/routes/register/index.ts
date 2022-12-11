import { FastifyPluginAsync } from "fastify"

const register: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    if (!this.mongo.db) {
      throw new Error("No db connection")
    }

    const users = this.mongo.db.collection("users")

    const res = await users.insertOne({
      email: {
        address: "email@asdfasdf.com",
        verified: false
      },
      hashedPassword: "hashedPassword"
    })

    request.log.info({
      res
    })

    return res ? "success" : "failure"
  })
}

export default register
