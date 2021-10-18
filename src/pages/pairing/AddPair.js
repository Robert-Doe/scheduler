import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";
import {acceptCSV} from "../../util/manipulator";

function AddPair() {
    const lecturerRef = useRef();
    const courseRef = useRef();
    const deptRef = useRef();
    const csvRef = useRef()
    const responseRef = useRef();
    const [departments, setDepartments] = useState([])
    const [activeDeptId, setActiveDeptId] = useState(null)
    const [lecturers, setLecturers] = useState([])
    const [courses, setCourses] = useState([]);
    const [success, setSuccess] = useState([]);

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
            let req = new Request('http://localhost:9999/pairings/upload', {
                method: 'POST', headers: h, mode: 'cors', body: fd
            });
            fetch(req).then(response => response.json()).then(data => {
                //alert(json.msg)
                //console.log(json)
                if (data.status === 'success'){
                    setSuccess((prev) => [{status:'success',message:"Added Successfully",id:null}, ...prev]);
                    console.log(data)
                }else if(data.status==='rejected'){
                    console.log(data)
                    setSuccess((prev) => [{status:'danger',message:data.msg,id:null}, ...prev]);
                }else{
                    console.log(data)
                    setSuccess((prev) => [{status:'danger',message:'Duplicate Files',id:data.error.writeErrors[0].op._id}, ...prev]);
                }
            })
                .catch((err) => {
                    console.log("Error", err)
                    setSuccess((prev) => [{status:'danger',message:'Duplicate Files',id:null}, ...prev]);
                })
        } else {
            alert('Fill All inputs');
        }
        const timeout=setTimeout(() => setSuccess([]), 4000)
    }
    const addPairHandler = (e) => {
        e.preventDefault();
        setSuccess([])
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
                   /* responseRef.current.value = data.msg
                    console.log(data)*/
                    if (data.status === 'success'){
                        setSuccess((prev) => [{status:'success',message:"Added Successfully -",id:`${newPair.lecturer_id}-${newPair.course_id}`}, ...prev]);
                    }else{
                        throw Error("Duplicate Detected")
                    }
                })
                .catch(err => {
                    console.log(err)
                    //alert('Duplicate Detected');
                    setSuccess((prev) => [{status:'danger',message:"Duplicated Detected -",id:`${newPair.lecturer_id}-${newPair.course_id}`}, ...prev]);
                    //setSuccess((prev) => [`${newPair.lecturer_id}-${newPair.course_id}`, ...prev]);
                })
        } else {
            alert("All Fields are important")
        }
        const timeout=setTimeout(() => setSuccess([]), 4000)
        //clearTimeout(timeout);
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
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/pairings">Pairings</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add</li>
                </ol>
            </nav>

            <section className={'px-5'}>

                {success && success.map((suc, index) => {
                    return (
                        <div className={`alert alert-${suc.status} text-center fade show w-100`} role="alert" key={index}>
                            <strong>{suc.message}</strong> {suc.id}
                        </div>)
                })}

                <nav className='container-fluid'>
                    <div className="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                        <a className="nav-link active" id="nav-days-tab" data-toggle="tab" href="#nav-days" role="tab"
                           aria-controls="nav-days" aria-selected="true">Add Pairs Manually</a>
                        <a className="nav-link" id="nav-theme-tab" data-toggle="tab" href="#nav-theme" role="tab"
                           aria-controls="nav-theme" aria-selected="false">Add Pairs With File</a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-days" role="tabpanel"
                         aria-labelledby="nav-days-tab">
                        <section className="bg-admin">

                            <ButtonNav root={'pairings'}/>
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
                                        <select className="form-control" id="exampleFormControlSelect1"
                                                ref={lecturerRef}>
                                            {
                                                lecturers.map((lecturer) => {
                                                    const {fname, lname, _id} = lecturer
                                                    return <option key={_id}
                                                                   data-id={_id}>{`${fname} ${lname}`}</option>
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
                                                return (<option key={course._id}
                                                                data-id={course._id}>{`${course._id} - ${course.name}`}</option>)
                                            })}
                                        </select>
                                    </div>
                                   {/* <div className="col-lg-6 pt-1">
                                        <label htmlFor="first_name" className={'text-danger text-bold'}>Status</label>
                                        <input type="text" id={'first_name'} className="form-control" disabled
                                               placeholder="Feasible Session Placement" ref={responseRef}/>
                                    </div>*/}
                                </div>
                                <div className="w-100">
                                    <div className="d-flex justify-content-center pt-3">
                                        <div className="form-group ">
                                            <input id={'add_lecturer'}
                                                   className="btn btn-warning form-control bg-theme-btn" type={'submit'}
                                                   value={'Pair up'}/>
                                        </div>
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
                                <input type='submit' value='Upload Pairs'
                                       className={'btn btn-warning form-control bg-theme-btn'}/>
                            </form>
                        </section>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default AddPair