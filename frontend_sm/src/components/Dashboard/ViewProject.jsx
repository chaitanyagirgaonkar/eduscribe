import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft } from "react-icons/fa6";
import useDownloadPdf from '../../hooks/useDownloadPdf';

function ViewProject({ projectId, onHandleViewProject }) {

    const [project, setProject] = useState([])

    useEffect(() => {
        axios.get(`https://eduscribe-beryl.vercel.app/api/v1/project/${projectId}`)
            .then((res) => {
                // console.log(res.data.data)
                setProject(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-600 bg-opacity-60 backdrop-filter backdrop-blur-lg">
            <div className="relative w-[80%]  bg-white rounded-md " >
                <div className='flex justify-between items-center p-2'>
                    <FaArrowLeft size={40} className="hover:bg-[#f5f5f5] cursor-pointer p-2 rounded-full" onClick={() => onHandleViewProject()} />
                </div>
                <div className='grid grid-row-2  gap-4  bg-white  rounded-lg w-full p-5'>
                    <div className='rounded-lg shadow-md w-1/2 items-center mx-auto'>
                        <img src={project?.coverImage?.url} alt="" className='rounded-lg ' />
                    </div>
                    <div className='bg-[#f5f5f5] rounded-lg p-3 flex flex-col gap-3'>
                        <h1 className=' text-lg'><span className='font-semibold text-xl'>Title : </span>{project.title}</h1>
                        <h1 className=' text-lg'><span className='font-semibold text-xl'>Description  : </span>{project.description}</h1>
                        <h1 className=' text-lg'><span className='font-semibold text-xl'>Language  : </span>{project.language}</h1>
                        <h1 className=' text-lg text-blue-700'><span className=' text-black font-semibold text-xl '>Demo : </span><span className='underline'><Link to={project?.projectUrl} target="blank">{project.projectUrl}</Link></span></h1>
                        <h1 className=' text-lg'><span className='font-semibold text-xl'>Uploaded By : </span>{project.uploadBy}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProject