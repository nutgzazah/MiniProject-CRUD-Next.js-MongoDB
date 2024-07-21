"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'


function CreatePostPage() {
  
    const [title, setTitle] = useState("")
    const [img, setImg] = useState("")
    const [detail, setDetail] = useState("")
    
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title){
            alert("Please at least fill Title's Post")
            return
        }
        try{
            const res = await fetch("http://localhost:3000/api/posts",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title, img, detail})
            })
            if (res.ok){
                router.push("/")
            }else{
                throw new Error("False to create a post")
            }


        }catch(error){
            console.log(error)
        }
    }


    return (
    <div className='container mx-auto py-10'>
        <h3 className='text-3xl font-semibold'>Create Post</h3>
        <hr className='my-3'/>
        <Link href='/' className='bg-gray-500 inline-block text-white rounded-md p-2'>Go back</Link>
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setTitle(e.target.value)} type='text' className='w-[300px] block bg-gray-100 border p-2 rounded-md text-lg my-2'placeholder='Title'/>
            <input onChange={(e) => setImg(e.target.value)} type='text' className='w-[300px] block bg-gray-100 border p-2 rounded-md text-lg my-2'placeholder='Image URL'/>
            <textarea onChange={(e) => setDetail(e.target.value)} rows={10} className='w-[300px] block bg-gray-100 border p-2 rounded-md text-lg my-2'placeholder='Detail'/>
            <button type='submit' className='bg-green-500 p-2 px-3 rounded-md text-white'>Create Post</button>
        </form>
    
    </div>
  )
}

export default CreatePostPage