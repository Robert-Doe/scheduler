import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";


function Halls(){

    const [halls,setHalls]=useState([]);

    const viewHallHandler=(e)=>{
        const targetFile=e.target.parentNode;
        console.log(targetFile.childNodes[0].textContent);
        window.location.href = `http://localhost:3000/halls/view/${targetFile.childNodes[0].textContent}`
    }
    useEffect(() => {
        fetch('http://localhost:9999/halls', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setHalls(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [])

    return(
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Halls</li>
                </ol>
            </nav>
            <ButtonNav root={'halls'}/>
            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Size</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {
                    halls.map((hall)=> {
                        return(<tr key={Math.random()*1000}>
                            <td>{hall._id}</td>
                            <td>{hall.location}</td>
                            <td>{hall.size}</td>
                            <td>{hall.type}</td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </section>
    )
}

export default Halls