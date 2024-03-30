import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useNavigate, Outlet, NavLink } from "react-router-dom"
import { GrNotes } from "react-icons/gr";
import { GoProjectSymlink } from "react-icons/go";
import { TfiArrowCircleRight } from "react-icons/tfi";
import useAuth from '../../hooks/useAuth';
import User from '../User/User';
import { FaRegUser } from "react-icons/fa6";

function SmSidebar() {
    const { sidebar, setSidebar, auth } = useAuth()
    const [profile, setProfile] = useState(false)

    const handleProfile = () => {
        const pro = !profile
        setProfile(pro)
    }

    return (

        <div className='bg-white  h-[100%]  w-[5%] pt-3 flex flex-col justify-between p-2'>
            <ul className="flex flex-col max-md:flex-row w-full gap-1">
                <div className='flex flex-col justify-between  items-center gap-2'>
                    <div className='flex flex-col-reverse gap-4'>
                        <NavLink
                            to={"/"}
                            className={({ isActive }) => `${isActive && "text-blue-500 bg-[#f5f5f5]"} flex justify-center   hover:text-blue-500 " hover:bg-[#f5f5f5] cursor-pointer px-4 py-2  w-[100%]  font-semibold mt-1 rounded-lg `}
                        >
                            <div className=" flex  items-center ">
                                {" "}
                                <AiOutlineHome size={22} className="" />
                            </div>

                        </NavLink>
                        <div className='flex justify-center items-center'>
                            {
                                sidebar &&
                                <TfiArrowCircleRight className='text-black border border-white hover:text-blue-500 hover:bg-[#f5f5f5] rounded-full bg-white  cursor-pointer ' size={22} onClick={() => setSidebar(!sidebar)} />
                            }


                        </div>
                    </div>
                    <div>
                        <NavLink
                            to={"/container/dashboard"}
                            className={({ isActive }) => `${isActive && "text-blue-500 bg-[#f5f5f5]"} flex justify-center    hover:text-blue-500 " hover:bg-[#f5f5f5] cursor-pointer px-4 py-2 w-[100%]  font-semibold mt-1 rounded-lg`}
                        >
                            <div className=" flex  items-center ">
                                {" "}
                                <FaRegUser size={22} className="" />
                            </div>

                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            to={"/container/all-pdf"}
                            className={({ isActive }) => `${isActive && "text-blue-500 bg-[#f5f5f5]"} flex justify-center    hover:text-blue-500 " hover:bg-[#f5f5f5] cursor-pointer px-4 py-2  w-[100%]  font-semibold mt-1 rounded-lg `}
                        >
                            <div className=" flex  items-center ">
                                {" "}
                                <GrNotes size={22} className="" />
                            </div>

                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            to={"/container/all-project"}
                            className={({ isActive }) => `${isActive && "text-blue-500 bg-[#f5f5f5]"} flex justify-center    hover:text-blue-500 " hover:bg-[#f5f5f5] cursor-pointer px-4 py-2 w-[100%]  font-semibold mt-1 rounded-lg`}
                        >
                            <div className=" flex  items-center ">
                                {" "}
                                <GoProjectSymlink size={22} className="" />
                            </div>

                        </NavLink>
                    </div>
                </div>
            </ul>
            <div className='flex'>
                {
                    auth.accessToken &&
                    <div className='text-blue-500  cursor-pointer hover:bg-[#f5f5f5] rounded-lg flex justify-center items-center ml-1' onClick={handleProfile}>
                        <FaUserCircle size={34} />
                    </div>
                }
                {
                    profile &&
                    <div className=''>
                        <User />
                    </div>
                }
            </div>
        </div>

    )
}

export default SmSidebar
