'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import React, { useContext } from 'react'
import Link from 'next/link'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'
function AddCourse() {
    const {user} = useUser()
    const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)

  return (
    <div className='flex justify-between items-center'>
        <div>
            <h2 className='text-2xl'>Hello , <span className='font-bold'>{user?.fullName}</span></h2>
            <p className='text-sm text-gray-400'>Create new course with AI, Share with Friends and get Paid.</p>
        </div>
        <Link href={userCourseList.length < 5 ? '/create-course' : '/dashboard/upgrade'}>
            <Button className='bg-blue-500'>+ Create AI Course !</Button>
        </Link>
        
    </div>
  )
}

export default AddCourse