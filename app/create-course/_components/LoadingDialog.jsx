import React from 'react'

import Image from 'next/image'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

function LoadingDialog({loading}) {
  return (
    <AlertDialog open={loading}>
    <AlertDialogContent>
      <AlertDialogHeader>
        
        <AlertDialogDescription>
          <div className='flex flex-col items-center justify-center py-10'>
            <Image src={'/img/loader.gif'} width={100} height={100}    />
            <h2>Please wait .... Ai working on your course</h2>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default LoadingDialog