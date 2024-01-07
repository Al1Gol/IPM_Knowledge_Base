import React from 'react';


class CreateMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name' : null, //Имя
            'img': null, //Иконка
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
    this.props.addMenu(this.state.name, this.state.img)
    event.preventDefault() // запрещает стандартную обработку события
}



// Перехватываем загруженный файл
onFileChange(event) {
    // Обновляем стейт
    this.setState({ 'img': event.target.files[0] });
};


    // Рендер формы
    // логину и паролю присваиваем value равное стэйту, в этом случае значение поля будет передаваться в сам стэйт и подтягиваться из него
    render () {
        return (
            <div id ="panel" className={ this.props.hidden_edit_menu ? "hidden" :  " "}>
                Добавить меню
                <form onSubmit={(event) => this.handleSubmit(event) }>
                    <input type="button" value="Удалить" onClick = {() => this.props.onFormDisplay()}/>
                    <input type="file" onChange={(event) => this.onFileChange(event)}/> 
                    <input type="text" placeholder="name" name="name" value={this.state.name} onChange={(event) => this.handleChange(event)} />
                    <input type="button" value="Отменить" onClick = {() => this.props.onFormDisplay()}/>
                    <input type="submit" value="Сохранить" />
                </form>
            </div>
        )
        }
}

export default CreateMenu;
