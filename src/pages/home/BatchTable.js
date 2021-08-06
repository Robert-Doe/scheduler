import React,{useContext} from 'react';
import Days from "../algorithm/Days";
import BackFill from "../algorithm/BackFill";
import BatchPeriod from "./BatchPeriod";
//import sessions from "../../../data/sessions";
import {TimeBar} from "../algorithm/TimeBar";
import {SessionContext} from "../../App";


//const getLecturer = (pairId) => pairId.split('-')[0];


function TableRow({full_day,day_abbr,id}){
    const {interim}=useContext(SessionContext);
    console.log("Batch Table Row",interim)
    let cellInterval = (active, previous) => {
        return Math.abs(pi(active[1]) - pi(previous[2]))
    }


    let pi = (text) => {
        return Number.parseInt(text)
    }

    let periodObject = (period) => {
        //console.log(period)
        if(period) return {
            day: period.split('-')[0],
            start: period.split('-')[1],
            end: period.split('-')[2]
        }
    }

    let day = (day, id,schedules/*=[]*/) => {
        const sess = schedules.filter((session) => session.period && periodObject(session.period).day === day && session.batch_id === id)
        console.log('Batch Table Day',sess,schedules)
        return (sess)
    }


    return (
        <section className="row table-row p-0">
            <Days name={full_day}/>
            {
                day(day_abbr, id,interim).sort((a,b)=>periodObject(a.period).start-periodObject(b.period).start).map((object, index) => {
                    const {period} = object;
                    const session = period.split("-")
                    let today = day(day_abbr, id,interim).sort((a,b)=>periodObject(a.period).start-periodObject(b.period).start)
                    //console.log(interim)
                    if (index !== 0) {
                        const prevSession = today[index - 1].period.split('-')
                        const difference = cellInterval(session, prevSession)
                        console.log(difference)
                        if (difference > 0) {
                            return (<>
                                <BackFill space={difference} key={Math.floor('b'+Math.random()*1000000)}/>
                                <BatchPeriod session={object} key={'a'+Math.random()*100}/>
                            </>)
                        } else {
                            return (<BatchPeriod session={object} key={'c'+Math.random()}/>)
                        }
                    } else {
                        const difference=Math.abs(1-pi(session[1]))
                        return (<>
                            {difference>0?<BackFill space={difference}/>:null}
                                <BatchPeriod session={object} />
                            </>
                        )
                    }

                })
            }
        </section>
    )
}


export function BatchTable({id}) {
    const {interim}=useContext(SessionContext);
    //console.log('Batch Table', interim)
    return (
        <main className={'px-3'}>
            <h2>Count=={interim.filter(x=>x.batch_id===id).length}</h2>
            <TimeBar/>
            <TableRow full_day={'Monday'} day_abbr={'Mon'} id={id}/>
            <TableRow full_day={'Tuesday'} day_abbr={'Tues'} id={id}/>
            <TableRow full_day={'Wednesday'} day_abbr={'Wed'} id={id}/>
            <TableRow full_day={'Thursday'} day_abbr={'Thurs'} id={id}/>
            <TableRow full_day={'Friday'} day_abbr={'Fri'} id={id}/>
        </main>
    )

}