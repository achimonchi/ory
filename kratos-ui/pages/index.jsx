import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Layout from "../components/template/Layout"
import { ENV } from "../utils/config"

import ory from "../pkg/sdk/index"
import axios from "axios"

export default function Home(props) {
  const router = useHistory()
  const [session, set_session] = useState("")
  const [has_session, set_has_session] = useState(false);
  const [logout_token, set_logout_token] = useState("");

  const move = (link)=>{
    window.location.href= link
  }

  useEffect(()=>{
    axios.get(`http://localhost:4433/sessions/whoami`, {
      withCredentials:true,
    }).then((res)=>{
      set_session(JSON.stringify(res.data, null, 2));
      set_has_session(true)
      axios.get(`${ENV.KRATOS_HOST}/self-service/logout/browser`,{
        withCredentials:true
      })
        .then((res)=>{
          console.log({res:res.data})
          set_logout_token(res.data.logout_token)
        })
        .catch((err)=>{
          console.log({err})
        })
      console.log({res})
    }).catch((err)=>{
      set_has_session(false);
      console.log({err})
    })
    
  }, [])

  const logout=(logout_token_params)=>{
    axios.get(`${ENV.KRATOS_HOST}/self-service/logout?token=${logout_token_params}`, {
      withCredentials:true
    }).then((res)=>{
      console.log({res})
      alert("Logout Success !")
      set_has_session(false)
      set_session("")
      set_logout_token("")
    }).catch((err)=>{
      console.log({err})
    })
  }
  return (
    <Layout>
      <div className="grid grid-cols-12 gap-3 mt-4">
        <div className="col-span-4 flex flex-col justify-between bg-white p-3 rounded-lg border border-gray-100">
          <div>
            <h1 className="mb-3">Navbar</h1>
            <div onClick={()=>move(`${ENV.KRATOS_HOST}/self-service/registration/browser`)} className="border mb-3 rounded-lg p-3 cursor-pointer">
              Registration 
            </div>
            <div onClick={()=>move(`${ENV.KRATOS_HOST}/self-service/login/browser`)} className="border mb-3 rounded-lg p-3 cursor-pointer">
              Login
            </div>
            {
              has_session
                ? <div onClick={()=>move("/dashboard")} className="border mb-3 cursor-pointer rounded-lg p-3 cursor-pointer">
                Dashboard
              </div>
                : ""
            }
          </div>
          <div>
            {
              has_session
                ? <div onClick={()=>logout(logout_token)} className="bg-red-500 text-white p-3 text-center rounded-lg">
                Logout 
              </div>
              : ""
            }
          </div>
        </div>
        <div className="col-span-8">
          <div className="">
            <h1 className="mb-3">Session Active</h1>
            <div className="border bg-gray-200 p-4 text-xs h-80 overflow-y-auto rounded-lg p-5">
              {
                session !== null && session !== ""
                  ? <pre>{session}</pre>
                  : "No Session Active"
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}