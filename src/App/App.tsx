import 'styles/styles.scss';

import Main from 'components/Main';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/recipe/:id' element={<Recipe />} />
          <Route path='*' element={<Navigate to='/recipes' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
