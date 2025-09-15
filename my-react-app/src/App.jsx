/**
 * APLICACIÓN PRINCIPAL - HILET LIB
 * 
 * Esta es la aplicación principal de la librería online Hilet Lib.
 * Maneja el estado global de la aplicación incluyendo:
 * - Carrito de compras
 * - Autenticación de usuarios
 * - Modales (carrito y login)
 * 
 * ESTRUCTURA DE COMPONENTES:
 * - Header: Navegación principal con dropdown de categorías
 * - Carousel: Carrusel promocional de ofertas
 * - ProductGrid: Grid de productos con filtros por categoría
 * - BestSellers: Sección de libros más vendidos
 * - Footer: Información de contacto y enlaces
 * - ShoppingCart: Modal del carrito de compras
 * - LoginModal: Modal de autenticación
 */

import { useState } from 'react'
import Header from './components/Header'
import Carousel from './components/Carousel'
import ProductGrid from './components/ProductGrid'
import BestSellers from './components/BestSellers'
import ShoppingCart from './components/ShoppingCart'
import LoginModal from './components/LoginModal'
import Footer from './components/Footer'
import './index.css'

function App() {
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
        // Si ya existe, incrementar cantidad
        return prevItems.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevItems, { ...book, quantity: 1 }]
      }
    })
  }

  /**
   * Actualiza la cantidad de un producto en el carrito
   * Si la cantidad es 0 o menor, elimina el producto
   * @param {number} bookId - ID del libro a actualizar
   * @param {number} newQuantity - Nueva cantidad
   */
  const updateCartQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId)
      return
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === bookId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  /**
   * Elimina un producto del carrito
   * @param {number} bookId - ID del libro a eliminar
   */
  const removeFromCart = (bookId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId))
  }

  // ===== FUNCIONES DE AUTENTICACIÓN =====
  
  /**
   * Maneja el login del usuario
   * @param {string} email - Email del usuario que se loguea
   */
  const handleLogin = (email) => {
    setUserEmail(email)
    setIsLoggedIn(true)
  }

  /**
   * Maneja el logout del usuario
   * Limpia todos los datos de sesión
   */
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail('')
  }

  // ===== RENDER PRINCIPAL DE LA APLICACIÓN =====
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER PRINCIPAL
          Incluye navegación, dropdown de categorías, carrito y login */}
      <Header
        cartItems={cartItems}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLoginClick={() => setIsLoginOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      {/* CONTENIDO PRINCIPAL DE LA PÁGINA */}
      <main>
        {/* Carrusel promocional con ofertas destacadas */}
        <Carousel />
        
        {/* Grid de productos con filtros por categoría */}
        <ProductGrid onAddToCart={addToCart} />
        
        {/* Sección de libros más vendidos */}
        <BestSellers onAddToCart={addToCart} />
      </main>
      
      {/* FOOTER CON INFORMACIÓN DE CONTACTO Y ENLACES */}
      <Footer />
      
      {/* MODAL DEL CARRITO DE COMPRAS
          Se abre/cierra con el estado isCartOpen */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />
      
      {/* MODAL DE LOGIN/REGISTRO
          Se abre/cierra con el estado isLoginOpen */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}

export default App
