// TODO: figure out propper way to place this code

import { FastifyRequest } from "fastify"
import { ObjectId } from "mongodb"
import type { RecordData } from "../entities/record"
import type { Fastify } from "../types"

import { verify } from "jsonwebtoken"
import { getSession } from "./sessions"
const jwtSecret = process.env.FASTIFY_JWT_SECRET || "super-secret"

// HACK: hacky way to pass mongo with entire fastify object
// ???: Is ii right?
export const createRecord = async (
  fastify: Fastify,
  request: FastifyRequest,
  recordData: RecordData
): Promise<any> /* Promise<ObjectId> */ => {
  // Error in no db availible
  if (!fastify.mongo.db) {
    throw new Error("No db connection")
  }

  // get refresh token
  const { refreshToken } = request.cookies
  if (!refreshToken) {
    throw new Error("No refresh token provided")
  }

  const { sessionToken } = verify(refreshToken, jwtSecret) as {
    sessionToken: string
  } // FIXME: fix typings}

  // get session
  const session = await getSession(fastify, sessionToken)
  if (!session) {
    throw new Error("No session found")
  }

  // insert record
  const records = fastify.mongo.db.collection("records")
  const res = await records.insertOne({
    text: recordData.text,
    sessionId: session._id
  })

  return res.insertedId
}

export const getRecord = async (fastify: Fastify, recordId: ObjectId) => {
  // Error in no db availible
  if (!fastify.mongo.db) {
    throw new Error("No db connection")
  }

  const records = fastify.mongo.db.collection("records")

  const res = await records.findOne({
    _id: new ObjectId(recordId)
  })

  return res
}
