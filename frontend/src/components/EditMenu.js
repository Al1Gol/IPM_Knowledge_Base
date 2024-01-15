import React from 'react';


class EditMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'menu_name' : "", //Имя
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
    this.props.addMenu(this.state.menu_name, this.state.img)
    this.props.onFormDisplay()
    event.preventDefault() // запрещает стандартную обработку события
}



// Перехватываем загруженный файл
onFileChange(event) {
    // Обновляем стейт
    this.setState({'img': event.target.files[0] });
};


    // Рендер формы
    // логину и паролю присваиваем value равное стэйту, в этом случае значение поля будет передаваться в сам стэйт и подтягиваться из него
    render () {
        return (
            <form className ="modalForm" onSubmit={(event) => this.handleSubmit(event) }>
                <div className='editHeader'>
                    <h3>Редактирование пункта меню</h3>
                    <button className='deleteBtn'>Удалить</button>
                </div>
                <p>Название</p>
                <input type="text" required className="nameInput" placeholder="Наименование пункта" name="menu_name" value={this.state.name} onChange={(event) => this.handleChange(event)} /><br/>
                <p>Добавить/Изменить иконку</p>
                <input id="file"className ="createIcon" type="file" title=" " onChange={(event) => this.onFileChange(event)}/> <br/>
                <div className="confirmGroup">
                    <input className="confirmBtn" type="button" value="Отменить" onClick = {() => this.props.onFormDisplay()}/>
                    <input className="confirmBtn" type="submit" value="Сохранить" />
                </div>
            </form>
        )
    }
}

export default EditMenu;
