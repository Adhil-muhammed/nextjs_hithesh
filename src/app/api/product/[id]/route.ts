import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";

connection();

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const id = params?.id;
    const deletedUser = await Product?.findOneAndDelete({ _id: id });
    return NextResponse.json(
      { message: "data deleted", deletedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error: ", error);
    return NextResponse.json({ message: error?.message }, { status: 800 });
  }
}

export async function GET(request: NextRequest, { params }: any) {
  try {
    const id = params?.id;
    const product = await Product?.findById({ _id: id });
    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    console.log("error: ", error);
    return NextResponse.json({ message: error?.message }, { status: 800 });
  }
}
