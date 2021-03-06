import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {ButtonNav} from "../../components/ButtonNav";

function UpdateCourse(){
    let {id} = useParams();
    return(
        <section>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/courses">Courses</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Update</li>
                </ol>
            </nav>
            <ButtonNav root={'courses'}/>
            <h2 className={'mx-5 text-dark'}>{id}</h2>
        </section>
    )
}

export default UpdateCourse