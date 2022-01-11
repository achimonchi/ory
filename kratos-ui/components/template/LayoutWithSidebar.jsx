import { useEffect, useState } from "react";
import Layout from "./Layout";
import SideBar from "./partials/SideBar";


export default function LayoutWithSidebar({sidebar_active_name,children}){
    return (
        <Layout>
            <div className="grid-cols-12 grid gap-3">
                <div className="col-span-3">
                    <SideBar sidebar_active_name={sidebar_active_name}/>
                </div>
                <div className="col-span-9">
                    {children}
                </div>
            </div>
        </Layout>
    )
}