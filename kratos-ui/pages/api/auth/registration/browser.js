import axios from "axios";
import { ENV } from "../../../../utils/config";
import ory from "../../../../pkg/sdk"

export default async function browserFlow(req,res){
    const {cookies, query} = req;
    console.log({cookies, query})
    const url = `http://localhost:4433/self-service/registration/flows?id=${query?.flow}`;
    // console.log({url})
    try {
        const result = await axios.get(url+"?id="+query?.flow, {
            withCredentials:true,
            headers:{
                cookies:"csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab=UdUsbxL4RT+PGSN/1HFTJALDKyuyUKT8SreBTKMI8qg=",
                // "X-CSRF-Token":"csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab=MFU55TT6LCFZaA7usNhp/ffB6r3X/Alh8iV7yl7QcA0=;"
            }
        })
        fetch(url, {
            method:"GET",
            credentials:"include",
            mode:"no-cors",
            headers:{
                "Access-Control-Allow-Credentials" : true,
                "Access-Control-Allow-Origin" : "*"
                // 'X-CSRF-Token': 'csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab=UdUsbxL4RT+PGSN/1HFTJALDKyuyUKT8SreBTKMI8qg=; Max-Age=31536000; Path=/; HttpOnly; SameSite=Lax; Domain=localhost',
            }
        }).then(async(r)=>{
            const t = await r.json()
            // return t
            console.log({t})
            res.status(200).json({url,t})
        }).catch(err=>{
            console.log({err})
            res.status(200).json({url, err})
            
        })
        // const res = await ory.getSelfServiceRegistrationFlow(query.flow, cookies["csrf_token_82b119fa58a0a1cb6faa9738c1d0dbbf04fcc89a657b7beb31fcde400ced48ab"])

        // console.log({result})
        // res.status(200).json({url, result})

    } catch (error) {
        console.log({err:error?.response})
        res.status(200).json({error:error?.response?.data?.error,url})
    }
}