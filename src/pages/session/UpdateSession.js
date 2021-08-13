import React from 'react';
import {Link, useParams} from 'react-router-dom';

function UpdateSession(){
    let {id} = useParams();
    return(
        <section>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/sessions">Sessions</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Update</li>
                </ol>
            </nav>


            <h2 className={'mx-5 text-dark'}>{id}</h2>
        </section>
    )
}

export default UpdateSession