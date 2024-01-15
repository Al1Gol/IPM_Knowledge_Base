import React from 'react'

import EditImg from '../img/icons/edit.svg'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER ЭЛЕМЕНТА MENU
// ВЛОЖЕН В РЕНДЕР СПИСКА MENU
/*-----------------------------------*/
/*-----------------------------------*/
const MenuItem = ({menu, getSections, getCurentEditId}) => {
    return (
        <div className="menuItem">
            <div className='menuBtn' onClick = {() => getSections(menu.id)}> 
                <div>
                    {menu.img ? <img src= {menu.img}  className="menuIcon" alt=''></img>: ''}
                </div>
                <p>{menu.name}</p>
            </div>
            <img id="menuEdit" src={EditImg} className='editBtn' alt='' onClick = {(event) => getCurentEditId(menu.id, event.currentTarget.getAttribute("id"))}></img>
        </div>
    )
}

/*-----------------------------------*/
/*-----------------------------------*/
// RENDER СПИСКА MENU
/*-----------------------------------*/
/*-----------------------------------*/
const MenuList = ({ menu_list, getSections, onFormDisplay, getCurentEditId}) => {
    return (
        <div>
            {menu_list.map((el_menu) => <MenuItem menu={el_menu} getSections={getSections} getCurentEditId={getCurentEditId}/>)}
            <div id="menuAdd" className={'menuBtn'}  onClick = {(event) => onFormDisplay(event.currentTarget.getAttribute("id"))}>
                <img src='' alt='' ></img>
                <p>Добавить меню </p>
            </div>
        </div>
    )
}


export default MenuList;
