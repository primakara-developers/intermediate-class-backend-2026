import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'
import logger from './logger.config.js'

const connectionString = process.env.DATABASE_URL

logger.debug(
  { dbUrl: connectionString?.substring(0, 30) + '...' },
  'Initializing Prisma Client',
)

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

logger.info('Database connection initialized successfully')

export default prisma
