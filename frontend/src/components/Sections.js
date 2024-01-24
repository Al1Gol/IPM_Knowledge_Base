import React from 'react'
import add_img from '../img/icons/add_section.svg'
import editIcon from '../img/icons/edit_sub.png'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER ЭЛЕМЕНТА SECTION
// ВЛОЖЕН В РЕНДЕР СПИСКА SECTIONS
/*-----------------------------------*/
/*-----------------------------------*/
const SectionItem = ({section, current_section, getCurentEditId}) => {
    return (
        <div className='sectionItem'>
            <div className={ (current_section.id == section.id) ? 'sectionBtn isActive' : 'sectionBtn'}>
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
const Sections = ({ sections, current_section, onFormDisplay, getCurentEditId }) => {
    return (
        <div className='sectionsBlock'>
            {sections.map((section) => <SectionItem section={section} current_section={current_section} getCurentEditId={getCurentEditId} />)}
            <div id="sectionAdd" className='sectionBtn' onClick = {(event) => onFormDisplay(event.currentTarget.getAttribute("id"))}> 
                <div>
                    <img src={add_img} alt=''></img>
                </div>
                <p>Добавить раздел</p></div>
        </div>
    )
}


export default Sections;