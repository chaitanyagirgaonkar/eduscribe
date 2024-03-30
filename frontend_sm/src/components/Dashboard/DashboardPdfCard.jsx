import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import EditPdf from './EditPdf';
import ViewPdf from './ViewPdf';


function DashboardPdfCard({ p, onDeletePdf, onEditPdf }) {

    const [editPdf, setEditPdf] = useState(false)
    const [viewPdf, setViewPdf] = useState(false)


    const handleDelete = async (pdfId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Note?');
        if (confirmDelete) {
            try {
                const response = await axios.delete(`/v1/pdfs/${pdfId}`);
                toast.success('Note deleted Successfully !');
                onDeletePdf(pdfId);


            } catch (err) {
                console.log(err);
            }
        }
    };
    const handleEditNote = (fal) => {
        setEditPdf(fal)
    }
    const handleEditPdf = () => {
        onEditPdf();
        setEditPdf(false);
    };

    const handleViewNote = () => {
        setViewPdf(false)
    }
    const pdfDetails = {
        title: p?.title,
        description: p?.description,
        subject: p?.subject,
        semester: p?.semester,

    }
    useEffect(() => {

    }, [setEditPdf])


    return (
        <div className="w-[80%] border rounded-lg m-auto cursor-pointer ">
            <div className="flex items-center justify-center p-2">
                <h2 className="text-blue-500 text-xl font-semibold">{p.title}</h2>
            </div>
            <img src={p?.coverImage?.url} alt="" className="" />
            <div className="flex p-2 justify-center items-center gap-5 text-blue-500">
                <div>
                    <FaEdit size={30} className="cursor-pointer hover:text-blue-700" onClick={() => setEditPdf(true)} />
                </div>
                <div>
                    <FaEye size={30} className="cursor-pointer hover:text-blue-700" onClick={() => setViewPdf(true)} />
                </div>
                <div>
                    <MdDeleteOutline size={30} className="cursor-pointer hover:text-blue-700" onClick={() => handleDelete(p?._id)} />
                </div>
            </div>

            {
                editPdf &&
                <EditPdf onHandleEditNote={handleEditNote} pdfId={p?._id} pdfDetails={pdfDetails} onHandleEditPdf={handleEditPdf} />
            }
            {
                viewPdf &&
                <ViewPdf pdfId={p?._id} onHandleViewNote={handleViewNote} />
            }
            <Toaster />
        </div>
    );
}

export default DashboardPdfCard;
