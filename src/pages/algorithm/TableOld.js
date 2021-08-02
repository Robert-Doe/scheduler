import React,{useContext} from 'react'
import Days from "./Days";
import BackFill from "./BackFill";
import Period from "./Period";
/*import sessions from "../../../data/sessions";*/
import {TimeBar} from "./TimeBar";
//const sessions=[];
import {SessionContext} from "./AlgorithmSchedulerWithAsync";


const getLecturer = (pairId) => pairId.split('-')[0]

function TableRow({full_day, day_abbr, class_id}) {

    const {interim}=useContext(SessionContext);

    let cellInterval = (active, previous) => {
        return Math.abs(pi(active[1]) - pi(previous[2]))
    }


    let pi = (text) => {
        return Number.parseInt(text)
    }

    let periodObject = (period) => {
        return {
            day: period.split('-')[0],
            start: period.split('-')[1],
            end: period.split('-')[2]
        }
    }

    let day = (day, id,schedules=[]) => {
        const sess = schedules.filter((session) => periodObject(session.period).day === day && getLecturer(session.pair_id) === id)
        console.log(sess)
        return (sess)
    }
    //setTimeout(()=>console.log(),2000)

    return (
        <section className="row table-row p-0">

            <Days name={full_day}/>
            {
                day(day_abbr, class_id,interim).map((object, index) => {
                    const {period} = object;
                    const session = period.split("-")
                    let today = day(day_abbr, class_id,interim)
                    console.log(interim)
                    if (index !== 0) {
                        const prevSession = today[index - 1].period.split('-')
                        const difference = cellInterval(session, prevSession)
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
                        const difference = Math.abs(0 - pi(session[1]))
                        return (<>
                                <BackFill space={difference}/>
                                < Period session={object}/>
                            </>
                        )
                    }

                })
            }
        </section>
    )
}


export function TableOld({id}) {
    const {interim}=useContext(SessionContext);
    return (
        <main className={'px-3'}>
            <h2>Count=={interim.filter(x=>getLecturer(x.pair_id)===id).length}</h2>
            <TimeBar/>
            <TableRow full_day={'Monday'} day_abbr={'Mon'} class_id={id}/>
            <TableRow full_day={'Tuesday'} day_abbr={'Tues'} class_id={id}/>
            <TableRow full_day={'Wednesday'} day_abbr={'Wed'} class_id={id}/>
            <TableRow full_day={'Thursday'} day_abbr={'Thurs'} class_id={id}/>
            <TableRow full_day={'Friday'} day_abbr={'Fri'} class_id={id}/>
        </main>
    )

}