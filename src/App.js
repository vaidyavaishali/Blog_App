// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import BlogPage from './Blog/Blogs';
import ShowData from './Blog/ShowData';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Signup />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/posts' element={<ShowData />} />
      </Routes>

    </div>
  );
}

export default App;
