"use client"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import {Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import Sidebar from "./sidebar"

import { useEffect, useState } from "react"



interface MobileSidebarProps{
    apiLimitCount:number;
}

const MobileSidebar=({
    apiLimitCount
}:MobileSidebarProps)=>{
    const [isMounted,setMounted]=useState(false)
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!isMounted){
        return null;
    }
    return(
        <div>
            <Sheet>
                <SheetTrigger>
                    <Button variant="ghost" size="icon" className=" md:hidden" >
                        <Menu/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 bg-[#111827]">
                   <Sidebar  apiLimitCount={apiLimitCount} />
                </SheetContent>
            </Sheet>
        </div>

    )
}


export default MobileSidebar