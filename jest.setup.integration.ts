import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados de teste:', error);
  }
});

beforeEach(async () => {
  try {
    await prisma.$executeRawUnsafe(`
        DO $$ DECLARE
        truncate_query TEXT := '';
        BEGIN
            SELECT 'TRUNCATE TABLE ' || string_agg(quote_ident(tablename), ', ') || ' CASCADE;'
            INTO truncate_query
            FROM pg_tables
            WHERE schemaname = 'public' AND tablename != '_prisma_migrations';
  
            EXECUTE truncate_query;
        END $$;
      `);
  } catch (error) {
    console.error('Erro ao truncar tabelas:', error);
  }
});
afterAll(async () => {
  await prisma.$disconnect();
});
