
import Layout from "../../components/template/Layout"
import {InputFields} from "../../components/forms/InputFields"
import { useEffect, useState } from "react"
import { ButtonPrimary } from "../../components/forms/Button";
import { ENV } from "../../utils/config";
import {useRouter} from "next/router"
import axios from "axios"
import ory from "../../pkg/sdk/index"


function Registration(){
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const router = useRouter()
    
    const [flow, set_flow] = useState("")

    useEffect(()=>{

    })
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const url = `http://localhost:4433/self-service/registration/flows?id=${router.query.flow}`

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
            axios.post(`http://localhost:4433/self-service/registration?flow=${router.query.flow}`, data, {
                withCredentials:true
            })
            .then((res1)=>{
                alert("registration success !");
                router.push("/")
                console.log({res1})
            })
            .catch((err)=>{
                console.log({err1:err})
            })
            console.log({res, data})
        })
        .catch((err)=>{
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
                    </div>
                </div>
                <div className="col-span-3"></div>
            </div>
        </Layout>
    )
}


export default Registration