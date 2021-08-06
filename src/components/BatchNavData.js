import React from 'react';
import * as GrIcons from 'react-icons/gr';
import * as MdIcons from 'react-icons/md';


export const BatchNavData = [
    {
        title: 'Add',
        path: '/batches/add',
        icon: <MdIcons.MdGroupAdd/>,
        cName: 'nav-text'
    },
    {
        title: 'Edit',
        path: '/batches/update',
        icon: <GrIcons.GrDocumentUpdate/>,
        cName: 'nav-text'
    },
    {
        title: 'View',
        path: '/batches',
        icon: <GrIcons.GrView/>,
        cName: 'nav-text'
    }
];
