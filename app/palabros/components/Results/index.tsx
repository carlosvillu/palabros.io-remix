import type {ReactElement} from 'react';
import {useState} from 'react'
import {weigth} from '../../js/strings'
import PropTypes from 'prop-types'
import Tag, {links as tagLinks} from '../Tag'
import SortIcon from '../Icons/Sort'

import {useLoaderData} from "@remix-run/react";

import styles from './index.module.css'

type Sort = 'points' | 'az' | 'za'

const ADD_MORE = 9

export const links = () => [
  ...tagLinks(),
  {rel: "stylesheet", href: styles},
];

function Results(): ReactElement {
  const results = useLoaderData<string[]>() ?? [];
  debugger
  const [sortState, setSortState] = useState<Sort>('points')
  const [cutLengthState, setCutLegthState] = useState<number>(ADD_MORE)

  const handleChange = (event: React.SyntheticEvent): void => {
    const target = event.target as typeof event.target & {value: Sort}
    setSortState(target.value)
  }

  const handleSeeMore = (): void => {
    setCutLegthState(cutLengthState + ADD_MORE)
  }

  let tags = results.map(result => ({word: result, points: weigth(result) as number}))
  switch (sortState) {
    case 'points':
      tags = tags.sort((a, b) => {
        if (a.points < b.points) return 1
        if (a.points > b.points) return -1
        return 0
      })
      break
    case 'az':
      tags = tags.sort((a, b) => {
        if (a.word > b.word) return 1
        if (a.word < b.word) return -1
        return 0
      })
      break
    case 'za':
      tags = tags.sort((a, b) => {
        if (b.word > a.word) return 1
        if (b.word < a.word) return -1
        return 0
      })
      break
  }

  // @ts-expect-error
  if (tags.length === 0) return

  return <div data-component='Results' className={'results-container'}>
    <div className={'results-header'}>
      <h2 className={'results-title'}>Coincidencias</h2>
      <div className={'results-sorter'}>
        <span className={'results-icon'}><SortIcon /></span>
        <select className={'results-select'} value={sortState} onChange={handleChange}>
          <option value='points'>Points</option>
          <option value='az'>A-Z</option>
          <option value='za'>Z-A</option>
        </select>
      </div>
    </div>
    <ol className={'results-list'}>
      {tags.slice(0, cutLengthState).map(tag => <Tag key={tag.word} {...tag} />)}
    </ol>
    <div hidden={cutLengthState > tags.length}>
      <button className={'results-more'} onClick={handleSeeMore}>Ver más</button>
    </div>
  </div>
}

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.string)
}

export default Results
