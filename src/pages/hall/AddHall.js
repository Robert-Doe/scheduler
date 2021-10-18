import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";
import {acceptCSV} from "../../util/manipulator";

function AddHall() {

    const sizeRef = useRef();
    const typeRef = useRef()
    const csvRef = useRef()
    const locationRef = useRef()
    const statusRef = useRef()
    const idRef = useRef();
    const [success, setSuccess] = useState([]);

    const value = (ref) => ref.current.value
    const refEmpty = (ref) => {
        return ref.current.value === ''
    }


    const sendCSV = (e) => {
        e.preventDefault();
        if (csvRef.current.value) {
            let h = new Headers();
            h.append('Accept', 'application/json');
            // h.append( 'Access-Control-Allow-Origin': '*')
            // h.append( "Content-Type": "application/json")

            let fd = new FormData();
            let file = csvRef.current.files[0];
            fd.append('sampleFile', file, file.name);
            let req = new Request('http://localhost:9999/halls/upload', {
                method: 'POST', headers: h, mode: 'cors', body: fd
            });
            fetch(req).then(response => response.json()).then(json => {
               /* alert(json.msg)*/
                console.log(json)
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
            }).catch((err) =>{
                    console.log("Error", err)
                setSuccess((prev) => [{status:'danger',message:"Duplicated Detected -",id:'Error'}, ...prev]);

            })
        } else {
            alert('Fill All inputs');
        }
        const timeout=setTimeout(() => setSuccess([]), 4000)
    }

    const addHallHandler = (e) => {
        e.preventDefault();

        if (!refEmpty(sizeRef) && !refEmpty(typeRef) && !refEmpty(idRef) && !refEmpty(locationRef)) {
            const newHall = {
                _id: value(idRef),
                size: value(sizeRef),
                type: value(typeRef),
                location: value(locationRef)
            }

            console.log(JSON.stringify(newHall))
            fetch("http://localhost:9999/halls", {
                // Adding method type
                method: "POST",
                // Adding body or contents to send
                body: JSON.stringify(newHall),
                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status === 'success') {
                        //setSuccess((prev) => [newBatch.name, ...prev]);
                        setSuccess((prev) => [{status: 'success', message: "Added Successfully -", id: `${newHall._id}`}, ...prev])
                    } else {
                        throw Error("Duplicate Detected")
                    }
                })
                .catch(err =>{
                    console.log(err)
                    setSuccess((prev) => [{
                        status: 'danger',
                        message: "Duplicated Detected -",
                        id: `${newHall._id}`
                    }, ...prev])
                })

        } else {
            alert("All Fields are important")
        }
        const timeout=setTimeout(() => setSuccess([]), 4000)
    }

    return (
        <section className={'container mt-5 py-5'}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/halls">Classroom</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>
            {success && success.map((suc, index) => {
                return (
                    <div className={`alert alert-${suc.status} text-center fade show w-100`} role="alert"
                         key={index}>
                        <strong>{suc.message}</strong>  - {suc.id}
                    </div>)
            })}
                <section className={'px-5'}>

                    <nav className='container-fluid'>
                        <div className="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                            <a className="nav-link active" id="nav-days-tab" data-toggle="tab" href="#nav-days" role="tab"
                               aria-controls="nav-days" aria-selected="true">Add Classroom Manually</a>
                            <a className="nav-link" id="nav-theme-tab" data-toggle="tab" href="#nav-theme" role="tab"
                               aria-controls="nav-theme" aria-selected="false">Add Classrooms With File</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-days" role="tabpanel"
                             aria-labelledby="nav-days-tab">
                            <section className="bg-admin">

                                <ButtonNav root={'halls'}/>
                                <form className={'px-5'} onSubmit={addHallHandler}>
                                    <div className={'row'}>
                                        <div className="col-lg-6 form-group pt-3">
                                            <label htmlFor="exampleFormControlSelect1">Location</label>
                                            <input type={'text'} ref={locationRef} className={'form-control'}
                                                   placeholder={'Location: COLLEGE-FLOOR'}/>
                                        </div>
                                        <div className="col-lg-6 form-group pt-3">
                                            <label htmlFor="exampleFormControlSelect1">Type</label>
                                            <select className="form-control" id="exampleFormControlSelect1" ref={typeRef}>
                                                <option>CS Lab</option>
                                                <option>CHEM Lab</option>
                                                <option>PHY Lab</option>
                                                <option>BIO Lab</option>
                                                <option>Regular</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 pt-3">
                                            <label htmlFor="first_name">Hall Size</label>
                                            <input type="number" id={'size'} className="form-control"
                                                   placeholder="e.g. 20" ref={sizeRef}/>
                                        </div>
                                        <div className="col-lg-6 pt-3">
                                            <label htmlFor="first_name" style={{color: '#f00'}}>Identifier</label>
                                            <input type="text" id={'size'} className="form-control" ref={idRef}
                                                   placeholder="Class Id: (CS1)"/>
                                        </div>
                                    </div>


                                    <div className="row pt-3">
                                        <div className="form-group">
                                            <input id={'add_hall'} className="btn btn-primary form-control bg-theme-btn" type={'submit'}
                                                   value={'Add Classroom'}/>
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
                                    <input type='submit' value='Upload Classrooms'
                                           className={'btn btn-warning form-control bg-theme-btn'}/>
                                </form>
                            </section>
                        </div>
                    </div>
                </section>
        </section>
    )
}

export default AddHall