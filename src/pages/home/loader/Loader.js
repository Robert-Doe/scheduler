import React from 'react';
import './loader.css';

export default function Loader(){
   return (
       <svg width="350" height="250">
           <circle className="shape"/>
           <circle className="shape"/>
           <circle className="shape"/>
           <circle className="shape"/>
           <circle className="shape"/>
       </svg>
   )
}

