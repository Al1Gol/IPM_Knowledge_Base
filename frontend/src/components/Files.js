import React from 'react'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER ЭЛЕМЕНТА FILES
/*-----------------------------------*/
/*-----------------------------------*/
const FileItem = ({file}) => {
    return (
        <div className='file-item'>
            <p>{file.name}</p>
        </div>
    )
}

/*-----------------------------------*/
/*-----------------------------------*/
// RENDER СПИСКА FILES
/*-----------------------------------*/
/*-----------------------------------*/
const FilesList = ({ files, new_files }) => {
    return (
        <div className='files-block'>
            {files.map((file) => <FileItem file={file} />)}
            {new_files.map((file) => <FileItem file={file} />)}
        </div>
    )
}


export default FilesList;
