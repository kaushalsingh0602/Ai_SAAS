import { MessageSquare ,ImageIcon,VideoIcon,MusicIcon, CodeIcon, Check, Zap,} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog"
import { useProModal } from "@/hooks/use-prop-model"
import { Badge } from "@/components/ui/badge"
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";


const tools=[
    {
        lable:"Conversation",
        icon:MessageSquare,
        color: "text-violet-500",
        bgcolor: "text-violet-500/10"
    },
    {
        lable:"Image Generation",
        icon:ImageIcon,
        color: "text-pink-700",
        bgcolor: "text-pink-700/10"
    },
    {
        lable:"Video Generation",
        icon:VideoIcon,
        color: "text-orange-700",
        bgcolor: "text-orange-700/10"
    },
    {
        lable:"Music Generation",
        icon:MusicIcon,
        color: "text-emerald-700",
        bgcolor: "text-emerald-700/10",
    },
    {
        lable:"Code Generation",
        icon:CodeIcon,
        color: "text-emerald-700",
        bgcolor: "text-emerald-700"
    }
]



  

export const ProModal=()=>{

    const ProModal= useProModal();

    const [lodaing ,setLoading]=useState(false)
    const onSubscribe =  async ()=>{
        try{
            setLoading(true)
            const response = await axios.get("/api/stripe");
            window.location.href= await response.data.url;

        }catch(error){
            console.log(error, "STRIPE_CLIENT_ERROR")
        }
    } 
     return(
        <Dialog  open={ProModal.isOpen}   onOpenChange={ProModal.onClose}> 
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                    <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgrade to Cenius
                <Badge  className="uppercase text-sm py-1" variant="premium"
                >pro</Badge>
                </div>
                </DialogTitle>
                <DialogDescription className="text-center pt-2 spacey-2 text -zinc-900 font-medium">
                    {tools.map((tool)=>(
                        <Card
                        key={tool.lable} className="p-3 border-black/5 flex items-center justify-between">
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md",tool.bgcolor)}>
                                    <tool.icon  className={cn ("w-6 h-6",tool.color)} />

                                </div>
                                <div className="font-semibold text-sm">
                                    {tool.lable}
                                </div>
                            </div>
                            <Check className="text-primery w-5 h-5" />

                        </Card>
                    ))}

                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button 
                    onClick={onSubscribe}
                    size="lg"
                    variant="premium"
                    className="w-full"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white" />

                    </Button>
                </DialogFooter>
            </DialogContent>
       </Dialog>

    )
}