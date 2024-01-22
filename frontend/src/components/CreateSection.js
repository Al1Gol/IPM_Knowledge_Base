import React from 'react';


/***********************************************************************************************/
/***********************************************************************************************/
//КОМПОНЕНТ СОЗДАНИЯ SECTIONS
/***********************************************************************************************/
/***********************************************************************************************/
class CreateSections extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "section_name" : "", //Имя
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
        console.log("section_name " + this.state.section_name)
        console.log("img " + this.state.img)
        this.props.addSection(this.state.section_name, this.state.img)
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
    // RENDER МОДАЛЬНОГО ОКНА С ФОРМОЙ СОЗДАНИЯ ЭЛЕМЕНТА SECTIONS
    /*-----------------------------------*/
    /*-----------------------------------*/
    render () {
            return (
                <form className ="modalForm" onSubmit={(event) => this.handleSubmit(event) }>
                    <div className='editHeader'>
                        <h3>Создание нового раздела</h3>
                    </div>
                        <p>Название</p>
                    <input type="text" required className="nameInput" placeholder="Наименование раздела" name="section_name" value={this.state.name} onChange={(event) => this.handleChange(event)} /><br/>
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


export default CreateSections;
