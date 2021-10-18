import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";
import {acceptCSV} from "../../util/manipulator";


function AddCourse() {
    const deptRef = useRef();
    const nameRef = useRef()
    const csvRef = useRef()
    const creditRef = useRef()
    const codeRef = useRef();
    const [departments, setDepartments] = useState([]);
    const [success, setSuccess] = useState([]);



    const value = (ref) => ref.current.value
    const refEmpty = (ref) => {
        return ref.current.value === ''
    }

    const sendCSV = (e) => {
        e.preventDefault();
        setSuccess([])
        if (csvRef.current.value) {
            let h = new Headers();
            h.append('Accept', 'application/json');
            // h.append( 'Access-Control-Allow-Origin': '*')
            // h.append( "Content-Type": "application/json")

            let fd = new FormData();
            let file = csvRef.current.files[0];
            fd.append('sampleFile', file, file.name);
            let req = new Request('http://localhost:9999/courses/upload', {
                method: 'POST', headers: h, mode: 'cors', body: fd
            });
            fetch(req).then(response => response.json()).then(json => {
                // alert(json.msg)
                // console.log(json)
                if (json.status === 'success'){
                    setSuccess((prev) => [{status:'success',message:"Added Successfully",id:null}, ...prev]);
                    console.log(json)
                }else if(json.status==='rejected'){
                    console.log(json)
                    setSuccess((prev) => [{status:'danger',message:json.msg,id:null}, ...prev]);
                }else{
                    console.log(json)
                    setSuccess((prev) => [{status:'danger',message:'Duplicate Files',id:json.error.writeErrors[0].op._id}, ...prev]);
                }
            })
                .catch((err) => {
                    console.log("Error", err)
                    setSuccess((prev) => [{status:'danger',message:"Duplicated Detected -",id:'Error'}, ...prev]);
                })
        } else {
            alert('Fill All inputs');
        }
        const timeout=setTimeout(() => setSuccess([]), 4000)

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

                    if (data.status === 'success'){
                        console.log(data)
                        setSuccess((prev) => [{status:'success',message:"Added Successfully -",id:`${newCourse._id}`}, ...prev]);
                    }else{
                        throw Error("Duplicate Detected")
                    }
                })
                .catch(err =>{
                    setSuccess((prev) => [{status:'danger',message:"Duplicate Detected -",id:`${newCourse._id}`}, ...prev]);
                    console.log(err)
                })

        } else {
            alert("All Fields are important")
        }
        const timeout=setTimeout(() => setSuccess([]), 4000)
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

                {success && success.map((suc, index) => {
                    return (
                        <div className={`alert alert-${suc.status} text-center fade show w-100`} role="alert" key={index}>
                            <strong>{suc.message}!</strong>  {suc.id}
                        </div>)
                })}

                <nav className='container-fluid'>
                    <div className="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                        <a className="nav-link active" id="nav-days-tab" data-toggle="tab" href="#nav-days" role="tab"
                           aria-controls="nav-days" aria-selected="true">Add Courses Manually</a>
                        <a className="nav-link" id="nav-theme-tab" data-toggle="tab" href="#nav-theme" role="tab"
                           aria-controls="nav-theme" aria-selected="false">Add Courses With File</a>
                    </div>
                </nav>


                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-days" role="tabpanel"
                         aria-labelledby="nav-days-tab">
                        <section className="bg-admin">

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
                    </div>
                    {/*Users TAB*/}
                    <div className="tab-pane fade" id="nav-theme" role="tabpanel" aria-labelledby="nav-theme-tab">
                        <section className={'my-5'}>
                            <form onSubmit={sendCSV} className={'d-flex flex-column align-items-center'}>
                                <input type="file" name="csvfile" className={'my-3 form-control-file'} ref={csvRef}
                                       accept={'text/csv'} onChange={acceptCSV}/>
                                <input type='submit' value='Upload Courses'
                                       className={'btn btn-warning form-control bg-theme-btn'}/>
                            </form>
                        </section>
                    </div>
                </div>

            </section>
        </section>


    )
}

export default AddCourse