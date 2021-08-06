import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'


function Batches() {

    const [batchList, setBatchList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/batches', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setBatchList(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [])


    const viewBatchHandler = (e) => {
        const targetFile = e.target.parentNode;
        console.log(targetFile.childNodes[0].textContent);
        window.location.href = `http://localhost:3000/batches/view/${targetFile.childNodes[0].textContent}`

    }

    return (
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="http://localhost:3000/">Home</Link></li>
                    <li className="breadcrumb-item active">Batches</li>
                </ol>
            </nav>
            <table className="table table-bordered" style={{borderRadius: '50px'}}>
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Batch Size</th>
                    <th>Year</th>
                    <th>Department</th>
                </tr>
                </thead>
                <tbody>
                {batchList && batchList.map((batch) => {
                    const {_id, name, class_size, year, dept_id} = batch;
                    return (
                        <tr onClick={viewBatchHandler} key={Math.random() * 10000}>
                            <td>{_id}</td>
                            <td>{name}</td>
                            <td>{class_size}</td>
                            <td>{year}</td>
                            <td>{dept_id}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </section>
    )
}

export default Batches