/* eslint @typescript-eslint/restrict-plus-operands: 0 */

import type {ReactElement} from 'react'
import {ALPHABET, fromPathToFilter} from '../../js/strings'
import List, {links as listStyles} from '../List'
import Panel, {links as panelStyles} from '../Panel'
import styles from './index.module.css'
import {useLocation} from 'react-router-dom';

const MAX_LENGTH = 3

export const links = () => [
  ...listStyles(),
  ...panelStyles(),
  {rel: "stylesheet", href: styles},
];

function SEOSection(): ReactElement {
  const location = useLocation()
  const filters = fromPathToFilter(location.pathname)

  return <div data-component='SEOSection'>
    <Panel title='Palabras por longitud'>
      <List items={Array.from({length: 24})}>{(_, index) => {
        return <a href={`/palabras-de-${index + 1}-letras-de-largo`} className={'seoSection-link'}>
          Palabras de <span className={'seoSection-letter'}>{index + 1}</span> letras para resolver crucigramas
        </a>
      }}</List>

    </Panel>
    <Panel title="Lista de palabras" hidden={filters.start.length === MAX_LENGTH}>
      <List items={ALPHABET}>{(letter) => {
        const slug = filters.start + letter
        return <a href={`/palabras-que-empiezan-por-${slug}`} className={'seoSection-link'}>
          Palabras que empiezan por <span className={'seoSection-letter'}>{slug}</span> para crucigramas
        </a>
      }}</List>
    </Panel>
  </div>
}

export default SEOSection
