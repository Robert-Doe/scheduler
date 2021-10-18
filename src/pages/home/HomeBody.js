import React, {useContext} from 'react'
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as VsIcons from "react-icons/vsc";
import * as FiIcons from 'react-icons/fi';

import {SessionContext} from "../../App";
import {Link} from "react-router-dom";

export function HomeBody({scheduler, batches, courses, departments, halls, lecturers, pairings}) {

    const {interim, serversess} = useContext(SessionContext);

    return (
        <div className='container py-3'>
            <div className={'row py-5'}>
                <aside className={'col-md-4 display-board' }>

                    <section className="row">
                        <div className="col-md-6 display-card">
                            <div className="card brown-border d-flex align-items-center">
                                <span><SiIcons.SiGoogleclassroom className={'fill-header'}/></span><Link
                                to={'halls'} className={'text-dark font-weight-bold'}>Classrooms</Link>
                                <p><FaIcons.FaCloudUploadAlt className={'fill-header'}
                                                             style={{width: '17px'}}/>&nbsp;&nbsp;{halls.length}</p>

                            </div>
                        </div>
                        <div className="col-md-6 display-card">
                            <div className="card brown-border d-flex align-items-center">
                                <span className={'text-dark font-weight-bold'}><HiIcons.HiUserGroup
                                    className={'fill-header'}/></span><Link
                                to={'departments'} className={'text-dark font-weight-bold'}>Departments</Link>
                                <p><FiIcons.FiUploadCloud className={'fill-header'}
                                                          style={{width: '17px'}}/>&nbsp;&nbsp;
                                    {departments.length}
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="row mt-2 display-card">
                        <div className="col-md-6">
                            <div className="card grey-border d-flex align-items-center">
                                <span className={'text-dark font-weight-bold'}> <GiIcons.GiTeacher
                                    className={'fill-header'}/></span>
                                <Link
                                    to={'lecturers'} className={'text-dark font-weight-bold'}>Lecturers</Link>
                                <p><FiIcons.FiUploadCloud/>&nbsp;&nbsp;
                                    {lecturers.length}
                                </p>
                            </div>

                        </div>
                        <div className="col-md-6 display-card">
                            <div className="card grey-border d-flex align-items-center">
                                <span className={'text-dark font-weight-bold'}><AiIcons.AiTwotoneFolderOpen
                                    className={'fill-header'}/></span>
                                <Link
                                    to={'courses'} className={'text-success font-weight-bold'}>Courses</Link>
                                <p><FiIcons.FiUploadCloud/>&nbsp;&nbsp;
                                    {courses.length}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="row mt-2">
                        <div className="col-md-6 display-card">
                            <div className="card brown-border d-flex align-items-center">
                                <span className={'text-dark font-weight-bold'}><AiIcons.AiOutlineBlock
                                    className={'fill-header'}/></span>
                                <Link
                                    to={'pairings'} className={'text-danger font-weight-bold'}>Pairings</Link>
                                <p><FiIcons.FiUploadCloud/>&nbsp;&nbsp;
                                    {pairings.length}</p>
                            </div>
                        </div>
                        <div className="col-md-6 display-card">
                            <div className="card brown-border d-flex align-items-center">
                                <span className={'text-dark font-weight-bold'}><FaIcons.FaChild
                                    className={'fill-header'}/></span>
                                <Link
                                    to={'batches'} className={'text-warning font-weight-bold'}>Batches</Link>
                                <p><FiIcons.FiUploadCloud/>&nbsp;&nbsp;
                                    {batches.length}</p>
                            </div>
                        </div>

                    </section>

                    <section className="row mt-2">
                        <div className="col-md-12 display-card">
                            <div className="card grey-border d-flex align-items-center">
                        <span className={'text-dark font-weight-bold'}><AiIcons.AiOutlineSchedule
                            className={'fill-header'}/></span>
                                <Link
                                    to={'sessions'} className={'text-primary font-weight-bold'}>Sessions</Link>
                                <p><FiIcons.FiUploadCloud/>&nbsp;&nbsp;
                                    <span>{serversess.length}</span>&nbsp;&nbsp;
                                    <FiIcons.FiDownloadCloud/><span className={'text-secondary'}>{interim.length}</span>
                                </p>
                            </div>
                        </div>
                    </section>
                </aside>
                <main className={'col-md-8'}>
                    <section className={'row'}>
                        <article className={'offset-md-2 col-md-10 b-rad-35'}>
                            <div className=" b-rad-35">
                                {/* <PieChart className={'schedule-percentage'}
                              data={[
                                  { title: 'Scheduled', value: 1500, color: '#33FF05' },
                                  { title: 'Unscheduled', value: 50, color: '#FF0000' },
                              ]}
                              label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.percentage.toFixed(2)})`}
                    />*/}

                                {/*<img src={homeImage} className={'w-100  h-75 b-rad-35'}/>*/}

                                <div className="sf_colsOut col-12" style={{width: '100%'}}>
                                    <div id="main_C013_Col00" className="sf_colsIn sf_1col_1in_100">
                                        <div className="sf_cols row">
                                            <div className="sf_colsOut col-12" >
                                                <div id="main_C011_Col00" className="sf_colsIn sf_1col_1in_100">
                                                    <div className="sfContentBlock"><p className="text-center">
                                                        <img
                                                        className=" lazyloaded"
                                                        data-src="https://kaplan.co.uk/images/default-source/icons/icon-timetables.svg?Status=Master&amp;sfvrsn=206e6a01_2"
                                                        alt="icon-timetables" title="icon-timetables"
                                                        src="https://kaplan.co.uk/images/default-source/icons/icon-timetables.svg?Status=Master&amp;sfvrsn=206e6a01_2"/>
                                                    </p>
                                                        <h1 className="font-darkblue text-center font-weight-bolder">Helix <span
                                                            className="Satisfy font-weight-normal">timetables</span></h1>
                                                        <p className="text-center">Me de adwiri</p>
                                                        <p className="text-center text-light">Please note, the timetables vary for
                                                            each centre and are frequently updated.</p>
                                                        <div
                                                            className="d-flex align-items-start mb-8 alert alert-alpha mx-0">
                                                            <div>
                                                                Visit this <a href={'#'}>link</a> to download our documentation or watch video on how to operate this software
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button className={'btn btn-primary w-25 mt-3 mx-3 font-weight-bold'}
                                                onClick={scheduler}>
                                            <AiIcons.AiOutlineReload/>&nbsp;Schedule
                                        </button>
                                        <button className={'btn btn-warning w-25 mt-3 mx-3 font-weight-bold'}>
                                            <VsIcons.VscCloudUpload/>&nbsp;Upload
                                        </button>
                                    </div>
                                </div>
                                </div>
                        </article>

                    </section>
                </main>
            </div>

            {/* <section className="row py-3">

            </section>*/}


        </div>
)
}