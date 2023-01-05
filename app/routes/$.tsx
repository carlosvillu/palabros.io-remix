import {search} from '~/palabros/js/http'
import {fromPathToFilter, fromFilterToTitle} from '~/palabros/js/strings'
import type {DataFunctionArgs} from "@remix-run/node";
import App, {links as appLinks} from '../palabros/App'
import type {MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export const links = () => [
  ...appLinks(),
  {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'}
]

export const meta: MetaFunction = ({data, location}) => {
  const title = fromFilterToTitle(fromPathToFilter(location.pathname))

  return {
    description: data.results?.length === 0 ? `▶️  ${title} ◀️ `
      : `🔍 con (${data.results.length}) resultados para ${title}. 🔥 ¡Seguro que vas a poder acabar ese crucigramas!`
  }

}

export const loader = async ({context, params, request}: DataFunctionArgs) => {
  const filter = fromPathToFilter(new URL(request.url).pathname)
  const results = await search(filter, context)

  return new Response(JSON.stringify({results, API_HOST: context.API_HOST}), {
    status: results.length !== 0 ? 200 : 404,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function Index() {
  const {results} = useLoaderData<{results: string[], API_HOST: string}>() ?? {results: []};
  return <App />
}
