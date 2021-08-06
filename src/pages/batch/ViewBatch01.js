import React from 'react';
//import {useParams} from 'react-router-dom'
import sessions from "../../data/sessions";
import Period from "./Period";
import Days from './Days';
import BackFill from "./BackFill";


let pi=(text)=>{
    return Number.parseInt(text)
}
let cellInterval=(active,previous)=>{
    return Math.abs(pi(active[1])-pi(previous[2]))
}
let day=(day)=>{
    const sess=sessions.filter((period)=>period.day===day)
        console.log(sess)
    return (sess)
}
function TableRow({full_day,day_abbr}){
    return (
        <section className="row p-0">
            <Days name={full_day}/>
            {
                day(day_abbr).map((object, index) => {
                    const {period}=object;
                    const session = period.split("-")
                    let today=day(day_abbr)
                    console.log(session)
                    if (index !== 0) {
                        const prevSession=today[index-1].period.split('-')
                        const difference = cellInterval(session,prevSession)
                        console.log(difference)
                        if (difference > 0) {
                            return (<>
                                <BackFill space={difference} key={index}/>
                                < Period session={object} key={index}/>
                            </>)
                        } else {
                            return (< Period session={object} key={index}/>)
                        }
                    } else {
                        const difference=Math.abs(0-pi(session[1]))
                        return (<>
                                <BackFill space={difference} />
                                < Period session={object} />
                            </>
                        )
                    }

                })
            }
        </section>
    )
}
function ViewBatch() {
    //let {id} = useParams();

    return (
        <section className={'container-fluid mt-2 py-3'}>
            <div className="container">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="http://localhost:3000/batches">Batches</a></li>
                        <li className="breadcrumb-item active" aria-current="page">View</li>
                    </ol>
                </nav>
            </div>
            <main className={'px-3'}>
                <TableRow full_day={'Monday'} day_abbr={'Mon'}/>
                <TableRow full_day={'Tuesday'} day_abbr={'Tues'}/>
                <TableRow full_day={'Wednesday'} day_abbr={'Wed'}/>
                <TableRow full_day={'Thursday'} day_abbr={'Thurs'}/>
                <TableRow full_day={'Friday'} day_abbr={'Fri'}/>
            </main>

        </section>
    )
}

export default ViewBatch;