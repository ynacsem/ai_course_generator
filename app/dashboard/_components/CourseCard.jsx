import Image from 'next/image'
import React from 'react'
import { HiOutlineBookOpen,HiOutlineDotsVertical  } from "react-icons/hi";
import DropDownOption from './DropDownOption';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';


function CourseCard({course,refreshData,displayUser=false}) {
  const handleOnDelete = async()=>{
    const resp = await db.delete(CourseList).where(eq(CourseList.courseId,course?.courseId))
    .returning({id:CourseList.id})
    if (resp){
      refreshData()
    }

  }
  return (
    <div className='shadow-md rounded-lg border p-2 
    transition-all cursor-pointer'> 
    <Link href={`/course/${course?.courseId}`}>
      <Image src={course?.courseBanner} width={300} height={200} alt={course?.courseName}
      className=' w-full h-[200px] object-cover rounded-lg' />
    </Link>
      <div className='p-2'>
        <h2 className='text-lg font-medium flex justify-between items-center'>{course?.name}
        
        {!displayUser && (<DropDownOption handleOnDelete={()=>handleOnDelete()}><HiOutlineDotsVertical /></DropDownOption>)}
        </h2>
        <p className='text-sm text-gray-500 my-1'>{course?.category}</p>
        <div className='flex items-center justify-between'>
          <h2 className='flex gap-2 items-center p-1 bg-purple-100 text-purple-600
          text-sm rounded-sm'><HiOutlineBookOpen />{course?.courseOutput?.no_of_chapters} Chapters</h2>
          <h2 className='text-sm bg-purple-100 text-purple-600 p-1 rounded-sm'>{course?.level}</h2>
        </div>
        {displayUser && (
          <div className='mt-2 flex items-center gap-2'>
            <Image src={course?.userProfileImage} width={35} height={35} 
            className='rounded-full '/>
            <h2>{course?.userName}</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseCard