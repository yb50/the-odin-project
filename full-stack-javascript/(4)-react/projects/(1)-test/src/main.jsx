import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Greeting from './Greeting.jsx'
import JsxTest from './JsxTest.jsx'
import List from './List.jsx'
import Buttons from './Buttons.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Greeting />
    <JsxTest />
    <List />
    <Buttons />
  </StrictMode>,
)
