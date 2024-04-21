import 'styles/styles.scss';

import Main from 'components/Main';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='/recipes' element={<div>Recipes</div>} />
          <Route path='/recipe' element={<div>Recipe</div>} />
          <Route path='*' element={<Navigate to='/recipes' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
