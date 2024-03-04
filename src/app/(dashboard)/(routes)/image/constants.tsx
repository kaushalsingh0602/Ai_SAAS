


import * as z from "zod"

export const formSchema = z.object(
    {
        prompt:z.string().min(1,{
            message:" Image prompt is required"
        }),
        amount: z.string().min(1),
        resolution:z.string().min(1)
    }
)




export const amountOptions=[
    {
        value:"1",
        laple:" 1 photos"
    },
    {
        value:"2",
        laple:" 2 photos"
    },
    {
        value:"3",
        laple:" 3 photos"
    },
    {
        value:"4",
        laple:" 4 photos"
    },
    {
        value:"5",
        laple:"5 photos"
    }
]
export const resolutionOptions=[
    {
        value:"256x256",
        laple:"256x256"
    },
    {
        value:"512x512",
        laple:"512x512"
    },
    {
        value:"1024x1024",
        laple:"1024x1024"
    }
];