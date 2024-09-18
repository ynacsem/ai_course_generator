import React from 'react'

function ChapterListCard({chapter,index}) {
  return (
    <div className='grid grid-cols-5  items-center border-b p-4'>
        <div>
            <h2 className='text-center  text-white p-1 bg-purple-600 rounded-full w-8 h-8'>{index+1}</h2>
        </div>
        <div className='col-span-4'>
            <h2 className='font-medium'>{chapter?.chapter_name}</h2>
            <h2 className='text-sm text-purple-600'>{chapter?.duration}</h2>

        </div>

    </div>
  )
}

export default ChapterListCard