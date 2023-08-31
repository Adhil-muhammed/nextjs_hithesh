import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { connection } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connection();

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { email, password } = requestBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }

    const isMatchPassword = await bcryptjs?.compare(password, user.password);

    if (!isMatchPassword) {
      return NextResponse.json(
        { error: "password mismatch please try again" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const responce = NextResponse.json({
      message: "login successful",
      success: true,
    });
    responce.cookies.set("token", token, { httpOnly: true });

    return responce;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
