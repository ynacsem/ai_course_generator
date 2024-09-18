'use client'
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetail from './_components/CourseDetail'
import ChapterList from './_components/ChapterList'
import { Button } from '@/components/ui/button'
import { GenerateChapterContent_AI } from '@/configs/AiModel'
import LoadingDialog from '../_components/LoadingDialog'
import getVideos from '@/configs/service'
import { useRouter } from 'next/navigation'

function CoursePage({params}) {
  const [loading ,setLoading] = useState(false)
    const [course, setCourse] = useState(null)
    const router = useRouter()
    const GetCourse = async()=>{
        const result = await db.select().from(CourseList).where(eq(CourseList.courseId,params.courseId))    
        setCourse(result[0])
        console.log(course)
    }
    useEffect(()=>{
        params&&GetCourse()
    },[params])
    const generateChapterContent = async()=>{
      setLoading(true)

      const chapter = course?.courseOutput?.chapters
      chapter.forEach(async(chapter,index)=>{
        const PROMPT= 'Explain the concept in Detail on Topic:'+course?.name+',Chapter:'+chapter?.chapter_name+', in JSON Format with list of array, with fields as title, description in detail, Code Example (Code field in <precode> format) if applicable'
        
          try {
            
          setLoading(true)
          let videoId= ''
            const result = await GenerateChapterContent_AI.sendMessage(PROMPT)
            const content = JSON.parse(result?.response?.text())
            //Generate Video url
            await getVideos(course?.name+":"+chapter?.chapter_name).then((resp)=>{
              videoId = resp[0].id.videoId
            })
            await db.insert(Chapters).values({
                chapterId:index,
                courseId:params.courseId,
                content:content,
                videoId:videoId
            })



            //Save chapter COntent + video URL
            
          } catch (error) {
            setLoading(false)
            console.log(error)
          }
          setLoading(false)
          await db.update(CourseList).set({publish:true}).where(eq(CourseList.courseId,course.courseId))
          router.replace('/create-course/'+params.courseId+'/finish')
        
      })
    }
  return (
    <div className='mt-10 px-7 default:md:px-20 lg:px-44'>
        <h2 className='text-2xl font-bold text-center'>Course Layout</h2>
        <LoadingDialog loading={loading}/>
        {/* basic info */}
        <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>
        {/* basic info */}
        <CourseDetail course={course}/>
        {/* course details  */}
        <ChapterList course={course} refreshData={()=>GetCourse()}/>


        {/* list of chapters  */}
        <Button className='mt-5 p-5 mb-10  bg-purple-600' onClick={generateChapterContent}>Generate Course</Button>
    </div>
  )
}

export default CoursePage