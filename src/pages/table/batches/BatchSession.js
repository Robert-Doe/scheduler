import React from 'react';
import {Link, useParams} from 'react-router-dom'
//import sessions from "../../../data/sessions";
import {BatchTable} from "./BatchTable";
import {Table} from "../../home/Table";


function BatchSession() {

    let {id} = useParams();

    //console.log(id)
   /* if(!sessions.some((session)=>session.batch_id===id))
    {
        return (
            <section className="container py-5">
                <h1 className="display-5">No Session with Batch_id: {id}</h1>
            </section>
        )
    }*/

    return (
        <section className={'container-fluid mt-2 py-3'}>
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={'/batches'}>Batches</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">View</li>
                    </ol>
                </nav>
            </div>
            <BatchTable id={id} />
            {/*<Table id={'20523595'}/>*/}
            {/*<TableOld id={id}/>*/}
        </section>
    )
}

export default BatchSession;