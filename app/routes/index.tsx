import App, {links as appLinks} from '../palabros/App'

export const links = () => [
  ...appLinks(),
  {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'}
]

export default function Index() {
  return <App />
}

