import React from 'react';
import { Navigate } from "react-router-dom"
import Logo from '../img/logo.png'
import './styles.css';
import '../index.css';
import '../App.css';
import '../fonts/gothampro-black.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'login' : '', //Логин
            'password': '', // Пароль
    }

}

//Присваивает параметру value значение из параметра name
//позволяет передавать содержимое поля в value
handleChange(event) {
    this.setState({ 
        [event.target.name]: event.target.value
    })
}

// Переопределяем событие по нажатию на кнопку отправки формы
handleSubmit(event) {
    this.props.getAuthToken(this.state.login, this.state.password)
    event.preventDefault() // запрещает стандартную обработку события
}

    // Рендер формы
    // логину и паролю присваиваем value равное стэйту, в этом случае значение поля будет передаваться в сам стэйт и подтягиваться из него
    render () {
        return (
            <div className='LoginPage'>
                <img className="Logo" src={Logo}></img>
                <form className='LoginForm' onSubmit={(event) => this.handleSubmit(event) }>
                    <p>Авторизация</p>
                    <input class="login-input" type="text" name="login" placeholder="Логин" value={this.state.login}  onChange={(event) => this.handleChange(event)} /> 
                    <input class="login-input" type="password" name="password" placeholder="Пароль" value={this.state.password}  onChange={(event) => this.handleChange(event)} />
                    <input class="login-btn" type="submit" value="Вход" />
                </form>
            </div>
        )
        }
}
export default LoginForm;