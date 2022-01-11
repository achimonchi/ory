import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonPrimary } from "../../components/forms/Button";
import ErrorForm from "../../components/forms/ErrorForm";
import { InputFields } from "../../components/forms/InputFields";
import Layout from "../../components/template/Layout";
import { ENV, Status } from "../../utils/config";

export default function Login(){
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const [err_msg, set_err_msg] = useState("");
    const router = useRouter()
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        axios.get(`${ENV.KRATOS_HOST}/self-service/login/flows?id=${router.query.flow}`,{
            withCredentials:true
        }).then((res)=>{
            const csrfToken = res.data.ui.nodes[0].attributes.value;
            const data = {
                method: "password",
                password:password,
                password_identifier:email,
                csrf_token:csrfToken,
            }
            axios.post(`${ENV.KRATOS_HOST}/self-service/login?flow=${router.query.flow}`, data, {
                withCredentials:true
            }).then((res1)=>{
                alert("Login Success")
                router.push("/")
            }).catch((err)=>{
                // alert("Login Fail")
                const errMsg = err?.response?.data?.ui?.messages ?? []
                let errMsgStr = ""

                errMsg.map((er)=>{
                    errMsgStr += er.text
                })

                set_err_msg("Login Failed ! "+errMsgStr);

                console.log({errMsg, errMsgStr})
                console.log({err, status:err.status})
            })
        }).catch((err)=>{
            const status = err?.response?.status ?? 500
            if (status === Status.Gone.status){
                set_err_msg(`${Status.Gone.message} Please wait a second to generate one`);
                setTimeout(()=>{
                    router.push(`${ENV.KRATOS_HOST}/self-service/login/browser`)
                }, 1000)
            }
            console.log({err, status})
        })
    }

    return (
        <Layout>
            <div className="grid grid-cols-10">
                <div className="col-span-3"></div>
                <div className="col-span-4">
                    <div className="bg-white border border-gray-200 p-3 rounded-lg">
                        <h1 className="text-lg font-bold text-gray-800">Login</h1>
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
                                text="Login"
                            />
                        </form>
                        <div className="cursor-pointer my-3 p-3 text-center" onClick={()=>router.push(`${ENV.KRATOS_HOST}/self-service/registration/browser`)}>
                            Doesnt have an account? <strong>Register Now</strong>
                        </div>
                    </div>
                </div>
                <div className="col-span-3"></div>
            </div>
        </Layout>
    )
}