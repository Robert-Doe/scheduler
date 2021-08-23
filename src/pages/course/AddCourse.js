import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";


function AddCourse() {
    const deptRef = useRef();
    const nameRef = useRef()
    const creditRef = useRef()
    const codeRef = useRef();
    const [departments, setDepartments] = useState([]);


    const value = (ref) => ref.current.value
    const refEmpty = (ref) => {
        return ref.current.value === ''
    }

    const getCurrentDeptId = (ref) => {
        let activeTags = []
        const currentNodes = ref.current.childNodes
        Object.keys(currentNodes).forEach(e => activeTags = [currentNodes[e], ...activeTags])
        return activeTags.find(node => node.value === value(ref)).dataset.id
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
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

    }, [])


    const addCourseHandler = (e) => {
        e.preventDefault();

        // console.log(deptRef.current);
        // console.log(deptRef.current.childNodes)
        // //console.log(getCurrentDeptId(deptRef))
        // //console.log(typeof )
        // const currentNodes=deptRef.current.childNodes
        // Object.keys(currentNodes).forEach(e=>console.log(currentNodes[e]))
        //console.log(getCurrentDeptId(deptRef));
        //getCurrentDeptId(deptRef)

        if (!refEmpty(deptRef) && !refEmpty(nameRef) && !refEmpty(creditRef) && !refEmpty(codeRef) ) {
            const newCourse = {
                name: value(nameRef),
                dept_id: getCurrentDeptId(deptRef)/*value(deptRef)*/,
                credit: value(creditRef),
                _id: value(codeRef),
            }

            console.log(newCourse);

            fetch("http://localhost:9999/courses", {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify(newCourse),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.log(err))

        } else {
            alert("All Fields are important")
        }
    }


    return (
        <section className={'container mt-5 py-5'}>
            <section className={'container px-5'}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/courses">Courses</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>
                <ButtonNav root={'courses'}/>
                <form className={'px-5'} onSubmit={addCourseHandler}>
                    <div className="row">
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Department</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={deptRef}>
                                {departments.map((department) => {
                                    return (<option key={department._id}
                                                    data-id={department._id}>{department.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="course_name">Course Name</label>
                            <input type="text" id={'course_name'} className="form-control"
                                   placeholder="Course Name (eg. Application to Electronics)" ref={nameRef}/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="course_name">Course Code</label>
                            <input type="text" id={'course_code'} className="form-control"
                                   placeholder="Course Code (eg. CSM123)" ref={codeRef}/>
                        </div>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="course_name">Credit Hours</label>
                            <input type="number" id={'credit_hours'} className="form-control"
                                   placeholder="Credit Hours (eg. 3)" ref={creditRef}/>
                        </div>

                    </div>

                    <div className="row pt-3">
                        <div className="form-group">
                            <input id={'add_course'} className="btn btn-primary form-control bg-theme-btn" type={'submit'}
                                   value={'Add Course'}/>
                        </div>
                    </div>
                </form>
            </section>
        </section>


    )
}

export default AddCourse