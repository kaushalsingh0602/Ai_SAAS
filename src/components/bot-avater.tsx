import { Avatar } from "@radix-ui/react-avatar"
import { AvatarImage } from "./ui/avatar"


export const BotAvatar=()=>{
    return(
        <Avatar className=" h-8 w-10">
            <AvatarImage className="p-1" src="/logo.png"/>
        </Avatar>
    )
}