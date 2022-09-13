import React, { useState, createContext } from 'react'
import { IntlProvider } from 'react-intl'
import { Chinese, English } from '../../lang'

export const Context = createContext(null)

export const local = navigator.language

let lang: any
if (local === 'zh-CN') {
  lang = Chinese
} else {
  lang = English
}

const Wrapper = ({ children }: any) => {
  const [locale, setLocale] = useState<any>(local)
  const [message, setMessage] = useState<any>(lang)

  /**
   * Switch language
   *
   * @param e the action
   * */
  const selectLanguage = (e: any) => {
    const selectLang = e.target.value

    setLocale(selectLang)

    if (selectLang === 'zh-CN') {
      setMessage(Chinese)
    } else {
      setMessage(English)
    }
  }

  return (
    // @ts-ignore
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider messages={message} locale={locale}>
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export default Wrapper
