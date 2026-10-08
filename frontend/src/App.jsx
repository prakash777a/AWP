import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Destinations from './pages/Destinations';
import PackageDetails from './pages/PackageDetails';
import DestinationDetails from './pages/DestinationDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import MyBookings from './pages/MyBookings';
import BookingDetails from './pages/BookingDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import BookingConfirmation from './pages/BookingConfirmation';
import AccessDenied from './pages/AccessDenied';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

// Admin imports
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPackages from './pages/admin/AdminPackages';
import AdminDestinations from './pages/admin/AdminDestinations';
import AdminBookings from './pages/admin/AdminBookings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReviews from './pages/admin/AdminReviews';

import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { loading } = useAuth();
  const location = useLocation();
  
  if (loading) return null;

  // Decide if we should render public Navbar/Footer
  // We ONLY hide them if the route starts with /admin
  const isInAdminPanel = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {/* Hide the public/customer Navbar and Footer ONLY if inside admin panel */}
      {!isInAdminPanel && <Navbar />}
      
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          {/* Customer Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/my-bookings/:id" element={<BookingDetails />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<RoleRoute requiredRole="ADMIN" />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="packages" element={<AdminPackages />} />
              <Route path="destinations" element={<AdminDestinations />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="reviews" element={<AdminReviews />} />
            </Route>
          </Route>
        </Routes>
      </main>
      
      {!isInAdminPanel && <Footer />}
    </div>
  );
}

export default App;
