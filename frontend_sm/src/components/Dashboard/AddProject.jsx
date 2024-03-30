import axios from 'axios';
import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';

function AddProject({ onHandleAddProject, onProjectAdded }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [projectUrl, setProjectUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [language, setLanguage] = useState("");
    const [thumbnail, setThumbnail] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("projectUrl", projectUrl)
        formData.append("githubUrl", githubUrl)
        formData.append("language", language)
        formData.append("coverImage", thumbnail)
        try {
            const res = await axios.post("/v1/project/create", formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                })
            // console.log(res)
            toast.success("Project Added Successfully !")
            // alert("Note Added Successfully !")
            onHandleAddProject()
            onProjectAdded(res.data.data)



        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-600 bg-opacity-60 backdrop-filter backdrop-blur-lg">
            <div className="relative w-[90%] md:w-[50%] bg-white rounded-md " >
                <div className='flex justify-between items-center p-2'>
                    <h1 className='font-bold text-xl text-blue-500'>AddProject</h1>
                    <IoMdClose size={40} className="hover:bg-[#f5f5f5] cursor-pointer p-2 rounded-full" onClick={() => onHandleAddProject()} />
                </div>
                <hr />
                <div>
                    <form onSubmit={handleSubmit} className=''>
                        <div className=" p-5 flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <label className="">Title</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                    placeholder="Enter Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="">Description</label>
                                <textarea
                                    type="text"
                                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                    placeholder="Enter Description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="">Demo Url</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                    placeholder="Enter Demo Url"
                                    onChange={(e) => setProjectUrl(e.target.value)}
                                    value={projectUrl}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="">Github Url</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                    placeholder="Enter Github Url"
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    value={githubUrl}
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="">Language</label>
                                <select
                                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
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
                            </div>
                            <div className="flex flex-col">
                                <label className="">Thumbnail</label>
                                <input
                                    type="file"
                                    className="border border-gray-300 rounded-md px-2 py-1  focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                                    placeholder="Upload a img for Project Thumbnail"
                                    required
                                    accept='image/*'
                                    onChange={(e) => { setThumbnail(e.target.files[0]) }}
                                />
                            </div>

                            <div className='mx-auto'>
                                <button className='bg-blue-500 px-6 py-2 rounded-lg shadow-lg text-white hover:bg-blue-700'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProject