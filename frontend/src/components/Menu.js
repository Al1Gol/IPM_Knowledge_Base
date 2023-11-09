import React from 'react'

// Элемент меню
function MenuItem () {
    return (
        <div>
            <button> <img src='' alt=''></img> Меню </button>
            <button>edit</button>
        </div>
    )
}
// Список меню
export default function MenuList () {
    return (
        <div>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <hr></hr>
        </div>
    )
}