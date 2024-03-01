import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './routes.jsx'
import './styles/activity.css'
import './styles/discord.css'
import './styles/sidebar.css'
import './styles/stats.css'
import './styles/style.css'
import './styles/users.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Routes />

  </React.StrictMode>
)