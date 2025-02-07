import {sqlServerClient} from '@prisma/db';

export async function GET() {
  try {
    const result = await sqlServerClient.$queryRaw`SELECT 1 as test`;
    return Response.json({
      success: true,
      message: 'SQL Server Connected',
      result,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: 'SQL Server Connection Failed',
      error,
    });
  }
}
