import React, {useState, useEffect, useContext} from 'react';
import {Table} from "./Table";
import {BatchTable} from "../table/BatchTable";
import {Link, Redirect, useParams} from "react-router-dom";
import {SessionContext} from "../../App";


export function DownloadBatches(){

    const {departments}=useContext(SessionContext);
    let {id} = useParams();

    const getDepartmentName=(deptId)=>{
        let foundDept=departments.filter(dept=>dept._id===deptId)[0]
        return foundDept?foundDept.name:'NonVERIFIED';
    }


    function printDiv() {
        const headers = document.getElementsByTagName('head')[0];
        const divContents = document.getElementById("tables");
        const a = window.open('', '', '');
        a.document.write(headers.innerHTML+divContents.innerHTML);
        console.log(headers);
        //a.document.write(document.children[0].innerHTML);
        a.print();
        a.document.close();
    }


    const [batches, setBatches] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/batches/departments/${id}`, {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setBatches(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [])


    if(!departments){
        return (
            <Redirect to="/" />
        )
    }

    return(
        <section className="container-fluid">
            <div className="container mt-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={'/batches'}>Batches</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{getDepartmentName(id)}</li>
                    </ol>
                </nav>
            </div>

            <button className={'btn btn-success'} onClick={printDiv}>Print Me</button>
            <main id={'tables'}>
                <h2 className={'text-center font-weight-bolder'}>General Timetable of {getDepartmentName(id)} Department</h2>
                {
                    batches.map((batch)=>{
                        return( <>
                            <br/><br/>
                            <BatchTable id={batch._id}/>
                        </>)
                    })
                }
            </main>

        </section>

    )
}