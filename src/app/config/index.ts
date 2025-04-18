import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  JWT_SECRET: process.env.JWT_SECRET,
  STORE_ID: process.env.SSLCOMMERZ_STORE_ID,
  STORE_PASS: process.env.SSLCOMMERZ_STORE_PASS,
  BASE_URL: process.env.BASE_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
}
