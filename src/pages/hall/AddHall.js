import React, {useRef} from 'react';

function AddHall() {

    const sizeRef = useRef(null);
    const typeRef = useRef(null)
    const locationRef = useRef(null)
    const nameRef = useRef(null);

    const value = (ref) => ref.current.value
    const refEmpty = (ref) => {
        return ref.current.value === ''
    }

    const addHallHandler = (e) => {
        e.preventDefault();


        if (!refEmpty(sizeRef) && !refEmpty(typeRef) && !refEmpty(nameRef) && !refEmpty(locationRef)) {
            const newCourse = {
                name: value(nameRef),
                size: value(sizeRef),
                type: value(typeRef),
                location: value(locationRef),
            }

            fetch("http://localhost:9999/courses", {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify(newCourse),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => console.log(err))

        } else {
            alert("All Fields are important")
        }


    }

    return (
        <section className={'container mt-5 py-5'}>
            <section className={'container px-5'}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="http://localhost:3000/halls">Halls</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>
                <form className={'px-5'} onSubmit={addHallHandler}>
                    <div className={'row'}>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Location</label>
                            <input type={'text'} ref={locationRef} className={'form-control'}
                                   placeholder={'Location: COLLEGE-FLOOR'}/>
                        </div>
                        <div className="col-lg-6 form-group pt-3">
                            <label htmlFor="exampleFormControlSelect1">Type</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref={typeRef}>
                                <option>CS Lab</option>
                                <option>CHEM Lab</option>
                                <option>PHY Lab</option>
                                <option>BIO Lab</option>
                                <option>Regular</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="first_name">Hall Size</label>
                            <input type="number" id={'size'} className="form-control"
                                   placeholder="First name (eg. Robert)" ref={sizeRef}/>
                        </div>
                        <div className="col-lg-6 pt-3">
                            <label htmlFor="first_name" style={{color: '#f00'}}>Identifier</label>
                            <input type="text" id={'size'} className="form-control" ref={nameRef}
                                   placeholder="Class Id: (CS1)"/>
                        </div>
                    </div>


                    <div className="row pt-3">
                        <div className="form-group">
                            <input id={'add_hall'} className="btn btn-primary form-control" type={'submit'}
                                   value={'Add Hall'}></input>
                        </div>
                    </div>

                </form>
            </section>
        </section>
    )
}

export default AddHall