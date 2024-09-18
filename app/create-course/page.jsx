'use client'
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { HiInboxStack ,HiLightBulb,HiClipboardDocumentList  } from "react-icons/hi2";
import Category from './_components/Category';
import Topic from './_components/TopicDesc';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';
import { db } from '@/configs/db';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { CourseList } from '@/configs/schema';
import { useRouter } from 'next/navigation';
function CreateCourse() {
    const {user} = useUser()
    const router = useRouter()
    const StepperOptions=[
    {
        id:1,
        name:'Category',
        icon:<HiInboxStack />
    },
    {
        id:2,
        name:'Topic & Desc',
        icon:<HiLightBulb  />
    },
    {
        id:3,
        name:'Options',
        icon:<HiClipboardDocumentList  />
    },
]
const [activeIndex, setActiveIndex] = useState(0)
const {userInput, setUserInput} = React.useContext(UserInputContext)
const [isLoading, setIsLoading] = useState(false)
const checkStatus = () => {
    if(userInput?.length ===0){
        return true
    }
    else if(activeIndex === 0 &&(!userInput?.category)){
        return true
    }else if (activeIndex === 1 &&(!userInput?.topic || !userInput?.description)){
        return true
    }else if (activeIndex === 2 &&(!userInput?.level || !userInput?.duration || !userInput?.displayVideo)){
        return true
    }
    return false
}
const GenerateCourseLayout=async() =>{
    setIsLoading(true)
    const BASIC_PROMPT = 'Genrate A Course tutoriel following detail with field as course name,description,along with chapter name,about,duration:'
    const USER_INPUT_PROMPT = 'Category:'+userInput?.category+',Topic:'+userInput?.topic+',Level :'+userInput?.level+',Duration:'+userInput?.duration+',NoOf Chapters:'+userInput?.noOfChapters+',in JSON format'
    const FINAL_PROMPT = BASIC_PROMPT+USER_INPUT_PROMPT
    console.log(FINAL_PROMPT)
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    console.log(JSON.parse(result.response.text()))
    setIsLoading(false)
    SaveCourseLayoutInDb(JSON.parse(result.response.text()))
}
const SaveCourseLayoutInDb = async(layout)=>{
    var id =uuid4()
    setIsLoading(true)
    const result = await db.insert(CourseList).values({
        courseId:id,
        name:userInput?.topic,
        category:userInput?.category,
        level:userInput?.level,
        courseOutput:layout,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName,
        userProfileImage:user?.imageUrl
        
    })
    setIsLoading(false)
    router.push('/create-course/'+id)

}
  return (
    <div>
        <div className='flex flex-col items-center justify-center mt-10 '>
            <h2 className='text-4xl text-blue-400 font-medium'>Create Course</h2>
            <div className='flex items-center mt-10'>
                {StepperOptions.map((item,index)=>(
                    <div className='flex items-center'>
                    <div className='flex items-center flex-col w-[50px] md:w-[100px]'>
                        <div className={`bg-gray-200 p-3 rounded-full text-white
                        ${index <= activeIndex && 'bg-purple-500'}`}>{item.icon}</div>
                        <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                    </div>
                    {index !== StepperOptions.length -1 && (<div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 
                    ${index < activeIndex && 'bg-purple-300'}`}></div>)}
                    </div>
                ))}
            </div>
        </div>

        <div className='px-10 md:px-20 lg:px-44 mt-10'>
            {activeIndex === 0 ? <Category/>:null}
            {activeIndex === 1 ? <Topic/>:null}
            {activeIndex === 2 ? <SelectOption/>:null}
            <div className='mt-10 flex justify-between p-5'>
                <Button variant='outline'  disabled={activeIndex === 0} onClick={() => setActiveIndex(activeIndex - 1)}>Previous</Button>
                {activeIndex < StepperOptions.length - 1 && <Button disabled={checkStatus()} className='bg-blue-500'
                onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>}
                {activeIndex === StepperOptions.length - 1 && <Button className='bg-blue-500' onClick={() => GenerateCourseLayout()} disabled={checkStatus()}>Genreate Course Layout</Button>}
            </div>
        </div>
        <LoadingDialog loading={isLoading}/>
    </div>
  )
}

export default CreateCourse