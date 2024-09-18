import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

function DropDownOption({children,handleOnDelete}) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem className="text-red-500" onClick={handleOnDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

  )
}

export default DropDownOption