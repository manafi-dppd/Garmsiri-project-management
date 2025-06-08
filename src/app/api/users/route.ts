import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Position {
  id: number;
  title: string;
  title_fa: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  // دیگر فیلدهای مورد نیاز از مدل user
  position_on_user: {
    position: Position;
  }[];
}

interface FormattedUser extends Omit<User, "position_on_user"> {
  positions: Position[];
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        position_on_user: {
          include: {
            position: {
              select: {
                id: true,
                title: true,
                title_fa: true,
              },
            },
          },
        },
      },
    });

    const formattedUsers: FormattedUser[] = users.map((user: User) => ({
      ...user,
      positions: user.position_on_user?.map((pu) => pu.position) || [],
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
