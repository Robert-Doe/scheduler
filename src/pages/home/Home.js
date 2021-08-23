import React, {useContext, useEffect, useState} from 'react';
import {HomeBody} from './HomeBody';
import classrooms from "../algorithm/classrooms";
//import batches from "../algorithm/batches";
import {getLecturer, getRandomClassroom, getRandomTime, intValue, pairSplit} from "./utils";
import {SessionContext} from "../../App";
import {Table} from "./Table";
import {BatchTable} from "./BatchTable";
import {Link} from "react-router-dom";


function Home() {
    const [departments, setDepartments] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [halls, setHalls] = useState([]);
    const [batches, setBatches] = useState([]);
    const [pairings, setPairings] = useState([]);
    const {setInterim,serversess,setServersess,goneHome,setGoneHome} =useContext(SessionContext);

    useEffect(() => {
        fetch('http://localhost:9999/departments', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => res.json())
            .then(data => {
                setDepartments(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
        fetch('http://localhost:9999/lecturers', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => res.json())
            .then(data => {
                setLecturers(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
        fetch('http://localhost:9999/halls', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => res.json())
            .then(data => {
                setHalls(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
        fetch('http://localhost:9999/batches', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => res.json())
            .then(data => {
                setBatches(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
        fetch('http://localhost:9999/courses', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => res.json())
            .then(data => {
                setCourses(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
        fetch('http://localhost:9999/pairings', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }).then(res => res.json())
            .then(data => {
                setPairings(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

        if(!goneHome){
            fetch('http://localhost:9999/sessions', {
                method: 'GET',
                mode: 'cors',
                origin: 'http://localhost:3000/',
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(res => res.json())
                .then(data => {
                    if (data) {
                        setServersess(data)
                        setInterim(data)
                    } else {
                        setInterim([])
                        setServersess([])
                    }

                })
                .catch(err => {
                    alert(err)
                    console.log(err);
                })
        }
        setGoneHome(true);


    }, [])


    let sessions = [];

    const onScheduleHandler = () => {

        sessions = [].concat(serversess);
        //setInterim([]);
        console.clear();

        batches.sort((a,b)=>(a.size-b.size)).forEach((batch) => {

            batch.pairings.forEach((pair) => {
                let lecturer = getLecturer(pair)
                let period = getRandomTime(intValue(pairSplit(pair, 2)), lecturer, batch._id, sessions)
                let classroom = getRandomClassroom(period, batch.size, classrooms);
                const newSession = {
                    period: period,
                    pair_id: pair,
                    batch_id: batch._id,
                    classroom: classroom
                };
                if (newSession.period && period !== "Mon-00-00") {
                    sessions.push(newSession);
                }
            })
        })

        console.log(sessions)
        let displayable = sessions.filter(sess => (sess.period !== 'Mon-00-00' && sess.period))
        //const display=displayable.concat(interim)
        setInterim(displayable/*prev => prev.concat(displayable)*/);
    }

    return (<section className='secondary-lt'>
            <HomeBody scheduler={onScheduleHandler} batches={batches} departments={departments} courses={courses}
                      halls={halls} lecturers={lecturers} pairings={pairings}/>
        {/*    <Link to={'tables/lecturer/1660717'}>Test</Link>
            <Link to={'tables/batch/086-100-A'}>Test</Link>
            <Link to={'batches'}>Batches</Link>*/}

            {/*<a href="http://localhost:3000/tables/lecturer/20523595">Test</a>*/}
            <Table id={'1660717'}/>
            {/* <BatchTable id={'CS1'}/>
            <BatchTable id={'CS2'}/>
            <BatchTable id={'CS3'}/>
            <BatchTable id={'CS4'}/>
            <BatchTable id={'CS5'}/>*/}
        </section>
    );
}

export default Home;
