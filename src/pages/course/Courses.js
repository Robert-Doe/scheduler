import React, {useEffect, useState} from 'react';


function Courses() {

    const viewCourseHandler = (e) => {
        const targetFile = e.target.parentNode;
        console.log(targetFile.childNodes[0].textContent);
        window.location.href = `http://localhost:3001/courses/view/${targetFile.childNodes[0].textContent}`
    }

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/courses', {
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
    }, [])

    return (
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Courses</li>
                </ol>
            </nav>
            <table className="table table-bordered table-striped" style={{borderRadius: '50px'}}>
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Course Code</th>
                    <th>Department</th>
                </tr>
                </thead>
                <tbody>

                {courses.map((course) => {
                    const {_id, name, dept_id,credit} = course;
                    return (
                        <tr onClick={viewCourseHandler} key={Math.random()}>
                            <td>{_id}</td>
                            <td>{name}</td>
                            <td>{dept_id}</td>
                            <td>{credit}</td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
        </section>
    )
}

export default Courses