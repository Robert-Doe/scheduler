import React,{useState,createContext} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/home/Home';
import Batches from "./pages/batch/Batches";
import ViewBatch from "./pages/batch/ViewBatch";
import UpdateBatch from "./pages/batch/UpdateBatch";
import Lecturers from "./pages/lecturer/Lecturers";
import ViewLecturer from "./pages/lecturer/ViewLecturer";
import UpdateLecturer from "./pages/lecturer/UpdateLecturer";
import ViewDepartment from "./pages/department/ViewDepartment";
import Departments from "./pages/department/Departments";
import ViewCourse from "./pages/course/ViewCourse";
import UpdateCourse from "./pages/course/UpdateCourse";
import Courses from "./pages/course/Courses";
import ViewHall from "./pages/hall/ViewHall";
import UpdateHall from "./pages/hall/UpdateHall";
import Halls from "./pages/hall/Halls";
import ViewPair from "./pages/pairing/ViewPair";
import UpdatePair from "./pages/pairing/UpdatePair";
import Pairings from "./pages/pairing/Pairings";
import ViewSession from "./pages/session/ViewSession";
import UpdateSession from "./pages/session/UpdateSession";
import Sessions from "./pages/session/Sessions";
import AddBatch from "./pages/batch/AddBatch";
import AddLecturer from "./pages/lecturer/AddLecturer";
import AddDepartment from "./pages/department/AddDepartment";
import UpdateDepartment from "./pages/department/UpdateDepartment";
import AddCourse from "./pages/course/AddCourse";
import AddHall from "./pages/hall/AddHall";
import AddPair from "./pages/pairing/AddPair";
import AddSession from "./pages/session/AddSession";
import BatchSession from "./pages/table/batches/BatchSession";
import HallSession from "./pages/table/hall/HallSession";
import LecturerSession from "./pages/table/lecturers/LecturerSession";
import Settings from "./pages/settings/Settings";
import {DeptBatchCourses} from "./pages/department/DeptBatchCourses";
import AlgorithmScheduler from "./pages/algorithm/AlgorithmScheduler";



export const SessionContext = createContext();

function App() {
    const [interim, setInterim] = useState([]);
    const [serversess,setServersess] = useState([]);
    const [goneHome,setGoneHome] = useState(false);

    return (

            <Router>
                <SessionContext.Provider value={{interim, setInterim,serversess,setServersess,goneHome,setGoneHome}}>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/batches' exact component={Batches}/>
                    <Route path='/lecturers' exact component={Lecturers}/>
                    <Route path='/departments' exact component={Departments}/>
                    <Route path='/courses' exact component={Courses}/>
                    <Route path='/halls' exact component={Halls}/>
                    <Route path='/pairings' exact component={Pairings}/>
                    <Route path='/sessions' exact component={Sessions}/>
                    <Route path='/settings' exact component={Settings}/>


                    <Route path='/batches/view/:id' component={ViewBatch}/>
                    <Route path='/batches/update/:id' component={UpdateBatch}/>
                    <Route path='/batches/add' component={AddBatch}/>

                    <Route path='/lecturers/view/:id' component={ViewLecturer}/>
                    <Route path='/lecturers/update/:id' component={UpdateLecturer}/>
                    <Route path='/lecturers/add' component={AddLecturer}/>

                    <Route path='/departments/view/:id' component={ViewDepartment}/>
                    <Route path='/departments/update/:id' component={UpdateDepartment}/>
                    <Route path='/departments/add' component={AddDepartment}/>
                    <Route path='/departments/batches/courses' component={DeptBatchCourses}/>

                    <Route path='/courses/view/:id' component={ViewCourse}/>
                    <Route path='/courses/update/:id' component={UpdateCourse}/>
                    <Route path='/courses/add' component={AddCourse}/>

                    <Route path='/halls/view/:id' component={ViewHall}/>
                    <Route path='/halls/update/:id' component={UpdateHall}/>
                    <Route path='/halls/add' component={AddHall}/>

                    <Route path='/pairings/view/:id' component={ViewPair}/>
                    <Route path='/pairings/update/:id' component={UpdatePair}/>
                    <Route path='/pairings/add' component={AddPair}/>

                    <Route path='/sessions/view/:id' component={ViewSession}/>
                    <Route path='/sessions/update/:id' component={UpdateSession}/>
                    <Route path='/sessions/add' component={AddSession}/>

                    <Route path={'/tables/batch/:id'} component={BatchSession}/>
                    <Route path={'/tables/hall/:id'} component={HallSession}/>
                    <Route path={'/tables/lecturer/:id'} component={LecturerSession}/>

                 {/*   <Route path={'/tables/batches'} component={BatchSession}/>
                    <Route path={'/tables/halls'} component={HallSession}/>
                    <Route path={'/tables/lecturers'} component={LecturerSession}/>*/}

                    {/*{Where I test the Scheduling Algorithms}*/}
                    <Route path={'/algorithm'} component={AlgorithmScheduler}/>


                </Switch>
                </SessionContext.Provider>
            </Router>

    );
}

export default App;
