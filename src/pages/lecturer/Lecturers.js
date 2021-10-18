import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import {getCurrentId} from "../../util/manipulator";

function LecturerRow({lecturer}) {
    const [dept, setDept] = useState({})
    const {_id, fname, lname, dept_id} = lecturer;

    /* const viewLecturerHandler = (e) => {
         const targetFile = e.target.parentNode;
         console.log(targetFile.childNodes[0].textContent);
         window.location.href = `http://localhost:3000/lecturers/view/${targetFile.childNodes[0].textContent}`

     }*/
    const deleteLecturerHandler=(e)=>{
        let lecturerId=e.target.dataset.id;
        if(lecturerId){
            fetch(`http://localhost:9999/lecturers/${lecturerId}`, {
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
                    window.location='/lecturers'
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

    useEffect(() => {
        fetch(`http://localhost:9999/departments/${dept_id}`, {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setDept(data)
                console.log(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [])


    return (
        <tr key={_id}>
            <td><Link className={'btn green w-75 h-75 text-light font-weight-bold'}
                      to={`lecturers/view/${_id}`}>{_id}</Link></td>
            <td nowrap={'nowrap'}>{`${fname} ${lname}`}</td>
            <td nowrap={'nowrap'}>{dept ? dept.name : 'Verify'}</td>
            {/*<td nowrap={'nowrap'}>{courses.length}</td>
            <td nowrap={'nowrap'}>{sessions.length}</td>*/}
            <td><Link className={'btn btn-warning h-75 mr-2 text-light font-weight-bold'} to={`tables/lecturer/${_id}`}><AiIcons.AiFillFilePdf
                style={{width: '17px'}}/> </Link>
                <button className={'btn btn-danger h-75 text-light font-weight-bold'} data-id={`${_id}`} onClick={deleteLecturerHandler}><MdIcons.MdDelete
                style={{width: '17px'}} disabled /></button></td>
        </tr>
    )
}


function Lecturers() {

    const [lecturerList, setLecturerList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/lecturers', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setLecturerList(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [])


    return (
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Lecturers</li>
                </ol>
            </nav>

            <ButtonNav root={'lecturers'}/>
            <table className="table table-bordered" style={{borderRadius: '50px'}}>
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>View/Delete</th>
                </tr>
                </thead>
                <tbody>
                {/* {lecturerList && lecturerList.map((teacher) => {
                    return (
                        <LecturerRow lecturer={teacher} key={teacher._id + "main"}/>
                    )
                })
                }*/}
                {lecturerList && lecturerList.map((teacher) => {
                    return (
                        <LecturerRow lecturer={teacher} key={teacher._id + "main"}/>
                    )
                })
                }

                </tbody>
            </table>
        </section>
    )
}

export default Lecturers