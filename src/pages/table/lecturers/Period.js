import React from 'react';

function Period(props) {
    return (
        <div className={`col-${props.session.credit} bg-light text-dark py-3 px-1 m-0`}
             style={{border: '1px solid black'}}>
            <div className="period m-0">
                <span className={'start'}>{props.session.class.join()}</span>
                <span className={'mid'}>{props.session.batch_id}</span>
                <span className={'start'}>{props.session.course}</span>
            </div>
        </div>
    )
}

export default Period;