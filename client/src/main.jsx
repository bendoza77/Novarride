import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./App.css"
import { CarProvider } from './context/CarContext.jsx'
import { ServiceProvider } from './context/ServiceContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <CarProvider>
            <ServiceProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </ServiceProvider>
        </CarProvider>
    </BrowserRouter>
)
