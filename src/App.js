import { Route, Routes } from 'react-router-dom';
import './App.css';
import Post from './Post';
import Layout from './Layout';
import Header from './Header';
import IndexPage from './Pages/indexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import CreatePost from './Pages/CreatePost'; 
import { UserContextProvider } from './UserContext';
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element ={<Layout/>}>
          
          <Route index element ={<IndexPage />} /> 
          <Route path='/login' element= {<LoginPage />} /> 
          <Route path='/register' element= {<RegisterPage />} /> 
          <Route path = '/create' element ={ < CreatePost />} /> 

        </Route>
    </Routes>

    </UserContextProvider>

      );
    }
export default App;
