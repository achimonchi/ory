import axios from "axios"
import { useEffect, useState } from "react"
import LayoutWithSidebar from "../../../components/template/LayoutWithSidebar"
import { ENV } from "../../../utils/config"

export default function Identities(){
    const [identities, set_identities] = useState([])

    useEffect(async()=>{
        // axios.get(`http://localhost:4433/identities`, {
        //     withCredentials: true,
        //     headers:{
        //         "Access-Control-Allow-Origin" : true
        //     }
        // }).then((res)=>{
        //     set_identities(res.data)
        // }).catch((err)=>{
        //     set_identities([])
        //     console.log({err})
        // })
    }, [])

    return (
        <conten id="identities" className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
                <div className="bg-white p-3 rounded-xl">
                    <h1 className="text-lg">Identities</h1>
                    <hr className="my-2" />
                    <div class="flex flex-col">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden  border-gray-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created At
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    {
                                        identities.map((identity)=>(
                                            <tr>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="flex items-center">
                                                        reyhan@gmail.com
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                                                    <div class="text-sm text-gray-500">Optimization</div>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                    {/* <!-- More people... --> */}
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </conten>
    )
}


Identities.Layout = LayoutWithSidebar
Identities.SidebarActive = "Identities"