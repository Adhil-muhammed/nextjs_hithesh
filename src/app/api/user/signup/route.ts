import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { connection } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password, email, firstName, lastName } = reqBody;

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      return NextResponse.json(
        { error: "user is already exist" },
        { status: 400 }
      );
    }
    // hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = await new User({
      email,
      username,
      firstName,
      lastName,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      { message: "user saved successfully", savedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error.message: ", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
