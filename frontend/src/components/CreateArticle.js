import React from 'react';
import uploadImg from '../img/icons/upload.png'
import FilesList from './Files'

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
            "text": "", //Иконка
            "files": [] //Список загружаемых файлов
        }   
    }   

    // ОБРАБОТЧИК ПОЛЕЙ input
    // ПЕРЕДАЧА СОДЕРЖИМОГО input ПОЛЕЙ В props
    handleChange(event) {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    // ПОСЛЕДОВАТЕЛЬНАЯ ЗАГРУЗКА ФАЙЛОВ
     uploadData(event) {
        this.setState({'files': [...this.state.files, event.target.files[0]] });
     }

    // ОБРАБОТЧИК КНОПКИ submit
    handleSubmit(event) {
        this.props.addArticle(this.state.article_name, this.state.text, this.state.files)
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
                <form className ="modal-form" onSubmit={(event) => this.handleSubmit(event) }>
                    <h3 className='modal-header'>Создание статьи</h3>
                    <p className='sign'>Название</p>
                    <input type="text" required className="modal-input" placeholder="Наименование раздела" name="article_name" value={this.state.name} onChange={(event) => this.handleChange(event)} /><br/>
                    <p className='sign'>Текст статьи</p>
                    <input id="text"className ="modal-input" type="text"  placeholder="Содержимое статьи" name="text" onChange={(event) => this.handleChange(event)}/> <br/>
                    <FilesList  files={this.state.files} />
                    <div className="app" onChange={(event) => this.uploadData(event)}>
                        <div className="file-upload">
                            <img className='icon-upload' src={uploadImg} alt="upload" />
                            <input type="file" />
                        </div>
                    </div>
                    <div className="confirm-group">
                        <input className="confirm-btn" type="button" value="Отменить" onClick = {() => this.props.onFormDisplay()}/>
                        <input className="confirm-btn" type="submit" value="Сохранить" />
                    </div>
                </form>
            )
    }
}


export default CreateArticle;
