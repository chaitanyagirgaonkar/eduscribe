import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../../App.css'
import useDownloadPdf from '../../hooks/useDownloadPdf'
import useAuth from "../../hooks/useAuth.js"

function PdfOne() {
    const { pdfId } = useParams()
    const [pdf, setPdf] = useState([])
    const { sidebar } = useAuth()

    useEffect(() => {
        axios.get(`/v1/pdfs/${pdfId}`)
            .then((res) => {
                // console.log(res.data.data)
                setPdf(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const handleDownload = (pdfUrl) => {
        useDownloadPdf(pdfUrl)
    }

    return (
        <div className='bg-[#f5f5f5] p-5'>
            <div className='grid sm:grid-cols-2 grid-cols-1 justify-between bg-white flex-row rounded-lg w-full sm:p-8 p-3 sm:gap-0 gap-5'>
                <div className={`flex-1 rounded-lg ${!sidebar && "sm:w-[450px] sm:h-[500px]"} sm:w-[500px] sm:h-[500px] bg-[#f5f5f5]  overflow-hidden`}>

                    <img src={`${pdf?.coverImage?.url}`} alt="" className='sm:hidden block' />

                    <embed src={`${pdf?.pdfFile?.url}#toolbar=0`} className="sm:block hidden overflow-auto  " type="application/pdf" width="104%" height="104%" />
                </div>
                <div className='bg-[#f5f5f5] rounded-lg p-5 flex flex-col gap-3 justify-between'>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-semibold text-md '><span className='text-lg font-semibold text-black'>Title : </span>{pdf?.title}</h1>
                        <h1> <span className='text-lg font-semibold text-black'>Description :</span>{pdf?.description}</h1>
                        <h1> <span className='text-lg font-semibold text-black'>Subject : </span>{pdf?.subject}</h1>
                        <h1> <span className='text-lg font-semibold text-black'>Semester :</span> {`${pdf?.semester}`}</h1>
                        <h1> <span className='text-lg font-semibold text-black'>Uploaded By :</span> {`${pdf?.uploadBy}`}</h1>
                    </div>
                    <div className=' flex items-center justify-center'>
                        <button className='bg-blue-500 text-white px-3 py-2 rounded-md ' onClick={() => handleDownload(pdf?.pdfFile?.url)}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PdfOne
