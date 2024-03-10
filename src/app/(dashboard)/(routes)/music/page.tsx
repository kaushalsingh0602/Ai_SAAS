

"use client"
import axios from "axios"

import * as z from "zod"
import Heading from "@/components/heading"
import  {Loader}  from "@/components/loader"
import {  MusicIcon} from "lucide-react"
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





const Musicpage=()=>{
    const proModal=useProModal()
    const router= useRouter();
    const [music,setMusic]=useState<string>()

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    })

    const isLodaing =form.formState.isSubmitting;
    const onSubmit= async (values:z.infer<typeof formSchema>)=>{
       try{


        setMusic(undefined)
         

        const response = await axios.post('/api/music',values);
        setMusic(response.data.audio)
      
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
            <Heading title="Music generation"
            description="turn your prompt in to music"
            icon={MusicIcon}
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
                {!music && !isLodaing &&(
                    <Empty lable="No music started"/>
                )}
                {music&&(<audio
                controls
                className="w-full  mt-8" >
                    <source src={music}/> 
                </audio>)}
            </div>
            </div>
        </div>
    )
}
export default  Musicpage