//import {BatchNavData} from "./BatchNavData";
import {Link} from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as GrIcons from "react-icons/gr";
import * as FaIcons from "react-icons/fa"

export function ButtonNav({root}){

     const ButtonData = [
        {
            title: 'Add',
            path: `/${root}/add`,
            icon: <FaIcons.FaPlus/>,
            cName: 'nav-text'
        }, {
            title: 'Edit',
            path: `/${root}/update`,
            icon: <MdIcons.MdEdit/>,
            cName: 'nav-text'
        }, {
            title: 'View',
            path: `/${root}`,
            icon: <MdIcons.MdPageview/>,
            cName: 'nav-text'
        }
    ];

    return(
        <aside className={'nav-aside'}>
            <ul>
                {ButtonData.map((item, index) => {
                    return (
                        <li key={index} style={{listStyle: 'none'}}>
                            <Link to={item.path} class={'link'}>
                                {item.icon}
                               {/* <span>{item.title}</span>*/}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    )
}