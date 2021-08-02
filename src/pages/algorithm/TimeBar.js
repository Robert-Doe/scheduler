import React from 'react'
import periods from "./periods";

export function TimeBar(){
    return(
        <section className="row text-light font-weight-bold bg-danger">
            {
                periods.map((period, index) => {
                    return (
                        <div className={period.id === 1 ? 'col offset-1 px-0' : 'col px-0'}
                             style={{border: '1px solid red'}} key={index + 1}>
                            <span style={{fontSize: '0.9em'}}>{`${period.start}-${period.end}`}</span>
                        </div>
                    )
                })
            }
        </section>
    )
}