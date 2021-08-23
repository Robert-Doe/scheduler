import React,{useContext} from 'react';
import Days from "../algorithm/Days";
import BackFill from "../algorithm/BackFill";
import Period from "./Period";
//import sessions from "../../../data/sessions";
import {TimeBar} from "../algorithm/TimeBar";
import {SessionContext} from "../../App";


const getLecturer = (pairId) => pairId.split('-')[0];

function TableRow({full_day,day_abbr,id}){
    const {interim}=useContext(SessionContext);

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

    let day = (day, id,schedules=[]) => {
        const sess = schedules.filter((session) => session.period && periodObject(session.period).day === day && getLecturer(session.pair_id) === id)
        console.log(sess)
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
                                < Period session={object} key={'a'+Math.random()*100}/>
                            </>)
                        } else {
                            return (< Period session={object} key={'c'+Math.random()}/>)
                        }
                    } else {
                        const difference=Math.abs(1-pi(session[1]))
                        return (<>
                            {difference>0?<BackFill space={difference}/>:null}
                                <Period session={object} />
                            </>
                        )
                    }

                })
            }
        </section>
    )
}


export function Table({id}) {
    const {interim}=useContext(SessionContext);
    return (
        <main className={'px-3'} style={{backgroundColor:'white'}}>
            <p className={'display-4'}>Timetable - Lecturer  {id}</p>
           {/* <h2>Count=={interim.filter(x=>getLecturer(x.pair_id)===id).length}</h2>*/}
            <TimeBar/>
            <TableRow full_day={'Monday'} day_abbr={'Mon'} id={id}/>
            <TableRow full_day={'Tuesday'} day_abbr={'Tues'} id={id}/>
            <TableRow full_day={'Wednesday'} day_abbr={'Wed'} id={id}/>
            <TableRow full_day={'Thursday'} day_abbr={'Thurs'} id={id}/>
            <TableRow full_day={'Friday'} day_abbr={'Fri'} id={id}/>
        </main>
    )

}