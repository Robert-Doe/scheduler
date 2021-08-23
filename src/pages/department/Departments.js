import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";


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
        <section className={'container mt-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Departments</li>
                </ol>
            </nav>

            <ButtonNav root={'departments'}/>
            <table className="table table-bordered table-striped" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Abbr</th>
                    <th>Lecturers' Schedule</th>
                    <th>Students' Schedule</th>
                </tr>
                </thead>
                <tbody>
                {departmentList && departmentList.map((department) => {
                    const {_id, name, dept_abbr} = department;
                    return (
                        <tr key={_id}>
                            <td><Link to={`/departments/view/${_id}`}>{_id}</Link></td>
                            <td>{name}</td>
                            <td>{dept_abbr}</td>
                            <td className={'d-flex justify-content-center'}><Link class={'badge badge-warning w-50 py-1 text-light font-weight-normal'} style={{borderRadius:'30px'}} to={`tables/lecturers/department/${_id}`}>Preview (L)</Link></td>
                            <td><Link class={'badge badge-success w-50 py-1 text-light font-weight-normal'}  to={`tables/batches/department/${_id}`} style={{borderRadius:'30px'}}>Preview (S)</Link></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </section>
    )
}

export default Departments