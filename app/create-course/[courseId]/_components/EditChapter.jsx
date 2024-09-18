'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { HiOutlinePencilAlt } from "react-icons/hi";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
  

function EditChapter({course,index,refreshData}) {
    const [chapter_name,setChapter_name] = useState()
    const [about,setAbout] = useState()
    useEffect(()=>{
        setChapter_name(course?.courseOutput?.chapters[index]?.chapter_name)
        setAbout(course?.courseOutput?.chapters[index]?.about)
    },[course])
    const onUpdate = async()=>{
        course.courseOutput.chapters[index].chapter_name=chapter_name
        course.courseOutput.chapters[index].about=about
        const result = await db.update(CourseList).set({courseOutput:course.courseOutput}).where(eq(CourseList.courseId,course.courseId)).returning({id:CourseList.id})
        refreshData(true)
    }

  return (
    <Dialog>
        <DialogTrigger><HiOutlinePencilAlt className='text-2xl text-purple-600'/></DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Edit Chapter</DialogTitle>
            <DialogDescription>
                <div className='mt-3'>
                    <label htmlFor="">Chapter title</label>
                    <Input defaultValue={course?.courseOutput?.chapters[index]?.chapter_name} onChange={(e)=>setChapter_name(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Chapter Description</label>
                    <Textarea className='h-44' defaultValue={course?.courseOutput?.chapters[index]?.about} onChange={(e)=>setAbout(e.target.value)}/>
                </div>
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose>
                    <Button onClick={onUpdate}>Update</Button>
                </DialogClose>
      
            </DialogFooter>
        </DialogContent>
        </Dialog>

  )
}

export default EditChapter