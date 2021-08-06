import React from 'react';
import {useParams} from 'react-router-dom'
import sessions from "../../../data/sessions";
//import {TableOld} from "../batches/TableOld";
import {Table} from "./Table";



function LecturerSession() {
    let {id} = useParams();
    if(!sessions.some((session)=>session.lecturer===id))
    {
        return (
            <section className="container py-5">
                <h1 className="display-5">No Lecturer with id: {id}</h1>
            </section>
        )
    }

    return (
        <section className={'container-fluid mt-2 py-3'}>
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="http://localhost:3000/batches">Batches</a></li>
                        <li className="breadcrumb-item active" aria-current="page">View</li>
                    </ol>
                </nav>
            </div>
            <Table id={id}/>
        </section>
    )
}

export default LecturerSession;