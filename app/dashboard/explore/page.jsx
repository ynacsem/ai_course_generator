'use client'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard'
import { Button } from '@/components/ui/button'

function page() {
  const [courses,setCourses] = useState()
  const [page,setPage] = useState(0)
  useEffect(() => {
    GetAllCourses(page)
  },[page])
  const GetAllCourses = async(page)=>{
    const result = await db.select().from(CourseList).limit(10).offset(page*9)
    setCourses(result)

  }
  return (
    <div>
      <h2 className='text-3xl font-bold'>Explore More Projects!</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
        {courses?.map((course,index)=>(
          <div key={index}>
            <CourseCard course={course} displayUser={true}/>
          </div>
        ))}
      </div>
      <div className='flex justify-between mt-5'>
        <Button className='mt-5 bg-purple-500 text-white outline' onClick={()=>setPage(page-1) } disabled={page===0}>Previous page</Button>
        <Button className='mt-5 bg-purple-500 text-white' onClick={()=>setPage(page+1)}>Next page</Button>
      </div>
    </div>
  )
}

export default page