import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonPrimary } from "../../components/forms/Button";
import { InputFields } from "../../components/forms/InputFields";
import Layout from "../../components/template/Layout";
import { ENV } from "../../utils/config";

export default function Login(){
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
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
                alert("Login Fail")
                console.log({err})
            })
            console.log({res, csrfToken})
        }).catch((err)=>{
            console.log({err})
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
                    </div>
                </div>
                <div className="col-span-3"></div>
            </div>
        </Layout>
    )
}