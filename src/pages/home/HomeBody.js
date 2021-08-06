import React,{useContext} from 'react'
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as VsIcons from "react-icons/vsc";

import {PieChart} from "react-minimal-pie-chart";
import {SessionContext} from "../../App";

export function HomeBody({scheduler,batches,courses,departments,halls,lecturers,pairings}) {
    const {interim} = useContext(SessionContext);
    return (
        <div className='container py-3'>
            <section className="row py-3">
                <div className="col-md-4">
                    <div className="card green-border px-3">
                        <span className={'text-dark font-weight-bold'}><SiIcons.SiGoogleclassroom className={'fill-header'}/>&nbsp;Classrooms</span>
                        <p><FaIcons.FaArrowUp className={'fill-server'}/><span className={'text-secondary'}>{halls.length}</span>&nbsp;&nbsp;
                            <FaIcons.FaArrowDown className={'fill-local'}/><span className={'text-secondary'}>240</span>
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card blue-border px-3">
                        <span className={'text-dark font-weight-bold'}><HiIcons.HiUserGroup className={'fill-header'}/>&nbsp;Departments</span>
                        <p><FaIcons.FaArrowUp className={'fill-server'}/><span className={'text-secondary'}>{departments.length}</span>&nbsp;&nbsp;
                            <FaIcons.FaArrowDown className={'fill-local'}/><span className={'text-secondary'}>240</span>
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card black-border px-3">
                        <span className={'text-dark font-weight-bold'}> <GiIcons.GiTeacher className={'fill-header'}/>&nbsp;Lecturers</span>
                        <p><FaIcons.FaArrowUp className={'fill-server'}/><span className={'text-secondary'}>{lecturers.length}</span>&nbsp;&nbsp;
                            <FaIcons.FaArrowDown className={'fill-local'}/><span className={'text-secondary'}>240</span>
                        </p>
                    </div>

                </div>
            </section>
            <section className="row py-3">
                <div className="col-md-4">
                    <div className="card red-border px-3">
                        <span className={'text-dark font-weight-bold'}><AiIcons.AiTwotoneFolderOpen className={'fill-header'}/>&nbsp;Courses</span>
                        <p><FaIcons.FaArrowUp className={'fill-server'}/><span className={'text-secondary'}>{courses.length}</span>&nbsp;&nbsp;
                            <FaIcons.FaArrowDown className={'fill-local'}/><span className={'text-secondary'}>240</span>
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card brown-border px-3">
                        <span className={'text-dark font-weight-bold'}><AiIcons.AiOutlineBlock className={'fill-header'}/>&nbsp;Pairings</span>
                        <p><FaIcons.FaArrowUp className={'fill-server'}/><span className={'text-secondary'}>{pairings.length}</span>&nbsp;&nbsp;
                            <FaIcons.FaArrowDown className={'fill-local'}/><span className={'text-secondary'}>240</span>
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card pink-border px-3">
                        <span className={'text-dark font-weight-bold'}><FaIcons.FaChild className={'fill-header'}/>&nbsp;Batches</span>
                        <p><FaIcons.FaArrowUp className={'fill-server'}/><span className={'text-secondary'}>{batches.length}</span>&nbsp;&nbsp;
                            <FaIcons.FaArrowDown className={'fill-local'}/><span className={'text-secondary'}>240</span>
                        </p>
                    </div>

                </div>
            </section>
            <section className="row py-3">
                <div className="offset-md-4 col-md-4">
                    <div className="card grey-border px-3">
                        <span className={'text-dark font-weight-bold'}><AiIcons.AiOutlineSchedule className={'fill-header'}/>&nbsp;Sessions</span>
                        <p><FaIcons.FaArrowUp className={'fill-server'}/><span className={'text-secondary'}>240</span>&nbsp;&nbsp;
                            <FaIcons.FaArrowDown className={'fill-local'}/><span className={'text-secondary'}>{interim.length}</span>
                        </p>
                    </div>
                </div>
            </section>

            <section className={'row'}>
                <div className="offset-md-3 col-md-6" style={{border:'1px solid black'}}>
                    <PieChart className={'schedule-percentage'}
                              data={[
                                  { title: 'Scheduled', value: 1500, color: '#33FF05' },
                                  { title: 'Unscheduled', value: 50, color: '#FF0000' },
                              ]}
                              label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.percentage.toFixed(2)})`}
                    />
                    <button className={'btn orange mt-3 w-25 mx-3 font-weight-bold'} onClick={scheduler}><AiIcons.AiOutlineReload />&nbsp;Schedule</button>
                    <button className={'btn green mt-3 w-25 mx-3 font-weight-bold'} ><VsIcons.VscCloudUpload/>&nbsp;Upload</button>

                </div>
                <div className="col-md-3">

                </div>
            </section>


        </div>
    )
}