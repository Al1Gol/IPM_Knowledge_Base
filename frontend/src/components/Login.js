import React from 'react';
import { Navigate } from "react-router-dom"

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
            <form onSubmit={(event) => this.handleSubmit(event) }>
                <input type="text" name="login" placeholder="login" value={this.state.login}  onChange={(event) => this.handleChange(event)} /> 
                <input type="password" name="password" placeholder="password" value={this.state.password}  onChange={(event) => this.handleChange(event)} />
                <input type="submit" value="Вход" />
            </form>
        )
        }
}
export default LoginForm;