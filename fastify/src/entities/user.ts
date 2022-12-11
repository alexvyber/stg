import { Static, Type } from "@sinclair/typebox"

export const User = Type.Object({
  email: Type.String(),
  password: Type.String()
})

export type UserData = Static<typeof User>
