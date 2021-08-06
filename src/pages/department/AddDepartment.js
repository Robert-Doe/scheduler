import React, {useRef} from 'react';

function AddDepartment() {

    const nameRef = useRef();
    const abbrRef = useRef();
    const responseRef = useRef();
    const idRef=useRef()


    const value = (ref) => ref.current.value

    const refEmpty = (ref) => {
        return ref.current.value === ''
    }

    const addDepartmentHandler = (e) => {
        e.preventDefault();
        if (!refEmpty(nameRef) && !refEmpty(abbrRef)) {
            const newDepartment = {
                _id:value(idRef),
                name: value(nameRef),
                dept_abbr: value(abbrRef),
                /*details: value(detailRef),*/
                /*lecturers: []*/
            }

            fetch("http://localhost:9999/departments", {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify(newDepartment),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    responseRef.current.value = data.msg;
                })
                .catch(err => {
                    console.log(err)
                    responseRef.current.value = err.msg;
                })

        }
    }

    return (
        <section className={'container mt-5 py-5'}>
            <section className={'container px-5'}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                        <li className="breadcrumb-item"><a href="http://localhost:3000/departments">Departments</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Add</li>
                    </ol>
                </nav>
                <form className={'px-5'} onSubmit={addDepartmentHandler}>
                    <div className="row pt-3">
                        <div className="col-md-6">
                            <label htmlFor="name">Department ID</label>
                            <input type="text" id={'name'} className="form-control" placeholder="ID Number"
                                   ref={idRef}/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="name">Name of Department</label>
                            <input type="text" id={'name'} className="form-control" placeholder="Name of Department"
                                   ref={nameRef}/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="col-md-6 pt-3">
                            <label htmlFor="dept_abbr">Abbreviation</label>
                            <input type="text" id={'dept_abbr'} className="form-control"
                                   placeholder="Department Abbreviation" ref={abbrRef}/>
                        </div>
                        <div className="col-md-6 pt-3">
                            <label htmlFor="first_name" style={{color: '#f00'}}>Response</label>
                            <input type="text" id={'response'} className="form-control" disabled
                                   placeholder="Response :" ref={responseRef}/>
                        </div>
                    </div>

                    <div className="row pt-5 d-flex justify-content-center">
                        <div className="form-group">
                            <input id={'add_dept'} className="btn btn-warning form-control bg-theme" type={'submit'}
                                   value={'Add Department'}/>
                        </div>
                    </div>
                </form>
            </section>
        </section>
    )
}

export default AddDepartment