'use client'
import CategoryList from '@/app/_shared/CategoryList'
import React from 'react'
import Image from 'next/image'
import { useContext } from 'react'
import { UserInputContext } from '../../_context/UserInputContext'

const Category = () => {
  const {userInput, setUserInput} = useContext(UserInputContext)
  const handeCategoryChange = (category) => {
    setUserInput((prev)=>({...prev,category:category}))
  }
  return (
    <div className='px:10 md:px-20'>
      <h2 className='my-5 text-center font-bold'>Select The Course Category</h2>
    <div className='grid grid-cols-3 gap-5'>
      {CategoryList.map((item,index)=>(
        <div className={`flex flex-col p-5 border items-center rounded-xl
        hover:border-primary hover:bg-blue-50 cursor-pointer ${userInput?.category === item.name && 'border-primary bg-blue-50'} `}
        onClick={()=>handeCategoryChange(item.name)}>
            <Image src={item.icon} width={50} height={50}/>
            <h2>{item.name}</h2>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Category