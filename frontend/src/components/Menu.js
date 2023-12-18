import React from 'react'

const MenuItem = ({menu, getSections}) => {
    return (
        <div>
            <button onClick = {() => getSections(menu.id)}> <img src={menu.img ? menu.img : ''} alt=''></img> {menu.name} </button>
            <button>edit</button>
        </div>
    )
}
// временная заглушка на onClick
const MenuList = ({ menu_list, getSections, onFormDisplay}) => {
    return (
        <div>
            {menu_list.map((el_menu) => <MenuItem menu={el_menu} getSections={getSections} />)}
            <button onClick = {() => onFormDisplay()}> <img src='' alt='+' ></img>Добавить меню </button>
            <hr></hr>
        </div>
    )
}

export default MenuList;