import fp from "fastify-plugin"
import { fastifyMongodb, type FastifyMongodbOptions } from "@fastify/mongodb"
import { MongoClient } from "mongodb"

// const url: "mongodb://root:example@mongo:27017/", // in container
const url = "mongodb://root:example@localhost:27017/" // on localhost

export const client = new MongoClient(url)

export default fp<FastifyMongodbOptions>(async fastify => {
  await client.connect()

  // Confirm connection
  await client.db("admin").command({ ping: 1 })
  console.log("🔥 DB Conected")

  fastify.register(fastifyMongodb, {
    // force to close the mongodb connection when app stopped
    // the default value is false
    client,
    forceClose: true,
    database: "fastify" // FIXME: do it in the propper way
  })
})
