import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {ButtonNav} from "../../components/ButtonNav";

function ViewDepartment() {
    let {id} = useParams();
    const [department, setDepartment] = useState({})
    let [lecturers, setLecturers] = useState({});
    let [courses, setCourses] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:9999/departments/${id}`, {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(response => response.json())
            .then(dept => {
                setDepartment(dept);
                console.log(dept);

                fetch(`http://localhost:9999/courses/departments/${dept._id}`, {
                    method: "GET",
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                    .then(response => response.json())
                    .then(subjects => {
                        setCourses(subjects);
                        console.log(subjects);
                    })
                    .catch(err => console.log(err))

                fetch(`http://localhost:9999/lecturers/departments/${id}`, {
                    method: "GET",
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                    .then(response => response.json())
                    .then(teachers => {
                        setLecturers(teachers);
                        console.log(teachers)
                    })
            })

            .catch(err => console.log(err))

    }, [])


    return (
        <section>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/departments">Departments</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">View</li>
                </ol>
            </nav>

            <ButtonNav root={'courses'}/>
            <h2 className={'mx-5 text-dark'}>{id}</h2>
            <dl className={'dl-horizontal text-center'}>
                <dt>Identity</dt>
                <dd>{department && `${id}`}</dd>

                <dt>Name</dt>
                <dd>{department && `${department.name}`}</dd>

                <dt>Abbreviation</dt>
                <dd>{department && `${department.dept_abbr}`}</dd>


                <dt>Courses</dt>
                <dd>{courses && `${courses.length}`}</dd>

                <dt>Lecturers</dt>
                <dd>{lecturers && `${lecturers.length}`}</dd>
            </dl>

        </section>
    )
}
export default ViewDepartment