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
import Articles from './components/Articles';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';
import CurrentArticle from './components/CurrentArticle';

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
            'current_edit_menu': [], //Редактирование элемента меню
            'sections': [],  //Список разделов
            'current_section': [], //Текущий раздел
            'current_edit_section': [], //Редактирование элемента разделов
            'articles': [], //Список статей
            'current_article': [], //Текущая статья
            'current_edit_article': [], //Редактирование элемента статьи
            'main_text' : [], //Отображение статьи
            'files': [], //Файлы статьи 
            'current_edit_files': [], //Редактирование списка файлов статьи
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
              'articles': [],
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
                'current_edit_menu': this.state.menu.find(el_menu =>  el_menu.id === id)
            },  this.onFormDisplay(obj))
        } 
        if(obj === 'sectionEdit') {
            this.setState ({
                'current_edit_section': this.state.sections.find(el_section =>  el_section.id === id)
            },  this.onFormDisplay(obj))
        }
        if(obj === 'articleEdit') {
            let article = this.state.articles.find(el_article =>  el_article.id === id)
            this.setState ({
                'current_edit_article': article
            }, this.getFiles(id, true, obj))
        }
    }

    closeArticle(){
        this.setState({
            'current_article' : [],
        })
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
                'menu': menu_list,
                'current_menu': [],
                'sections': [],
                'current_section': [],
                'articles': []
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
          .patch(`${backend_addr}/menu/${this.state.current_edit_menu.id}/`, this.iconsFormData(name, img), {headers})
          .then(response => {
              this.setState({
                'current_edit_menu': [],
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
        .delete(`${backend_addr}/menu/${this.state.current_edit_menu.id}/`, {headers})
        .then(response => {
            this.setState({
                'current_edit_menu': [],
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
        // Если не выбран элемент меню или выбран отличный текущего или происходит CUD через модалку, то выводим новый список разделов
        if (this.state.current_menu.length === 0 || this.state.current_menu.id !== id || update) {

            let headers = this.getHeadears()
            axios
            .get(`${backend_addr}/sections/?menu_id=${id}`, {headers})
            .then(response => {
                let sections = response.data
                this.setState({
                    'sections': sections,
                    'current_section': [],
                    'articles': [],
                })
            })
            .catch( error => {
                // Очищаем данные, если аутентификация не прошла
                this.NotAuthError(error)
            }) 
        } 
        // Убираем убираем всю правую часть при повтрном нажатии
        else {
            this.getMenu()
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
        .patch(`${backend_addr}/sections/${this.state.current_edit_section.id}/`, body, {headers})
        .then(response => {
            this.setState({
                'current_edit_section': [],
                'current_section':[],
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
        .delete(`${backend_addr}/sections/${this.state.current_edit_section.id}/`, {headers})
        .then(response => {
            this.setState({
                'current_edit_section': [],
                'current_section':[],
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
    // CRUD ARTICLES
    /*-----------------------------------*/
    /*-----------------------------------*/

    //READ ARTICLES
    getArticles(id, update=false) {
        let current_section = this.state.sections.find(obj => obj.id === id)
        this.setState({
            'current_section': current_section
        })
        // Если не выбран элемент раздела или выбран отличный текущего или происходит CUD через модалку, то выводим новый список статей
        if (this.state.current_section.length === 0 || this.state.current_section.id !== id || update) {
            let headers = this.getHeadears()
            axios
            .get(`${backend_addr}/articles/?section_id=${id}`, {headers})
            .then(response => {
                let articles = response.data
                this.setState({
                    'articles': articles
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
                'current_section': [],
                'articles': [],
                'files': [],
            })
        }
    }

    // CREATE ARTICLE
    addArticle(name, text, files) {
        let headers = this.getHeadears()
        let body = {
            "section_id": this.state.current_section.id,
            "name": name,
            "text": text
        }
        axios
        .post(`${backend_addr}/articles/`, body, {headers})
        .then(response => {
            this.getArticles(this.state.current_section.id, true)
            this.setState({
            'current_article': response.data
            }, this.addFiles(response.data.id, files))
        })
        .catch( error =>{ 
            // Очищаем данные, если аутентификация не прошла
            console.log(error)
        })
    }

    // EDIT ARTICLE
    editArticle(name, text, del_files=[], add_files=[]) {
        let headers = this.getHeadears()
        let body = {
            "section_id": this.state.current_section.id,
            "name": name,
            "text": text
        }
        axios
        .patch(`${backend_addr}/articles/${this.state.current_edit_article.id}/`, body, {headers})
        .then(response => {
            if (response.data.id === this.state.current_article.id){
                this.setState({
                    'current_article': response.data
                    })
            }
            this.setState({
                'hidden_modal': !this.state.hidden_modal,
            }, this.getArticles(this.state.current_section.id, true))
        })
        .catch( error =>{ 
            // Очищаем данные, если аутентификация не прошла
            this.NotAuthError(error)
            console.log(error)
        })
    }

    //DELETE ARTICLE
    deleteArticle() {
        let headers = this.getHeadears()
        axios
        .delete(`${backend_addr}/articles/${this.state.current_edit_article.id}/`, {headers})
        .then(response => {
            this.setState({
                'current_article': [],
                'hidden_modal': !this.state.hidden_modal,
            }, this.getArticles(this.state.current_section.id, true))
        })
        .catch( error =>{ 
            // Очищаем данные, если аутентификация не прошла
            this.NotAuthError(error)
            console.log(error)
        })
    }

    // ОТОБРАЖЕНИЕ ТЕКСТА СТАТЬИ
    showArticle(id, read=false) {
        if (read && (this.state.current_article.length === 0 || this.state.current_article.id !== id)) {
            this.setState ({
                'current_article': this.state.articles.find(el_article =>  el_article.id === id)
            }, this.getFiles(id))
        }
        else {
            this.setState ({
                'current_article': []
            })
        }
    }

    /*-----------------------------------*/
    /*-----------------------------------*/
    // CRUD FILES
    /*-----------------------------------*/
    /*-----------------------------------*/

    //READ FILES
    // update - True для отображения при редактировании
    // obj - объект запрашивающий вывод списка, для отображения модального окна
    getFiles(id, update=false, obj=null) {
        let headers = this.getHeadears()
        if (update) {
            axios
            .get(`${backend_addr}/files/?article_id=${id}`, {headers})
            .then(response => {
                this.setState({
                    'current_edit_files': response.data
                }, this.onFormDisplay(obj))
            })
            .catch( error =>{ 
                    // Очищаем данные, если аутентификация не прошла
                    this.NotAuthError(error)
                    console.log(error)
            }) 
        } else if (this.state.current_edit_article.length === 0 || this.state.current_edit_article.id !== id) {
            axios
            .get(`${backend_addr}/files/?article_id=${id}`, {headers})
            .then(response => {
                this.setState({
                    'files': response.data
                })
            })
            .catch( error =>{ 
                    // Очищаем данные, если аутентификация не прошла
                    this.NotAuthError(error)
                    console.log(error)
            })
        } else {
            this.setState({
                'files': [],
                'current_edit_files': [],
            })
        }
    }

    // CREATE FILES
    addFiles(article_id, files) {
        let headers = this.getHeadears()
        if (files) {
            for( var i=0; i<files.length; i++) {
                let body = new FormData();
                body.append('article_id', article_id);
                body.append('name', files[i].name);
                body.append('file', files[i]);
                axios
                .post(`${backend_addr}/files/`, body, {headers})
                .then(response => {
                })
                .catch( error =>{ 
                    // Очищаем данные, если аутентификация не прошла
                    console.log(error)
                })
            }
        }
    }

    // CREATE FILES
    addFiles(article_id, files) {
        let headers = this.getHeadears()
        if (files) {
            for( var i=0; i<files.length; i++) {
                let body = new FormData();
                body.append('article_id', article_id);
                body.append('name', files[i].name);
                body.append('file', files[i]);
                axios
                .post(`${backend_addr}/files/`, body, {headers})
                .then(response => {
                })
                .catch( error =>{ 
                    // Очищаем данные, если аутентификация не прошла
                    console.log(error)
                })
            }
        }
    }

    // CREATE FILES
    editFiles(id, article_id, files) {
        let headers = this.getHeadears()
        if (files) {
            for( var i=0; i<files.length; i++) {
                let body = new FormData();
                body.append('name', files[i].name);
                axios
                .post(`${backend_addr}/files/${id}/`, body, {headers})
                .then(response => {
                })
                .catch( error =>{ 
                    // Очищаем данные, если аутентификация не прошла
                    console.log(error)
                })
            }
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
                <div className="bkg_blur">
                    <header>
                        <img className="logo" src={Logo} alt='logo'></img>
                        <div className='logout-btn' onClick={() => this.logOut()} >
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
                            {this.state.current_menu.length === 0 ? '' : 
                            <Sections sections={this.state.sections} current_section={this.state.current_section} getArticles = {(id) => this.getArticles(id)} onFormDisplay = {(target) => this.onFormDisplay(target)} getCurentEditId = {(id, obj) => this.getCurentEditId(id, obj)} /> 
                            }
                        </>
                        <>
                            {this.state.current_section.length === 0 ? '' : 
                            <Articles articles={this.state.articles} current_article={this.state.current_article} onFormDisplay = {(target) => this.onFormDisplay(target)} getCurentEditId = {(id, obj) => this.getCurentEditId(id, obj)} showArticle={(id, read) => this.showArticle(id, read)} /> 
                            }
                        </>
                        <>
                            {this.state.current_article.length === 0 ? '' : 
                                <CurrentArticle current_article={this.state.current_article} files = {this.state.files} closeArticle={() => this.closeArticle()}/> 
                            }
                        </>
                        <>
                            {this.state.hidden_modal ? '' :
                                <div className="modal">
                                    {this.state.current_target === 'menuAdd' ? <CreateMenu addMenu = {(name, img) => this.addMenu(name, img)} onFormDisplay = {(target) => this.onFormDisplay(target)} /> : ''}
                                    {this.state.current_target === 'menuEdit' ? <EditMenuForm current_edit_menu={this.state.current_edit_menu} editMenu = {(name, img) => this.editMenu(name, img)} onFormDisplay = {(target) => this.onFormDisplay(target)} deleteMenu={() => this.deleteMenu()} /> : ''}
                                    {this.state.current_target === 'sectionAdd' ? <CreateSections current_section={this.state.current_section} addSection = {(name, img) => this.addSection(name, img)} onFormDisplay = {(target) => this.onFormDisplay(target)} /> : ''}
                                    {this.state.current_target === 'sectionEdit' ? <EditSection current_edit_section={this.state.current_edit_section} editSection = {(name, img) => this.editSection(name, img)} onFormDisplay = {(target) => this.onFormDisplay(target)} getCurentEditId = {(id, obj) => this.getCurentEditId(id, obj)} deleteSection = {() => this.deleteSection()} onCanselClick={(obj) => this.onCanselClick(obj)} /> : ''}
                                    {this.state.current_target === 'articleAdd' ? <CreateArticle current_article={this.state.current_article} addArticle = {(name, text, files) => this.addArticle(name, text, files)} onFormDisplay = {(target) => this.onFormDisplay(target)} /> : ''}
                                    {this.state.current_target === 'articleEdit' ? <EditArticle current_edit_article={this.state.current_edit_article} current_edit_files={this.state.current_edit_files} editArticle = {(name, text) => this.editArticle(name, text)} addFiles={(article_id, files) => this.addFiles(article_id, files)} onFormDisplay = {(target) => this.onFormDisplay(target)} getCurentEditId = {(id, obj) => this.getCurentEditId(id, obj)} deleteArticle = {() => this.deleteArticle()} /> : ''}
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
