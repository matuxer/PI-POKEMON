import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTypes } from './redux/actions';
import FormPage from './pages/FormPage/FormPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage />}/>
        <Route path='/home/' element={<HomePage />}/>
        <Route exact path='/createpokemon' element={<FormPage/>}/>
        <Route exact path='/pokemon/:id' element={<DetailsPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
