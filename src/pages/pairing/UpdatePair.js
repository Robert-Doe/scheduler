import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {ButtonNav} from "../../components/ButtonNav";


function UpdatePair(){
    let {id} = useParams();
    return(
        <section>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/pairings">Pairings</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Update</li>
                </ol>
            </nav>

            <ButtonNav root={'pairings'}/>

            <h2 className={'mx-5 text-dark'}>{id}</h2>
        </section>
    )
}

export default UpdatePair