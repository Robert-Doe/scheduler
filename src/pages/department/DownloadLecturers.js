import React,{useState,useEffect,useContext} from 'react';
import {Table} from "../table/Table";
import {SessionContext} from "../../App";
import {Link, useParams} from "react-router-dom";



export function DownloadLecturers(){

    const {lecturers,departments}=useContext(SessionContext);



    let {id} = useParams();


    const getDeptLecturers=(deptId)=>{
        return lecturers.filter(tutor=>tutor.dept_id===deptId);
    }

    const getDepartmentName=(deptId)=>{
        let foundDept=departments.filter(dept=>dept._id===deptId)[0]
        return foundDept?foundDept.name:'Verify';
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
    return(
        <section className="container-fluid">
            <div className="container mt-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={'/lecturers'}>Lecturers</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{getDepartmentName(id)}</li>
                    </ol>
                </nav>
            </div>

            <button className={'btn btn-success'} onClick={printDiv}>Print Me</button>
            <main id={'tables'}>
                <h1 className={'text-center font-weight-bolder'}>General Timetable of {getDepartmentName(id)} Department</h1>
            {
                getDeptLecturers(id).map((lecturer)=>{
                   return( <Table id={lecturer._id}/>)
                })
            }
            </main>
        </section>

    )
}