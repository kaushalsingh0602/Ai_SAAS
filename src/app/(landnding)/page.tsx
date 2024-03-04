import { Button } from "@/components/ui/button"
// import { Link } from "lucide-react"
import Link from 'next/link';



const LandingPage=()=>{
    return(
        <>
        <div>
            Landing page 
            <Link href="/sign-in">
                <Button>
                 Login
                </Button>
            </Link>
               
            
            <Link href="/sign-up">
                <Button>
                    Register
                </Button>
            </Link>
            
        </div>
        </>
    )}
    export default LandingPage