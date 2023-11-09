//Присваивает параметру value значение из параметра name
//позволяет передавать содержимое поля в value
export function handleChange(event) {
    this.setState({ 
        [event.target.name]: event.target.value
    })
}

// Переопределяем событие по нажатию на кнопку отправки формы
export function handleSubmit(event) {
    this.props.addMenu(this.state.name, this.state.img)
    event.preventDefault() // запрещает стандартную обработку события
}



// Перехватываем загруженный файл
export function onFileChange(event) {
    // Обновляем стейт
    this.setState({ img: event.target.files[0] });
};

export default function CreateMenu () {

    // Рендер формы
    // логину и паролю присваиваем value равное стэйту, в этом случае значение поля будет передаваться в сам стэйт и подтягиваться из него
        return (
            <div id ="panel" className={ this.props.hidden_edit_menu ? "hidden" :  " "}>
                Добавить меню
                <form onSubmit={(event) => this.handleSubmit(event) }>
                    <input type="button" value="Удалить"/>
                    <input type="file"/> 
                    <input type="text" placeholder="name" name="name"/>
                    <input type="button" value="Отменить"/>
                    <input type="submit" value="Сохранить" />
                </form>
            </div>
        )
    }
