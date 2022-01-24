import './App.css';
import Layout from './HOC/Layout/Layout';

import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login/Login';
import Events from './pages/Events/Events';
import StudentList from './pages/StudentListPage/StudentListPage';

import {connect} from 'react-redux';

function App(props) {

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/login" element={ props.isLoggedIn ? <Navigate replace to="/events"/> :  <Login />}></Route>
          <Route path="/events" element={props.isLoggedIn ? <Events /> : <Navigate replace to="/login"/> }></Route>
          <Route path="/students" element={ props.isLoggedIn ? <StudentList /> : <Navigate replace to="/login"/>}></Route>
          <Route path="/*" element={<Navigate replace to="/login"/>}></Route>
        </Routes>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.data.login,
  }
}

export default connect(mapStateToProps)(App);
