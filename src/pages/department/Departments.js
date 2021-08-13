import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";


function Departments() {
    const viewDepartmentHandler = (e) => {
        const targetFile = e.target.parentNode;
        console.log(targetFile.childNodes[0].textContent);
        window.location.href = `http://localhost:3000/departments/view/${targetFile.childNodes[0].textContent}`
    }

    const [departmentList, setDepartmentList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/departments', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setDepartmentList(data)
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
                    <li className="breadcrumb-item"><Link to="http://localhost:3000/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Departments</li>
                </ol>
            </nav>

            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Abbr</th>
                </tr>
                </thead>
                <tbody>
                {departmentList && departmentList.map((department) => {
                    const {_id, name, dept_abbr} = department;
                    return (
                        <tr onClick={viewDepartmentHandler} key={_id}>
                            <td>{_id}</td>
                            <td>{name}</td>
                            <td>{dept_abbr}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </section>
    )
}

export default Departments