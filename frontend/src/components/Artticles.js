import React from 'react'
import add_img from '../img/icons/add_section.svg'
import editIcon from '../img/icons/edit_sub.png'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER ЭЛЕМЕНТА ARTICLES
// ВЛОЖЕН В РЕНДЕР СПИСКА ARTICLES
/*-----------------------------------*/
/*-----------------------------------*/
const ArticleItem = ({article, current_article, getCurentEditId}) => {
    return (
        <div className='sectionItem'>
            <div className={ (current_article.id == article.id) ? 'articleBtn isActive' : 'articleBtn'}>
                <div>
                    {article.img ? <img src= {article.img} alt=''></img>  : ''}
                </div>
                <p>{article.name}</p>
                <img id='articleEdit' className='iconArticle' src={editIcon} onClick = {(event) => getCurentEditId(article.id, event.currentTarget.getAttribute("id"))}></img>
            </div>
        </div>
    )
}

/*-----------------------------------*/
/*-----------------------------------*/
// RENDER СПИСКА ARTICLES
/*-----------------------------------*/
/*-----------------------------------*/
const Articles = ({ articles, current_article, onFormDisplay, getCurentEditId }) => {
    return (
        <div className='articlesBlock'>
            {articles.map((article) => <ArticleItem article={article} current_article={current_article} getCurentEditId={getCurentEditId} />)}
            <div id="articleAdd" className='articleBtn' onClick = {(event) => onFormDisplay(event.currentTarget.getAttribute("id"))}> 
                <div>
                    <img src={add_img} alt=''></img>
                </div>
                <p>Добавить статью</p></div>
        </div>
    )
}


export default Articles;