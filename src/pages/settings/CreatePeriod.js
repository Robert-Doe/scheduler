import React, {useEffect, useRef, useState} from 'react'


export default function CreatePeriod() {


    const startRef = useRef(null);
    const endRef = useRef(null);
    const incrementRef = useRef(null)
    const idRef = useRef(null)
    const [periods, setPeriods] = useState([]);

    const pad2digits = (n) => {
        return n > 9 ? "" + n : "0" + n;
    }

    const timeChangeHandler = (e) => {
        //setTime(()=>e.target.value)
        if (e.target.value === "")
            endRef.current.value = "00:00";
        let hour = Number.parseInt(startRef.current.value.split(':')[0]);
        let min = Number.parseInt(startRef.current.value.split(':')[1]);
        hour = Math.floor((((Number.parseInt(incrementRef.current.value) + min) / 60) + hour) % 24);
        min = (Number.parseInt(incrementRef.current.value) + min) % 60;
        endRef.current.value = `${pad2digits(hour)}:${pad2digits(min)}`
    }


    const addPeriodHandler = (e) => {
        e.preventDefault();

        if (startRef.current.value !== '' && endRef.current.value !== '' && incrementRef.current.value !== '' && idRef.current.value < 12) {
            const newPeriod = {
                _id: idRef.current.value,
                start: startRef.current.value,
                end: endRef.current.value
            }
            fetch("http://localhost:9999/periods", {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify(newPeriod),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    setPeriods([...data])
                    startRef.current.value = ''
                    console.log(data)
                })
                .catch(err => console.log(err))

        } else {

            console.log('All Fields are Required')
        }

    }

    useEffect(() => {
        fetch('http://localhost:9999/periods', {
            method: 'GET',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setPeriods(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }, [])

    const removeAllPeriods = (e) => {
        e.preventDefault();
        fetch('http://localhost:9999/periods/', {
            method: 'DELETE',
            mode: 'cors',
            origin: 'http://localhost:3000/',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                setPeriods(data)
                console.log(data)
            })
            .catch(err => {
                alert(err)
                console.log(err);
            })
    }


    return (
        <section className="jumbotron">
            <div className="custom-control custom-switch mb-4 bg">
                <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                <label className="custom-control-label" htmlFor="customSwitch1">Development State</label>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <fieldset>
                        <legend>Create Period</legend>
                        <form onSubmit={addPeriodHandler} onReset={removeAllPeriods}>
                            <section className="row">
                                <div className={'col-md-6'}>
                                    <label htmlFor="stime">Period Number</label>
                                    <input type="number" id="pnumber" name="period_number" min={1} max={11}
                                           className={'form-control text-center'} maxLength={2} ref={idRef}
                                           value={periods.length + 1} disabled/>
                                </div>
                                <div className={'col-md-6'}>
                                    <label htmlFor="interval">Duration(mins)</label>
                                    <input type="number" id="interval" name="interval"
                                           className={'form-control'} ref={incrementRef}/>
                                </div>
                            </section>
                            <section className="row">
                                <div className={'col-md-6'}>
                                    <label htmlFor="stime">Start Time:</label>
                                    <input type="time" ref={startRef} onChange={timeChangeHandler}
                                           className={'mr-1 form-control'}/>
                                </div>
                                <div className={'col-md-6'}>
                                    <label htmlFor="etime">End Time</label>
                                    <input type="time" ref={endRef}
                                           className={'ml-1 form-control'} disabled/>
                                </div>
                            </section>
                            <div className="d-flex">
                                <input type="submit" value="Add" style={{flexGrow: 1}}
                                       className={'btn btn-primary mr-2 mt-3'}/>
                                <input type="reset" value="Reset" style={{flexGrow: 1}}
                                       className={'btn btn-warning ml-2 mt-3'}/>
                                <button style={{flexGrow: 1}}
                                        className={'btn btn-danger ml-2 mt-3'} onClick={removeAllPeriods}>Refrest
                                </button>
                            </div>
                        </form>
                    </fieldset>
                </div>
                <div className="col-md-6">
                    <fieldset>
                        {periods && <legend>Periods</legend>}
                        <ul className={'list-group d-flex flex-column flex-wrap'}
                            style={{width: '100%', boxSizing: 'border-box', height: '200px'}}>
                            {/*<li className={'period-list m-1'}>1. (08:00)</li>*/}
                            {periods.sort((p1, p2) => Number.parseInt(p1._id) - Number.parseInt(p2._id)).map((period) => {
                                const {_id, start} = period;
                                return (
                                    <li className={'period-list m-1'} key={_id}>{`${_id} - ${start}`}</li>
                                )
                            })}
                        </ul>

                    </fieldset>
                </div>
            </div>

        </section>
    )

}