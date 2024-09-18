'use client'
import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart({params}) {
    const [chapterContent,setChapterContent] = useState()
    const [course,setCourse] = useState(null)
    const [selectedChapter,setSelectedChapter] = useState()
    const GetCourse=async()=>{
        const result = await db.select().from(CourseList).where(eq(CourseList.courseId,params.courseId))
        setCourse(result[0])
        GetSelectedChapterContent(0)
    }
    useEffect(()=>{
        params&&GetCourse()
    },[params])
    const GetSelectedChapterContent=async(chapterId)=>{
        const result = await db.select().from(Chapters).where(and(eq(Chapters.chapterId,chapterId),
        eq(Chapters?.courseId,course?.courseId)))
        setChapterContent(result[0])
    }
  return (
    <div>
        {/* Chapter list side bar  */}
        <div className='md:w-72 fixed h-screen hidden md:block border-r shadow-sm'>
            <h2 className='font-md text-lg bg-purple-600 p-3
            text-white'>{course?.name}</h2>
            <div>
                {course?.courseOutput?.chapters?.map((chapter, index) => (
                    <div key={index}
                    className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.chapter_name === chapter?.chapter_name && 'bg-purple-100'}`}
                    onClick={()=>{setSelectedChapter(chapter);
                    GetSelectedChapterContent(index)}
                    }>
                        <ChapterListCard chapter={chapter} index={index}/>
                    </div>
                ))}
            </div>
        </div>
        {/* COntent div  */}
        <div className='md:ml-64'>
                <ChapterContent chapter={selectedChapter}
                content={chapterContent}/>
        </div>
    </div>
  )
}

export default CourseStart