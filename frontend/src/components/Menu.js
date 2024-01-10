import React, { useState } from 'react'

import EditImg from '../img/icons/edit.svg'


const MenuItem = ({menu, getSections}) => {
    return (
        <div className='menuBtn' onClick = {() => getSections(menu.id)}> 
            <div>
                <div className='sidebar'></div>
                {menu.img ? <img src= {menu.img}  className="menuIcon" alt=''></img>: ''}
                <div className='sidebar'>
                    <img src={EditImg} className='editBtn' alt=''></img>
                </div>
            </div>
            <p>{menu.name}</p>
        </div>
    )
}
// временная заглушка на onClick
const MenuList = ({ menu_list, getSections, onFormDisplay}) => {
    return (
        <div>
            {menu_list.map((el_menu) => <MenuItem menu={el_menu} getSections={getSections} />)}
            <div id="menu-add" className={'menuBtn'}  onClick = {() => onFormDisplay()}>
                <img src='' alt='' ></img>
                <p>Добавить меню </p>
            </div>
        </div>
    )
}

export default MenuList;