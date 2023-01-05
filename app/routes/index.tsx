import {fromPathToFilter, fromFilterToTitle} from '~/palabros/js/strings'
import type {MetaFunction} from "@remix-run/node";
import App, {links as appLinks} from '../palabros/App'

export const links = () => [
  ...appLinks(),
  {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'}
]

export const meta: MetaFunction = ({location}) => {
  const title = fromFilterToTitle(fromPathToFilter(location.pathname))

  return {
    description: `▶️  ${title} ◀️ `
  }
}

export default function Index() {
  return <App />
}

