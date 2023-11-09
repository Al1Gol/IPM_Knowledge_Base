import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Routes, useLocation,} from 'react-router-dom'

import MenuList  from './components/Menu';
import LoginForm from './components/Login';


  // Получаем токен для работы с токеном
  // Требуется логин и пароль для получения
  function getAuthToken(username, password){
    axios.post(`http://127.0.0.1:8000/api/v1/token/`, {"username":username, "password":password})
      .then(response => {
          let token = response.data.access
          localStorage.setItem('token', token)
          console.log(token)
      }).catch( error =>{
          console.log('Ошибка проходит')
          console.log(error)
      })
  }

  // Проверка на авторизацию 
  function isAuth() {
        return true // Должно передаваться булево значение для првоерки авторизации
    }

  // Если пользователь авторизирован, передаем в заголовок токен 
  function getHeadears() {
      if (isAuth()){
          return {
                  'Authorization': 'Bearer ' + this.state.token // Cюда надо подставить токен передачи в заголовок
              }
          }
      return {}
  }


// Главное приложение проекта
export default function App () {

  // Хук срабатывающий при первом рендериге страницы
  // В нем временно получаем токен
  useEffect( () => {
    getAuthToken('admin', 'admin')
  }
)
    //Отрисовка главного приложения
    return (
      <div>
            <BrowserRouter>
              <Routes>
                  <Route path='/' element = {<MenuList />} />
              </Routes>
            </BrowserRouter>
            </div>
    )
}