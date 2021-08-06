import React from 'react'
import Days from "../../session/Days";
import BackFill from "../../session/BackFill";
import Period from "./Period";
import sessions from "../../../data/sessions";
import {TimeBar} from "../../../components/TimeBar";

let cellInterval=(active,previous)=>{
    return Math.abs(pi(active[1])-pi(previous[2]))
}


let pi=(text)=>{
    return Number.parseInt(text)
}

let day=(day,id)=>{
    const sess = sessions.filter((session) => session.day === day && session.batch_id === id)
    console.log(sess)
    return (sess)
}

function TableRow({full_day,day_abbr,class_id}){
    console.log(full_day)
    return (
        <section className="row table-row p-0">
            <Days name={full_day}/>

            {
                day(day_abbr, class_id).map((object, index) => {
                    const {period} = object;
                    const session = period.split("-")
                    let today = day(day_abbr, class_id)
                    console.log(session)
                    if (index !== 0) {
                        const prevSession = today[index - 1].period.split('-')
                        const difference = cellInterval(session,prevSession)
                        console.log(difference)
                        if (difference > 0) {
                            return (<>
                                <BackFill space={difference} key={index}/>
                                < Period session={object} key={index + 'b'}/>
                            </>)
                        } else {
                            return (< Period session={object} key={index}/>)
                        }
                    } else {
                        const difference=Math.abs(0-pi(session[1]))
                        return (<>
                                <BackFill space={difference} key={index + 'b'}/>
                                < Period session={object}/>
                            </>
                        )
                    }

                })
            }
        </section>
    )
}


export function Table({id}) {

    return (
        <main className={'px-3'}>
            <h3 className="display-4 text-center">{`${id} - TimeTable 2020/2021`}</h3>
            <hr/>
            <TimeBar/>
            {/*{*/}
            {/*    days.map((dayObject,index)=>{*/}
            {/*        return <TableRow key={index} full_day={dayObject.day} day_abbr={dayObject.abbr} class_id={id}/>*/}
            {/*    })*/}
            {/*}*/}
            <TableRow full_day={'Monday'} day_abbr={'Mon'} class_id={id}/>
            <TableRow full_day={'Tuesday'} day_abbr={'Tues'} class_id={id}/>
            <TableRow full_day={'Wednesday'} day_abbr={'Wed'} class_id={id}/>
            <TableRow full_day={'Thursday'} day_abbr={'Thurs'} class_id={id}/>
            <TableRow full_day={'Friday'} day_abbr={'Fri'} class_id={id}/>

        </main>
    )

}