import {NextResponse} from 'next/server';
import {sqlServerClient} from '@prisma/db';

export async function GET(req: Request) {
  try {
    const networks = await sqlServerClient.network.findMany({
      select: {
        IdNet: true,
        Network: true,
      },
    });

    return NextResponse.json({networks});
  } catch (error) {
    return NextResponse.json({error: 'Database error'}, {status: 500});
  }
}
