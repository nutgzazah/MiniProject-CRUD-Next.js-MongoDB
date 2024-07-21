"use client"

import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const [postData, setPostData] = useState([])

  return (
    <main className="container mx-auto my-3">
      <h1>MiniCRUD with NextJS + MongoDB</h1>
      <hr className="my-3"/>
      <button className="bg-green-500 p-3 text-white rounded"><Link href="/create">Create Post</Link></button>

      <div className="grid grid-cols-3 gap-6">

        <div className="shadow-xl mt-2 p-10 rounded-xl">
        <h4 className="font-bold">Post Title</h4>
        {/* <img/> */}
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, mollitia?</p>
          <div className="mt-4">
            <Link className="bg-gray-500 text-white p-2 rounded-md m-1" href="/edit">Edit</Link>
            <Link className="bg-red-500 text-white p-2 rounded-md m-1" href="/delete">Delete</Link>
          </div>
        </div>

      </div>

    </main>
  );
}
