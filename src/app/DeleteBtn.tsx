"use client"
import React, { FC } from 'react';

interface DeleteBtnProps {
  id: string;
}

const DeleteBtn: FC<DeleteBtnProps> = ({ id }) => {

  const handleDelete = async ()=>{
    const confirmed = confirm("Are you sure to delete this post?")

    if (confirmed){
      const res = await fetch(`http://localhost:3000/api/posts?id=${id}`,{
        method:'DELETE'
      })

      if (res.ok){
        window.location.reload()
      }
    }
  }

  return (
    <a onClick={handleDelete} className="bg-red-500 text-white p-2 rounded-md m-1 cursor-pointer">
      Delete
    </a>
  )
}

export default DeleteBtn