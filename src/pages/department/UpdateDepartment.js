import React from 'react';
import {Link, useParams} from 'react-router-dom';

function UpdateDepartment(){
    let {id} = useParams();

    return(
        <section>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link href="/departments">Departments</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Update</li>
                </ol>
            </nav>
            <h2 className={'mx-5 text-dark'}>{id}</h2>
        </section>
    )
}

export default UpdateDepartment