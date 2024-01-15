import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Routes, useLocation,} from 'react-router-dom'

import MenuList from './components/Menu';
import Sections from './components/Sections';
import LoginForm from './components/LoginForm';
import CreateMenu from './components/CreateMenu';
import EditMenu from './components/EditMenu';
import Logo from './img/icons/LogoMain.png'


// ОТРИСОВКА ОШИБКИ 404
const NotFound = () => {
    var location = useLocation()

    return (
        <div>
            Page "{location.pathname}" not found
        </div>
    )
}

//ТЕКУЩИЙ АДРЕС СЕРВЕРА
const backend_addr = 'http://127.0.0.1:8000/api/v1'

// ГЛАВНОЕ ПРИЛОЖЕНИЕ
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'token': '', // Токен
            'refresh_token': [], // Токен обновления
            'menu': [], // Список меню
            'current_menu': [], //Текущее меню
            'sections': [],  //Разделы
            'current_section': [], //Текущий раздел
            'article': [], //Статья
            'files': [], //Файлы статьи 
            'hidden_modal' : true, //Оторажение модального окна создания меню
            'current_target': '' // ID текущей кнопки по открытию модального окна, для отрисовки необходимой формы
        }
    }

/***********************************************************************************************/
/***********************************************************************************************/
//ФУНКЦИИ ПРИЛОЖЕНИЯ
/***********************************************************************************************/
/***********************************************************************************************/

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

    // Составление  тела запроса при отправки FormData c иконками
    iconsFormData (name, img) {
        name = name.trim()
        let body = {}
        body = new FormData();
        body.append('name', name);
        if (img) {
            body.append('img', img);          
        } 
        return body
    }
  
    //Отображение и скрытие формы редактирования и создания
    onFormDisplay(obj) {
        this.setState ({
            'hidden_modal': !this.state.hidden_modal,
            'current_target': obj
        })
    }


    //Получение текущего 
    getCurentEditId(id, obj) {
        this.setState ({
                'current_menu': this.state.menu.find(el_menu =>  el_menu.id === id)
        },  this.onFormDisplay(obj))
    }

    


/***********************************************************************************************/
/***********************************************************************************************/
//ОБРАЩЕНИЯ ПО АПИ
/***********************************************************************************************/
/***********************************************************************************************/

    // Получаем токен для работы с токеном
    // Требуется логин и пароль для получения
    getAuthToken(username, password){
      axios.post(`${backend_addr}/token/`, {"username":username, "password":password})
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

    /*-----------------------------------*/
    /*-----------------------------------*/
    // CRUD MENU
    /*-----------------------------------*/
    /*-----------------------------------*/

    // READ MENU
    getMenu() {
        let headers = this.getHeadears()
        axios
        .get(`${backend_addr}/menu/`, {headers})
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

    // CREATE MENU
    addMenu(name, img) {
        let headers = this.getHeadears()
        axios
        .post(`${backend_addr}/menu/`, this.iconsFormData(name, img), {headers})
        .then(response => {
            this.getMenu()
        })
        .catch( error =>{ 
            // Очищаем данные, если аутентификация не прошла
            this.NotAuthError(error)
            console.log(error)
        })
    }

    // UPDATE MENU
    editMenu(id, name, img) {
          let headers = this.getHeadears()
          axios
          .patch(`${backend_addr}/menu/${id}/`, this.iconsFormData(name, img), {headers})
          .then(response => {
              this.getMenu()
              console.log(response)
          })
          .catch( error =>{ 
              // Очищаем данные, если аутентификация не прошла
              this.NotAuthError(error)
              console.log(error)
          })
    }

    //DELETE MENU
    deleteMenu() {
        let headers = this.getHeadears()
        axios
        .delete(`${backend_addr}/menu/${this.state.current_menu.id}/`, {headers})
        .then(response => {
            this.getMenu()
            this.setState({
                'current_menu': [],
                'hidden_modal': !this.state.hidden_modal,
            })
            console.log(response)
        })
        .catch( error =>{ 
            // Очищаем данные, если аутентификация не прошла
            this.NotAuthError(error)
            console.log(error)
        })
    }


    /*-----------------------------------*/
    /*-----------------------------------*/
    // CRUD SECTIONS
    /*-----------------------------------*/
    /*-----------------------------------*/

    //CREATE SECTIONS
    getSections(id) {
        let current_menu = this.state.menu.find(obj => obj.id === id)
        this.setState({
            'current_menu': current_menu
        })
        // Если не выбран элемент меню или выбран отличный текущего, то выводим новый список разделов
        if (this.state.current_menu.length === 0 || this.state.current_menu.id !== id) {
            let headers = this.getHeadears()
            axios
            .get(`${backend_addr}/sections/?menu_id=${id}`, {headers})
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


    /*-----------------------------------*/
    /*-----------------------------------*/
    // RENDER ГЛАВНОГО ПРИЛОЖЕНИЯ
    /*-----------------------------------*/
    /*-----------------------------------*/
    render () {
        if (this.isAuth()) {
            return (
                <div className="MainPage bkg_blur">
                <header>
                    <img className="Logo" src={Logo} alt='logo'></img>
                    <div className='logoutBtn' onClick={() => this.logOut()} >
                        { this.isAuth() ? <p>Выход</p> : '' }
                    </div>
                </header>
                <BrowserRouter>
                <Routes>
                    <Route exact path='/' element= 
                        {this.isAuth() ? 
                            <MenuList menu_list={this.state.menu} getSections = {(id) => this.getSections(id)} onFormDisplay = {(target) => this.onFormDisplay(target)} getCurentEditId = {(id, obj) => this.getCurentEditId(id, obj)} /> : 
                            <LoginForm getAuthToken={(username, password) => this.getAuthToken(username, password)} />
                        } 
                    />
                    <Route exact path='/main' element= {<MenuList menu_list={this.state.menu} />} />
                    <Route path='*' element = {<NotFound />} />
                </Routes>
                    <>
                        <Sections sections={this.state.sections}/> 
                    </>
                    <>
                        {this.state.hidden_modal ? '' :
                            <div className="modal">
                                {this.state.current_target === 'menuAdd' ? <CreateMenu addMenu = {(name, img) => this.addMenu(name, img)} onFormDisplay = {(target) => this.onFormDisplay(target)} /> : ''}
                                {this.state.current_target === 'menuEdit' ? <EditMenu addMenu = {(name, img) => this.editMenu(name, img)} onFormDisplay = {(target) => this.onFormDisplay(target)} current_menu={this.state.current_menu} deleteMenu={() => this.deleteMenu()} /> : ''}
                            </div>
                        } 
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
    }
}


export default App;
