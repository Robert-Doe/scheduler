import React, {createContext, useRef, useState} from 'react';
//import sessions from "../../data/sessions";
import batches from "./batches";
import classrooms from "./classrooms";
import {Table} from "./Table";
import {BatchTable} from "./BatchTable";


export const SessionContext = createContext();

function AlgorithmScheduler() {

    //const lecturerRef = useRef();
    const [interim, setInterim] = useState([]);
    let days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'];
    let sessions = [];


    const rangeArray = (start, end) => {
        return [...Array(end).keys()].filter(x => x >= start);
    }

    const intValue = (numString) => Number.parseInt(numString);
    const pairSplit=(pairString,pos)=>pairString.split('-')[pos]

    const pObject = (period = 'Mon-00-00') => {
        return {
            day: period.split('-')[0],
            start: intValue(period.split('-')[1]),
            end: intValue(period.split('-')[2])
        }
    }

    const rangeWithPeriod = (period) => {
        const {start, end} = pObject(period);
        return rangeArray(start, end);
    }

    const doIntersect = (fPeriod, sPeriod) => {
        if (pObject(fPeriod).day === pObject(sPeriod).day) {
            return rangeWithPeriod(fPeriod).filter(x => rangeWithPeriod(sPeriod).includes(x)).length > 0
        } else {
            return false
        }
    }


    const getLecturer = (pairId) => pairId.split('-')[0]/*pairings.filter(pair => pair.id === pairId)[0].lecturer_id*/;


    const getRandomClassroom = (period, batchSize) => {
        let randomRoom = null;
        let fitClasses = classrooms.filter(classroom => classroom.size >= batchSize);
        do {
            randomRoom = fitClasses[Math.floor(Math.random() * fitClasses.length)];
            if (randomRoom === undefined) {
                randomRoom = {id: 'UNDEFINED', size: null}
            }
        } while ((sessions.some(session => session.period === period && session.classroom === randomRoom.id)));

        //console.log(randomRoom, batchSize)
        if (randomRoom.size >= batchSize) {
            return randomRoom.id
        } else {
            return 'UNDEFINED'
        }
    }

    const getRandomTime =  (hours, lecturerId, batchId, schedules) => {
        let sampletime = 'Mon-00-00';
        const sFreePeriods = studentFreeTime(batchId, hours, schedules);
        const lFreePeriods = lecturerFreeTime(lecturerId, hours, schedules);
        // console.log(sFreePeriods,lFreePeriods);
        const bestTimes = sFreePeriods.filter(x => lFreePeriods.includes(x));
        // do{
        if (bestTimes !== []) {
            sampletime = bestTimes[Math.floor(Math.random() * bestTimes.length)]
        }/*else{break;}*/
        // }while(!schedulable(sampletime,lecturerId,batchId))

        return sampletime;
    }

    const studentFreeTime =  (batchId, time, schedules) => {
        const currentSchedule =schedules.map(session => {
            if (session.batch_id === batchId) {
                return session.period;
            }
        });
        //return possibleSet(time, 11).filter(x => !currentSchedule.includes(x));
        return possibleSet(time, 11).filter(x => !currentSchedule.some(y => doIntersect(x, y)));
    } //Change the 12 Back to 11 . It was just for Testing Purposes

    //Filter in came to Replace map which existed in the previous
    const lecturerFreeTime =  (lecturerId, time, schedules) => {
        const currentSchedule = schedules.map(session => {
            if (getLecturer(session.pair_id) === lecturerId) {
                return session.period;
            }
        });
        //return possibleSet(duration, 11).filter(x => !currentSchedule.includes(x));
        return possibleSet(time, 11).filter(x => !currentSchedule.some(y => doIntersect(x, y)));//Change the 12 to 11
    }//Change the 12 To 11. It was just for testing purposes

    const possibleSet = (duration, maxPeriod) => {
        let freePeriod = [];
        days.forEach(day => {
            let count = 1;
            while (count <= (maxPeriod - (duration - 1))) {
                freePeriod.push(`${day}-${count}-${count + duration}`);
                count++;
            }
        });
        return freePeriod;
    }

    const btnClickHandler=/*async*/ ()=> {
        sessions = [];
       setInterim([]);
        console.clear();
        //let durations = [1,2,3];

            batches.forEach((batch) => {
              batch.pairings.forEach( (pair) => {
                let lecturer = getLecturer(pair)
                let period = getRandomTime(intValue(pairSplit(pair,2)), lecturer, batch.id, sessions)
                let classroom = getRandomClassroom(period, batch.size);
                //console.log(batch.id,period,lecturer,classroom);
                const newSession = {
                    period: period,
                    pair_id: pair,
                    batch_id: batch.id,
                    classroom: classroom
                };
                if(newSession.period && period!=="Mon-00-00"){
                    sessions.push(newSession);
                }
            })
        })
        console.log(sessions)
        let displayable =sessions.filter(sess => (sess.period !=='Mon-00-00' && sess.period))
        //console.log(displayable)
        /*await*/ setInterim(displayable);

       /* fetch('http://192.168.43.170:9999/sessions/algorithm'/!*'https://schooltimedb.herokuapp.com/sessions/algorithm'*!/, {
            method: "POST", mode: 'cors',
            body: JSON.stringify({batches,sessions,classrooms}),/!*credentials: 'include',*!/
           /!* origin: 'http://localhost:3001',*!/
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response =>response.json())
            .then(data=>{
                let displayable =data.schedules.filter(sess => (sess.period !=='Mon-00-00' && sess.period))
                console.log(displayable)
                /!*await*!/ setInterim(displayable);
            }).catch(err=>console.log(err))*/
    }

    return (<SessionContext.Provider value={{interim, setInterim}}>
            <section className={'container-fluid py-2'}>
                <h1>Algorithm Scheduler</h1>
                <button onClick={btnClickHandler}>Generator</button>
                <Table id={'rdoe1'}/>
                <BatchTable id={'CS1'}/>
                <BatchTable id={'CS2'}/>
                <BatchTable id={'CS3'}/>
                <BatchTable id={'CS4'}/>
                <BatchTable id={'CS5'}/>
            </section>
        </SessionContext.Provider>
    )
}
export default AlgorithmScheduler


/*
const schedulable=(time,lecturerId,batchId)=>{
    if(time==='0000-00-00'){
        return true
    }else{return (isStudentFree(batchId,time) && isLecturerFree(lecturerId,time)) }
}*/

/*    const randtime = (duration) => {
        let randDay = Math.floor((Math.random() * 5));
        let randStart = Math.floor((Math.random() * 10)) + 1;
        let randEnd = randStart + duration;
        return `${days[randDay]}-${randStart}-${randEnd}`
    }*/

/*
const isStudentFree = (id, period) => {
    let sSessions = sessions.filter(session => session.batch_id === id)
    return !sSessions.some(sess => doIntersect(sess.period, period))/!*.length===0;*!/
}


const isLecturerFree = (id, period) => {
    let lSessions = sessions.filter(session => session.lecturer_id === id)
    return !lSessions.some(sess => doIntersect(sess.period, period))/!*.length===0;*!/
}*/
