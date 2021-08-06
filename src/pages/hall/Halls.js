import React from 'react';

const viewHallHandler=(e)=>{
    const targetFile=e.target.parentNode;
    console.log(targetFile.childNodes[0].textContent);
    window.location.href = `http://localhost:3000/halls/view/${targetFile.childNodes[0].textContent}`

}


function Halls(){
    return(
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Halls</li>
                </ol>
            </nav>
            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td onClick={viewHallHandler}>fad23fa78829abc34e</td>
                    <td>SF9</td>
                    <td>400</td>
                    <td>Regular</td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Halls