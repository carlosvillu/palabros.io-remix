import type {Filter} from './strings'
import type {AppLoadContext} from "@remix-run/node";


export const definition = async (word: string, context: AppLoadContext): Promise<string[]> => {
  const results = await fetch(context.API_HOST + 'definition?query=' + word)
    .then(async resp => await resp.json())

  return results as string[]
}

export const search = async (filters: Filter, context: AppLoadContext): Promise<string[]> => {
  debugger
  const params = []
  if (filters.pattern) params.push('query=' + filters.pattern)
  if (filters.start) params.push('start=' + filters.start)
  if (filters.ends) params.push('ends=' + filters.ends)
  if (filters.contains) params.push('contains=' + filters.contains)
  if (filters.length) params.push('length=' + filters.length)

  const results = await fetch(context.API_HOST + 'search?' + params.join('&'))
    .then(async resp => await resp.json() as string[][])

  debugger

  return results.flat(Infinity) as string[]
}
