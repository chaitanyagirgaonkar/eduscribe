import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft } from "react-icons/fa6";
import useDownloadPdf from '../../hooks/useDownloadPdf';

function ViewPdf({ pdfId, onHandleViewNote }) {

    const [pdf, setPdf] = useState([])

    const handleDownload = (pdfUrl) => {
        useDownloadPdf(pdfUrl)
    }

    useEffect(() => {
        axios.get(`https://eduscribe.onrender.com/api/v1/pdfs/${pdfId}`, {
            withCredentials: true
        })
            .then((res) => {
                // console.log(res.data.data)
                setPdf(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-600 bg-opacity-60 backdrop-filter backdrop-blur-lg">
            <div className="relative w-[80%]  bg-white rounded-md " >
                <div className='flex justify-between items-center p-2'>
                    <FaArrowLeft size={40} className="hover:bg-[#f5f5f5] cursor-pointer p-2 rounded-full" onClick={() => onHandleViewNote()} />
                </div>
                <div className='grid sm:grid-cols-2 grid-cols-1 gap-2 bg-white p-5 pt-0 rounded-lg w-full '>
                    <div className='flex-1 rounded-lg sm:w-[500px] sm:h-[500px] bg-[#f5f5f5]  overflow-hidden'>

                        <img src={`${pdf?.coverImage?.url}`} alt="" className='sm:hidden block' />

                        <embed src={`${pdf?.pdfFile?.url}#toolbar=0`} className="sm:block hidden overflow-auto  " type="application/pdf" width="103%" height="103%" />
                    </div>
                    <div className='bg-[#f5f5f5] rounded-lg p-5 flex flex-col gap-3 justify-between'>
                        <div className='flex flex-col gap-3'>
                            <h1 className='font-semibold text-md '><span className='text-lg font-semibold text-black'>Title : </span>{pdf?.title}</h1>
                            <h1> <span className='text-lg font-semibold text-black'>Description :</span>{pdf?.description}</h1>
                            <h1> <span className='text-lg font-semibold text-black'>Subject : </span>{pdf?.subject}</h1>
                            <h1> <span className='text-lg font-semibold text-black'>Semester :</span> {`${pdf?.semester}`}</h1>
                            <h1> <span className='text-lg font-semibold text-black'>Upload By :</span> {`${pdf?.uploadBy}`}</h1>

                        </div>
                        <div className=' flex items-center justify-center'>
                            <button className='bg-blue-500 text-white px-3 py-2 rounded-md ' onClick={() => handleDownload(pdf?.pdfFile?.url)}>Download</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPdf
