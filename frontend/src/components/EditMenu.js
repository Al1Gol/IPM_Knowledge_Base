import React from 'react';


class CreateMenu extends React.Component {
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
                <div>
                    112
                </div>
            )
        }
}

export default CreateMenu;
