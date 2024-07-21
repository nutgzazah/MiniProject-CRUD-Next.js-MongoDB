import { connectMongoDB } from "../../../../../lib/mongodb"
import Post from "../../../../../Models/post"
import { NextResponse } from "next/server"

export async function GET(req, {params}){
    const {id} = params
    await connectMongoDB()
    const post = await Post.findOne({_id:id})
    return NextResponse.json({post},{status:200})
}

export async function PUT(req, {params}){
    const {id} = params
    const {newTitle: title, newImg:img, newDetail:detail} = await req.json()
    await Post.findByIdAndUpdate(id, {title,img,detail})
    return NextResponse.json({message:"Post updated"},{status: 200})

}