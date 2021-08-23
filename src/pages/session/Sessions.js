import React, {useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import {ButtonNav} from "../../components/ButtonNav";


/*const viewSessionHandler=(e)=>{
    const targetFile=e.target.parentNode;
    console.log(targetFile.childNodes[0].textContent);
    window.location.href = `http://localhost:3000/sessions/view/${targetFile.childNodes[0].textContent}`

}*/

function Sessions(){

    const [sessions,setSessions]=useState([])

    useEffect(() => {
        fetch('http://localhost:9999/sessions', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setSessions(data)
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
                    <li className="breadcrumb-item active" aria-current="page">Sessions</li>
                </ol>
            </nav>

            <ButtonNav root={'sessions'}/>
            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Course Code</th>
                    <th>Lecturer</th>
                    <th>Halls</th>
                    <th>Period</th>
                </tr>
                </thead>
                <tbody>
                {
                    sessions.map((session)=>{
                        return(<tr /*onClick={viewSessionHandler}*/>
                            <td>fad23fa78829abc34e</td>
                            <td>CSM256</td>
                            <td>Robert Doe</td>
                            <td>SF1 SF3</td>
                            <td>M-3-5</td>
                        </tr>)
                    })
                }
                </tbody>
            </table>
        </section>
    )
}

export default Sessions