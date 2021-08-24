import React,{useState,useEffect} from 'react';
import {Table} from "./Table";
import {BatchTable} from "./BatchTable";


export function DownloadBatches(){

    function printDiv() {
        var headers=document.getElementsByTagName('head')[0];
        var divContents = document.getElementById("tables")
        var a = window.open('', '', '');
        a.document.write(headers.innerHTML+divContents.innerHTML);
        console.log(headers);
        //a.document.write(document.children[0].innerHTML);
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
        <section className="container-fluid" id={'tables'}>
            <button onClick={printDiv}>Print Me</button>
            {
                batches.map((batch)=>{
                   return( <>
                       \<br/><br/><br/>
                       <BatchTable id={batch._id}/>
                       <br/><br/><br/><br/><br/><br/>
                   </>)
                })
            }
        </section>

    )
}