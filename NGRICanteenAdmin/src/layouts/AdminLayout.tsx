import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

import { Outlet } from "react-router-dom";

export default function AdminLayout(){

    return(

        <div className="min-h-screen bg-slate-100">

            <Sidebar/>

            <div className="ml-64 min-h-screen flex flex-col">

                <Navbar/>

                <main className="flex-1 overflow-y-auto p-8">

                    <Outlet/>

                </main>

            </div>

        </div>

    );

}