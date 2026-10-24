import { useState } from 'react'
import './App.css'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' },
]

function App() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('es')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTranslate = async () => {
    const langPair = `|`
    const url = `https://api.mymemory.translated.net/get?q=&langpair=`

    const response = await fetch(url)
    const data = await response.json()
    setTranslatedText(data.responseData.translatedText)
  }

  return (
    <div className="translator">
      <h1>Language Translator</h1>

      <div className="lang-selectors">
        <div className="lang-group">
          <label htmlFor="source-lang">From</label>
          <select
            id="source-lang"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="lang-group">
          <label htmlFor="target-lang">To</label>
          <select
            id="target-lang"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <textarea
        className="input-area"
        placeholder="Enter text to translate..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={5}
      />

      <button className="translate-btn" onClick={handleTranslate}>
        Translate
      </button>
    </div>
  )
}

export default App
