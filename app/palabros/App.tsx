import type {ReactElement} from 'react';
import {useState} from 'react'
import styles from './App.module.css'
import Header, {links as headerLinks} from './components/Header'
import Footer, {links as footerLinks} from './components/Footer'
import Results, {links as resultsLinks} from './components/Results'
import Search, {links as searchLinks} from './components/Search'
import SEOSection, {links as seoSectionLinks} from './components/SEOSection'

export const links = () => [
  ...headerLinks(),
  ...footerLinks(),
  ...resultsLinks(),
  ...searchLinks(),
  ...seoSectionLinks(),
  {rel: "stylesheet", href: styles},
];

function App(): ReactElement {
  const [resultsState, setResultsState] = useState<string[]>([])
  return (
    <div className="App">
      <Header />
      <main className={'appMain'}>
        <div className={'container'}>
          <Search onSearch={results => setResultsState(results)} />
          <Results results={resultsState} />
          <SEOSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
