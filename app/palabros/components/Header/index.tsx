import type {ReactElement} from 'react'
import styles from './index.module.css'
import Hamburger from '../Icons/Hamburguer'

export const links = () => [
  {rel: "stylesheet", href: styles},
];

function Header(): ReactElement {
  return <header data-component='Header' className={'header'}>
    <div className="Header-Left"><h1 className={'header-logo'}>PALABROS.IO</h1></div>
    {false && <div className="Header-Rigth"><span className={'header-MenuContainer'}><Hamburger /></span></div>}
  </header >
}

export default Header
