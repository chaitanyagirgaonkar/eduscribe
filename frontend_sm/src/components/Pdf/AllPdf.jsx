// import axios from 'axios'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PdfCard from './PdfCard'

function AllPdf() {
    const axiosPrivate = useAxiosPrivate()
    const [pdf, setPdf] = useState([])
    const navigate = useNavigate()
    const location = useLocation
    const [searchTerm, setSearchTerm] = useState('')
    const [semester, setSemester] = useState()


    const filteredProducts = pdf.filter(pdf =>
        (pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pdf.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!semester || pdf.semester === parseInt(semester))
    )

    useEffect(() => {
        axiosPrivate.get("https://eduscribe-beryl.vercel.app/api/v1/pdfs/")
            .then((res) => {
                if (Array.isArray(res.data.data)) {
                    setPdf(res.data.data);
                } else {

                    // Handle the situation where data received is not an array
                }
            })
            .catch((err) => {
                console.log(err);
                navigate('/login', { state: { from: location }, replace: true })
            });
    }, []);



    return (
        <div className=' rounded-lg bg-[#f5f5f5] p-5'>
            <div className=' flex justify-between items-center gap-5 bg-white mb-3 rounded-lg   p-3  '>
                <h1 className='text-blue-500 text-lg font-semibold'>Note's</h1>
                <div className='flex sm:flex-row flex-col gap-5 justify-end w-full'>
                    <select
                        className="border border-gray-300 rounded-md px-2 py-1 outline-blue-500 focus:outline-none placeholder:text-sm placeholder:text-gray-400"
                        onChange={(e) => setSemester(e.target.value)}
                        value={semester}
                    >
                        <option value="">Select Semester</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
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

                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 ">
                    {pdf &&
                        filteredProducts.map((p, index) =>
                            <PdfCard key={index} p={p} />
                        )
                    }



                </div>
            </div>
        </div>
    )
}

export default AllPdf
