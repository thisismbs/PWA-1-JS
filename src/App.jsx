import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])

  // Fungsi menambah barang ke keranjang
  const addToCart = (gun) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === gun.name)
      if (existing) {
        return prev.map((item) =>
          item.name === gun.name ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...gun, quantity: 1 }]
    })
  }

  // Fungsi mengatur kuantitas dengan batas minimal 1
  const updateQuantity = (name, amount) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.name === name) {
          return { ...item, quantity: Math.max(1, item.quantity + amount) }
        }
        return item
      })
    )
  }

  // Fungsi menghapus barang dari keranjang
  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name))
  }

  // Akumulasi total kuantitas barang untuk badge di header
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} cartCount={totalItems} />
      
      <main className="main">
        {tab === 'Catalog' && <Catalog onAddToCart={addToCart} />}
        {tab === 'Cart' && <Cart cart={cart} onUpdate={updateQuantity} onRemove={removeFromCart} />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>
      
      <Footer />
    </div>
  )
}

export default App