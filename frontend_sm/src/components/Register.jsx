import React, { useState, useEffect, useRef } from 'react'
import registerImg from '../assets/register.svg'
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { IoKeyOutline, IoSchoolOutline } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';



const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;


function Register() {

    const navigate = useNavigate()
    const userRef = useRef()
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [clgName, setClgName] = useState('')
    const [errMsg, setErrMsg] = useState("")
    const [combineOtp, setCombineOtp] = useState()

    useEffect(() => {
        userRef.current.focus()
    }, [])
    const handleSendOtp = async () => {
        try {
            const response = await axios.post('/v1/users/sendotp',
                JSON.stringify({ email }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )
            // console.log(JSON.stringify(response.data));
            toast.success("OTP send to your Email.")
        } catch (err) {

            if (!err?.response) {
                toast.error("No Server Response")
            } else if (err.response?.status === 409) {
                toast.error("User with email exists")
            }
            else if (err.response?.status === 400) {
                toast.error("Email is required !")
            }
            else if (err.response?.status === 401) {
                toast.error("Enter Valid Email !")
            }
        }
    }
    const handleRegister = async () => {
        if (!USER_REGEX.test(user)) {
            toast.error("Username must be 4-24 characters, starting with a letter.")
            return;
        }
        if (!PWD_REGEX.test(pwd)) {
            toast.error("Password must be 8-24 characters, containing uppercase and lowercase letters, a number, and a special character.")
            return;
        }
        if (!EMAIL_REGEX.test(email)) {
            toast.error("Enter Valid Email")
            return;
        }
        try {
            const response = await axios.post('/v1/users/register',
                JSON.stringify({ username: user, email, password: pwd, collegeName: clgName, otp: combineOtp }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            )
            // console.log(response?.data);
            // console.log(JSON.stringify(response));
            toast.success("User Register Successfully")
            setUser("")
            setPwd("")
            setEmail("")
            setClgName("")
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } catch (err) {

            if (!err?.response) {
                toast.error("No Server Response")
            } else if (err.response?.status === 409) {
                toast.error("User with email or username already exists")
            } else if (err.response?.status === 405) {
                toast.error("Entered Otp Is InValid")
            }

        }
    }



    let currentOTPIndex = 0;


    const [otp, setOtp] = useState(new Array(4).fill(''));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0)


    const inputRef = useRef(null)
    const handleOnChange = (e) => {
        const value = e.target.value
        const newOtp = [...otp]
        newOtp[currentOTPIndex] = value.substring(value.length - 1)
        setOtp([...newOtp])
        const combine = newOtp.join("")
        setCombineOtp(combine)

        if (!value) setActiveOTPIndex(currentOTPIndex - 1)
        else setActiveOTPIndex(currentOTPIndex + 1)
    }



    useEffect(() => {
        inputRef.current?.focus()
    }, [activeOTPIndex])

    const handleOnKeyDown = (e, index) => {
        currentOTPIndex = index;

        if (e.key === "Tab" || e.key === "ArrowRight") {
            e.preventDefault();
            setActiveOTPIndex((prevIndex) => (prevIndex < otp.length - 1 ? prevIndex + 1 : prevIndex));
        }

        if (e.key === "Backspace" && !e.target.value) {
            e.preventDefault();
            setActiveOTPIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        }

        if (e.key === "ArrowLeft") {
            e.preventDefault();
            setActiveOTPIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        }
    };

    return (
        <div className='w-screen h-screen bg-[#f5f5f5] flex justify-center items-center sm:p-10 p-0'>
            <div className='bg-white grid sm:grid-cols-2 grid-cols-1 rounded-xl  w-[80%] shadow-xl '>
                <div className='hidden sm:block'>
                    <img src={registerImg} alt="" className='' />
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='flex flex-col p-3 sm:p-5 gap-3 items-center'>
                        <div>
                            <h1 className='text-2xl font-bold text-blue-500'>Register</h1>
                        </div>


                        <div className='flex flex-col justify-center mt-5 w-[90%]  '>
                            <input
                                type="text"
                                ref={userRef}
                                value={user}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                required
                                placeholder='Username'
                                className='cursor-pointer outline-blue-500 px-10 w-[100%] py-3 bg-[#f5f5f5]    rounded-md border border-blue-500' />
                            <CiUser size={24} className='absolute text-blue-500 ml-2' />

                        </div>
                        <div className='flex flex-col justify-center  w-[90%]  '>
                            <input
                                type="email"
                                placeholder='Email'
                                value={email}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='cursor-pointer outline-blue-500 px-10 w-[100%] py-3 bg-[#f5f5f5]    rounded-md border border-blue-500' />
                            <MdOutlineEmail size={24} className='absolute text-blue-500 ml-2' />
                        </div>
                        <div className='flex flex-col justify-center  w-[90%]  '>
                            <input
                                type="password"
                                placeholder='Password'
                                autoComplete="current-password"
                                value={pwd}
                                required
                                onChange={(e) => setPwd(e.target.value)}
                                className='cursor-pointer outline-blue-500 px-10 w-[100%] py-3 bg-[#f5f5f5]    rounded-md border border-blue-500' />
                            <IoKeyOutline size={24} className='absolute text-blue-500 ml-2' />
                        </div>
                        <div className='flex flex-col justify-center  w-[90%]  '>
                            <input
                                type="text"
                                placeholder='College Name'
                                required
                                value={clgName}
                                autoComplete="off"
                                onChange={(e) => { setClgName(e.target.value) }}
                                className='cursor-pointer outline-blue-500 px-10 w-[100%] py-3 bg-[#f5f5f5]    rounded-md border border-blue-500' />
                            <IoSchoolOutline size={24} className='absolute text-blue-500 ml-2' />
                        </div>
                        <div className='flex sm:flex-row flex-col justify-center sm:items-start items-center sm:gap-8 gap-3 mt-3'>

                            <div className='flex  gap-2  ' >
                                {otp.map(({ id }, index) => (
                                    <input
                                        key={index}
                                        ref={index === activeOTPIndex ? inputRef : null}
                                        type="Number"
                                        className=' outline-blue-500 transition spin-button-none bg-[#f5f5f5] w-[40px] h-[40px] p-3 border-b-2 border-blue-500  rounded-md'
                                        onChange={handleOnChange}
                                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                                        value={otp[index]}
                                        style={{
                                            WebkitAppearance: 'none',
                                            MozAppearance: 'textfield',
                                            margin: 0,
                                        }}
                                    />
                                ))}

                                <style jsx="true">{`input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button {-webkit-appearance: none;margin: 0;`}</style>
                            </div>
                            <div>
                                <button className='bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md text-white' onClick={handleSendOtp}>Send Otp</button>
                            </div>
                        </div>
                        <button className='bg-blue-700 mt-5 py-4 w-[90%]  text-white rounded-lg hover:bg-blue-800' onClick={handleRegister}>Register</button>
                        <p >Already have Account <Link to='/login' className='text-blue-500 underline'> Login </Link></p>
                    </div>
                    <Toaster />
                </form>
            </div>
        </div>
    )
}

export default Register
