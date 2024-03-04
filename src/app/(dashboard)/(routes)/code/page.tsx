

"use client"
import axios from "axios"

import * as z from "zod"
import Heading from "@/components/heading"
import  {Loader}  from "@/components/loader"
import {  Code, DivideCircle} from "lucide-react"
import {  useForm } from "react-hook-form"
import  {Empty}  from "@/components/empty"
import { formSchema } from "../conversation/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ReactMarkdown from "react-markdown"

import createCompletion from "openai"
import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avater"

const CodePage=()=>{
    const router= useRouter();
    const[messages, setMessages]=useState<createCompletion[]>([])
    console.log(messages)

    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    })

    const isLodaing =form.formState.isSubmitting;
    const onSubmit= async (values:z.infer<typeof formSchema>)=>{
       try{
         // Define type for message object
         type createCompletion = { 
            role: string;
            content: string;
        };
        const userMessage: createCompletion = { 
            role: "user",
            content: values.prompt
         };
         const newMessages = [...messages, userMessage];
        // Assuming newMessages and userMessage are defined elsewhere

        const response = await axios.post('/api/code', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      
      form.reset();   


       }catch(error:any){
        console.log("error hai bhai yaha pai",error)
       } finally{
        router.refresh()
       }
    }
    return(
        <div>
            <Heading title="Code Genaration"
            description="Generation code using descriptive text "
            icon={Code}
            iconColor="text-green-500"
            bgColor="bg-green-500/10"/>
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
                                     placeholder="Write your question hear"
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
                {messages.length===0 && !isLodaing &&(
                    <Empty lable="No conversation started"/>
                )}
            <div className=" flex flex-col-reverse gap-y-4">
                            {messages.map((message)=> (
                                <div key={message.content}
                                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                                message.role==="user"?"bg-white border border-black/10":"bg-muted")} >
                                    {message.role === "user" ? <UserAvatar /> : <BotAvatar/>}
                                    <ReactMarkdown
                                    components={{
                                        pre: ({ node, ...props }) => (
                                          <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props} />
                                          </div>
                                        ),
                                        code: ({ node, ...props }) => (
                                          <code className="bg-black/10 rounded-lg p-1" {...props} />
                                        )
                                      }} className="text-sm overflow-hidden leading-7">
                                        {message.content || ""}
                                      </ReactMarkdown>
                                </div>
                            ))}
                </div>
            </div>
            </div>
        </div>
    )
}
export default  CodePage