import React, {useEffect, useState} from 'react';

function LecturerRow({lecturer}) {
    const [dept, setDept] = useState({})
    const {_id, fname, lname, dept_id, courses, sessions} = lecturer;

    const viewLecturerHandler = (e) => {
        const targetFile = e.target.parentNode;
        console.log(targetFile.childNodes[0].textContent);
        window.location.href = `http://localhost:3000/lecturers/view/${targetFile.childNodes[0].textContent}`

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
            <td onClick={viewLecturerHandler}>{_id}</td>
            <td nowrap={'nowrap'}>{`${fname} ${lname}`}</td>
            <td nowrap={'nowrap'}>{dept.name}</td>
            <td nowrap={'nowrap'}>{courses.length}</td>
            <td nowrap={'nowrap'}>{sessions.length}</td>
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
                    <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Lecturers</li>
                </ol>
            </nav>
            <table className="table table-bordered" style={{borderRadius: '50px'}}>
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>No(Courses)</th>
                    <th>No(Sessions)</th>
                </tr>
                </thead>
                <tbody>
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