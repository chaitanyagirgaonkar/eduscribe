import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../../api/axios'
import ProjectCard from './ProjectCard'

function AllProject() {
    const [searchTerm, setSearchTerm] = useState('')
    const [project, setProject] = useState([])
    const [language, setLanguage] = useState()

    const filteredProjects = project.filter(project =>
        (project.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!language || project.language === language)
    )

    useEffect(() => {
        axiosPrivate.get("https://eduscribe-beryl.vercel.app/api/v1/project/")
            .then((res) => {
                // console.log(res.data.data)
                setProject(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className=' rounded-lg bg-[#f5f5f5] p-5'>
            <div className=' flex justify-between items-center gap-5 bg-white mb-3 rounded-lg   p-3  '>
                <h1 className='text-blue-500 text-lg font-semibold'>Project's</h1>
                <div className='flex sm:flex-row flex-col gap-5 justify-end w-full'>
                    <select
                        className="border border-gray-300 rounded-md px-2 py-1 outline-blue-500 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        onChange={(e) => setLanguage(e.target.value)}
                        value={language}
                    >
                        <option value="">Select Language</option>
                        <option>HTML</option>
                        <option>JavaScript</option>
                        <option>ReactJs</option>
                        <option>Angular</option>
                        <option>MERN</option>

                    </select>
                    <input type="text"
                        className='sm:w-[25%] border border-blue-500 p-1 rounded-md px-5'
                        placeholder='Search with subject or title..'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div>

                <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 p-3">
                    {project &&
                        filteredProjects.map((p, index) =>
                            <ProjectCard key={index} p={p} />
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default AllProject
