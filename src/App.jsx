import { useState } from 'react'
import './App.css'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
]

function App() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('es')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTranslate = async () => {
    setError('')
    setTranslatedText('')

    if (!inputText.trim()) {
      setError('Please enter some text to translate.')
      return
    }

    setLoading(true)

    try {
      const langPair = `|`
      const url = `https://api.mymemory.translated.net/get?q=&langpair=`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Translation request failed. Please try again.')
      }

      const data = await response.json()

      if (data.responseStatus !== 200) {
        throw new Error(data.responseDetails || 'Translation failed.')
      }

      setTranslatedText(data.responseData.translatedText)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
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

      <button
        className="translate-btn"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      {error && <p className="error-msg">{error}</p>}

      {translatedText && (
        <div className="result">
          <h2>Translation</h2>
          <p className="result-text">{translatedText}</p>
        </div>
      )}
    </div>
  )
}

export default App
