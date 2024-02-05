import React from 'react'
import add_img from '../img/icons/add_section.svg'
import editIcon from '../img/icons/edit_sub.png'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER ЭЛЕМЕНТА ARTICLES
// ВЛОЖЕН В РЕНДЕР СПИСКА ARTICLES
/*-----------------------------------*/
/*-----------------------------------*/
const ArticleItem = ({article, current_article, getCurentEditId, showArticle}) => {
    return (
        <div className='article-item'>
            <div className={ (current_article.id === article.id) ? 'article-btn is-active' : 'article-btn'}  onClick={() => showArticle(article.id, true)}>
                <p>{article.name}</p>
            </div>
            <img id='articleEdit' className='edit-article' src={editIcon} onClick = {(event) => getCurentEditId(article.id, event.currentTarget.getAttribute("id"))}></img>
        </div>
    )
}

/*-----------------------------------*/
/*-----------------------------------*/
// RENDER СПИСКА ARTICLES
/*-----------------------------------*/
/*-----------------------------------*/
const Articles = ({ articles, current_article, onFormDisplay, getCurentEditId, showArticle }) => {
    return (
        <div className='articles-block'>
            {articles.map((article) => <ArticleItem article={article} current_article={current_article} getCurentEditId={getCurentEditId} showArticle={showArticle} />)}
            <div id="articleAdd" className='article-btn' onClick = {(event) => onFormDisplay(event.currentTarget.getAttribute("id"))}> 
                <div>
                    <img src={add_img} alt=''></img>
                </div>
                <p>Добавить статью</p></div>
        </div>
    )
}


export default Articles;