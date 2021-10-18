import React, {useEffect, useRef, useState} from 'react';
import {acceptCSV,getCurrentId,value,refEmpty} from "../../util/manipulator";
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";
function AddLecturer() {

    const deptRef = useRef(null)
    const abbrRef = useRef(null);
    const idRef = useRef(null);
    const fnameRef = useRef(null);
    const lnameRef = useRef(null);
    const csvRef = useRef(null);
    const statusRef=useRef(null);
    const [departments, setDepartments] = useState([]);
    const [success, setSuccess] = useState([]);


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
            let req = new Request('http://localhost:9999/lecturers/upload', {
                method: 'POST', headers: h, mode: 'cors', body: fd
            });
            fetch(req).then(response => response.json())
                .then(json=>{
                //alert(json)
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
                    console.log(err.toString())
                    setSuccess((prev) => [{status:'danger',message:'Duplicate Files',id:null}, ...prev]);
                })
        } else {
            alert('Fill All inputs');
        }
        const timeout=setTimeout(() => setSuccess([]), 4000)
    }


    const addLecturerHandler = (e) => {
        e.preventDefault();

        if (!refEmpty(deptRef) && !refEmpty(abbrRef) && !refEmpty(idRef) && !refEmpty(fnameRef) && !refEmpty(lnameRef)) {
            const newLecturer = {
                _id:value(idRef),
                fname: value(fnameRef),
                lname: value(lnameRef),
                dept_id: getCurrentId(deptRef),
                abbr: value(abbrRef),
            }

            fetch("http://localhost:9999/lecturers", {
                method: "POST",
                body: JSON.stringify(newLecturer),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status === 'success'){  abbrRef.current.value = ''
                        idRef.current.value = ''
                        fnameRef.current.value = ''
                        lnameRef.current.value = ''
                        setSuccess((prev) => [{status:'success',message:"Added Successfully -",id:`${newLecturer._id}`}, ...prev]);
                    }else{
                        throw Error("Duplicate Detected")
                    }
                })
                .catch(err =>{
                    setSuccess((prev) => [{status:'danger',message:"Duplicate Detected -",id:`${newLecturer._id}`}, ...prev]);
                    console.log(err)
                } )

        } else {
            alert("All Fields are important")
        }
        const timeout=setTimeout(() => setSuccess([]), 4000)
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


    return (
        <section className={'container mt-5 py-5'}>
            <section className={'container px-5'}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/lecturers">Lecturers</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>

                <section className={'px-5'}>
                    {success && success.map((suc, index) => {
                        return (
                            <div className={`alert alert-${suc.status} text-center fade show w-100`} role="alert" key={index}>
                                <strong>{suc.message}!</strong>  {suc.id}
                            </div>)
                    })}

                    <nav className='container-fluid'>
                        <div className="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                            <a className="nav-link active" id="nav-days-tab" data-toggle="tab" href="#nav-days" role="tab"
                               aria-controls="nav-days" aria-selected="true">Add Lecturers Manually</a>
                            <a className="nav-link" id="nav-theme-tab" data-toggle="tab" href="#nav-theme" role="tab"
                               aria-controls="nav-theme" aria-selected="false">Add Lecturers With File</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        {/*Orders TAB*/}
                        <div className="tab-pane fade show active" id="nav-days" role="tabpanel" aria-labelledby="nav-days-tab">
                            <section className="bg-admin">

                                <ButtonNav root={'lecturers'}/>
                                <form className={'px-5'} onSubmit={addLecturerHandler}>
                                    <div className="row">
                                        <div className="col-lg-6 pt-3">
                                            <label htmlFor="first_name">First Name</label>
                                            <input type="text" id={'first_name'} className="form-control"
                                                   placeholder="First name (eg. Robert)" ref={fnameRef}/>
                                        </div>
                                        <div className="col-lg-6 pt-3">
                                            <label htmlFor="last_name">Last Name</label>
                                            <input type="text" id={'last_name'} ref={lnameRef} className="form-control"
                                                   placeholder="Last name (eg. Doe)"/>
                                        </div>
                                    </div>
                                    <div className={'row'}>
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
                                            <label htmlFor="exampleFormControlSelect1">Abbreviation</label>
                                            <div className="input-group pt-0">
                                                <div className="input-group-prepend" id={'name_initials'}>
                                                    <span className="input-group-text" id="basic-addon1">@</span>
                                                </div>
                                                <input type="text" className="form-control py-0"
                                                       placeholder="(Eg. R. Doe) Max(7 characters)" aria-label="Username"
                                                       aria-describedby="basic-addon1" ref={abbrRef}/>
                                            </div>
                                        </div>

                                    </div>

                                    <div className={'row'}>
                                        <div className="col-lg-6 form-group">
                                            <div className="form-group ">
                                                <label htmlFor="exampleFormControlTextarea1">Staff ID</label>
                                                <input type="text" className="form-control py-0"
                                                       placeholder="Staff ID" aria-label="Staff ID"
                                                       aria-describedby="basic-addon1" ref={idRef}/>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row pt-3 d-flex justify-content-center">
                                        <div className="form-group">
                                            <input id={'add_lecturer'} className="btn btn-warning form-control bg-theme-btn" type={'submit'}
                                                   value={'Add Lecturer'}/>
                                        </div>
                                    </div>
                                </form>


                            </section>
                        </div>
                        {/*Users TAB*/}
                        <div className="tab-pane fade" id="nav-theme" role="tabpanel" aria-labelledby="nav-theme-tab">
                            <section className={'my-5'}>
                                <form onSubmit={sendCSV} className={'d-flex flex-column align-items-center'}>
                                    <input type="file" name="csvfile" className={'my-3 form-control-file'} ref={csvRef} accept={'text/csv'} onChange={acceptCSV}/>
                                    <input type='submit' value='Upload Lecturers' className={'btn btn-warning form-control bg-theme-btn'}/>
                                </form>
                            </section>
                        </div>

                    </div>
                </section>
            </section>
        </section>
    )
}

export default AddLecturer