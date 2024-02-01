import React from 'react';

/***********************************************************************************************/
/***********************************************************************************************/
//КОМПОНЕНТ РЕДАКТИРОВАНИЯ ARTICLES
/***********************************************************************************************/
/***********************************************************************************************/
class EditArticle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name' : this.props.current_edit_article.name, //Наименование статьи
            'text': this.props.current_edit_article.text, //Содержание статьи
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
        this.props.editArticle(this.state.name, this.state.text)
    }


    /*-----------------------------------*/
    /*-----------------------------------*/
    // RENDER МОДАЛЬНОГО ОКНА С ФОРМОЙ РЕДАКТИРОВАНИЯ ЭЛЕМЕНТА ARTICLE
    /*-----------------------------------*/
    /*-----------------------------------*/
    render () {
        return (
            <div className='modal-form'>
                <form className ="" onSubmit={(event) => this.handleSubmit(event) }>
                    <h3 className='modal-header'>Редактирование статьи</h3>
                    <p className='sign'>Название</p>
                    <input type="text" required className="modal-input" placeholder="Наименование статьи" name="name" value={this.state.name} onChange={(event) => this.handleChange(event)} /><br/>
                    <p className='sign'>Содержимое статьи</p>
                    <input id="text"className ="modal-input" type="text" placeholder="Содержимое статьи" name="text" value={this.state.text} onChange={(event) => this.handleChange(event)}/> <br/>
                    <div className="confirm-group">
                        <input className="confirm-btn" type="button" value="Отменить" onClick = {() => this.props.onFormDisplay()}/>
                        <input className="confirm-btn" type="submit" value="Сохранить" />
                    </div>
                </form>
                <button className='delete-btn' onClick={this.props.deleteArticle}>Удалить</button>
            </div>
        )
    }
}

export default EditArticle;
