import DashboardProjectCard from './DashboardProjectCard'
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import AddProject from './AddProject';

function UserProject() {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [project, setProject] = useState([]);
    const location = useLocation();
    const { setChangeUserDetails } = useAuth()
    const [editProject, setEditProject] = useState(true)
    const [addProject, setAddProject] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')
    const [language, setLanguage] = useState()

    useEffect(() => {
        axiosPrivate
            .get('https://eduscribe.onrender.com/api/v1/project/projects')
            .then((res) => {
                if (Array.isArray(res.data.data)) {
                    setProject(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
                navigate('/login', { state: { from: location }, replace: true });
            });
    }, [editProject]);

    const handleDeleteProject = (projectId) => {
        setProject(project.filter((p) => p._id !== projectId));
        setChangeUserDetails(prev => !prev)
    };

    const handleAddNote = () => {
        setAddProject(prev => !prev)
    }
    const handleProjectAdded = (newProject) => {

        setProject([...project, newProject]);
        setChangeUserDetails(prev => !prev)

    };

    const EditedProject = () => {
        setEditProject(prev => !prev)
    };


    const filteredProjects = project.filter(project =>
        (project.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!language || project.language === language)
    )

    return (
        <div>
            <div className="bg-white flex justify-between items-end pt-3 pl-3 pr-3">
                <div className='flex sm:flex-row flex-col gap-3'>
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
                        className='w-full border border-blue-500 p-1 rounded-md px-5'
                        placeholder='Search..'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="border border-blue-500 rounded-lg bg-blue-500 text-white px-4 py-2" onClick={() => setAddProject(true)}>Add Project</button>
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-5 bg-white p-5 ">
                {filteredProjects.map((p, index) => (
                    <DashboardProjectCard key={index} p={p} onDeleteProject={handleDeleteProject} EditedProject={EditedProject} />
                ))}

            </div>
            {
                addProject &&
                <AddProject onHandleAddProject={handleAddNote} onProjectAdded={handleProjectAdded} />
            }
        </div>

    )
}

export default UserProject
