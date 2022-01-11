
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "../../action/auth";
import Auth from "../../components/Auth/Auth";
import { InputFields } from "../../components/forms/InputFields";
import Layout from "../../components/template/Layout";
import LayoutWithSidebar from "../../components/template/LayoutWithSidebar";
import SideBar from "../../components/template/partials/SideBar";


export default function Dashboard(){
    const [session, set_session] = useState("")
    const [profile, set_profile] = useState({})
    const [loading, set_loading] = useState(true);
    useEffect(async()=>{
        set_loading(true)
        const res = await getSession();
        if(res.flag){
            set_session(JSON.stringify(res.data, null, 4))
            set_profile(res.data.identity)
        } 
        setTimeout(()=>{
            set_loading(false)
        }, 200)
    }, [])

    if(loading){
        return <h1 className="text-lg">Loading ...</h1>
    } else {
        return (
            <content className="grid grid-cols-12 gap-3">
                <div className="col-span-8">
                    <div className="bg-white p-3 rounded-xl">
                        <h1 className="text-lg">My Login Session</h1>
                        <hr className="my-2" />
                        <pre className="text-xs h-64 overflow-y-auto bg-white p-3 rounded-lg">
                            {session}
                        </pre>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="bg-white p-3 rounded-xl">
                        <h1 className="text-lg">My Profile</h1>
                        <hr className="my-2" />
                        <InputFields
                            value={profile.id}
                            label={"ID"}
                            disabled={true}
                            
                        />
                        <InputFields
                            value={profile.traits?.email}
                            label={"Email"}
                            disabled={true}
                            
                        />
                    </div>
                </div>
            </content>
        )
    }
}

Dashboard.Layout = LayoutWithSidebar
Dashboard.SidebarActive = "Dashboard"