import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";
import {acceptCSV} from "../../util/manipulator";

function AddDepartment() {

    const nameRef = useRef();
    const abbrRef = useRef();
    const responseRef = useRef();
    const idRef=useRef()
    const csvRef = useRef();
    const [success,setSuccess]=useState([])

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
            let req = new Request('http://localhost:9999/departments/upload', {
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

    const addDepartmentHandler = (e) => {
        e.preventDefault();
        if (!refEmpty(nameRef) && !refEmpty(abbrRef) && !refEmpty(idRef)) {
            const newDepartment = {
                _id:value(idRef),
                name: value(nameRef),
                dept_abbr: value(abbrRef),
                /*details: value(detailRef),*/
                /*lecturers: []*/
            }

            fetch("http://localhost:9999/departments", {
                // Adding method type
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify(newDepartment),
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    if (data.status === 'success'){
                        setSuccess((prev) => [{status:'success',message:"Added Successfully -",id:`${newDepartment._id}`}, ...prev]);
                    }else{
                        throw Error("Duplicate Detected")
                    }
                })
                .catch(err => {
                    setSuccess((prev) => [{status:'danger',message:"Duplicate Detected -",id:`${newDepartment._id}`}, ...prev]);
                    console.log(err)
                })

        }else{
            alert("All fields are required")
        }
        const timeout=setTimeout(() => setSuccess([]), 4000)
    }

    return (
        <section className={'container mt-5 py-5'}>
            <section className={'container px-5'}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link  to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link  to="/departments">Departments</Link></li>
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
                           aria-controls="nav-days" aria-selected="true">Add Departments Manually</a>
                        <a className="nav-link" id="nav-theme-tab" data-toggle="tab" href="#nav-theme" role="tab"
                           aria-controls="nav-theme" aria-selected="false">Add Departments With File</a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-days" role="tabpanel"
                         aria-labelledby="nav-days-tab">
                        <section className="bg-admin">

                            <ButtonNav root={'courses'}/>
                            <form className={'px-5'} onSubmit={addDepartmentHandler}>
                                <div className="row pt-3">
                                    <div className="col-md-6">
                                        <label htmlFor="name">Department ID</label>
                                        <input type="text" id={'name'} className="form-control" placeholder="ID Number"
                                               ref={idRef}/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="name">Name of Department</label>
                                        <input type="text" id={'name'} className="form-control" placeholder="Name of Department"
                                               ref={nameRef}/>
                                    </div>
                                </div>
                                <div className={'row'}>
                                    <div className="col-md-6 pt-3">
                                        <label htmlFor="dept_abbr">Abbreviation</label>
                                        <input type="text" id={'dept_abbr'} className="form-control"
                                               placeholder="Department Abbreviation" ref={abbrRef}/>
                                    </div>
                                </div>

                                <div className="row pt-5 d-flex justify-content-center">
                                    <div className="form-group">
                                        <input id={'add_dept'} className="btn btn-warning form-control bg-theme-btn" type={'submit'}
                                               value={'Add Department'}/>
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
                                <input type='submit' value='Upload Departments'
                                       className={'btn btn-warning form-control bg-theme-btn'}/>
                            </form>
                        </section>
                    </div>
                </div>















            </section>
        </section>
    )
}

export default AddDepartment