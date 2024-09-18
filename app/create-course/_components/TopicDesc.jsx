
import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UserInputContext } from '../../_context/UserInputContext'
import { useContext } from 'react'

const Topic = () => {
  const {userInput, setUserInput} = useContext(UserInputContext)
  const handleInputChange = (e) => {
    setUserInput((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  return (
    <div className='mx-20 lg:mx-40'>
      <div className='mt-5'>
        <label htmlFor="">💡Write the Topic for Which you want to generate a course (e.g, Python Course, Yoga, etc.):</label>
        <Input placeholder={'Enter Topic'}
        onChange={(e)=>handleInputChange(e)} name="topic"
        defaultValue={userInput?.topic}/>
      </div>
      <div className='mt-5'>
        <label htmlFor="">📔Tell us more about your Course ,What you want to include in it? (Optional)</label>
        <Textarea placeholder={'About your course'}
        onChange={(e)=>handleInputChange(e)} name="description"
        defaultValue={userInput?.description}/>
      </div>
    </div>
  )
}

export default Topic