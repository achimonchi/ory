
import Layout from "../../components/template/Layout"
import {InputFields} from "../../components/forms/InputFields"
import { useEffect, useState } from "react"
import { ButtonPrimary } from "../../components/forms/Button";
import { ENV, Status } from "../../utils/config";
import {useRouter} from "next/router"
import axios from "axios"
import ErrorForm from "../../components/forms/ErrorForm";


function Registration(){
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const router = useRouter()
    const [err_msg, set_err_msg] = useState("");
    
    const [flow, set_flow] = useState("")

    useEffect(()=>{

    })
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const url = `${ENV.KRATOS_HOST}/self-service/registration/flows?id=${router.query.flow}`

        axios(`${url}`, {
            withCredentials:true,
            method:"GET"
        })
        .then((res)=>{
            const csrfToken = res.data.ui.nodes[0].attributes.value;
            const data = {
                schema_id:"default",
                state:"active",
                traits:{
                    email: email,
                },
                password:password,
                method:"password",
                csrf_token: csrfToken
            }
            axios.post(`${ENV.KRATOS_HOST}/self-service/registration?flow=${router.query.flow}`, data, {
                withCredentials:true
            })
            .then((res1)=>{
                alert("registration success !");
                router.push("/")
                console.log({res1})
            })
            .catch((err)=>{
                const errMsg = err?.response?.data?.ui?.messages !== undefined ? err?.response?.data?.ui?.messages : err?.response?.data?.ui?.nodes;
                const errMsgArr = [];
                let errMsgStr = "";
                errMsg?.map((e)=>{
                    console.log({e:e?.messages})
                    if(e?.text !== undefined && e?.text !== null){
                        errMsgArr.push(e?.text)
                    } else if(e?.messages?.length > 0) {
                        errMsgArr.push(e?.messages)
                    }
                })

                errMsgArr.map((e)=>{
                    // console.log({test:e})
                    let t = ""
                    if(typeof e === "string"){
                        errMsgStr += e
                    } else {
                        e?.map((r)=>{
                            t += r.text ?? "" 
                            t += " & "
                        })
                        errMsgStr += t

                    }
                })
                errMsgStr = errMsgStr.substring(0, errMsgStr.length - 2)
                set_err_msg(errMsgStr)
                console.log({err1:err, errMsgArr, errMsgStr, errMsg})
            })
            console.log({res, data})
        })
        .catch((err)=>{
            const status = err?.response?.status ?? 500

            if (status === Status.Gone.status){
                set_err_msg(`${Status.Gone.message} Please wait a second to generate one`);
                setTimeout(()=>{
                    router.push(`${ENV.KRATOS_HOST}/self-service/registration/browser`)
                }, 1000)
            }
            console.log({err})
        })
    }
    return (
        <Layout>
            <div className="grid grid-cols-10">
                <div className="col-span-3"></div>
                <div className="col-span-4">
                    <div className="bg-white border border-gray-200 p-3 rounded-lg">
                        <h1 className="text-lg font-bold text-gray-800">Sign Up</h1>
                        <hr className="my-2" />
                        <ErrorForm 
                            message={err_msg}
                        />
                        <form onSubmit={handleSubmit}>
                            <InputFields
                                label="Email"
                                type="email"
                                isAutoComplete={"off"}
                                value={email}
                                onChange={(e)=>set_email(e.target.value)}
                            />
                            <InputFields
                                label="Passwords"
                                type="password"
                                isAutoComplete={"off"}
                                value={password}
                                onChange={(e)=>set_password(e.target.value)}
                            />
                            <ButtonPrimary
                                className={"w-full rounded mt-3"}
                                text="Create new account"
                            />
                        </form>
                        <div className="cursor-pointer my-3 p-3 text-center" onClick={()=>router.push(`${ENV.KRATOS_HOST}/self-service/login/browser`)}>
                            Already have an account? <strong>Login here</strong>
                        </div>
                    </div>
                </div>
                <div className="col-span-3"></div>
            </div>
        </Layout>
    )
}


export default Registration