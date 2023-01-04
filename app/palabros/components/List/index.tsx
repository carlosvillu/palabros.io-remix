import type {ReactElement} from 'react'
import styles from './index.module.css'

interface Props {
  children: (item: unknown, index: number) => ReactElement
  items: unknown[]
}

export const links = () => [
  {rel: "stylesheet", href: styles},
];

function List({children, items}: Props): ReactElement {
  return <ol data-component='List' className={'list'}>{items.map((item, index) => {
    return <li className={'list-items'} key={index}>{children(item, index)}</li>
  })}</ol>
}

export default List
