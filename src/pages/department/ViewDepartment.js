import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

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
                    <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                    <li className="breadcrumb-item"><a href="http://localhost:3000/departments">Departments</a></li>
                    <li className="breadcrumb-item active" aria-current="page">View</li>
                </ol>
            </nav>
            <h2 className={'mx-5 text-dark'}>{id}</h2>
            <dl className={'dl-horizontal text-center'}>
                <dt>Identity</dt>
                <dd>{department && `${id}`}</dd>

                <dt>Name</dt>
                <dd>{department && `${department.name}`}</dd>

                <dt>Abbreviation</dt>
                <dd>{department && `${department.dept_abbr}`}</dd>

                <dt>Details</dt>
                <dd>{department && `${department.details}`}</dd>

                <dt>Courses</dt>
                <dd>{courses && `${courses.length}`}</dd>

                <dt>Lecturers</dt>
                <dd>{lecturers && `${lecturers.length}`}</dd>
            </dl>
            <div className="accordion" id="accordionExample">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-center" type="button"
                                    data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                                    aria-controls="collapseOne">
                                Courses
                            </button>
                        </h2>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                         data-parent="#accordionExample">
                        <div className="card-body">
                            Some placeholder content for the first accordion panel. This panel is shown by default,
                            thanks to the <code>.show</code> class.
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <button className="btn btn-link btn-block text-center collapsed" type="button"
                                    data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                                    aria-controls="collapseTwo">
                                Sessions
                            </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                         data-parent="#accordionExample">
                        <div className="card-body">
                            Some placeholder content for the second accordion panel. This panel is hidden by
                            default.
                        </div>
                    </div>
                </div>

            </div>


        </section>
    )
}
export default ViewDepartment