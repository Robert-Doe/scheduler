import React from 'react';
import {useParams} from 'react-router-dom';
function UpdateBatch(){
    let {id} = useParams();
    return(
        <section>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                    <li className="breadcrumb-item"><a href="http://localhost:3000/batches">Batches</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Update</li>
                </ol>
            </nav>
            <h2 className={'mx-5 text-dark'}>{id}</h2>

        </section>
    )
}

export default UpdateBatch;