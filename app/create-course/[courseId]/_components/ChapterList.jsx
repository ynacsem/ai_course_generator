
import React from 'react'
import { HiOutlineClock,HiOutlineCheckCircle  } from "react-icons/hi";
import EditChapter from './EditChapter';

function ChapterList({course,refreshData,edit=true}) {
  return (
    <div className='mt-3 '>

        <h2 className='text-xl font-bold'>Chapters</h2>
        <div className='mt-2'>
            {course?.courseOutput?.chapters?.map((chapter, index) => (
                <div className='border p-5 rounded-lg mb-2 flex items-center justify-between'>
                    <div className='flex gap-5 items-center '>
                        <p className='text-xl text-bold bg-purple-600 text-white p-2 rounded-full' key={index}>{index + 1}</p>
                        <div>
                            <h2 className='font-medium text-lg flex items-center gap-3'>{chapter?.chapter_name}
                                 {edit && (<EditChapter course={course} index={index} refreshData={()=>refreshData(true)}/>)}</h2>
                            <p className='text-sm text-gray-500'>{chapter?.about}</p>
                            <p className='flex gap-2 text-purple-600 items-center'> <HiOutlineClock />{chapter?.duration}</p>
                        </div>
                    </div>
                    <HiOutlineCheckCircle className='text-4xl text-gray-300'/>
                </div>
             ))}
        </div>
    </div>
  )
}

export default ChapterList