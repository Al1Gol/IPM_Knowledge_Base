import React from 'react'
import add_img from '../img/icons/add_section.svg'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER ЭЛЕМЕНТА SECTION
// ВЛОЖЕН В РЕНДЕР СПИСКА SECTIONS
/*-----------------------------------*/
/*-----------------------------------*/
const SectionItem = ({section}) => {
    return (
        <div className='sectionBtn'>
            <button> <img src={section.img ? section.img : ''} alt=''></img> {section.name} </button>
            <button>edit</button>
        </div>
    )
}

/*-----------------------------------*/
/*-----------------------------------*/
// RENDER СПИСКА SECTIONS
/*-----------------------------------*/
/*-----------------------------------*/
const Sections = ({ sections, onFormDisplay }) => {
    return (
        <div className='sectionsBlock'>
            {sections.map((section) => <SectionItem section={section} />)}
            <div id="sectionAdd" className='sectionBtn' onClick = {(event) => onFormDisplay(event.currentTarget.getAttribute("id"))}> 
                <img src={add_img} alt='+'></img>
                <p>Добавить раздел</p></div>
        </div>
    )
}


export default Sections;