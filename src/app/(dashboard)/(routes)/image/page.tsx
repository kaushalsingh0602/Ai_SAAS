

"use client"
import axios from "axios"

import * as z from "zod"
import Heading from "@/components/heading"
import  {Loader}  from "@/components/loader"
import {  Download, ImageIcon} from "lucide-react"
import {  useForm } from "react-hook-form"
import  {Empty}  from "@/components/empty"
import { amountOptions, formSchema, resolutionOptions } from "./constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem} from "@/components/ui/form"
import {
    Card,
    CardFooter
  } from "@/components/ui/card"
  
import Image from "next/image"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useProModal } from "@/hooks/use-prop-model"


const ImgePage=()=>{
    const proModal=useProModal()
    const router= useRouter();
    const [images ,setImages]=useState<string[]>([])

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:"",
            amount:"1",
            resolution:"512x512"
        }
    })

    const isLodaing =form.formState.isSubmitting;
    const onSubmit= async (values:z.infer<typeof formSchema>)=>{
       try{
         // Define type for message object
        setImages([]);

        const response = await axios.post('/api/image',values)
        const urls= response.data.map((image:{url:string})=>image.url)
        setImages(urls)
      
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
            <Heading title="Image Generation"
            description="Turn your prompt in to an image."
            icon={ImageIcon}
            iconColor="text-pink-500"
            bgColor="bg-pink-500/10"/>
            <div className="px-4 lg:px-8">
             <div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="rounded-lg
                    border
                    w-full
                    p-4
                    px-2
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
                                     placeholder="Write your here to image generation"
                                     {...field}
                                     />
                                    
                                </FormControl>

                            </FormItem>
                        )}
                        />
                        <FormField  control={form.control}
                        name="resolution"
                        render={({field})=>(
                            <FormItem className=" py-2 col-spam-10 lg:col-span-2">
                                <Select
                                disabled={isLodaing}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} />

                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {resolutionOptions.map((option)=>(
                                            <SelectItem 
                                            key={option.value}
                                            value={option.value}>
                                                {option.laple}

                                            </SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>

                            </FormItem>

                        )}
                        />
                        <FormField  control={form.control}
                        name="amount"
                        render={({field})=>(
                            <FormItem className=" py-2 col-spam-12 lg:col-span-2">
                                <Select
                                disabled={isLodaing}
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} />

                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {amountOptions.map((option)=>(
                                            <SelectItem 
                                            key={option.value}
                                            value={option.value}>
                                                {option.laple}

                                            </SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>

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
                    <div className="p-20">
                        <Loader/>
                    </div>

                )}
                {images.length===0 && !isLodaing &&(
                    <Empty lable="No image generated "/>
                )}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                {images.map((src) => (
                    <Card key={src} className="rounded-lg overflow-hidden">
                    <div className="relative aspect-square">
                        <Image
                        fill
                        alt="Generated"
                        src={src}
                        />
                    </div>
                    <CardFooter className="p-2">
                        <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                        </Button>
                    </CardFooter>
                    </Card>
                ))}
            </div>

           
            </div>
            </div>
        </div>
    )
}
export default  ImgePage