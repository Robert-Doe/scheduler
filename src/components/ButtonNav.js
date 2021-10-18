//import {BatchNavData} from "./BatchNavData";
import {Link} from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";
import * as FaIcons from "react-icons/fa"
import React from "react";

export function ButtonNav({root}) {

    const deleteLecturersHandler=(e)=>{
        let lecturerId=e.target.dataset.id;
        if(lecturerId){
            fetch(`http://localhost:9999/${root}/`, {
                method: 'DELETE',
                mode: 'cors',
                origin: 'http://localhost:3000/',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
                .then(data => {
                    //setDept(data)
                    alert(data.msg)
                    window.location=`/${root}`
                    console.log(data)
                })
                .catch(err => {
                    alert(err.msg)
                    console.log(err);
                })
        }
        /*console.log(e)
        alert(lecturerId);*/
    }

    const ButtonData = [
        {
            title: 'Add',
            path: `/${root}/add`,
            icon: <FaIcons.FaPlus/>,
            cName: 'nav-text'
        }, /*{
            title: 'Edit',
            path: `/${root}/update`,
            icon: <MdIcons.MdEdit/>,
            cName: 'nav-text'
        },*/ {
            title: 'View',
            path: `/${root}`,
            icon: <MdIcons.MdPageview/>,
            cName: 'nav-text'
        }
    ];

    return (
        <aside className={'nav-aside'}>
            <ul>
                {ButtonData.map((item, index) => {
                    return (
                        <li key={index} style={{listStyle: 'none'}}>
                            <Link to={item.path} className={'link'}>
                                {item.icon}
                                { <span>{item.title}</span>}
                            </Link>
                        </li>
                    );
                })}
                <li onClick={deleteLecturersHandler} data-id={root}>
                    <MdIcons.MdDelete
                        style={{width: '17px'}} />
                    <span className={'font-weight-bold'}>All</span>
                </li>
            </ul>
        </aside>
    )
}