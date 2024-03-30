import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DashboardPdfCard from './DashboardPdfCard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AddPdf from './AddPdf';
import useAuth from '../../hooks/useAuth';

function UserPdf() {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [pdf, setPdf] = useState([]);
    const location = useLocation();
    const [AddNote, setAddNote] = useState(false)
    const [editPdf, setEditPdf] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [semester, setSemester] = useState()
    const { setChangeUserDetails } = useAuth()


    const filteredProducts = pdf.filter(pdf =>
        (pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pdf.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!semester || pdf.semester === parseInt(semester))
    )
    useEffect(() => {
        axiosPrivate
            .get('/v1/pdfs/pdfs')
            .then((res) => {
                if (Array.isArray(res.data.data)) {
                    setPdf(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
                navigate('/login', { state: { from: location }, replace: true });
            });
    }, [editPdf]);

    const handleDeletePdf = (pdfId) => {
        setPdf(pdf.filter((p) => p._id !== pdfId));
        setChangeUserDetails(prev => !prev)
    };

    const handleAddNote = (fal) => {
        setAddNote(fal)
    }
    const handlePdfAdded = (newPdf) => {

        setPdf([...pdf, newPdf]);
        setChangeUserDetails(prev => !prev)

    };

    const handleEditPdf = () => {
        setEditPdf(prev => !prev)
    };
    return (
        <div>
            <div className="bg-white flex justify-between items-end pt-3 pl-3 pr-3">
                <div className='flex sm:flex-row flex-col gap-3'>
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
                        className='w-full border border-blue-500 p-1 rounded-md px-5'
                        placeholder='Search..'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="border border-blue-500 rounded-lg bg-blue-500 text-white px-4 py-2" onClick={() => setAddNote(true)}>Add Notes</button>
            </div>
            <div className="grid sm:grid-cols-4 grid-cols-1 gap-2 bg-white p-5 ">
                {filteredProducts.map((p, index) => (
                    <DashboardPdfCard key={index} p={p} onDeletePdf={handleDeletePdf} onEditPdf={handleEditPdf} />
                ))}
            </div>

            {
                AddNote &&
                <AddPdf onHandleAddNote={handleAddNote} onPdfAdded={handlePdfAdded} />
            }

        </div>
    );
}

export default UserPdf;
