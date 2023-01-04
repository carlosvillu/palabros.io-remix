// part of the code extracted from. https://github.com/epeli/underscore.string/blob/master/cleanDiacritics.js
const from = 'ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž'
export interface Filter {
  pattern: string
  start: string
  ends: string
  contains: string
  length: string
}

const to = 'aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz'.split('')

function replaceCharIfNeeded (char: string): string {
  const index = from.indexOf(char)
  return index === -1 ? char : to[index]
}

export const ALPHABET = 'abcdefghijklmnñopqrstuvwxyz'.split('')

export function slugify (str: string, allowQueryParams: boolean, removeDots: boolean): string {
  const validCharsRegEx = allowQueryParams
    ? /[^a-z0-9\\. \- ? =]/g // only letters numbers, dashes, dots, equals and question marks
    : /[^a-z0-9\\. -]/g // only letters numbers, dashes and dots
  let tempStr = str
    .toLowerCase()
    .replace(/.{1}/g, replaceCharIfNeeded)
    .replace(validCharsRegEx, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
  if (removeDots) tempStr = tempStr.replaceAll('.', '')
  return tempStr
}

const weigths = {
  ll: 8,
  ch: 5,
  rr: 8,
  a: 1,
  b: 3,
  c: 3,
  d: 2,
  e: 1,
  f: 4,
  g: 2,
  h: 4,
  i: 1,
  j: 8,
  l: 1,
  m: 3,
  n: 1,
  ñ: 8,
  o: 1,
  p: 3,
  q: 5,
  r: 1,
  s: 1,
  t: 1,
  u: 1,
  v: 4,
  x: 8,
  y: 4,
  z: 10
} as const

type Tokens = keyof typeof weigths
type Reducer = (word: string) => (acc: number, token: Tokens) => number

export const reducer: Reducer = word => (acc, token) => {
  const occurencies = [...word.matchAll(token as unknown as RegExp)].length
  acc += occurencies * weigths[token]
  word.replaceAll(token, '')
  return acc
}

// @ts-expect-error
export const weigth = (word: string): unknown => Object.keys(weigths).reduce(reducer(slugify(word)), 0)

// palabras-[que|de]-[se-parecen-a-pattern]-[empiezan-por-start]-[terminan-en-ends]-[contienen-contains]-[de-length-letras-de-largo]
export const fromPathToFilter = (path: string): Filter => {
  return {
    pattern: (path.match(/parecen-a-(?<pattern>[a-zA-Zñ*]+)/)?.groups?.pattern ?? '').replaceAll('*', '?').toLowerCase(),
    start: (path.match(/empiezan-por-(?<start>\w+)/)?.groups?.start ?? '').toLowerCase(),
    ends: (path.match(/terminan-en-(?<ends>\w+)/)?.groups?.ends ?? '').toLowerCase(),
    contains: (path.match(/contienen-(?<contains>\w+)/)?.groups?.contains ?? '').toLowerCase(),
    length: (path.match(/de-(?<length>\d+)-letras/)?.groups?.length ?? '').toLowerCase()
  }
}

export const fromFilterToPath = (filter: Filter): string => {
  const path = Object.entries(filter).reduce((acc, [section, value]) => {
    if (section === 'pattern' && Boolean(value)) acc.push(`se-parecen-a-${value.replaceAll('?', '*').toLowerCase()}`) // eslint-disable-line 
    if (section === 'start' && Boolean(value)) acc.push(`empiezan-por-${value.toLowerCase()}`)
    if (section === 'ends' && Boolean(value)) acc.push(`terminan-en-${value.toLowerCase()}`)
    if (section === 'contains' && Boolean(value)) acc.push(`contienen-${value.toLowerCase()}`)
    if (section === 'length' && Boolean(value)) acc.push(`de-${value}-letras-de-largo`)

    return acc
  }, ['palabras-que'])
  return path.join('-').replace('que-de', 'de')
}

export const fromFilterToTitle = (filter: Filter): string => {
  if (!Object.values(filter).some(filter => filter !== '')) return 'ayuda para resolver crucigrama y juegos de palabras'
  return fromFilterToPath(filter).replaceAll('-', ' ')
}
