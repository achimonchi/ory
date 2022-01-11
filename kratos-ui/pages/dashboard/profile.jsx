import { useEffect } from "react";
import Auth from "../../components/Auth/Auth";
import LayoutWithSidebar from "../../components/template/LayoutWithSidebar";

export default function Profile(){
    useEffect(()=>{
        window.localStorage.setItem("sidebar_active", "Profile");
    }, [])
    return (
        
        <div className="grid grid-cols-12 gap-3 p-3">
            <h1 className="text-lg">Profile</h1>
        </div>
    )
}

Profile.Layout = LayoutWithSidebar
Profile.SidebarActive = "Profile"