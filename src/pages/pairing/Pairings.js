import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";


function Pairings() {

    const [pairings, setPairings] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [courses,setCourses]=useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/courses`, {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/courses',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(subject => {
                setCourses(subject)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })

        fetch(`http://localhost:9999/lecturers`, {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then(response => response.json())
            .then(teachers => {
                setLecturers(teachers);
                //console.log(data)
                fetch(`http://localhost:9999/pairings`, {
                    method: 'GET',
                    mode: 'cors',
                    origin: 'http://localhost:3000/',
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    }
                }).then(res => res.json())
                    .then(data => {
                        //console.log(data)
                        setPairings(data)
                    })
                    .catch(err => {
                        alert(err)
                        console.log(err);
                    })
            })
            .catch(err => console.log(err))

    }, [])

    const getLecturer = (lecturer_id) => {
        return lecturers.filter(lect => lect._id === lecturer_id)[0]
    }
    const getCourse = (course_id) => {
        return courses.filter(course => course._id === course_id)[0]
    }
    const viewPairHandler = (e) => {
        const targetFile = e.target.parentNode;
        console.log(targetFile.childNodes[0].textContent);
        window.location.href = `http://localhost:3000/pairings/view/${targetFile.childNodes[0].textContent}`
    }

    return (
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Pairings</li>
                </ol>
            </nav>
            <ButtonNav root={'pairings'}/>
            <table className="table table-bordered" style={{borderRadius: '50px'}}>
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Lecturer</th>
                    <th>Course Code</th>
                </tr>
                </thead>
                <tbody>
                {pairings.map((pair) => {
                    const {fname,lname}=getLecturer(pair.lecturer_id);
                    const {name}=getCourse(pair.course_id);
                    console.log(courses/*getCourse(pair.course_id)*/)
                    console.log(pair)
                    return (<tr onClick={viewPairHandler} key={Math.random()}>
                            <td>{pair._id}</td>
                            <td>{`${fname} ${lname}`}</td>
                            <td>{`${name}`}</td>
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
        </section>
    )
}

export default Pairings