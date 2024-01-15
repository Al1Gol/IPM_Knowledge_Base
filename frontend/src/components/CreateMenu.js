import React from 'react';


/***********************************************************************************************/
/***********************************************************************************************/
//КОМПОНЕНТ СОЗДАНИЯ MENU
/***********************************************************************************************/
/***********************************************************************************************/
class CreateMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'menu_name' : "", //Имя
            'img': null, //Иконка
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
        this.props.addMenu(this.state.menu_name, this.state.img)
        this.props.onFormDisplay()
        event.preventDefault() // запрещает стандартную обработку события
    }



    // ОБРАБОТЧИК ЗАГРУЗКИ ФАЙЛА
    // ПЕРЕХВАТЫВАЕТ ОБЪЕКТ ФАЙЛА И ПОМЕЩАЕТ В props
    onFileChange(event) {
        // Обновляем стейт
        this.setState({'img': event.target.files[0] });
    };


    /*-----------------------------------*/
    /*-----------------------------------*/
    // RENDER МОДАЛЬНОГО ОКНА С ФОРМОЙ СОЗДАНИЯ ЭЛЕМЕНТА MENU
    /*-----------------------------------*/
    /*-----------------------------------*/
    render () {
            return (
                <form className ="modalForm" onSubmit={(event) => this.handleSubmit(event) }>
                    <h3>Создание пункта меню</h3>
                    <p>Название</p>
                    <input type="text" required className="nameInput" placeholder="Наименование пункта" name="menu_name" value={this.state.name} onChange={(event) => this.handleChange(event)} /><br/>
                    <p>Добавить иконку</p>
                    <input id="file"className ="createIcon" type="file" title=" " onChange={(event) => this.onFileChange(event)}/> <br/>
                    <div className="confirmGroup">
                        <input className="confirmBtn" type="button" value="Отменить" onClick = {() => this.props.onFormDisplay()}/>
                        <input className="confirmBtn" type="submit" value="Сохранить" />
                    </div>
                </form>
            )
    }
}


export default CreateMenu;
