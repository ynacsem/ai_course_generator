'use client'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from '../_components/CourseBasicInfo'
import { HiOutlineClipboardDocument } from "react-icons/hi2";


function finishScreen({params}) {
    const [course, setCourse] = useState(null)
    const router = useRouter()
    const GetCourse = async()=>{
        const result = await db.select().from(CourseList).where(
            eq(CourseList.courseId,params.courseId))    
        setCourse(result[0])
    }
    useEffect(()=>{
        params&&GetCourse()
    },[params])
  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
        <h2 className='text-3xl font-bold text-center my-3 text-purple-600'>🎆Congrats! Your course has been created.</h2>
        <h2 className='mt-3'>Course URL:</h2>
        <h2 className='text-center text-gray-400 border p-2 rounded-lg flex items-center justify-between'>{process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId} 
        <HiOutlineClipboardDocument className='text-3xl text-black cursor-pointer'
        onClick={async()=>await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`)}/>
        </h2>
        <CourseBasicInfo course={course}/>
    </div>
  )
}

export default finishScreen