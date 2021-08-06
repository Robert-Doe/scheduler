import React from 'react';

const viewSessionHandler=(e)=>{
    const targetFile=e.target.parentNode;
    console.log(targetFile.childNodes[0].textContent);
    window.location.href = `http://localhost:3000/sessions/view/${targetFile.childNodes[0].textContent}`

}


function Sessions(){
    return(
        <section className={'container mt-5 py-5'}>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="http://localhost:3000/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Sessions</li>
                </ol>
            </nav>
            <table className="table table-bordered" style={{borderRadius:'50px'}} >
                <thead className={'table-dark'}>
                <tr>
                    <th>#id</th>
                    <th>Course Code</th>
                    <th>Lecturer</th>
                    <th>Halls</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>
                <tr onClick={viewSessionHandler}>
                    <td>fad23fa78829abc34e</td>
                    <td>CSM256</td>
                    <td>Robert Doe</td>
                    <td>SF1 SF3</td>
                    <td>M-3-5</td>
                </tr>
                </tbody>
            </table>
        </section>
    )
}

export default Sessions