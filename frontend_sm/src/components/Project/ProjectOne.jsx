import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from "axios"


function ProjectOne() {

    const { projectId } = useParams()
    const [project, setProject] = useState([])

    useEffect(() => {
        axios.get(`https://eduscribe.onrender.com/api/v1/project/${projectId}`)
            .then((res) => {
                console.log(res.data.data)
                setProject(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className='bg-[#f5f5f5] p-3 w-full'>
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
    )
}

export default ProjectOne