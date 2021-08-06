import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../App.css'
import React from "react";
import CreatePeriod from "./CreatePeriod";
import {DepartmentPair} from "./dept_pair/DepartmentPair";


export default function Settings() {


    fetch('http://localhost:9999/departments', {
        method: 'GET',
        mode: 'cors',
        origin: 'http://localhost:3000/',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }

    }).then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.length)
        })
        .catch(err => {
            alert(err)
            console.log(err);
        })


    return (
        <section className={'py-5'}>
            <nav className='container-fluid'>
                <div className="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                    <a className="nav-link active" id="nav-days-tab" data-toggle="tab" href="#nav-days" role="tab"
                       aria-controls="nav-days" aria-selected="true">Bookmarks</a>
                    <a className="nav-link" id="nav-theme-tab" data-toggle="tab" href="#nav-theme" role="tab"
                       aria-controls="nav-theme" aria-selected="false">Comments</a>
                    <a className="nav-link" id="nav-periods-tab" data-toggle="tab" href="#nav-periods" role="tab"
                       aria-controls="nav-periods" aria-selected="false">Periods</a>
                    <a className="nav-link" id="nav-comments-tab" data-toggle="tab" href="#nav-comments" role="tab"
                       aria-controls="nav-comments" aria-selected="false">Course Pairs</a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                {/*Orders TAB*/}
                <div className="tab-pane fade show active" id="nav-days" role="tabpanel" aria-labelledby="nav-days-tab">
                    <section className="jumbotron bg-admin">
                        <h3 className={'display-3'}>Bookmarks</h3>
                    </section>
                </div>
                {/*Users TAB*/}
                <div className="tab-pane fade" id="nav-theme" role="tabpanel" aria-labelledby="nav-theme-tab">
                    <section className="jumbotron">
                        <h3 className={'display-3'}>Comments on Operations</h3>
                    </section>
                </div>
                {/*Products TAB*/}
                <div className="tab-pane fade" id="nav-periods" role="tabpanel" aria-labelledby="nav-periods-tab">
                    <CreatePeriod/>
                </div>
                {/*Posts TAB*/}
                <div className="tab-pane fade" id="nav-comments" role="tabpanel" aria-labelledby="nav-comments-tab">
                    <DepartmentPair/>
                </div>

            </div>

        </section>
    )
}