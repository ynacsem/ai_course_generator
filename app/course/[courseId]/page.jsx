'use client'
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail'
import Header from '@/app/dashboard/_components/Header'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

function Course({params}) {
    const [course,setCourse] = useState(null)
    const GetCourse=async()=>{
        const result = await db.select().from(CourseList).where(eq(CourseList.courseId,params.courseId))
        setCourse(result[0])
        
    }
    useEffect(()=>{
        params&&GetCourse()
    },[params])
  return (
    <div>
        <Header/>
        
        <div className='px-10 p-10 mx:px-20 lg:px-44'>
            <CourseBasicInfo course={course} edit={false}/>  
            <CourseDetail course={course}/>
            <ChapterList course={course} edit={false}/>
        </div>
    </div>
  )
}

export default Course