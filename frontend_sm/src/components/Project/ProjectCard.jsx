import React from 'react'
import { Link, useNavigate } from "react-router-dom"

function ProjectCard({ p }) {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col border bg-white rounded-xl shadow-md hover:scale-105 shadow-blue-200'>
            <div className="flex items-center justify-center p-2">
                <h2 className="text-blue-500 text-xl font-semibold">{p.title}</h2>
            </div>
            <div>
                <img src={p?.coverImage?.url} alt="alt" />
            </div>

            <div className='flex  justify-evenly items-center p-3 text-blue-500'>
                <button className='border border-blue-500 rounded-md px-4 py-2' onClick={() => navigate(`/container/project/${p._id}`)}>View</button>
                <button className='border border-blue-500 rounded-md px-3 py-2' ><Link to={p.projectUrl} target="blank">Demo</Link></button>
            </div>

        </div>
    )
}

export default ProjectCard