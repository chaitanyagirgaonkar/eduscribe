import login from '../assets/login.svg'
import { CiUser } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import axios from "axios"
import React, { useState, useEffect, useRef } from 'react'
import useAuth from '../hooks/useAuth.js'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, Link, useLocation } from 'react-router-dom';


function Login() {
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const userRef = useRef()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        userRef.current.focus()
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/v1/users/login',
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            // console.log(response.data)
            const accessToken = response?.data?.accessToken;
            setAuth({ username, accessToken })
            toast.success("User Login Successfully !")
            setUsername("")
            setPassword("")
            setTimeout(() => {
                navigate(from, { replace: true })
            }, 2000);
        } catch (err) {
            if (!err?.response) {
                toast.error("No Server Response")
            } else if (err.response?.status === 400) {
                toast.error("Missing Username or Password")
            } else if (err.response?.status === 401) {
                toast.error("Unauthorized request")
            } else if (err.response?.status === 404) {
                toast.error("Invalid User Credentials.")
            }
        }
    }



    return (
        <div className='w-screen h-screen bg-[#f5f5f5] flex justify-center items-center sm:p-10 p-0 '>

            <div className='bg-white grid sm:grid-cols-2 grid-cols-1 rounded-xl  w-[80%] shadow-xl items-center'>
                <div className='hidden sm:block '>
                    <img src={login} alt="" className='' />
                </div>
                <form onSubmit={handleLogin}>
                    <div className='flex flex-col p-3 sm:p-5 gap-5 items-center ' >
                        <div>
                            <h1 className='text-2xl font-bold text-blue-500'>Login</h1>
                        </div>
                        <div className='flex flex-col justify-center mt-5 w-[90%]  '>
                            <input type="username"
                                ref={userRef} placeholder='Username'
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)} value={username}
                                required
                                className='cursor-pointer outline-blue-500 px-10 w-[100%] py-3 bg-[#f5f5f5]    rounded-md border border-blue-500' />
                            <CiUser size={24} className='absolute text-blue-500 ml-2' />
                        </div>

                        <div className='flex flex-col justify-center  w-[90%]  '>
                            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                autoComplete="new-password"
                                required className='cursor-pointer outline-blue-500 px-10 w-[100%] py-3 bg-[#f5f5f5]    rounded-md border border-blue-500' />
                            <IoKeyOutline size={24} className='absolute text-blue-500 ml-2' />
                        </div>
                        <button className='bg-blue-700 mt-5 py-4 w-[90%]  text-white rounded-lg hover:bg-blue-800'>Login</button>

                        <p >Don't have Account <Link to='/register' className='text-blue-500 underline'> Register </Link></p>
                    </div>
                </form>
                <Toaster />
            </div>
        </div>
    )
}

export default Login
