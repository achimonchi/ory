import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { getSession } from "../../action/auth"


export default function Auth({children}){
    const [has_session, set_has_session] = useState(false)
    const router = useRouter()
    useEffect(()=>{
        async function fetchSession(){
            const r = await getSession();
            if(r.flag){
                set_has_session(true)
            } else {
                router.push("/")
            }
        }
        fetchSession()
    }, [router])


    return (
        has_session
            ? children
            : ""
    )
}