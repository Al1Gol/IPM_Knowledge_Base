import React from 'react'
import close from '../img/icons/close_article.svg'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER СОЖЕРЖИМОГО СТАТЬИ
/*-----------------------------------*/
/*-----------------------------------*/
const CurrentArticle = ({current_article, closeArticle }) => {
    return (
        <div className='showArticleBlock'>
            <img className='closeArticle' src={close} alt='' onClick={() => closeArticle()}></img>
            <h3 className='articleHeader'>{current_article.name}</h3>
            <p className='textArticle'>{current_article.text}</p>
        </div>
    )
}


export default CurrentArticle;