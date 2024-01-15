import React from 'react'

import EditImg from '../img/icons/edit.svg'


const MenuItem = ({menu, getSections, onFormDisplay}) => {
    return (
        <div className="menuItem">
            <div className='menuBtn' onClick = {() => getSections(menu.id)}> 
                <div>
                    {menu.img ? <img src= {menu.img}  className="menuIcon" alt=''></img>: ''}
                </div>
                <p>{menu.name}</p>
            </div>
            <img id="menuEdit" src={EditImg} className='editBtn' alt='' onClick = {(event) => onFormDisplay(event.currentTarget.getAttribute("id"))}></img>
        </div>
    )
}
// временная заглушка на onClick
const MenuList = ({ menu_list, getSections, onFormDisplay}) => {
    return (
        <div>
            {menu_list.map((el_menu) => <MenuItem menu={el_menu} getSections={getSections} onFormDisplay={onFormDisplay}/>)}
            <div id="menuAdd" className={'menuBtn'}  onClick = {(event) => onFormDisplay(event.currentTarget.getAttribute("id"))}>
                <img src='' alt='' ></img>
                <p>Добавить меню </p>
            </div>
        </div>
    )
}

export default MenuList;