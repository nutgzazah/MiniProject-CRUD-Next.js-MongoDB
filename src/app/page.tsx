"use client"

import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";

interface Post {
  _id: string;
  title: string;
  detail: string;
  img: string;
}


export default function Home() {

  const [postData, setPostData] = useState<Post[]>([]);
  console.log(postData)

  const getPosts = async () => {
    try{
      const res = await fetch("http://localhost:3000/api/posts",{
        method: "GET",
        cache: "no-store"
      })

      if(!res.ok){
         throw new Error('Error to fetch posts')
      }

      const data = await res.json()
      setPostData(data.posts)
    }catch(error){
      console.log('Error laoding posts: ',error)
    }
  }

  useEffect(() =>{
    getPosts()
  },[])


  return (
    <main className="container mx-auto my-3 py-10">
      <h1 className="text-3xl font-semibold">MiniCRUD</h1>
      <h1 className="my-1">NextJS + MongoDB</h1>
      <hr className="my-3"/>
      <Link href="/create" className="bg-green-500 p-3 inline-block text-white rounded mt-2">Create Post</Link>

      <div className="grid grid-cols-4 gap-6">
        {postData && postData.length > 0 ? (
          postData.map(val =>(
          <div key={val._id} className="shadow-xl mt-2 p-10 rounded-xl">
          <h4 className="font-bold text-xl my-1">{val.title}</h4>
          <Image src={val.img} className="mx-auto rounded-md" width={1000} height={0} alt={val.title}/>
          <p className="mt-2 mb-10">{val.detail}</p>
            <div className="mt-4">
              <Link className="bg-gray-500 text-white p-2 rounded-md m-1" href={`/edit/${val._id}`}>Edit</Link>
              <DeleteBtn id={val._id}/>
            </div>
          </div>
          ))
        ):(
          <p className="bg-gray-300 p-3 my-3">Don't have any posts yet.</p>
        )}

      </div>

    </main>
  );
}
