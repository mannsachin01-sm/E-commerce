import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/sign_up';
import Login from './pages/login';
import Homepage from './pages/homepage';
import Success from './pages/static/paymenStatus/success';
import Cancel from './pages/static/paymenStatus/cancel';
import About from './pages/static/about';
import Contact from './pages/contact';
import Error from './pages/static/error';
import Header from './components/header';
import Navbar from './components/navbar';
import Footer from './components/footer';
import AnimatedCursor from "react-animated-cursor";
import Privacy from './pages/static/privacy';
import Refund from './pages/static/refund';
import Shipping from './pages/static/shipping';
import Term from './pages/static/term';
import Faq from './pages/static/faq';
import ProductsPage from './pages/products';
import Cart from './pages/CartPage';
import ProtectedRoute from './configs/ProtectedRoute';
import Manage from './pages/manage';
import Prod from './pages/prod';
import AdminLayout from './pages/admin/AdminLayout';
import ProductRecommender from './pages/productrecommendationpage';

function App() {
    return (
        <BrowserRouter>
            
            <Header />
            <Navbar />
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/sign_up" element={<Signup />} />

                {/* Protected routes */}
                <Route path="/" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                <Route path='/products' element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
                <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path='/contact' element={<ProtectedRoute><Contact /></ProtectedRoute>} />
                <Route path='/privacy' element={<ProtectedRoute><Privacy /></ProtectedRoute>} />
                <Route path='/refund' element={<ProtectedRoute><Refund /></ProtectedRoute>} />
                <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
                <Route path='/term' element={<ProtectedRoute><Term /></ProtectedRoute>} />
                <Route path='/faq' element={<ProtectedRoute><Faq /></ProtectedRoute>} />
                <Route path='/manage' element={<ProtectedRoute><Manage /></ProtectedRoute>} />
                <Route path='/prod/:id' element={<ProtectedRoute><Prod /></ProtectedRoute>} />
                <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
                <Route path="/cancel" element={<ProtectedRoute><Cancel /></ProtectedRoute>} />
                <Route path='/products/:category' element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
                <Route path='/productrecommendationpage' element={<ProtectedRoute><ProductRecommender /></ProtectedRoute>} />

                {/* Admin routes */}
                <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />
                <Route path="admin/:path" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />

                {/*Default route for 404 Error */}
                <Route path="*" element={<ProtectedRoute><Error /></ProtectedRoute>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App;
