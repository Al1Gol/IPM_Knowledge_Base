import React from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Routes, useLocation,} from 'react-router-dom'

import LoginForm from './components/LoginForm';
import MenuList from './components/Menu';
import CreateMenu from './components/CreateMenu';
import EditMenuForm from './components/EditMenu';
import Sections from './components/Sections';
import CreateSections from './components/CreateSection';
import EditSection from './components/EditSection'; 
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
            'sections': null,  //Разделы
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


    //Получение текущего ID Menu/Раздела для формирования модального окна
    getCurentEditId(id, obj) {
        if (obj === 'menuEdit'){
            this.setState ({
                'current_menu': this.state.menu.find(el_menu =>  el_menu.id === id)
            },  this.onFormDisplay(obj))
        } 
        if(obj === 'sectionEdit') {
            this.setState ({
                'current_section': this.state.sections.find(el_section =>  el_section.id === id)
            },  this.onFormDisplay(obj))
        }
    }

    


/***********************************************************************************************/
/***********************************************************************************************/
//ОБРАЩЕНИЯ ПО АПИ
/***********************************************************************************************/
/***********************************************************************************************/

    /*-----------------------------------*/
    /*-----------------------------------*/
    // READ TOKEN
    /*-----------------------------------*/
    /*-----------------------------------*/
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
    editMenu(name, img) {
          let headers = this.getHeadears()
          axios
          .patch(`${backend_addr}/menu/${this.state.current_menu.id}/`, this.iconsFormData(name, img), {headers})
          .then(response => {
              this.setState({
                'current_menu': [],
                'hidden_modal': !this.state.hidden_modal,
            }, this.getMenu())
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
            this.setState({
                'current_menu': [],
                'hidden_modal': !this.state.hidden_modal,
            }, this.getMenu())
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
    getSections(id, update=false) {
        let current_menu = this.state.menu.find(obj => obj.id === id)
        this.setState({
            'current_menu': current_menu
        })
        // Если не выбран элемент меню или выбран отличный текущего, то выводим новый список разделов
        if (this.state.current_menu.length === 0 || this.state.current_menu.id !== id || update) {

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
                'sections': null,
                'current_section': [],
                'article': [],
                'files': [],
            })
        }
    }


    // CREATE SECTION
    addSection(name, img) {
        let headers = this.getHeadears()
        let body = this.iconsFormData(name, img)
        body.append('menu_id', this.state.current_menu.id)
        axios
        .post(`${backend_addr}/sections/`, body, {headers})
        .then(response => {
            this.getSections(this.state.current_menu.id, true)
        })
        .catch( error =>{ 
            // Очищаем данные, если аутентификация не прошла
            this.NotAuthError(error)
            console.log(error)
        })
    }

    // EDIT SECTION
    editSection(name, img) {
        let headers = this.getHeadears()
        let body = this.iconsFormData(name, img)
        body.append('menu_id', this.state.current_menu.id)
        axios
        .patch(`${backend_addr}/sections/${this.state.current_section.id}/`, body, {headers})
        .then(response => {
            this.setState({
                'current_section': [],
                'hidden_modal': !this.state.hidden_modal,
            }, this.getSections(this.state.current_menu.id, true))
        })
        .catch( error =>{ 
            // Очищаем данные, если аутентификация не прошла
            this.NotAuthError(error)
            console.log(error)
        })
    }

    //DELETE SECTION
    deleteSection() {
        let headers = this.getHeadears()
        axios
        .delete(`${backend_addr}/sections/${this.state.current_section.id}/`, {headers})
        .then(response => {
            this.setState({
                'current_section': [],
                'hidden_modal': !this.state.hidden_modal,
            }, this.getSections(this.state.current_menu.id, true))
        })
        .catch( error =>{ 
            // Очищаем данные, если аутентификация не прошла
            this.NotAuthError(error)
            console.log(error)
        })
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
                <div className='content'>
                <BrowserRouter>
                <Routes>
                    <Route exact path='/' element= 
                        {this.isAuth() ? 
                            <MenuList menu_list={this.state.menu} current_menu={this.state.current_menu} getSections = {(id) => this.getSections(id)} onFormDisplay = {(target) => this.onFormDisplay(target)} getCurentEditId = {(id, obj) => this.getCurentEditId(id, obj)} /> : 
                            <LoginForm getAuthToken={(username, password) => this.getAuthToken(username, password)} />
                        } 
                    />
                    <Route path='*' element = {<NotFound />} />
                </Routes>
                    <>
                        {!this.state.sections ? '' : 
                        <Sections sections={this.state.sections} onFormDisplay = {(target) => this.onFormDisplay(target)} getCurentEditId = {(id, obj) => this.getCurentEditId(id, obj)} /> 
                        }
                    </>
                    <>
                        {this.state.hidden_modal ? '' :
                            <div className="modal">
                                {this.state.current_target === 'menuAdd' ? <CreateMenu addMenu = {(name, img) => this.addMenu(name, img)} onFormDisplay = {(target) => this.onFormDisplay(target)} /> : ''}
                                {this.state.current_target === 'menuEdit' ? <EditMenuForm editMenu = {(name, img) => this.editMenu(name, img)} onFormDisplay = {(target) => this.onFormDisplay(target)} current_menu={this.state.current_menu} deleteMenu={() => this.deleteMenu()} /> : ''}
                                {this.state.current_target === 'sectionAdd' ? <CreateSections addSection = {(name, img) => this.addSection(name, img)} onFormDisplay = {(target) => this.onFormDisplay(target)} current_section={this.state.current_section} /> : ''}
                                {this.state.current_target === 'sectionEdit' ? <EditSection editSection = {(name, img) => this.editSection(name, img)} onFormDisplay = {(target) => this.onFormDisplay(target)} current_section={this.state.current_section} getCurentEditId = {(id, obj) => this.getCurentEditId(id, obj)} deleteSection = {() => this.deleteSection()} /> : ''}
                            </div>
                        } 
                    </>   
                </BrowserRouter>
                </div>
                </div>
            )
        } else {
            return (
              <BrowserRouter>
                  <Routes>
                      <Route exact path='/' element = <LoginForm getAuthToken={(username, password) => this.getAuthToken(username, password)} />/>
                  </Routes>
              </BrowserRouter>
            )
        }
    }
}


export default App;
