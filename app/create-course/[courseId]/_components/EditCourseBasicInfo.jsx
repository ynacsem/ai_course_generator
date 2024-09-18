'use client'
import React, { useEffect, useState } from 'react'
import { HiOutlinePencilAlt } from "react-icons/hi";
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { eq } from 'drizzle-orm';
import { CourseList } from '@/configs/schema';
  

function EditCourseBasicInfo({course,refreshData}) {
    const [course_name,setCourse_name] = useState()
    const [description,setDescription] = useState()
    useEffect(()=>{
        setCourse_name(course?.courseOutput?.course_name)
        setDescription(course?.courseOutput?.description)
    },[course])
    const onUpdateHandler = async() => {
        course.courseOutput.course_name=course_name
        course.courseOutput.description=description
        const result = await db.update(CourseList).set({courseOutput:course.courseOutput}).where(eq(CourseList.courseId,course.courseId)).returning({id:CourseList.id})
        refreshData(true)
    }
  return (
    <Dialog>
  <DialogTrigger><HiOutlinePencilAlt className='text-2xl text-purple-600'/></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Course Title & Description</DialogTitle>
      <DialogDescription>
        <div className='mt-3'>
            <label htmlFor="">Course title</label>
            <Input defaultValue={course?.courseOutput?.course_name} onChange={(e)=>setCourse_name(e.target.value)} />
        </div>
        <div>
            <label htmlFor="">Course Description</label>
            <Textarea className='h-44' defaultValue={course?.courseOutput?.description} onChange={(e)=>setDescription(e.target.value)}/>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
            <Button onClick={onUpdateHandler}>Update</Button>
        </DialogClose>
      
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default EditCourseBasicInfo