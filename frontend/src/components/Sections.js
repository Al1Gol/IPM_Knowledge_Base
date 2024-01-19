import React from 'react'


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
const Sections = ({ sections }) => {
    return (
        <div className='sectionsBlock'>
            {sections.map((section) => <SectionItem section={section} />)}
            <div className='sectionBtn' onClick = {() => sections}> <img src='' alt='+'></img>Добавить раздел </div>
        </div>
    )
}


export default Sections;