'use client'
import React from 'react'
import Header from '../dashboard/_components/Header'
import { UserInputContext } from '../_context/UserInputContext'
import { useState } from 'react'

function CreateCourseLayout  ({children}) {
  const [userInput, setUserInput] =useState([])
  return (
    <body>
      <UserInputContext.Provider value={{userInput, setUserInput}}>
        <>
        <Header/>
        {children}
        </>
        </UserInputContext.Provider>  
    </body>
  )
}
export default CreateCourseLayout