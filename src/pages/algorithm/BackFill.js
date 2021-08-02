import React from 'react';

function BackFill({space}){
    if(space === 0)
        return null
    return(
        <div className={`col-${space} bg-light text-dark py-3 px-1 m-0`} style={{border:'1px solid black'}}>
            <div className="period m-0">

            </div>
        </div>
    )
}

export default BackFill;