import type {ReactElement} from 'react'
import styles from './index.module.css'

interface Props {
  title?: string
  children: ReactElement
  hidden?: boolean
}

export const links = () => [
  {rel: "stylesheet", href: styles},
];

function Panel({title, children, hidden = false}: Props): ReactElement {
  // @ts-expect-error
  if (hidden) return

  return <div data-component='Panel' className={'panel-container'}>
    <div className={'panel-header'}>
      <h2 className={'panel-title'}>{title}</h2>
    </div>
    <div>
      {children}
    </div>
  </div>
}

export default Panel
