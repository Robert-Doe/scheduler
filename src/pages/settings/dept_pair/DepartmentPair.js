import React from 'react'
import {PairWithJson} from "./PairWithJson";
import {PairWithInputs} from "./PairWithInputs";

export function DepartmentPair() {

    return (
        <section className="jumbotron">

            <aside className={'row'}>
                <div className={'col-md-6'}>
                    <PairWithJson/>
                </div>
                <div className={'col-md-6'}>
                    <PairWithInputs/>
                </div>
            </aside>
        </section>
    );
}