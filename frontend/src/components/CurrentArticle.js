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
            {current_article.text}
        </div>
    )
}


export default CurrentArticle;