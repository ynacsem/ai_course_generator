'use client'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'

import {  useUser } from '@clerk/nextjs'
import React, { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'

function UserCourseList() {
  const [courseList,setCourseList] = useState([])
  const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)
  const  {user} = useUser()
  const getUserCourses = async()=>{
    const result = await db.select().from(CourseList).where(eq(CourseList?.createdBy,user?.primaryEmailAddress?.emailAddress))
    setCourseList(result)
    setUserCourseList(result)
  }
  useEffect(()=>{
    user&&getUserCourses()
  },[user])

  return (
    <div>
      <h2 className='text-xl font-medium my-10'>My Course List</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList?.map((course,index)=>(
          <CourseCard key={index} course={course} refreshData={()=>getUserCourses()}/>
        ))}
      </div>
    </div>
  )
}

export default UserCourseList