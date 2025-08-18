import React from 'react'
import { Button } from '@mantine/core'
const HeaderPack = ({header , buttonText , onClick, styles} : {header : string , buttonText : string , onClick : () => void , styles ?: string}) => {
  return (
    <div className='flex justify-between'>
      <div className='title'>{header}</div>
      <div><Button onClick={onClick} className={styles}>{buttonText}</Button></div>
    </div>
  )
}

export default HeaderPack
