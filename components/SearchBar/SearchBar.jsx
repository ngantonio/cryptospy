import React from 'react'
import style from './search.module.css'

export const SearchBar = ({ ...inputProps}) => {
  return (
    <div className={style.search_container}>
      <input className={style.coin_input} { ...inputProps }/>
    </div>
  )
}
