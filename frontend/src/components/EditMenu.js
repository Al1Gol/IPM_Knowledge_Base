import React from 'react';

/***********************************************************************************************/
/***********************************************************************************************/
//КОМПОНЕНТ РЕДАКТИРОВАНИЯ MENU
/***********************************************************************************************/
/***********************************************************************************************/
class EditMenu extends React.Component {
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
    // RENDER МОДАЛЬНОГО ОКНА С ФОРМОЙ РЕДАКТИРОВАНИЯ ЭЛЕМЕНТА MENU
    /*-----------------------------------*/
    /*-----------------------------------*/
    render () {
        return (
            <div className='modalForm'>
                <form className ="" onSubmit={(event) => this.handleSubmit(event) }>
                    <div className='editHeader'>
                        <h3>Редактирование пункта меню</h3>
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
                <button className='deleteBtn' onClick={this.props.deleteMenu}>Удалить</button>
            </div>
        )
    }
}

export default EditMenu;
