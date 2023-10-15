import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";

connection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request?.json();

    const { title, discription, image } = reqBody;

    const alreadyExists = await Product.findOne({ title });

    if (alreadyExists) {
      return NextResponse.json(
        { message: "product is alredy exists" },
        { status: 400 }
      );
    }

    const newProduct = await new Product({
      title,
      image,
      discription,
    });

    const savedProduct = await newProduct.save();

    return NextResponse.json(
      { message: "product created successfully", savedProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("error: ", error);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const product = await Product?.find();
    return NextResponse.json({ product }, { status: 200 });
  } catch (error: any) {
    console.log("error: ", error);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
}
