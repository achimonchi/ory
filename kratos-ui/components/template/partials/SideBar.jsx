import { useRouter } from "next/router"

import { TiThLarge, TiUser, TiCog, TiGroup } from "react-icons/ti";
import { logoutToken } from "../../../action/auth";

export default function SideBar({sidebar_active_name}){
    const menu = [
        {label :"Dashboard", url : "/dashboard", icon: <TiThLarge size="24"/>},
        {label :"Profile", url : "/dashboard/profile", icon: <TiUser size="24"/> },
        {label :"Identities", url : "/dashboard/identities", icon: <TiGroup size="24"/> },
        {label :"Settings", url : "/dashboard/settings", icon: <TiCog size="24"/> }
    ]
    const router = useRouter();

    const move=(link)=>{
        router.push(link)
    }

    const logout=async()=>{
        const r = await logoutToken();
        if(r.flag){
            alert("Logout Success !");
            router.push("/")
        } else {
            alert("Logout fail !")
        }
    }
    return (
        <section id="sidebar" className="shadow-lg shadow-gray-200 p-3 bg-white rounded rounded-xl">
            <h1 className="text-lg p-2 text-center">IAM and RBAC Testing</h1>
            <hr />
            <ul>
                {
                    menu.map((m)=>(
                        <>
                            <li>{listNavbar(m, move, sidebar_active_name)}</li>
                        </>
                    ))
                }
                <hr />
                <li>
                    <button className="border border-red-300 p-2 w-full rounded-lg my-4 text-red-500 hover:bg-red-500 hover:text-white duration-200" onClick={()=>logout()}>
                        Logout
                    </button>
                </li>
            </ul>
        </section>
    )
}

const listNavbar=({label, url, icon}, move, sidebar_active_name)=>{

    return (
        <div onClick={()=>move(url)} className={`cursor-pointer flex items-center hover:shadow-md duration-200 hover:border-yellow-300 border border-white hover:shadow-gray-200 pointer-cursor my-2 p-3 rounded-lg  ${
            sidebar_active_name === label
                ? " font-bold text-gray-800"
                : " text-slate-400 "
        }`}>
            <span className={`mx-1 p-1 rounded-lg ${
                sidebar_active_name === label
                    ? "bg-yellow-300 "
                    : ""
            }`}>{icon}</span>
            <span className="mx-1">{label}</span>
        </div>
    )
}