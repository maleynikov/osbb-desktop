import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
import App from './App'
import { BrowserRouter, Routes, Route  } from 'react-router';
import './i18n';
import { CssBaseline } from '@mui/material';


const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
