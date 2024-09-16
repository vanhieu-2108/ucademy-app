"use server";
import { ICourse } from "@/database/course.model";
import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { TCreateUserParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
export async function createUser(params: TCreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(params);
    return newUser;
  } catch (error) {}
}

export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  try {
    connectToDatabase();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return null;
    return findUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserCourse(): Promise<ICourse[] | undefined> {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId }).populate(
      "courses",
    );
    if (!findUser) return undefined;
    return JSON.parse(JSON.stringify(findUser.courses));
  } catch (error) {
    console.log(error);
  }
}
