import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as HiIcons from 'react-icons/hi';
import * as GiIcons from 'react-icons/gi';
import * as SiIcons from 'react-icons/si'


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Departments',
    path: '/departments',
    icon: <HiIcons.HiUserGroup />,
    cName: 'nav-text'
  },
  {
    title: 'Lecturers',
    path: '/lecturers',
    icon: <GiIcons.GiTeacher/>,
    cName: 'nav-text'
  },
  {
    title: 'Batches',
    path: '/batches',
    icon: <FaIcons.FaChild />,
    cName: 'nav-text'
  },
  {
    title: 'Courses',
    path: '/courses',
    icon: <AiIcons.AiTwotoneFolderOpen/>,
    cName: 'nav-text'
  }
  , {
    title: 'Pairs',
    path: '/pairings',
    icon: <AiIcons.AiOutlineBlock/>,
    cName: 'nav-text'
  }
  ,{
    title: 'Classrooms',
    path: '/halls',
    icon: <SiIcons.SiGoogleclassroom/>,
    cName: 'nav-text'
  },
  {
    title: 'Schedule',
    path: '/schedules',
    icon: <AiIcons.AiOutlineSchedule/>,
    cName: 'nav-text'
  } ,
  {
    title: 'Settings',
    path: '/settings',
    icon: <RiIcons.RiAdminFill /> ,
    cName: 'nav-text'
  }
];
