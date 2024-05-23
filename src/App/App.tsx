import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect } from 'react';
import 'styles/styles.scss';

import { 
  BrowserRouter, 
  HashRouter, 
  Navigate, 
  Route, Routes 
} from 'react-router-dom';
import Main from 'components/Main';
import localStorage from 'store/LocalStorage';
import searchParamsStore from 'store/SearchParamsStore';
import urlStore from 'store/UrlStore';
import userStore from 'store/UserStore';
import Ingredients from './pages/Ingredients';
import Login from './pages/Login';
import MealPlanning from './pages/MealPlanning';
import MenuItems from './pages/MenuItems';
import Products from './pages/Products';
import Recipe from './pages/Recipe';
import Recipes from './pages/Recipes';
import Saved from './pages/Saved';
import User from './pages/User';
import Ingredient from './pages/Ingredient';

const App: React.FC = () => {

  useEffect(() => {
    userStore.getCookies();
    localStorage.loadingSaved();

    return () => {
      localStorage.destroy();
      userStore.destroy();
      searchParamsStore.destroy();
      urlStore.destroy();
    };
  }, []);

  return (
    <HashRouter basename='/'>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/' element={<Recipes />} />
          <Route path='/recipe/:id' element={<Recipe />} />
          <Route path='/ingredients' element={<Ingredients />} />
          <Route path='/ingredient/:id' element={<Ingredient />} />
          <Route path='/products' element={<Products />} />
          <Route path='/menuItems' element={<MenuItems />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user' element={<User />} />
          <Route path='/planning' element={<MealPlanning />} />

          <Route path='*' element={<Navigate to='/recipes' replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default observer(App);
