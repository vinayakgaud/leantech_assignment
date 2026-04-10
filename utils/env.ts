import "dotenv/config"

type Env = {
  userPassword: string
  baseURL: string
  standardUser : string
}

export const env: Env = {
  userPassword: process.env.USER_PASSWORD || "user_password",
  baseURL: process.env.BASE_URL || "http://localhost:3000",
  standardUser: process.env.STANDARD_USER || "user_id_for_standard_user",
}
