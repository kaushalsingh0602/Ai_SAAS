"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import { cn } from '@/lib/utils';
import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, SettingsIcon, VideoIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
const montserrat=Montserrat({weight:"600",subsets:["latin"]})


const routes=[
    {
        lable:"Dashboard",
        icon:LayoutDashboard,
        href:"/dashboard",
        color: "text-sky-500"
    },
    {
        lable:"Conversation",
        icon:MessageSquare,
        href:"/conversation",
        color: "text-violet-500"
    },
    {
        lable:"Image Generation",
        icon:ImageIcon,
        href:"/image",
        color: "text-pink-700"
    },
    {
        lable:"Video Generation",
        icon:VideoIcon,
        href:"/video",
        color: "text-orange-700"
    },
    {
        lable:"Music Generation",
        icon:MusicIcon,
        href:"/music",
        color: "text-emerald-700"
    },
    {
        lable:"Code Generation",
        icon:CodeIcon,
        href:"/code",
        color: "text-emerald-700"
    },
    {
        lable:"Sating",
        icon:SettingsIcon,
        href:"/satting"
    },
]
const Sidebar=()=>{
    const pathaname=usePathname();
    return(
        <div  className=" space-y-4 py-4 flex flex-col bg-[#111827] text-white">
            <div className=" px-3 py-2 flex-1">
                <Link href="/dashboard" className=" flex items-center pl-3 mb-14 "
                >
                    
                    <div className=" relative w-10 h-10 mr-4">
                       <Image 
                       alt =" logo"
                       src="/logo.png"
                       width={700}
                       height={500}/>
                    </div>
                    <h1 className={cn("text-2xl font-bold",montserrat.className)}> Genius</h1>
                    
                </Link>
                <div   className="space-y-1">
                    {routes.map((route=>(
                        <Link
                        href={route.href}
                        key={route.href}
                        className={cn('text-sm group flex p-3 w-full  justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',pathaname === route.href ? "text-white bg-white/10":"text-zinc-400")}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn( "h-5 w-5 mr-5 ",route.color)}/>
                                {route.lable}

                            </div>

                        </Link>
                    )))}

                </div>
            </div>
        </div>

    )
}

export default Sidebar