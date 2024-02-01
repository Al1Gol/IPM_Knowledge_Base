import React from 'react';

/***********************************************************************************************/
/***********************************************************************************************/
//КОМПОНЕНТ РЕДАКТИРОВАНИЯ SECTION
/***********************************************************************************************/
/***********************************************************************************************/
class EditSectionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name' : this.props.current_edit_section.name, //Имя
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
        event.preventDefault() // запрещает стандартную обработку события
        this.props.editSection(this.state.name, this.state.img)
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
            <div className='modal-form'>
                <form className ="" onSubmit={(event) => this.handleSubmit(event) }>
                    <h3 className='modal-header'>Редактирование раздела</h3>
                    <p className='sign'>Название</p>
                    <input type="text" required className="modal-input" placeholder="Наименование раздела" name="name" value={this.state.name} onChange={(event) => this.handleChange(event)} /><br/>
                    <p className='sign'>Добавить/Изменить иконку</p>
                    <input id="file"className ="createIcon" type="file" title=" " onChange={(event) => this.onFileChange(event)}/> <br/>
                    <div className="confirm-group">
                        <input className="confirm-btn" type="button" value="Отменить" onClick = {() => this.props.onFormDisplay()}/>
                        <input className="confirm-btn" type="submit" value="Сохранить" />
                    </div>
                </form>
                <button className='delete-btn' onClick={this.props.deleteSection}>Удалить</button>
            </div>
        )
    }
}

export default EditSectionForm;
