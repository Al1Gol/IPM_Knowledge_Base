import React from 'react'
import add_img from '../img/icons/add_section.svg'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER СОЖЕРЖИМОГО СТАТЬИ
/*-----------------------------------*/
/*-----------------------------------*/
const CurrentArticle = ({current_article }) => {
    return (
        <div className='showArticleBlock'>
            <h3 className='articleHeader'>{current_article.name}</h3>
            <p className='textArticle'>{current_article.text}</p>
        </div>
    )
}


export default CurrentArticle;