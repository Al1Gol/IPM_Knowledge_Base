import React from 'react';

import Logo from '../img/logo.png'
import './styles.css';


/***********************************************************************************************/
/***********************************************************************************************/
//КОМПОНЕНТ ФОРМЫ АУТЕНТИФИКАЦИИ
/***********************************************************************************************/
/***********************************************************************************************/
class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'login' : '', //Логин
            'password': '', // Пароль
    }

}

    // ОБРАБОТЧИК ПОЛЯ input
    // ПЕРЕДАЧА СОДЕРЖИМОГО input ПОЛЯ В props
    handleChange(event) {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

   // ОБРАБОТЧИК КНОПКИ submit
    handleSubmit(event) {
        this.props.getAuthToken(this.state.login, this.state.password)
        event.preventDefault() // запрещает стандартную обработку события
    }


    /*-----------------------------------*/
    /*-----------------------------------*/
    // RENDER ФОРМЫ АУТЕНТИФИКАЦИИ
    /*-----------------------------------*/
    /*-----------------------------------*/
    render () {
        return (
            <div className='login-page'>
                <img className="logo-login" src={Logo} alt='logo'></img>
                <form className='login-form' onSubmit={(event) => this.handleSubmit(event) }>
                    <p>Авторизация</p>
                    <input className="login-input" type="text" name="login" placeholder="Логин" value={this.state.login}  onChange={(event) => this.handleChange(event)} /> 
                    <input className="login-input" type="password" name="password" placeholder="Пароль" value={this.state.password}  onChange={(event) => this.handleChange(event)} />
                    <input className="login-btn" type="submit" value="Вход" />
                </form>
            </div>
        )
        }
}


export default LoginForm;
