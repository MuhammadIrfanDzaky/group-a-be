import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: {
    url:
      env('DATABASE_URL') ||
      'postgresql://postgres.tbzauabqbrztnhhhbavf:password@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true',
    directUrl:
      env('DIRECT_URL') ||
      'postgresql://postgres.tbzauabqbrztnhhhbavf:password@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres',
  },
});
