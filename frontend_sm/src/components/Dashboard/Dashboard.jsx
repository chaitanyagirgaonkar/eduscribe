import React, { useEffect, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom"
import axios from "axios"
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { FaEdit } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

function Dashboard() {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const [pdf, setPdf] = useState([])
    const location = useLocation
    const { changeUserDetails } = useAuth()
    const [userPdf, setUserPdf] = useState()
    const [userProject, setUserProject] = useState()

    useEffect(() => {
        axios.get('/v1/users/current-user')
            .then((res) => {

                setUser(res.data.data)


            })
            .catch((err) => {
                console.log(err);
                navigate('/login', { state: { from: location }, replace: true })
            })
    }, [])



    useEffect(() => {
        axios.get("/v1/dashboard/stats")
            .then((res) => {
                setUserPdf(res.data.data.userPdf[0].totalPdf)
                setUserProject(res.data.data.userProject[0].totalProject)
            })
            .catch((err) => console.log(err))
    }, [changeUserDetails])

    return (
        <div className=' rounded-lg bg-[#f5f5f5] h-screen p-5'>
            <div className='  rouded-lg  flex flex-col gap-5'>
                <div className='p-3 bg-white rounded-lg shadow-sm flex  justify-between'>
                    <div className='flex sm:flex-row flex-col sm:gap-10 gap-5 sm:items-center items-start'>
                        <div className=''>

                            <FaUserCircle size={100} className="text-blue-500" />

                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{user?.username}</h1>
                            <p className='text-lg'>{user?.collegeName}</p>
                            <p className='text-lg'>{user?.email}</p>

                            <p>{userPdf} Notes {userProject} Projects</p>
                        </div>
                    </div>

                </div>
                <div className=' flex flex-col'>
                    <div className='p-5 rounded-lg bg-white'>
                        <ul className='  flex gap-5'>
                            <li className='cursor-pointer'><Link to="/container/dashboard">Notes</Link></li>
                            <li className='cursor-pointer'><Link to="/container/dashboard/user-project">Project</Link></li>
                        </ul>
                    </div>
                    <hr />
                    <Outlet />

                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Dashboard