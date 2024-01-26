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
            <div className='modalForm'>
                <form className ="" onSubmit={(event) => this.handleSubmit(event) }>
                    <div className='editHeader'>
                        <h3>Редактирование статьи</h3>
                    </div>
                    <p>Название</p>
                    <input type="text" required className="nameInput" placeholder="Наименование статьи" name="name" value={this.state.name} onChange={(event) => this.handleChange(event)} /><br/>
                    <p>Содержимое статьи</p>
                    <input id="text"className ="createIcon" type="text" name="text" value={this.state.text} onChange={(event) => this.handleChange(event)}/> <br/>
                    <div className="confirmGroup">
                        <input className="confirmBtn" type="button" value="Отменить" onClick = {() => this.props.onFormDisplay()}/>
                        <input className="confirmBtn" type="submit" value="Сохранить" />
                    </div>
                </form>
                <button className='deleteBtn' onClick={this.props.deleteArticle}>Удалить</button>
            </div>
        )
    }
}

export default EditArticle;
