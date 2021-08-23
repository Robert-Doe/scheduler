import React,{useState,useEffect} from 'react';
import {Table} from "./Table";


export function DownloadLecturers(){

    const [lecturers, setLecturers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/lecturers', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setLecturers(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [])



    return(
        <section className="container-fluid">
            {
                lecturers.map((lecturer)=>{
                   return( <Table id={lecturer._id}/>)
                })
            }
        </section>

    )
}