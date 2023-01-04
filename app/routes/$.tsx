import {search} from '~/palabros/js/http'
import {fromPathToFilter} from '~/palabros/js/strings'
import type {DataFunctionArgs} from "@remix-run/node";
import App, {links as appLinks} from '../palabros/App'

export const links = () => [
  ...appLinks()
]

export const loader = async ({context, params, request}: DataFunctionArgs) => {
  const filter = fromPathToFilter(new URL(request.url).pathname)
  const results = await search(filter, context)
  return new Response(JSON.stringify(results), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function Index() {
  return <App />
}
