import React from 'react';

function Period(props) {

    let {period}=props.session;


    let pi = (text) => {
        return Number.parseInt(text)
    }
    let periodObject = () => {
        return {
            day: period.split('-')[0],
            start: pi(period.split('-')[1]),
            end: pi(period.split('-')[2])
        }
    }
    const getLecturer = (pairId) => pairId.split('-')[0]
    const getCourse = (pairId) => pairId.split('-')[1]
    const background=['blue','orange','green','yellow']
    const getDuration=()=>Math.abs(periodObject().end-periodObject().start)
    return (/*text-dark bg-light*/
        <div className={`col-${getDuration()}   py-3 px-1 m-0 ${background[Math.floor(Math.random()*4)]}`}
             style={{border: '1px solid black'}}>
            <div className={"period m-0 "}>
                <span className={'start'}>{props.session.classroom}</span>
                <span className={'mid'}>{getCourse(props.session.pair_id)}</span>
                <span className={'start'}>{props.session.batch_id}</span>
            </div>
        </div>
    )
}
{/*getLecturer(props.session.pair_id)*/}
export default Period;