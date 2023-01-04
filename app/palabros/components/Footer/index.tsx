import type {ReactElement} from 'react'
import styles from './index.module.css'

const now = new Date()

export const links = () => [
  {rel: "stylesheet", href: styles},
];

function Footer(): ReactElement {
  return <footer data-component='Footer' className={'footer'}>
    <span className={'footer-logo'}>PALABROS.IO</span>
    <ol className={'footer-links'} hidden>
      <li className={'footer-link'}><a>Resolver crucigrama el País</a></li>
      <li className={'footer-link'}><a>Resolver crucigrama del domingo</a></li>
      <li className={'footer-link'}><a>Resolver crucigrama la vanguardia</a></li>
    </ol>
    <a className={'footer-mail'} href="mailto: hola@palabros.io">¿Quieres contactar? Escribenos a hola@palabros.io</a>
    <span>{`Hecho con ❤️  en Málaga en ${now.getUTCFullYear()}`}</span>
  </footer >
}

export default Footer
