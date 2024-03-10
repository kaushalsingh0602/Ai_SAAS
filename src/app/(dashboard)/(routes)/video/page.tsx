

"use client"
import axios from "axios"

import * as z from "zod"
import Heading from "@/components/heading"
import  {Loader}  from "@/components/loader"
import {   Video, VideoIcon } from "lucide-react"
import {  useForm } from "react-hook-form"
import  {Empty}  from "@/components/empty"
import { formSchema } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useProModal } from "@/hooks/use-prop-model"





const Videopage=()=>{

    const proModal=useProModal()
    const router= useRouter();
    const [video,setVideo]=useState<string>()

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    })

    const isLodaing =form.formState.isSubmitting;
    const onSubmit= async (values:z.infer<typeof formSchema>)=>{
       try{


        setVideo(undefined)
         

        const response = await axios.post('/api/video',values);
        setVideo(response.data[0])
      
      form.reset();   


       }catch(error:any){
        if(error ?.response?.status===403){
            proModal.onOpen();
        }
       } finally{
        router.refresh()
       }
    }
    return(
        <div>
            <Heading title="Video generation"
            description="turn your prompt in to video"
            icon={VideoIcon}
            iconColor="text-orange-500"
            bgColor="bg-orange-500/10"/>
            <div className="px-4 lg:px-8">
             <div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-lg
                    border
                    w-full
                    p-4
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid-cols-12
                    gap-2">
                        <FormField
                        name="prompt"
                        render={({field})=>(
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                    <Input className="border-0 outline-none focus-visible:ring-0
                                     focus-visible:ring-transparent"
                                     disabled={isLodaing}
                                     placeholder="Write your prompt hear"
                                     {...field}
                                     />
                                    
                                </FormControl>

                            </FormItem>
                        )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full"
                        disabled={isLodaing}>Generate </Button>
                </form>

            </Form>
            </div>
            <div className="space-y-4 mt-4">
                {isLodaing &&(
                    <div className="p-8 rounded-lg w-full flex items center justify-center bg-muted">
                        <Loader/>
                    </div>

                )}
                {!video && !isLodaing &&(
                    <Empty lable="No video started"/>
                )}
                {video&&(<video
                controls
                className="w-full  spect-video rounded-lg border-black mt-8" >
                    <source src={video}/> 
                </video>)}
            </div>
            </div>
        </div>
    )
}
export default  Videopage