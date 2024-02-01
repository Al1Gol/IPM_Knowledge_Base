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
            "menu_name" : "", //Имя
            "img": null, //Иконка
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
                <form className ="modal-form" onSubmit={(event) => this.handleSubmit(event) }>
                    <h3 className='modal-header'>Создание пункта меню</h3>
                    <p className='sign'>Название</p>
                    <input type="text" required className="modal-input" placeholder="Наименование пункта" name="menu_name" value={this.state.name} onChange={(event) => this.handleChange(event)} /><br/>
                    <p className='sign'>Добавить иконку</p>
                    <input id="file"className ="createIcon" type="file" title=" " onChange={(event) => this.onFileChange(event)}/> <br/>
                    <div className="confirm-group">
                        <input className="confirm-btn" type="button" value="Отменить" onClick = {() => this.props.onFormDisplay()}/>
                        <input className="confirm-btn" type="submit" value="Сохранить" />
                    </div>
                </form>
            )
    }
}


export default CreateMenu;
