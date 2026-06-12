import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserContextProvider.jsx'
import { CartProvider } from './context/CartContextProvider.jsx'

createRoot( document.getElementById( 'root' ) ).render(
    <StrictMode>
        <UserProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </UserProvider>
    </StrictMode>,
)
