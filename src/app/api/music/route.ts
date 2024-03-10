import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from  "replicate"



// import { checkSubscription } from "@/lib/subscription";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN// This is also the default, can be omitted
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("prompt are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    if (!freeTrial) {
      return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    }

    const response = await replicate.run(
        "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
        {
          input: {
            alpha: 0.5,
            prompt_a: prompt,
            prompt_b: "90's rap",
            denoising: 0.75,
            seed_image_id: "vibes",
            num_inference_steps: 50
          }
        }
      ); 
    // if (!isPro) {
      await increaseApiLimit();
    // }

    return NextResponse.json(response);
  } catch (error) {
    console.log('[music_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};