import React from 'react';

function Period({name}){
    return(
        <div className={`col-1 bg-light text-dark py-3 px-1 m-0`} style={{border:'1px solid black'}}>
            <div className="period m-0">
                <span className={'mid'} id={'day'}>{name}</span>
            </div>
        </div>
    )
}

export default Period;