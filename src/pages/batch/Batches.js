import React, {useEffect, useState,useContext} from 'react';
import {Link} from 'react-router-dom'
import {ButtonNav} from "../../components/ButtonNav";
import {SessionContext} from "../../App";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

function Batches() {

    const [batchList, setBatchList] = useState([]);
    const {departments}=useContext(SessionContext);


    const deleteBatchHandler=(e)=>{
        let lecturerId=e.target.dataset.id;
        if(lecturerId){
            fetch(`http://localhost:9999/batches/${lecturerId}`, {
                method: 'DELETE',
                mode: 'cors',
                origin: 'http://localhost:3000/',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
                .then(data => {
                    //setDept(data)
                    alert(data.msg)
                    window.location='/batches'
                    console.log(data)
                })
                .catch(err => {
                    alert(err.msg)
                    console.log(err);
                })
        }
        /*console.log(e)
        alert(lecturerId);*/
    }


    const getDepartment=(deptId)=>{
        const found=departments.filter(dept=>dept._id===deptId)[0];
       return found?found.name:'Verify';
    }
    useEffect(() => {
        fetch('http://localhost:9999/batches', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setBatchList(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [])


   /* const viewBatchHandler = (e) => {
        const targetFile = e.target.parentNode;
        console.log(targetFile.childNodes[0].textContent);
        window.location.href = `http://localhost:3000/batches/view/${targetFile.childNodes[0].textContent}`

    }*/

    return (
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active">Batches</li>
                </ol>
            </nav>
            <ButtonNav root={'batches'}/>
            <table className="table table-bordered" style={{borderRadius: '50px'}}>
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Batch Size</th>
                    <th>Year</th>
                    <th>Department</th>
                    <th>View Schedule</th>
                </tr>
                </thead>
                <tbody>
                {batchList && batchList.map((batch) => {
                    const {_id, name, size, year, dept_id} = batch;
                    return (
                        <tr /*onClick={viewBatchHandler} */key={Math.random() * 10000}>
                            <td><Link to={`batches/view/${_id}`}>{_id}</Link></td>
                            <td>{name}</td>
                            <td>{size}</td>
                            <td>{year}</td>
                            <td>{getDepartment(dept_id)}</td>
                            <td><Link className={'btn btn-warning h-75 mr-2 text-light font-weight-bold'} to={`tables/batch/${_id}`}><AiIcons.AiFillFilePdf
                                style={{width: '17px'}}/> </Link>
                                <button className={'btn btn-danger h-75 text-light font-weight-bold'} data-id={`${_id}`} onClick={deleteBatchHandler}><MdIcons.MdDelete
                                    style={{width: '17px'}} disabled /></button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </section>
    )
}

export default Batches