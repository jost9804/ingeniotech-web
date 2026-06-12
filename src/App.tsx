import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/ui/WhatsAppButton'
import Home from './pages/Home'
import Services from './pages/Services'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Contact from './pages/Contact'
import { CartProvider } from './contexts/CartContext'
import CartDrawer from './components/cart/CartDrawer'
import { Login } from './pages/admin/Login'
import { AdminLayout } from './pages/admin/AdminLayout'
import { ProtectedRoute } from './components/admin/ProtectedRoute'
import { Dashboard } from './pages/admin/Dashboard'
import { Jobs } from './pages/admin/Jobs'
import { JobNew } from './pages/admin/JobNew'
import { JobDetail } from './pages/admin/JobDetail'
import { AdminProducts } from './pages/admin/AdminProducts'
import { ProductForm } from './pages/admin/ProductForm'

export default function App() {
  return (
    <>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="trabajos" element={<Jobs />} />
          <Route path="trabajos/nuevo" element={<JobNew />} />
          <Route path="trabajos/:id" element={<JobDetail />} />
          <Route path="productos" element={<AdminProducts />} />
          <Route path="productos/nuevo" element={<ProductForm />} />
          <Route path="productos/:id" element={<ProductForm />} />
        </Route>

        {/* Public routes */}
        <Route
          path="*"
          element={
            <CartProvider>
              {/* Logo watermark — fixed, centered, behind everything */}
              <img
                src="/logo.jpg"
                alt=""
                aria-hidden="true"
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '600px',
                  opacity: 0.07,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  zIndex: 0,
                  filter: 'invert(1) hue-rotate(180deg)',
                  mixBlendMode: 'screen',
                }}
              />

              <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/servicios" element={<Services />} />
                    <Route path="/productos" element={<Products />} />
                    <Route path="/productos/:id" element={<ProductDetail />} />
                    <Route path="/contacto" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
                <CartDrawer />
              </div>
            </CartProvider>
          }
        />
      </Routes>
    </>
  )
}
