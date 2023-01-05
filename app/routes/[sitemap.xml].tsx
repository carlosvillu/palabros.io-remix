import {ALPHABET, fromPathToFilter} from '~/palabros/js/strings'

export const loader = async () => {

  const byLength = Array.from({length: 24}).map((_, index) => {
    return `
      <url>
        <loc>https://palabros.io/palabras-de-${index + 1}-letras-de-largo-para-resolver-crucigramas</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
    `
  })

  const withLetters = ALPHABET.map((fitstLetter: string) => {
    return ['', ...ALPHABET].map((secondLetter: string) => {
      return `
        <url>
          <loc>https://palabros.io/palabras-que-empiezan-por-${fitstLetter + secondLetter}-para-resolver-crucigramas</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>1.0</priority>
        </url>
      `
    })
  }).flat(Infinity)

  const withLettersAndLength = ALPHABET.map((fitstLetter: string) => {
    return ['', ...ALPHABET].map((secondLetter: string) => {
      return Array.from({length: 24}).map((_, index) => {
        return `
          <url>
            <loc>https://palabros.io/palabras-que-empiezan-por-${fitstLetter + secondLetter}-de-${index + 1}-letras-de-largo-para-resolver-crucigramas</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <priority>1.0</priority>
          </url>
      `
      })
    })
  }).flat(Infinity)

  const content = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${byLength.join(`\n`)}
      ${withLetters.join('\n')}
      ${withLettersAndLength.join('\n')}
    </urlset>
    `
  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      "encoding": "UTF-8"
    }
  });
}
