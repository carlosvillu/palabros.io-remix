import type {ReactElement} from 'react';
import {useEffect} from 'react'
import styles from './index.module.css'

interface Props {
  show: boolean
}

export const links = () => [
  {rel: "stylesheet", href: styles},
];

function Loading({show}: Props): ReactElement {
  useEffect(() => {
    if (show) {document.body.style.overflowY = 'hidden'} else {
      document.body.style.overflowY = 'unset'
    }
  }, [show])

  // @ts-expect-error
  if (!show) return false

  return <div className={'loader'} >
    <div className={'lds-ring'}><div></div><div></div><div></div><div></div></div>
  </div>
}

export default Loading
