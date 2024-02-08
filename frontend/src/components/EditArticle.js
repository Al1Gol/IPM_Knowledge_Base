import React from 'react';
import FilesList from './Files'
import uploadImg from '../img/icons/upload.png'

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
            'current_files': this.props.current_edit_files, //Список загружаемых файлов
            'new_files': [] //Список новых файлов
        }   
    }   

    // ОБРАБОТЧИК ПОЛЯ input
    // ПЕРЕДАЧА СОДЕРЖИМОГО input ПОЛЯ В props
    handleChange(event) {
        this.setState({ 
            [event.target.name]: event.target.value
        })
    }

    // ПОСЛЕДОВАТЕЛЬНАЯ ЗАГРУЗКА ФАЙЛОВ
    uploadData(event) {
        this.setState({'new_files': [...this.state.new_files, event.target.files[0]] });
     }

    // ОБРАБОТЧИК КНОПКИ submit
    handleSubmit(event) {
        event.preventDefault() // запрещает стандартную обработку события
        this.props.editArticle(this.state.name, this.state.text)
        this.props.addFiles(this.props.current_edit_article.id, this.state.new_files)
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
                    <FilesList  files={this.state.current_files} new_files = {this.state.new_files} />
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
                <button className='delete-btn' onClick={this.props.deleteArticle}>Удалить</button>
            </div>
        )
    }
}

export default EditArticle;
