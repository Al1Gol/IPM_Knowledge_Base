import React from 'react'

const SectionItem = ({section}) => {
    return (
        <div>
            <button> <img src={section.img ? section.img : ''} alt=''></img> {section.name} </button>
            <button>edit</button>
        </div>
    )
}

// временная заглушка на onClick
const Sections = ({ sections }) => {
    return (
        <div>
            {sections.map((section) => <SectionItem section={section} />)}
            <button onClick = {() => sections}> <img src='' alt='+'></img>Добавить раздел </button>
            <hr></hr>
        </div>
    )
}

export default Sections;