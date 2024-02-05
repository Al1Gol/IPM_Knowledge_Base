import React from 'react'
import add_img from '../img/icons/add_section.svg'
import editIcon from '../img/icons/edit_sub.png'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER ЭЛЕМЕНТА SECTION
// ВЛОЖЕН В РЕНДЕР СПИСКА SECTIONS
/*-----------------------------------*/
/*-----------------------------------*/
const SectionItem = ({section, current_section, getCurentEditId, getArticles}) => {
    return (
        <div className='section-item'>
            <div className={ (current_section.id === section.id) ? 'section-btn is-active' : 'section-btn'} onClick={() => getArticles(section.id)}>
                <div>
                    {section.img ? <img src= {section.img} alt=''></img>  : ''}
                </div>
                <p>{section.name}</p>
            </div>
            <img id='sectionEdit' className='edit-section' src={editIcon} onClick = {(event) => getCurentEditId(section.id, event.currentTarget.getAttribute("id"))} alt = ""></img>
        </div>
    )
}

/*-----------------------------------*/
/*-----------------------------------*/
// RENDER СПИСКА SECTIONS
/*-----------------------------------*/
/*-----------------------------------*/
const Sections = ({ sections, current_section, onFormDisplay, getCurentEditId, getArticles }) => {
    return (
        <div className='sections-block'>
            {sections.map((section) => <SectionItem section={section} current_section={current_section} getCurentEditId={getCurentEditId} getArticles={getArticles} />)}
            <div id="sectionAdd" className='section-btn' onClick = {(event) => onFormDisplay(event.currentTarget.getAttribute("id"))}> 
                <div>
                    <img src={add_img} alt=''></img>
                </div>
                <p>Добавить раздел</p></div>
        </div>
    )
}


export default Sections;