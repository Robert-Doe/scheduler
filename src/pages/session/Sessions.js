import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";
import {SessionContext} from "../../App";


/*const viewSessionHandler=(e)=>{
    const targetFile=e.target.parentNode;
    console.log(targetFile.childNodes[0].textContent);
    window.location.href = `http://localhost:3000/sessions/view/${targetFile.childNodes[0].textContent}`

}*/

function Sessions(){

    const [sessions,setSessions]=useState([])
    const {interim,lecturers,courses}=useContext(SessionContext);

    const getLecturerName=(tutorId)=>{
        let tutor=lecturers.filter(tutor=>tutor._id===tutorId)[0]
        return tutor?`${tutor.fname} ${tutor.lname}`:'Verify';
    }
    const getCourseName=(courseId)=>{
        let course=courses.filter(course=>course._id===courseId)[0]
        return course?`${course.name}`:'Verify';
    }

    useEffect(() => {
        fetch('http://localhost:9999/sessions', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setSessions(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [])

    return(
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Sessions</li>
                </ol>
            </nav>

            <ButtonNav root={'sessions'}/>
            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>Class</th>
                    <th>Course Code</th>
                    <th>Lecturer</th>
                    <th>Period</th>
                    <th>Classroom</th>
                </tr>
                </thead>
                <tbody>
                {
                    interim.map((session)=>{

                        return(<tr /*onClick={viewSessionHandler}*/>
                            <td>{session.batch_id}</td>
                            <td>{getCourseName(session.pair_id.split('-')[1])}</td>
                            <td>{getLecturerName(session.pair_id.split('-')[0])}</td>
                            <td>{session.period}</td>
                            <td>{session.hall_id}</td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </section>
    )
}

export default Sessions