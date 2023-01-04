/* eslint @typescript-eslint/no-misused-promises:0 */
import type {ReactElement} from 'react';
import {useState} from 'react'
import {definition} from '../../js/http'
import List, {links as listLinks} from '../List'
import Loading, {links as loadingLinks} from '../Loading'

import styles from './index.module.css'

interface Props {
  word: string
  points: number
}

export const links = () => [
  ...listLinks(),
  ...loadingLinks(),
  {rel: "stylesheet", href: styles},
];

function Tag({word, points}: Props): ReactElement {
  const [defintionsState, setDefinitionsState] = useState<string[] | undefined>()
  const [loadingState, setLoadingState] = useState<boolean>(false)
  const [showDefState, setShowDefState] = useState(true)

  const handeClick = async (): Promise<void> => {
    if (defintionsState === undefined) {
      setLoadingState(true)
      setDefinitionsState(await definition(word))
      setLoadingState(false)
    }

    setShowDefState(show => !show)
  }

  return <div className={'tag-container'} onClick={handeClick}>
    <Loading show={loadingState} />
    <span data-component='Tag' >
      <span>{word}</span>
      <sub className={'tag-sub'}>{points}</sub>
    </span>
    <div hidden={showDefState}>
      {(defintionsState != null) && <List items={defintionsState}>{(def) => <span className={'tag-def'}>{def as string}</span>}</List>}
    </div>
  </div>
}

export default Tag
