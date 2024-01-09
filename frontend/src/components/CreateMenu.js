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
                <div class="modal">
                        <form className ="createForm" onSubmit={(event) => this.handleSubmit(event) }>
                            <h3>Создание пункта меню</h3>
                            <p>Название</p>
                            <input type="text" className="nameInput" placeholder="Наименование пункта" name="name" value={this.state.name} onChange={(event) => this.handleChange(event)} /><br/>
                            <p>Добавить иконку</p>
                            <input className ="createIcon" type="file" title=" " onChange={(event) => this.onFileChange(event)}/> <br/>
                            <input type="button" value="Отменить" onClick = {() => this.props.onFormDisplay()}/><br/>
                            <input type="submit" value="Создать" />
                        </form>
                </div>
            )
        }
}

export default CreateMenu;
