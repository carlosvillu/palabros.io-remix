/* eslint @typescript-eslint/strict-boolean-expressions:0 */
/* eslint @typescript-eslint/restrict-plus-operands:0 */

import PropTypes from 'prop-types'
import type {ReactElement} from 'react';
import {useReducer} from 'react'
import type {Filter} from '../../js/strings';
import {fromPathToFilter, fromFilterToPath, fromFilterToTitle} from '../../js/strings'
import {links as loadingLinks} from '../Loading'
import {useLocation} from 'react-router-dom';

import styles from './index.module.css'


export const links = () => [
  ...loadingLinks(),
  {rel: "stylesheet", href: styles},
];

function Search(): ReactElement {
  const location = useLocation()
  const [fields, dispatch] = useReducer((state: Filter, update: object) => ({...state, ...update}), fromPathToFilter(location.pathname))

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()

    const target = event.target as typeof event.target & {
      pattern: {value: string}
      start: {value: string}
      ends: {value: string}
      contains: {value: string}
      length: {value: string}
    }

    const filter = {
      pattern: target.pattern?.value,
      start: target.start?.value,
      ends: target.ends?.value,
      contains: target.contains?.value,
      length: target.length?.value
    }

    const nextPathName = fromFilterToPath(filter)
    window.location.pathname = nextPathName
  }

  return <div data-component='Search' className={'search'}>
    <h1 className={'search-title'}>{fromFilterToTitle(fromPathToFilter(location.pathname))}</h1>
    <h3>Puedes usar <strong>?</strong> como comodín para bsscar tu palabra</h3>
    <form className={'search-searchForm'} onSubmit={handleSubmit as unknown as () => void}>
      <input className={'search-input'} value={fields.pattern} onChange={evt => dispatch({pattern: evt.target.value})} tabIndex={0} autoFocus type="search" enterKeyHint="search" placeholder='cruc?gr?ma' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="pattern" />
      <div className={'search-filtersContainer'}>
        <div className={'search-filters'}>
          <input className={'search-filterItem'} value={fields.start} onChange={evt => dispatch({start: evt.target.value})} tabIndex={1} type='text' enterKeyHint="search" placeholder='Comienza' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="start" />
          <input className={'search-filterItem'} value={fields.ends} onChange={evt => dispatch({ends: evt.target.value})} tabIndex={2} type='text' enterKeyHint="search" placeholder='Acaba' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="ends" />
          <input className={'search-filterItem'} value={fields.contains} onChange={evt => dispatch({contains: evt.target.value})} tabIndex={3} type='text' enterKeyHint="search" placeholder='Contiene' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="contains" />
          <input className={'search-filterItem'} value={fields.length} onChange={evt => dispatch({length: evt.target.value})} tabIndex={4} type='number' enterKeyHint="search" placeholder='Longitud' autoComplete="off" autoCapitalize="off" autoCorrect="off" name="length" />
        </div>
        <button className={'search-cta'} type='submit'>Buscar</button>
        <button className={'search-reset'} onClick={(evt) => {
          evt.preventDefault()
          window.location.href = '/'
        }}>Limpiar</button>
      </div>
    </form>
  </div>
}

Search.propTypes = {
  onSearch: PropTypes.func
}

export default Search
