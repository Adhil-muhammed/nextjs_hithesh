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
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const product = await Product?.find();
    const totalCount = await Product?.countDocuments();
    return NextResponse.json({ product, totalCount }, { status: 200 });
  } catch (error: any) {
    console.log("error: ", error);
    return NextResponse.json({ message: error?.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  try {
    const reqBody = await request?.json();
    console.log("reqBody: ", reqBody);
    const product = await Product?.findOneAndUpdate(reqBody, reqBody, {
      new: true,
    });
    return NextResponse.json({ updatedProduct: product }, { status: 200 });
  } catch (error: any) {
    console.log("error: ", error);
    return NextResponse.json({ message: error?.message }, { status: 800 });
  }
}
