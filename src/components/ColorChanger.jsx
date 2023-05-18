import React from 'react'
import { ChromePicker } from 'react-color'

const ColorChanger = ({ color, onchange }) => {
    return (
        <>
            <ChromePicker color={color} onChange={onchange} />
        </>
    )
}

export default ColorChanger