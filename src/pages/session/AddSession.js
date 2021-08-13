import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";

function AddSession() {

    const days = {
        sunday: "Sun",
        monday: "Mon",
        tuesday: "Tues",
        wednesday: "Wed",
        thursday: "Thurs",
        friday: "Fri",
        saturday: "Sat"
    }

    const lectDeptRef = useRef();
    const lecturerRef = useRef();
    const batchDeptRef=useRef();
    const courseRef = useRef();
    const batchRef = useRef(null);
    const dayRef = useRef(null);
    const periodRef = useRef(null);
    const timeRef = useRef(null);
    const hallRef = useRef(null);
    const statusRef = useRef(null)
    const [departments, setDepartments] = useState([])
    const [lecturers, setLecturers] = useState([]);
    const [activeLecturerId, setActiveLecturerId] = useState(null)
    const [lecturerDeptId, setLecturerDeptId] = useState(null);
    const [pairings,setPairings] = useState([])
    const [batchDeptId,setBatchDeptId]=useState(null);
    const [batches,setBatches]=useState([]);

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

    const intValue=(numString)=>{
        return Number.parseInt(numString)
    }

    const lectDeptHandler = (e) => {
        setLecturerDeptId(getCurrentId(lectDeptRef))
    }
    const lectHandler = (e) => {
        setActiveLecturerId(getCurrentId(lecturerRef))
    }
    const batchDeptHandler = (e) => {
        setBatchDeptId(getCurrentId(batchDeptRef))
    }

    const pairId = (lRef, cRef) => `${value(lRef)}-${value(cRef)}`;

    //const period = (dRef, pRef, tRef) => `${days[value(dRef)]}-${value(periodRef)}-${value(tRef)}`

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
                setTimeout(() => {
                    setLecturerDeptId(getCurrentId(lectDeptRef))
                    setBatchDeptId(getCurrentId(batchDeptRef))
                }, 200)

            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

    }, [])

    useEffect(() => {
        fetch(`http://localhost:9999/lecturers/departments/${lecturerDeptId}`, {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setLecturers(data)
                if (!refEmpty(lecturerRef)) {
                    setTimeout(() => setActiveLecturerId(getCurrentId(lecturerRef)), 300)
                } /*else {
                    setActiveLecturerId(null)
                }*/
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

    }, [lecturerDeptId])

    useEffect(() => {
        fetch(`http://localhost:9999/pairings/lecturers/${activeLecturerId}`, {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setPairings(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

    }, [activeLecturerId])


    useEffect(() => {
        fetch(`http://localhost:9999/batches/departments/${batchDeptId}`, {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setBatches(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    },[batchDeptId])



    const addSessionHandler = (e) => {
        e.preventDefault();

        if (!refEmpty(lecturerRef) && !refEmpty(dayRef) && !refEmpty(batchRef) && !refEmpty(hallRef) && !refEmpty(timeRef)) {
            const start=intValue(value(periodRef))
            const end=intValue(value(timeRef))
            // const newSession = {
            //     pair_id: pairId(lecturerRef, courseRef),
            //     hall_id: value(hallRef),
            //     period:`${value(dayRef)}-${start}-${start+end}` /*period(dayRef, periodRef, timeRef)*/,
            //     batch: value(batchRef)
            // }
            const newSession = {
                period:`${value(dayRef)}-${start}-${start+end}` ,
                pair_id: getCurrentId(courseRef),
                batch_id: getCurrentId(batchRef),
                hall_id: value(hallRef)
            }

            fetch("http://localhost:9999/sessions", {
                method: "POST",
                body: JSON.stringify(newSession),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)

                   /* lecturerRef.current.value = ''
                    dayRef.current.value = ''
                    batchRef.current.value = ''
                    hallRef.current.value = ''*/
                    statusRef.current.value = data.msg
                })
                .catch(err => console.log(err))



        console.log(newSession)
            /*fetch("http://localhost:9999/sessions", {
                method: "POST",
                body: JSON.stringify(newSession),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    lecturerRef.current.value = ''
                    dayRef.current.value = ''
                    batchRef.current.value = ''
                    hallRef.current.value = ''
                    statusRef.current.value = data.msg
                })
                .catch(err => console.log(err))
            lecturerRef.current.childNodes.forEach((child) => console.log(child))*/
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
                        <li className="breadcrumb-item"><Link to="/sessions">Sessions</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>

                <form className={'px-5'} onSubmit={addSessionHandler}>
                    <div className={'row'}>

                        <div className="col-md-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Instructor's Department</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                    onChange={lectDeptHandler} ref={lectDeptRef}>
                                {departments.map((department) => {
                                    return (<option key={department._id}
                                                    data-id={department._id}>{department.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="col-md-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Instructor</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={lecturerRef}
                                    onChange={lectHandler}>
                                {lecturers.map((lecturer) => {
                                    const {_id, fname, lname} = lecturer;
                                    return (<option key={_id}
                                                    data-id={_id}>{`${fname} ${lname}`}</option>);
                                })}
                            </select>
                        </div>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Course</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={courseRef}>
                                { pairings.map(pair=>{
                                   return( <option data-id={pair._id} key={pair._id}>{pair.course_id}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>


                    <div className={'row'}>
                        <div className="col-md-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Student's Department</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                onChange={batchDeptHandler} ref={batchDeptRef}>
                                {departments.map((department) => {
                                    return (<option key={department._id}
                                                    data-id={department._id}>{department.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="col-md-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Year Batch</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={batchRef}>
                                {batches.map(batch=>{
                                    return (<option data-id={batch._id} key={batch._id}>{batch.name}</option>)
                                })
                                }
                            </select>
                        </div>
                    </div>


                    <div className={'row'}>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Day</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={dayRef}>
                                <option>Mon</option>
                                <option>Tues</option>
                                <option>Wed</option>
                                <option>Thurs</option>
                                <option>Fri</option>
                            </select>
                        </div>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Period(Start)</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={periodRef}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                        </div>
                        <div className="col-lg-4 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Select Duration</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={timeRef}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Hall</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={hallRef}>
                                <option>SF1</option>
                                <option>SF2</option>
                                <option>SF3</option>
                                <option>SF4</option>
                                <option>SF5</option>
                            </select>
                        </div>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="first_name" className={'text-danger text-bold'}>Status</label>
                            <input type="text" id={'first_name'} className="form-control" disabled ref={statusRef}
                                   placeholder="Feasible Session Placement"/>
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

export default AddSession