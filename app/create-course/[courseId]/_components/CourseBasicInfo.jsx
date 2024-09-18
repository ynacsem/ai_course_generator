import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import EditCourseBasicInfo from './EditCourseBasicInfo'
import { storage } from '@/configs/fireBaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'

function CourseBasicInfo({course,refreshData,edit=true}) {
  const [selectedFile, setSelectedFile] = useState()
  useEffect(()=>{
    if (course){
      setSelectedFile(course?.courseBanner)
    }
  },[course])
  const onFileSelected = async(e) => {
    const file = e.target.files[0]
    setSelectedFile(URL.createObjectURL(file))

    const fileName = Date.now() + '.jpg'
    const refStorage = ref(storage,'ai_course/'+fileName)
    await uploadBytes(refStorage, file).then((snapshot) => {

      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(refStorage).then(async(url)=>{
        console.log(url)
        await db.update(CourseList).set({courseBanner:url}).where(eq(CourseList.courseId,course.courseId)).returning({id:CourseList.id})
      })
    })

  }
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <h2 className='text-3xl font-bold'>{course?.courseOutput?.course_name}
                   {edit && (<EditCourseBasicInfo course={course} refreshData={()=> refreshData(true)}/>)}</h2>
                <p className='test-sm text-gray-400 mt-3'>{course?.courseOutput?.description}</p>
                <h2 className='font-medium mt-5 text-purple-500'>{course?.category}</h2>
              <Link href={`/course/${course?.courseId}/start`} disabled={!edit}>
                <Button className='mt-5 w-full bg-purple-600'>Start Course</Button>
              </Link>
            </div>
            <div>
              <label htmlFor="upload-image">
                <Image src={selectedFile ? selectedFile :   '/img/300x300.svg'} width={300} height={300} alt='placeholder'
                className='w-full rounded-xl h-[270px] object-cover cursor-pointer'/>
              </label>
              <input id="upload-image" className='opacity-0' type="file" onChange={(e)=>onFileSelected(e)} disabled={!edit}/>
            </div>
              

        </div>
    </div>
  )
}

export default CourseBasicInfo