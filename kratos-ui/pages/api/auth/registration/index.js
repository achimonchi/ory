import axios from "axios";
import { ENV } from "../../../../utils/config";


export default async function registration(req,res){
    const {body, cookies} = req;
    const result = await post(body, "csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab=kASAxJL15q0Iv4lYXkYyryoxXdFn72VPQlIMHoqUd9c=; Max-Age=31536000; Path=/; HttpOnly; SameSite=Lax; Domain=localhost")
    // console.log({cookies, body, result})
    res.status(200).json({name:ENV.KRATOS_HOST, result, cookies:cookies["csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab"]})
}

const post=async(data, cookies)=>{
    try {
        // const res = await axios.post(`${ENV.KRATOS_HOST}/self-service/registration?flow=${data.flow}`, data, {
        //     withCredentials:true,
        //     headers: {
        //         cookies:cookies
        //     }
        // });
        // const res = await ory
        return {flag: true, result : res}
    } catch (error) {
        console.log({error:error?.response?.data ?? "Error"})
        return {flag : false, error: error}
    }
}