import * as React from 'react';
import { useEffect } from 'react';
import 'styles/styles.scss';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from 'components/Main';
import Recipe from './pages/Recipe';
import Recipes from './pages/Recipes';
import Ingredients from './pages/Ingredients';
import Products from './pages/Products';
import MenuItems from './pages/MenuItems';
import Saved from './pages/Saved';
import Login from './pages/Login';

import localStorage from 'store/LocalStorage';
import userStore from 'store/UserStore';
import { observer } from 'mobx-react-lite';

const App: React.FC = () => {

  useEffect(() => {
    userStore.getCookies();

    return () => {
      localStorage.destroy();
      userStore.destroy();
    };
  }, []);

  return (
    <BrowserRouter basename=''>
      <Routes>
        <Route path='/' element={<Main />}>
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/' element={<Recipes />} />
          <Route path='/recipe/:id' element={<Recipe />} />
          <Route path='/ingredients' element={<Ingredients />} />
          <Route path='/products' element={<Products />} />
          <Route path='/menuItems' element={<MenuItems />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/login' element={<Login />} />

          <Route path='*' element={<Navigate to='/recipes' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default observer(App);
