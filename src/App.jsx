import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Core components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Dashboard from './components/Dashboard'

// Homepage components
import Hero from './components/Homepage/Hero'
import About from './components/Homepage/About'
import FAQ from './components/Homepage/FAQ'
import Services from './components/Homepage/Services'
import Testimonials from './components/Homepage/Testimonials'

// Auth pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthProvider, useAuth } from './context/AuthContext'

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3eee5]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#251c1a]"></div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Homepage component that combines all homepage sections
const Homepage = () => {
  // Add useEffect to handle scrolling when page loads with a query param
  React.useEffect(() => {
    // Check for section query param (for navigation from other pages)
    const queryParams = new URLSearchParams(window.location.search);
    const section = queryParams.get('section');
    
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          // Clean up the URL after scrolling
          window.history.replaceState({}, document.title, '/');
        }, 300);
      }
    }
  }, []);
  
  return (
    <>
      <section id="home" className="section-home">
        <Hero />
      </section>
      <section id="about" className="section-about">
        <About />
      </section>
      <section id="services" className="section-services">
        <Services />
      </section>
      <section id="testimonials" className="section-testimonials">
        <Testimonials />
      </section>
      <section id="faq" className="section-faq">
        <FAQ />
      </section>
      <section id="contact" className="section-contact">
        <Footer />
      </section>
    </>
  );
};

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : (
        <>
          <Navbar />
          <Login />
        </>
      )} />
      
      <Route path="/signup" element={currentUser ? <Navigate to="/dashboard" /> : (
        <>
          <Navbar />
          <Signup />
        </>
      )} />
      
      {/* Public Routes */}
      <Route path="/chatbot" element={
        <>
          <Navbar />
          <Chatbot />
        </>
      } />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Navbar />
          <Dashboard />
        </ProtectedRoute>
      } />
      
      {/* Homepage Route */}
      <Route path="/" element={
        <>
          <Navbar />
          <Homepage />
        </>
      } />
      
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}

export default App