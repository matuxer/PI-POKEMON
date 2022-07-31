import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTypes } from './redux/actions';
import Form from './components/Form';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage />}/>
        <Route exact path='/home' element={<HomePage />}/>
        <Route exact path='/createpokemon' element={<Form />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
