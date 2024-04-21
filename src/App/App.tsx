import './App.css';
import 'styles/styles.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Recipes</div>} />
        <Route path='/recipes' element={<div>Recipes</div>} />
        <Route path='/recipe' element={<div>Recipe</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
