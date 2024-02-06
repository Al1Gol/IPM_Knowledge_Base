import React from 'react'
import close from '../img/icons/close_article.svg'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER ЭЛЕМЕНТА FILES
/*-----------------------------------*/
/*-----------------------------------*/
const FileItem = ({file}) => {
    return (
        <div>
            <a href={file.file} download={file.name}>{file.name}</a>
        </div>
    )
}


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER СОЖЕРЖИМОГО СТАТЬИ
/*-----------------------------------*/
/*-----------------------------------*/
const CurrentArticle = ({current_article, files, closeArticle }) => {
    return (
        <div className='show-article-block'>
            <img className='close-article' src={close} alt='' onClick={() => closeArticle()}></img>
            <h3 className='articleHeader'>{current_article.name}</h3>
            <p className='text-article'>{current_article.text}</p>
            {files.map((file) => <FileItem file={file} />)}
        </div>
    )
}


export default CurrentArticle;