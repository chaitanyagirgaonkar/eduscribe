import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import todo from "../../assets/todo.png"
import ViewProject from './ViewProject.jsx';
import EditProject from './EditProject';


function DashboardProjectCard({ p, onDeleteProject, EditedProject }) {

    const [editProject, setEditProject] = useState(false)
    const [viewProject, setViewProject] = useState(false)

    const handleDelete = async (projectId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Project ?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`https://eduscribe-beryl.vercel.app/api/v1/project/${projectId}`);
                toast.success('Project deleted Successfully !');
                onDeleteProject(projectId);


            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleViewProject = () => {
        setViewProject(prev => !prev)
    }

    const handleEditProject = () => {
        setEditProject(false)
    }
    const projectDetails = {
        title: p?.title,
        description: p?.description,
        projectUrl: p?.projectUrl,
        githubUrl: p?.githubUrl,
        language: p?.language

    }

    const onEditProject = () => {
        EditedProject();
        setEditProject(false);
    };

    useEffect(() => {

    }, [setEditProject])

    return (
        <div className='flex flex-col border bg-white rounded-xl shadow-md  cursor-pointer shadow-blue-200'>
            <div className="flex items-center justify-center p-2">
                <h2 className="text-blue-500 text-xl font-semibold">{p.title}</h2>
            </div>
            <div>
                <img src={p?.coverImage?.url} alt="alt" />
            </div>

            <div className='flex  justify-evenly items-center p-3 text-blue-500'>
                <div>
                    <FaEdit size={30} className="cursor-pointer hover:text-blue-700" onClick={() => setEditProject(true)} />
                </div>
                <div>
                    <FaEye size={30} className="cursor-pointer hover:text-blue-700" onClick={() => setViewProject(true)} />
                </div>
                <div>
                    <MdDeleteOutline size={30} className="cursor-pointer hover:text-blue-700" onClick={() => handleDelete(p?._id)} />
                </div>
            </div>
            {
                editProject &&
                <EditProject onHandleEditProject={handleEditProject} projectId={p?._id} projectDetails={projectDetails} onEditProject={onEditProject} />
            }
            {
                viewProject &&
                <ViewProject projectId={p?._id} onHandleViewProject={handleViewProject} />
            }
            <Toaster />
        </div>
    )
}

export default DashboardProjectCard