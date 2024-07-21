"use client"

import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

interface Params {
    id: string;
  }
  
  function EditPostPage({ params }: { params: Params }) {
    const { id } = params;
    
    const [postData, setPostData] = useState({
        title: '',
        img: '',
        detail: ''
    });

    const [newTitle, setNewTitle] = useState('')
    const [newImg, setNewImg] = useState('')
    const [newDetail, setNewDetail] = useState('')


    const router = useRouter()

    const getPostById =  async (id: string) => {
        try{
            const res = await fetch(`http://localhost:3000/api/posts/${id}`,{
                method: "GET",
                cache: "no-store"
            })
            if (!res.ok){
                throw new Error("Failed to fetch a post")
            }
            const data = await res.json()
            console.log('edit post: ',data)
            setPostData(data.post)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getPostById(id)
    },[])

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault()
        try{
            const res = await fetch(`http://localhost:3000/api/posts/${id}`,{
                method: "PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({ newTitle,newImg,newDetail})
            })

            if (!res.ok){
                throw new Error("Failed to update post")
            }

            router.refresh()
            router.push('/')

        }catch(error){
            console.log(error)
        }

    }

  return (
    <div className='container mx-auto py-10'>
        <h3 className='text-3xl font-semibold'>Edit Post</h3>
        <hr className='my-3'/>
        <Link href='/' className='bg-gray-500 inline-block text-white rounded-md p-2'>Go back</Link>
        <form onSubmit={handleSubmit}>
            <input onChange={(e) => setNewTitle(e.target.value)} type='text' className='w-[300px] block bg-gray-100 border p-2 rounded-md text-lg my-2'placeholder={postData.title}/>
            <input onChange={(e) => setNewImg(e.target.value)} type='text' className='w-[300px] block bg-gray-100 border p-2 rounded-md text-lg my-2'placeholder={postData.img}/>
            <textarea onChange={(e) => setNewDetail(e.target.value)} rows={10} className='w-[300px] block bg-gray-100 border p-2 rounded-md text-lg my-2'placeholder={postData.detail}/>
            <button type='submit' className='bg-green-500 p-2 px-3 rounded-md text-white'>Edit Post</button>
        </form>
    
    </div>
  )
}

export default EditPostPage