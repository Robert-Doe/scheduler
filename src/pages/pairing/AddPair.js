import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";

function AddPair() {
    const lecturerRef = useRef();
    const courseRef = useRef();
    const deptRef = useRef();
    const responseRef = useRef();
    const [departments, setDepartments] = useState([])
    const [activeDeptId, setActiveDeptId] = useState(null)
    const [lecturers, setLecturers] = useState([])
    const [courses, setCourses] = useState([]);

    const value = (ref) => ref.current.value
    const refEmpty = (ref) => {
        return ref.current.value === ''
    }

    const getCurrentId = (ref) => {
        let activeTags = []
        const currentNodes = ref.current.childNodes
        Object.keys(currentNodes).forEach(e => activeTags = [currentNodes[e], ...activeTags])
        return activeTags.find(node => node.value === value(ref)).dataset.id
    }

    const changeDeptHandler = () => {
        setActiveDeptId(getCurrentId(deptRef))
    }
    const addPairHandler = (e) => {
        e.preventDefault();

        if (!refEmpty(lecturerRef) && !refEmpty(courseRef)) {
            const newPair = {
                lecturer_id: getCurrentId(lecturerRef),
                course_id: getCurrentId(courseRef),
            }

            fetch("http://localhost:9999/pairings", {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify(newPair),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    responseRef.current.value = data.msg
                    console.log(data)
                })
                .catch(err => console.log(err))

        } else {
            alert("All Fields are important")
        }

    }

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
                setDepartments(data)
                setActiveDeptId(getCurrentId(deptRef));
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

    }, [])

    useEffect(() => {
        fetch(`http://localhost:9999/lecturers/departments/${activeDeptId}`, {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setLecturers(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [activeDeptId])

    useEffect(() => {
        fetch(`http://localhost:9999/courses/departments/${activeDeptId}`, {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setCourses(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [activeDeptId])

    return (
        <section className={'container mt-5 py-5'}>
            <section className={'container px-5'}>

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/pairings">Pairings</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>


                <form className={'px-5'} onSubmit={addPairHandler}>

                    <div className={'row'}>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Department</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={deptRef}
                                    onChange={changeDeptHandler}>
                                {departments.map((department) => {
                                    return (<option key={department._id}
                                                    data-id={department._id}>{department.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Lecturer</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={lecturerRef}>
                                {
                                    lecturers.map((lecturer) => {
                                        const {fname, lname, _id} = lecturer
                                        return <option key={_id} data-id={_id}>{`${fname} ${lname}`}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-6 form-group pt-1">
                            <label htmlFor="exampleFormControlSelect1">Course</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={courseRef}>
                                {courses.map((course) => {
                                    return (<option key={course._id} data-id={course._id}>{`${course._id} - ${course.name}`}</option>)
                                })}
                            </select>
                        </div>
                        <div className="col-lg-6 pt-1">
                            <label htmlFor="first_name" className={'text-danger text-bold'}>Status</label>
                            <input type="text" id={'first_name'} className="form-control" disabled
                                   placeholder="Feasible Session Placement" ref={responseRef}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 pt-3">
                            <div className="form-group">
                                <input id={'add_lecturer'} className="btn btn-primary form-control" type={'submit'}
                                       value={'Add Session'}/>
                            </div>
                        </div>
                    </div>


                </form>

            </section>
        </section>
    )
}

export default AddPair