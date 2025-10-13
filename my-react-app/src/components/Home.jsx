/**
 * COMPONENTE HOME - Página principal de HILET LIB
 * 
 * Este componente contiene la estructura principal de la página de inicio:
 * - Header con navegación
 * - Carousel promocional
 * - Grid de productos
 * - Sección de best sellers
 * - Footer
 * - Modales de carrito y login
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Carousel from './Carousel'
import ProductGrid from './ProductGrid'
import BestSellers from './BestSellers'
import ShoppingCart from './ShoppingCart'
import LoginModal from './LoginModal'
import Footer from './Footer'

function Home() {
  // ===== ESTADOS PRINCIPALES DE LA APLICACIÓN =====
  
  // Estado del carrito de compras
  const [cartItems, setCartItems] = useState([]) // Array de productos en el carrito
  
  // Estados de modales
  const [isCartOpen, setIsCartOpen] = useState(false) // Controla apertura del carrito
  const [isLoginOpen, setIsLoginOpen] = useState(false) // Controla apertura del login
  
  // Estados de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Usuario logueado o no
  const [userEmail, setUserEmail] = useState('') // Email del usuario autenticado

  // ===== FUNCIONES DE GESTIÓN DEL CARRITO =====
  
  /**
   * Agrega un libro al carrito de compras
   * Si el libro ya existe, incrementa la cantidad
   * Si no existe, lo agrega con cantidad 1
   * @param {Object} book - Objeto del libro a agregar
   */
  const addToCart = (book) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id)
      
      if (existingItem) {
        // Si el libro ya está en el carrito, incrementar cantidad
        return prevItems.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Si es un libro nuevo, agregarlo con cantidad 1
        return [...prevItems, { ...book, quantity: 1 }]
      }
    })
  }

  /**
   * Remueve un libro del carrito completamente
   * @param {number} bookId - ID del libro a remover
   */
  const removeFromCart = (bookId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId))
  }

  /**
   * Actualiza la cantidad de un libro en el carrito
   * @param {number} bookId - ID del libro
   * @param {number} quantity - Nueva cantidad
   */
  const updateCartQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId)
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === bookId ? { ...item, quantity } : item
        )
      )
    }
  }

  /**
   * Limpia completamente el carrito
   */
  const clearCart = () => {
    setCartItems([])
  }

  // ===== FUNCIONES DE AUTENTICACIÓN =====
  
  /**
   * Maneja el login del usuario
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   */
  const handleLogin = (email, password) => {
    // Simulación de login (en una app real, aquí harías la petición al backend)
    if (email && password) {
      setIsLoggedIn(true)
      setUserEmail(email)
      setIsLoginOpen(false)
      console.log('Usuario logueado:', email)
    }
  }

  /**
   * Maneja el logout del usuario
   */
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
    console.log('Usuario deslogueado')
  }

  // ===== FUNCIONES DE CONTROL DE MODALES =====
  
  /**
   * Abre el modal del carrito
   */
  const openCart = () => {
    setIsCartOpen(true)
  }

  /**
   * Cierra el modal del carrito
   */
  const closeCart = () => {
    setIsCartOpen(false)
  }

  /**
   * Abre el modal de login
   */
  const openLogin = () => {
    setIsLoginOpen(true)
  }

  /**
   * Cierra el modal de login
   */
  const closeLogin = () => {
    setIsLoginOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER - Navegación principal */}
      <Header
        cartItems={cartItems}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLoginClick={openLogin}
        onCartClick={openCart}
      />

      {/* CAROUSEL - Ofertas promocionales */}
      <Carousel />

      {/* NAVEGACIÓN RÁPIDA */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Explora Nuestra Librería</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/categorias" 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">Categorías</h3>
                <p className="text-indigo-100">Explora nuestros géneros literarios</p>
              </div>
            </Link>
            
            <Link 
              to="/libros" 
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="text-xl font-semibold mb-2">Catálogo</h3>
                <p className="text-green-100">Descubre todos nuestros libros</p>
              </div>
            </Link>
            
            <Link 
              to="/bestsellers" 
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-semibold mb-2">Best Sellers</h3>
                <p className="text-yellow-100">Los libros más populares</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID - Grid de productos con filtros */}
      <ProductGrid onAddToCart={addToCart} />

      {/* BEST SELLERS - Libros más vendidos */}
      <BestSellers onAddToCart={addToCart} />

      {/* FOOTER - Información de contacto y enlaces */}
      <Footer />

      {/* MODAL DEL CARRITO */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      {/* MODAL DE LOGIN */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
    </div>
  )
}

export default Home
