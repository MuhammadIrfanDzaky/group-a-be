import 'dotenv/config';
import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://postgres.tbzauabqbrztnhhhbavf:password@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true',
  },
});
