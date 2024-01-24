import React from 'react';


/***********************************************************************************************/
/***********************************************************************************************/
//КОМПОНЕНТ СОЗДАНИЯ ARTICLE
/***********************************************************************************************/
/***********************************************************************************************/
class CreateArticle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "article_name" : "", //Имя
            "text": null, //Иконка
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
        this.props.addSection(this.state.article_name, this.state.text)
        this.props.onFormDisplay()
        event.preventDefault() // запрещает стандартную обработку события
    }

    /*-----------------------------------*/
    /*-----------------------------------*/
    // RENDER МОДАЛЬНОГО ОКНА С ФОРМОЙ СОЗДАНИЯ ЭЛЕМЕНТА SECTIONS
    /*-----------------------------------*/
    /*-----------------------------------*/
    render () {
            return (
                <form className ="modalForm" onSubmit={(event) => this.handleSubmit(event) }>
                    <div className='editHeader'>
                        <h3>Создание новой статьи</h3>
                    </div>
                        <p>Название</p>
                    <input type="text" required className="nameInput" placeholder="Наименование раздела" name="article_name" value={this.state.name} onChange={(event) => this.handleChange(event)} /><br/>
                    <p>Текст статьи</p>
                    <input id="text"className ="createIcon" type="text" name='' onChange={(event) => this.onFileChange(event)}/> <br/>
                    <div className="confirmGroup">
                        <input className="confirmBtn" type="button" value="Отменить" onClick = {() => this.props.onFormDisplay()}/>
                        <input className="confirmBtn" type="submit" value="Сохранить" />
                    </div>
                </form>
            )
    }
}


export default CreateArticle;
