import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '../../_context/UserInputContext'
import { useContext } from 'react'

function SelectOption() {
  const {userInput, setUserInput} = useContext(UserInputContext)
  const handleInputChange = (name,value) => {

    setUserInput((prev)=>({...prev,[name]:value}))
  }
  return (
    <div className='px-10 md:px-20 lg:px-44'>
        <div className='grid grid-cols-2 gap-10'>
          <div>
            <label htmlFor="text-sm">🎯Difficulty Level</label>
          
          <Select onValueChange={(value)=>handleInputChange('level',value)}
          defaultValue={userInput?.level} >
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="text-sm">⏲️course Duration</label> 
            <Select onValueChange={(value)=>handleInputChange('duration',value)}
            defaultValue={userInput?.duration}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More Than 3 Hours">More Than 3 Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="text-sm">📼Add Video</label> 
            <Select onValueChange={(value)=>handleInputChange('displayVideo',value)}
            defaultValue={userInput?.displayVideo}>
            <SelectTrigger className="">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className='text-sm'>📖Number of Chapters</label>
            <Input type="number"
            onChange={(e)=>handleInputChange('noOfChapters',e.target.value)}
            defaultValue={userInput?.noOfChapters}/>
          </div>
        </div>
    </div>
  )
}

export default SelectOption