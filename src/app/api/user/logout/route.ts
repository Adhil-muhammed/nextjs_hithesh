import { NextResponse } from "next/server";

export async function GET() {
  try {
    const responce = NextResponse.json({
      message: "Log out successfully",
      success: true,
    });

    responce.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return responce;
  } catch (error: any) {
    NextResponse.json({ message: error.message }, { status: 500 });
  }
}
