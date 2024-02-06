import React from 'react'


/*-----------------------------------*/
/*-----------------------------------*/
// RENDER ЭЛЕМЕНТА FILES
/*-----------------------------------*/
/*-----------------------------------*/
const FileItem = ({file}) => {
    return (
        <div>
            <p>{file.name}</p>
        </div>
    )
}

/*-----------------------------------*/
/*-----------------------------------*/
// RENDER СПИСКА FILES
/*-----------------------------------*/
/*-----------------------------------*/
const FilesList = ({ files }) => {
    return (
        <div>
            {files.map((file) => <FileItem file={file} />)}
        </div>
    )
}


export default FilesList;
