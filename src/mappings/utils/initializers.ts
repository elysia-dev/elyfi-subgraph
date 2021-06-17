import { User } from "../../../generated/schema"

export function findOrCreateUser(id: string): User {
  return (User.load(id) || new User(id)) as User
}
