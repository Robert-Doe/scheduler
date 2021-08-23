import React,{useState,useEffect} from 'react';
import {Table} from "./Table";
import {BatchTable} from "./BatchTable";


export function DownloadBatches(){

    function printDiv() {
        var divContents = document.getElementById("document")
        var a = window.open('', '', '');
        a.document.write(document.children[0].innerHTML);
        a.print();
        a.document.close();
    }

    const [batches, setBatches] = useState([]);

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
                setBatches(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [])

         

    return(
        <section className="container-fluid">
            <button onClick={printDiv}>Print Me</button>
            {
                batches.map((batch)=>{
                   return( <>
                       <BatchTable id={batch._id}/>
                       <br/><br/><br/><br/><br/><br/><br/>
                   </>)
                })
            }
        </section>

    )
}