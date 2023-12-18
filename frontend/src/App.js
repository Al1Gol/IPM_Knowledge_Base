import React from 'react';
import axios from 'axios';
import MenuList from './components/Menu';
import Sections from './components/Sections';
import LoginForm from './components/LoginForm';
import CreateMenu from './components/CreateMenu';
import {BrowserRouter, Route, Routes, useLocation,} from 'react-router-dom'
import './App.css';
import './fonts/gothampro-black.css'


// Отрисовка ошибки 404
const NotFound = () => {
    var location = useLocation()

    return (
        <div>
          Page "{location.pathname}" not found
        </div>
    )
}


// Главное приложение
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'backend_addr' : 'http://127.0.0.1:8000/api/v1', //Текущий адрес сервера
            'token': '', // Токен
            'refresh_token': [], // Токен обновления
            'menu': [], // Список меню
            'current_menu': [], //Текущее меню
            'sections': [],  //Разделы
            'current_section': [], //Текущий раздел
            'subsections': [], // Подразделы
            'current_subsection': [], //Текущие подразделы
            'article': [], //Статья
            'files': [], //Файлы статьи 
            'hidden_edit_menu' : true
        }
    }

    // Проверка на авторизацию 
    isAuth() {
      return !!this.state.token
  }

    // Очистка токенов, выход их системы
    logOut() {
        localStorage.setItem('token', '')
        this.setState({
            'token': '',
            'menu': [],
            'sections': [],
        }, this.getMenu)
    }


    // Очистка стейтов при 401 ошибке(неавторизован)
    NotAuthError(error) {
        if (error.request.status === 401) {
            this.setState({
              'token': '',
              'menu': [],
              'current_menu': [],
              'sections': [],
              'current_section': [],
              'subsections': [],
              'current_subsection': [],
              'article': [],
              'files': []
            })
        }
    }


    // Если пользователь авторизирован, передаем в заголовок токен 
    getHeadears() {
        if (this.isAuth()){
            return {
                    'Authorization': 'Bearer ' + this.state.token
                }
            }
        return {}
    }

    // Выполняется сразу после монтирования компонента
    componentDidMount() {
      
      // Получение токен из локального хранилища и передаем в стэйт
      let token = localStorage.getItem('token')
      this.setState({
          'token': token
      }, this.getMenu)
    }

    // Получаем токен для работы с токеном
    // Требуется логин и пароль для получения
    getAuthToken(username, password){
      axios.post(`${this.state.backend_addr}/token/`, {"username":username, "password":password})
        .then(response => {
            let token = response.data.access
            this.setState({
              'token': token,
            }, this.getMenu)
            localStorage.setItem('token', token)
        }).catch( error =>{
            console.log('Ошибка проходит')
            this.logOut()
            console.log(error)
        })
    }


    // Получение списка меню
    getMenu() {
        let headers = this.getHeadears()
        axios
        .get(`${this.state.backend_addr}/menu/`, {headers})
        .then(response => {
            let menu_list = response.data
            this.setState({
              'menu': menu_list
            })
        })
        .catch( error =>{ 
            this.NotAuthError(error)
            console.log(error)
        })
    }



    //Получение списка разделов
    getSections(id) {

      let current_menu = this.state.menu.find(obj => obj.id === id)
          this.setState({
            'current_menu': current_menu
          })
        // Если не выбран элемент меню или выбран отличный текущего, то выводим новый список разделов
        if (this.state.current_menu.length === 0 || this.state.current_menu.id !== id) {
            let headers = this.getHeadears()
            axios
            .get(`${this.state.backend_addr}/sections/?menu_id=${id}`, {headers})
            .then(response => {
                let sections = response.data
                this.setState({
                  'sections': sections
                })
            })
            .catch( error => {
              // Очищаем данные, если аутентификация не прошла
              this.NotAuthError(error)
            }) 
        } 
        // Убираем убираем всю правую часть при повтрном нажатии
        else {
          this.setState({
            'current_menu': [],
            'sections': [],
            'current_section': [],
            'subsections': [],
            'current_subsection': [],
            'article': [],
            'files': [],
        })
      }
  }

  // Составление  тела запроса при отправки FormData c иконками
  iconsFormData (name, img) {
      name = name.trim()
      let body = {}
   
        body = new FormData();
        body.append('img', img);
        body.append('name', name);
      
      return body
  }

  // Создание нового элемента меню
  addMenu(name, img) {
      let headers = this.getHeadears()
      axios
      .post(`${this.state.backend_addr}/menu/`, this.iconsFormData(name, img), {headers})
      .then(response => {
        this.getMenu()
        console.log(response)
      })
      .catch( error =>{ 
        // Очищаем данные, если аутентификация не прошла
        //this.NotAuthError(error)
          console.log(error)
      })
      
  }

editMenu(id) {

  }


  //Отображение и скрытие формы редактирования и создания
  onFormDisplay() {
    this.setState ({
      'hidden_edit_menu': !this.state.hidden_edit_menu
    })
  }   
    // Рендер главного меню
    // В element передаем значение стэйтов и функции
    // для возможности работы с ними из компонентов
    render () {
      if (this.isAuth()) {
          return (
            <div>
            <BrowserRouter>
              <nav>
                <li>
                  { this.isAuth() ? <button onClick={() => this.logOut()} >Выход</button> : '' }
                </li>
              </nav>
              <hr></hr>
              <Routes>
                  <Route exact path='/' element= 
                    {this.isAuth() ? 
                      <MenuList menu_list={this.state.menu} getSections = {(id) => this.getSections(id)} onFormDisplay = {() => this.onFormDisplay()} /> : 
                      <LoginForm getAuthToken={(username, password) => this.getAuthToken(username, password)} />} />
                  <Route exact path='/main' element= {<MenuList menu_list={this.state.menu} />} />
                  <Route path='*' element = {<NotFound />} />
              </Routes>
                  <>
                     <Sections sections={this.state.sections}/> 
                  </>
                  <>
                      <CreateMenu hidden_edit_menu = {this.hidden_edit_menu} addMenu = {(name, img) => this.addMenu(name, img)} onFormDisplay = {() => this.onFormDisplay()} /> 
                  </>   
            </BrowserRouter>

            </div>
          )
      } else {
        return (
          <BrowserRouter>
              <Routes>
                <Route exact path='/' element= <LoginForm getAuthToken={(username, password) => this.getAuthToken(username, password)} />/>
              </Routes>
          </BrowserRouter>
        )
      }
        
      /*
        return (
            <div>
            <BrowserRouter>
              <nav>
                <li>
                  { this.isAuth() ? <button onClick={() => this.logOut()} >Выход</button> : '' }
                </li>
              </nav>
              <hr></hr>
              <Routes>
                  <Route exact path='/' element= 
                    {this.isAuth() ? 
                      <MenuList menu_list={this.state.menu} getSections = {(id) => this.getSections(id)} onFormDisplay = {() => this.onFormDisplay()} /> : 
                      <LoginForm getAuthToken={(username, password) => this.getAuthToken(username, password)} />} />
                  <Route exact path='/main' element= {<MenuList menu_list={this.state.menu} />} />
                  <Route path='*' element = {<NotFound />} />
              </Routes>
                  <>
                     <Sections sections={this.state.sections}/> 
                  </>
                  <>
                      <CreateMenu hidden_edit_menu = {this.hidden_edit_menu} addMenu = {(name, img) => this.addMenu(name, img)} onFormDisplay = {() => this.onFormDisplay()} /> 
                  </>   
                  <Editor/> 
            </BrowserRouter>

            </div>
        )
      */
    }
}
export default App;
