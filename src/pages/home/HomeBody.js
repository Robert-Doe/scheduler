import React, {useContext,useState} from 'react'
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as GiIcons from "react-icons/gi";
import * as AiIcons from "react-icons/ai";
import * as VsIcons from "react-icons/vsc";
import * as FiIcons from 'react-icons/fi';
import Loader from './loader/Loader';
import {SessionContext} from "../../App";
import {Link} from "react-router-dom";

export function HomeBody({scheduler, batches, courses, departments, halls, lecturers, pairings}) {

    const {interim,serversess} = useContext(SessionContext);

    return (
        <div className='container py-3'>
            <div className={'row py-5'}>
                <aside className={'col-md-4 dashboard-quantity-chart'}>

                    <section className="row">
                        <div className="col-md-6">
                            <div className="card green-border d-flex align-items-center">
                                <span><SiIcons.SiGoogleclassroom className={'fill-header'}/></span><Link
                                to={'halls'} className={'text-dark font-weight-bold'}>Classrooms</Link>
                                <p><FaIcons.FaCloudUploadAlt className={'fill-header'}
                                                             style={{width: '17px'}}/>&nbsp;&nbsp;{halls.length}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card blue-border d-flex align-items-center">
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
                    <section className="row mt-4">
                        <div className="col-md-6">
                            <div className="card black-border d-flex align-items-center">
                                <span className={'text-dark font-weight-bold'}> <GiIcons.GiTeacher
                                    className={'fill-header'}/></span>
                                <Link
                                    to={'lecturers'} className={'text-dark font-weight-bold'}>Lecturers</Link>
                                <p><FiIcons.FiUploadCloud/>&nbsp;&nbsp;
                                    {lecturers.length}
                                </p>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="card red-border d-flex align-items-center">
                                <span className={'text-dark font-weight-bold'}><AiIcons.AiTwotoneFolderOpen
                                    className={'fill-header'}/></span>
                                <Link
                                    to={'courses'} className={'text-dark font-weight-bold'}>Courses</Link>
                                <p><FiIcons.FiUploadCloud/>&nbsp;&nbsp;
                                    {courses.length}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="row mt-4">
                        <div className="col-md-6">
                            <div className="card brown-border d-flex align-items-center">
                                <span className={'text-dark font-weight-bold'}><AiIcons.AiOutlineBlock
                                    className={'fill-header'}/></span>
                                <Link
                                    to={'pairings'} className={'text-dark font-weight-bold'}>Pairings</Link>
                                <p><FiIcons.FiUploadCloud/>&nbsp;&nbsp;
                                    {pairings.length}</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card pink-border d-flex align-items-center">
                                <span className={'text-dark font-weight-bold'}><FaIcons.FaChild
                                    className={'fill-header'}/></span>
                                <Link
                                    to={'batches'} className={'text-dark font-weight-bold'}>Batches</Link>
                                <p><FiIcons.FiUploadCloud/>&nbsp;&nbsp;
                                    {batches.length}</p>
                            </div>
                        </div>

                    </section>

                    <section className="row mt-4">
                        <div className="col-md-6">
                            <div className="card grey-border d-flex align-items-center">
                        <span className={'text-dark font-weight-bold'}><AiIcons.AiOutlineSchedule
                            className={'fill-header'}/></span>
                                <Link
                                    to={'sessions'} className={'text-dark font-weight-bold'}>sessions</Link>
                                <p><FiIcons.FiUploadCloud/>&nbsp;&nbsp;
                                    <span className>{serversess.length}</span>&nbsp;&nbsp;
                                    <FiIcons.FiDownloadCloud/><span className={'text-secondary'}>{interim.length}</span>
                                </p>
                            </div>
                        </div>
                    </section>
                </aside>
                <main className={'col-md-8'}>
                    <section className={'row'}>
                        <div className="col-md-6" >
                            {/* <PieChart className={'schedule-percentage'}
                              data={[
                                  { title: 'Scheduled', value: 1500, color: '#33FF05' },
                                  { title: 'Unscheduled', value: 50, color: '#FF0000' },
                              ]}
                              label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.percentage.toFixed(2)})`}
                    />*/}
                            <button className={'btn orange mt-3 mx-3 font-weight-bold'} onClick={scheduler}>
                                <AiIcons.AiOutlineReload/>&nbsp;Schedule
                            </button>
                            <button className={'btn green mt-3 mx-3 font-weight-bold'}>
                                <VsIcons.VscCloudUpload/>&nbsp;Upload
                            </button>

                        </div>
                        <div className="col-md-3">

                        </div>
                    </section>
                </main>
            </div>

            {/* <section className="row py-3">

            </section>*/}





        </div>
    )
}