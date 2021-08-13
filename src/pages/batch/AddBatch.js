import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {BatchNavData} from "../../components/BatchNavData";
import {acceptCSV,getCurrentId,value,refEmpty} from "../../util/manipulator";


function AddBatch() {
    const deptRef = useRef(null);
    const sizeRef = useRef(null);
    const yearRef = useRef(null);
    const nameRef = useRef(null);
    const divRef = useRef(null);
    const csvRef = useRef(null);
    const [departments, setDepartments] = useState([]);
    const [success, setSuccess] = useState([]);

  /*  const refEmpty = (ref) => {
        return ref.current.value === ''
    }

    const value = (ref) => ref.current.value

    const getCurrentId = (ref) => {
        let activeTags = []
        const currentNodes = ref.current.childNodes
        Object.keys(currentNodes).forEach(e => activeTags = [currentNodes[e], ...activeTags])
        return activeTags.find(node => node.value === value(ref)).dataset.id
    }
*/
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
            let req = new Request('http://localhost:9999/batches/upload', {
                method: 'POST', headers: h, mode: 'cors', body: fd
            });
            fetch(req).then(response => response.json()).then(json=>console.log(json)).catch((err) => console.log(err))
        } else {
            alert('Fill All inputs');
        }

    }

 /*   const acceptCSV = (e) => {
        if (e.target.files[0] !== undefined) {
            if (e.target.files[0].type !== "application/vnd.ms-excel") {
                e.target.parentNode.reset();
            } else {
                alert('File Accepted');
            }
            // console.log(e.target.files[0].type);
        }
    }*/

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
                setDepartments(data);
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })


    }, [])



    const addBatchHandler = (e) => {
        e.preventDefault();
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const division = Number.parseInt(divRef.current.value);
        const yearValue = value(yearRef);
        const sizeValue = (value(sizeRef)) / division;
        const deptValue = getCurrentId(deptRef);
        const nameValue = value(nameRef);
        //console.log(divRef.current);
        // alert(division)
        // console.log(division)

        if (!refEmpty(deptRef) && !refEmpty(sizeRef) && !refEmpty(yearRef) && !refEmpty(nameRef)) {

            for (let i = 0; i < division; i++) {
                const newBatch = {
                    _id:`${deptValue}-${yearValue}-${characters.charAt(i)}`,
                    year: yearValue,
                    size: Math.floor(sizeValue),
                    dept_id: deptValue,
                    name: division > 1 ? nameValue + '-' + characters.charAt(i) : nameValue,
                    class_size: value(sizeRef)
                }


                fetch("http://localhost:9999/batches", {
                    method: "POST",
                    body: JSON.stringify(newBatch),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }).then(response => response.json())
                    .then(data => {
                        console.log(data)
                        //responseRef.current.value = data.msg;
                        // console.log('I am here at the Inserting');
                        if (data.status === 'success')
                            setSuccess((prev) => [newBatch.name, ...prev]);
                    })
                    .catch(err => {
                        console.log(err);
                        alert('Error Inserting');
                        //responseRef.current.value = err.msg
                    })
            }

        } else {
            alert("All Fields are important")
        }

        setTimeout(() => setSuccess([]), 2000)
    }


    return (
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb ">
                <ol className="breadcrumb bg-light">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/batches">Batches</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add</li>
                </ol>
            </nav>
            <section className={'px-5'}>

                <nav className='container-fluid'>
                    <div className="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                        <a className="nav-link active" id="nav-days-tab" data-toggle="tab" href="#nav-days" role="tab"
                           aria-controls="nav-days" aria-selected="true">Add Batch Manually</a>
                        <a className="nav-link" id="nav-theme-tab" data-toggle="tab" href="#nav-theme" role="tab"
                           aria-controls="nav-theme" aria-selected="false">Add Batches With File</a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    {/*Orders TAB*/}
                    <div className="tab-pane fade show active" id="nav-days" role="tabpanel" aria-labelledby="nav-days-tab">
                        <section className="bg-admin">

                            <aside className={'nav-aside'}>
                                <ul>
                                    {BatchNavData.map((item, index) => {
                                        return (
                                            <li key={index} style={{listStyle: 'none'}}>
                                                <Link to={item.path} class={'link'}>
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </aside>

                            <form className={'px-5'} onSubmit={addBatchHandler}>

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
                                    <div className="col-lg-6 form-group pt-3">
                                        <label htmlFor="exampleFormControlSelect1">Select Year Batch</label>
                                        <select className="form-control" id="exampleFormControlSelect1" ref={yearRef}>
                                            <option>100</option>
                                            <option>200</option>
                                            <option>300</option>
                                            <option>400</option>
                                            <option>500</option>
                                            <option>600</option>
                                            <option>700</option>
                                            <option>800</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-4 pt-3">
                                        <label htmlFor="first_name">Class Size</label>
                                        <input type="number" id={'size'} className="form-control" placeholder="Batch Size"
                                               ref={sizeRef} min={0}/>
                                    </div>
                                    <div className="col-lg-4 pt-3">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id={'name'} className="form-control" placeholder="Name" ref={nameRef}/>
                                    </div>
                                    {/*<div className="col-lg-4 pt-3">*/}
                                    {/*<label htmlFor="first_name" style={{color: '#f00'}}>Response</label>
                            <input type="text" id={'response'} className="form-control" disabled
                                   placeholder="Response :" ref={responseRef}/>*/}
                                    <div className="col-lg-4 form-group pt-3">
                                        <label htmlFor="exampleFormControlSelect1">Select Division</label>
                                        <select className="form-control" id="divisionSelect" ref={divRef}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                        </select>
                                    </div>
                                    {/*</div>*/}


                                    <div className="row pt-3">
                                        <div className="form-group  d-flex justify-content-center">
                                            <input id={'add_lecturer'} className="btn btn-warning form-control bg-theme" type={'submit'}
                                                   value={'Add Batch'}/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {success && success.map((suc, index) => {
                                return (
                                    <div className="alert alert-warning alert-dismissible fade show" role="alert" key={index}>
                                        <strong>Added Successfully!</strong> New Batch - {suc}
                                    </div>)
                            })}


                        </section>
                    </div>
                    {/*Users TAB*/}
                    <div className="tab-pane fade" id="nav-theme" role="tabpanel" aria-labelledby="nav-theme-tab">
                        <section className={'my-5'}>
                             <form onSubmit={sendCSV} className={'d-flex flex-column align-items-center'}>
                                <input type="file" name="csvfile" className={'form-control-sm my-3'} ref={csvRef} accept={'text/csv'} onChange={acceptCSV}/>
                                <input type='submit' value='Upload Batches' className={'btn-warning form-control-sm btn bg-theme'}/>
                            </form>
                        </section>
                    </div>

                </div>






































            </section>
        </section>
    )
}

export default AddBatch;