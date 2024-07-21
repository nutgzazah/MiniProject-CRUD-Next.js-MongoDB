import { connectMongoDB } from "../../../../lib/mongodb"
import Post from "../../../../Models/post"
import { NextResponse } from "next/server"

export async function POST(req){
     const {title, img, detail} = await req.json()
     console.log(title, img, detail)
     await connectMongoDB()
     await Post.create({title, img, detail})
    return NextResponse.json({message: "Post created"},{status: 201})
}

export async function GET(){
    await connectMongoDB()
    const posts = await Post.find({})
    return NextResponse.json({posts})
}

export async function DELETE(req){
    const id = req.nextUrl.searchParams.get("id")
    await connectMongoDB()
    await Post.findByIdAndDelete(id)
    return NextResponse.json({message:"Post Deleted"},{status:200})
}