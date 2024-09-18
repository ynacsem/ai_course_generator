'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useContext } from 'react'
import { HiOutlineHome } from "react-icons/hi";
import { HiCollection,HiOutlineShieldCheck,HiOutlineLogout   } from "react-icons/hi";
import { Progress } from "@/components/ui/progress"
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';


function SideBar() {
    const {userCourseList,setUserCourseList} = useContext(UserCourseListContext)
    const Menu=[
        {
            id:1,
            name:'Home',
            icon:<HiOutlineHome />,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Explore',
            icon:<HiCollection />,
            path:'/dashboard/explore'
        },
        {
            id:3,
            name:'Upgrade',
            icon:<HiOutlineShieldCheck />,
            path:'/dashboard/upgrade'
        },
        {
            id:4,
            name:'Logout',
            icon:<HiOutlineLogout />,
            path:'/dashboard/logout'
        },
    ]
    const path = usePathname()
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <h1 className='text-3xl font-bold'>Course AI🖥️</h1>
        <hr className='my-5'/>
        <ul>
            {Menu.map((item,index)=>(
                <Link href={item.path} key={index}>
                <div className={`flex items-center gap-2 text-gray-600 p-4 cursor-pointer hover:bg-gray-100 hover:text-black mb-3
                rounded-lg ${path===item.path && 'bg-gray-300 text-black'}`}>
                    <div className='text-3xl'>{item.icon}</div>
                    <h2>{item.name}</h2>
                </div>
                </Link>
            ))}
        </ul>
        <div className='absolute bottom-10 w-[80%]'>
            <Progress value={userCourseList.length/5*100} className='bg-blue-300'/>
            <h2 className='text-sm my-2'>{userCourseList.length} Out of 5 courses created</h2>
            <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimited course generation</h2>
        </div>

    </div>
  )
}

export default SideBar