import React from 'react'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER ЭЛЕМЕНТА SECTION
// ВЛОЖЕН В РЕНДЕР СПИСКА SECTIONS
/*-----------------------------------*/
/*-----------------------------------*/
const SectionItem = ({section}) => {
    return (
        <div>
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
        <div>
            {sections.map((section) => <SectionItem section={section} />)}
            <button onClick = {() => sections}> <img src='' alt='+'></img>Добавить раздел </button>
        </div>
    )
}


export default Sections;