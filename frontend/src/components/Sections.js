import React from 'react'
import add_img from '../img/icons/add_section.svg'
import editIcon from '../img/icons/edit_sub.png'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER ЭЛЕМЕНТА SECTION
// ВЛОЖЕН В РЕНДЕР СПИСКА SECTIONS
/*-----------------------------------*/
/*-----------------------------------*/
const SectionItem = ({section, getCurentEditId}) => {
    return (
        <div className='sectionItem'>
            <div className='sectionBtn'>
                <div>
                    {section.img ? <img src= {section.img} alt=''></img>  : ''}
                </div>
                <p>{section.name}</p>
                <img id='sectionEdit' className='iconSection' src={editIcon} onClick = {(event) => getCurentEditId(section.id, event.currentTarget.getAttribute("id"))}></img>
            </div>
        </div>
    )
}

/*-----------------------------------*/
/*-----------------------------------*/
// RENDER СПИСКА SECTIONS
/*-----------------------------------*/
/*-----------------------------------*/
const Sections = ({ sections, onFormDisplay, getCurentEditId }) => {
    return (
        <div className='sectionsBlock'>
            {sections.map((section) => <SectionItem section={section} getCurentEditId={getCurentEditId} />)}
            <div id="sectionAdd" className='sectionBtn' onClick = {(event) => onFormDisplay(event.currentTarget.getAttribute("id"))}> 
                <div>
                    <img src={add_img} alt='+'></img>
                </div>
                <p>Добавить раздел</p></div>
        </div>
    )
}


export default Sections;