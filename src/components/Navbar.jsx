import React, { useState, useEffect } from 'react';
import { FaGavel, FaSearch, FaBars, FaTimes, FaUser, FaRobot, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [navbarWidth, setNavbarWidth] = useState(100);
    const [navbarTransform, setNavbarTransform] = useState(0);
    const location = useLocation();
    const { currentUser, userProfile, logout } = useAuth();

    // Handle scroll effect with more granular control
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
            
            // Calculate dynamic navbar width based on scroll
            const maxScroll = 300;
            const minWidth = 85; // Slightly wider for better visibility
            const scrollPercentage = Math.min(window.scrollY / maxScroll, 1);
            const newWidth = 100 - ((100 - minWidth) * scrollPercentage);
            setNavbarWidth(newWidth);
            
            // Calculate transform for the pill shape effect
            const maxTransform = 15; // Maximum transform value
            const newTransform = maxTransform * scrollPercentage;
            setNavbarTransform(newTransform);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // Calculate opacity and other properties based on scroll position
    const scrolled = scrollPosition > 20;
    const gradientOpacity = Math.min(scrollPosition / 300, 0.85); // Increased opacity slightly
    
    // Calculate pill border radius based on scroll position
    const borderRadiusValue = scrolled ? '32px' : '0px';

    // Navigation items
    const navItems = [
        { name: 'Home', href: '/',},
        { name: 'About', href: '/about', section: 'about' },
        { name: 'Services', href: '/services', section: 'services' },
        { name: 'FAQ', href: '/faq', section: 'faq' },
        { name: 'Contact', href: '/contact', section: 'contact' }
    ];

    // Special nav items for quick access
    const specialNavItems = [
        { name: 'Chat with AI', href: '/chatbot', icon: <FaRobot className="mr-2" /> },
        ...(currentUser ? [
            { name: 'Dashboard', href: '/dashboard', icon: <FaTachometerAlt className="mr-2" /> }
        ] : [])
    ];

    // Determine if we're on a page that should show the full navbar
    const isHomePage = location.pathname === '/';
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    // Handle navigation link clicks with smooth scrolling
    const handleNavClick = (href, section) => {
        if (location.pathname === '/' && section) {
            // On homepage, scroll to the section
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (section) {
            // If not on homepage but clicking a section link, navigate to homepage then scroll
            // We'll use the section as a query param which we'll handle on the homepage
            window.location.href = `/?section=${section}`;
        } else {
            // Regular navigation
            // Let React Router handle regular navigation
        }
        setMobileMenuOpen(false);
    };

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${!isHomePage ? 'bg-[#251c1a] shadow-lg' : ''}`}
        >
            <div 
                className={`transition-all duration-500 ${
                    scrolled || !isHomePage ? 'py-2' : 'py-5'
                }`}
                style={{
                    width: isHomePage ? `${navbarWidth}%` : '100%',
                    borderRadius: isHomePage ? borderRadiusValue : '0',
                    background: (scrolled || !isHomePage)
                        ? `linear-gradient(to right, rgba(37, 28, 26, ${gradientOpacity}), rgba(58, 45, 42, ${gradientOpacity}))`
                        : 'transparent',
                    backdropFilter: (scrolled || !isHomePage) ? 'blur(20px)' : 'none',
                    boxShadow: (scrolled || !isHomePage)
                        ? '0 8px 32px rgba(0, 0, 0, 0.15)' 
                        : 'none',
                    transform: isHomePage && scrolled ? `translateY(${navbarTransform}px)` : 'translateY(0)',
                    border: (scrolled || !isHomePage) ? '1px solid rgba(243, 238, 229, 0.1)' : 'none',
                }}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <nav className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link 
                                to="/" 
                                className={`text-2xl font-bold transition-all duration-300 flex items-center ${
                                    scrolled || !isHomePage ? 'text-[#f3eee5]' : 'text-[#251c1a]'
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    // If already on homepage, just scroll to top smoothly
                                    if (location.pathname === '/') {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                        });
                                    } else {
                                        // Otherwise navigate to homepage
                                        window.location.href = '/';
                                    }
                                    setMobileMenuOpen(false);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-10 h-10 rounded-full transform transition-all duration-500 ${
                                        scrolled || !isHomePage ? 'bg-[#f3eee5] rotate-12 scale-105' : 'bg-[#251c1a]'
                                    } flex items-center justify-center`}>
                                        <FaGavel className={`text-lg transition-all duration-500 ${
                                            scrolled || !isHomePage ? 'text-[#251c1a] scale-110' : 'text-[#f3eee5]'
                                        }`} />
                                    </div>
                                    {scrolled || !isHomePage ? (
                                        <span className="bg-gradient-to-r from-[#f3eee5] to-[#e2dac9] text-transparent bg-clip-text">
                                            Lawgic
                                        </span>
                                    ) : (
                                        <span className="text-[#251c1a]">Lawgic</span>
                                    )}
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center space-x-1 lg:space-x-3 text-sm lg:text-base font-medium transition-colors duration-300">
                            {/* Regular nav items */}
                            {navItems.map((item, index) => (
                                <li key={`nav-${index}`} className="relative group">
                                    <Link 
                                        to={item.href} 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (item.name === 'Home') {
                                                // If Home is clicked, go to top of homepage
                                                if (location.pathname === '/') {
                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                } else {
                                                    window.location.href = '/';
                                                }
                                            } else {
                                                handleNavClick(item.href, item.section);
                                            }
                                        }}
                                        className={`py-2 px-2 lg:px-3 rounded-md transition-all duration-300 flex items-center ${
                                            scrolled || !isHomePage 
                                                ? 'text-[#f3eee5] hover:text-white hover:bg-[#f3eee5]/10' 
                                                : 'text-[#251c1a] hover:text-[#251c1a]/80 hover:bg-[#251c1a]/10'
                                        }`}
                                    >
                                        {item.icon && item.icon}
                                        <span>{item.name}</span>
                                    </Link>
                                    <div className={`absolute bottom-0 left-1/2 w-1/2 h-0.5 -translate-x-1/2 ${
                                        scrolled || !isHomePage ? 'bg-[#f3eee5]' : 'bg-[#251c1a]'
                                    } scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300`}></div>
                                </li>
                            ))}
                            
                            {/* Divider */}
                            <div className={`h-6 w-px ${scrolled || !isHomePage ? 'bg-[#f3eee5]/20' : 'bg-[#251c1a]/20'}`}></div>
                            
                            {/* Special nav items */}
                            {specialNavItems.map((item, index) => (
                                <li key={`special-${index}`} className="relative">
                                    <Link 
                                        to={item.href} 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`py-2 px-3 rounded-md transition-all duration-300 flex items-center ${
                                            scrolled || !isHomePage 
                                                ? 'text-[#f3eee5] hover:text-white hover:bg-[#f3eee5]/10' 
                                                : 'text-[#251c1a] hover:text-[#251c1a]/80 hover:bg-[#251c1a]/10'
                                        } ${location.pathname === item.href ? 'bg-[#f3eee5]/10' : ''}`}
                                    >
                                        {item.icon && item.icon}
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Auth Navigation */}
                        <div className="hidden md:flex items-center">
                            {currentUser ? (
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={handleLogout}
                                        className={`py-1.5 px-3 rounded-md flex items-center transition-all duration-300 ${
                                            scrolled || !isHomePage 
                                                ? 'text-[#f3eee5] hover:bg-[#f3eee5]/10' 
                                                : 'text-[#251c1a] hover:bg-[#251c1a]/10'
                                        }`}
                                    >
                                        <FaSignOutAlt className="mr-2" />
                                        <span>Logout</span>
                                    </button>

                                    <Link
                                        to="/dashboard"
                                        className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                                            scrolled || !isHomePage 
                                                ? 'text-[#f3eee5] hover:bg-[#f3eee5]/20' 
                                                : 'text-[#251c1a] hover:bg-[#251c1a]/10'
                                        }`}
                                    >
                                        <div className="h-8 w-8 rounded-full bg-[#f3eee5]/20 flex items-center justify-center font-medium">
                                            {userProfile?.photoURL ? (
                                                <img 
                                                    src={userProfile.photoURL} 
                                                    alt="Profile" 
                                                    className="h-8 w-8 rounded-full object-cover" 
                                                />
                                            ) : (
                                                <span>{userProfile?.displayName?.charAt(0) || <FaUser />}</span>
                                            )}
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link 
                                        to="/login" 
                                        className={`py-1.5 px-3 rounded-md transition-all duration-300 ${
                                            scrolled || !isHomePage 
                                                ? 'text-[#f3eee5] hover:bg-[#f3eee5]/10' 
                                                : 'text-[#251c1a] hover:bg-[#251c1a]/10'
                                        }`}
                                    >
                                        Sign In
                                    </Link>
                                    <Link 
                                        to="/signup"
                                        className={`py-1.5 px-3 rounded-md transition-all duration-300 ${
                                            scrolled || !isHomePage
                                                ? 'bg-[#f3eee5] text-[#251c1a]'
                                                : 'bg-[#251c1a] text-[#f3eee5]'
                                        } hover:opacity-90`}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden flex items-center">
                            <button 
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={`p-2 rounded-full transition-all duration-300 ${
                                    scrolled || !isHomePage 
                                        ? 'text-[#f3eee5] hover:bg-[#f3eee5]/20' 
                                        : 'text-[#251c1a] hover:bg-[#251c1a]/10'
                                }`}
                                aria-label="Toggle mobile menu"
                            >
                                {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`md:hidden fixed left-0 right-0 transition-all duration-500 overflow-hidden ${
                    mobileMenuOpen ? 'max-h-screen' : 'max-h-0'
                }`}
                style={{
                    top: !isHomePage || isAuthPage ? '56px' : scrolled ? `${60 + navbarTransform}px` : '80px',
                    width: isHomePage && !isAuthPage ? `${navbarWidth}%` : '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: '0 0 25px 25px',
                    background: `linear-gradient(to right, rgba(37, 28, 26, 0.97), rgba(58, 45, 42, 0.97))`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: mobileMenuOpen ? '0 8px 16px rgba(0, 0, 0, 0.15)' : 'none',
                    border: mobileMenuOpen ? '1px solid rgba(243, 238, 229, 0.1)' : 'none',
                    borderTop: 'none',
                    zIndex: 40
                }}
            >
                <div className="max-h-[70vh] overflow-y-auto">
                    <ul className="flex flex-col text-[#f3eee5] font-medium divide-y divide-[#f3eee5]/10">
                        {/* Auth options for mobile */}
                        {!currentUser ? (
                            <>
                                <li>
                                    <Link 
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-center px-6 py-3 font-medium hover:bg-[#f3eee5]/10 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/signup"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-center px-6 py-3 font-medium bg-[#f3eee5]/10 hover:bg-[#f3eee5]/20 transition-colors"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <div className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-[#f3eee5]/20 flex items-center justify-center mr-3 flex-shrink-0">
                                            {userProfile?.photoURL ? (
                                                <img 
                                                    src={userProfile.photoURL} 
                                                    alt="Profile" 
                                                    className="h-10 w-10 rounded-full object-cover" 
                                                />
                                            ) : (
                                                <span className="text-lg">{userProfile?.displayName?.charAt(0) || <FaUser />}</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{userProfile?.displayName || "User"}</p>
                                            <p className="text-xs text-[#f3eee5]/60">{userProfile?.email}</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="p-2 rounded-md hover:bg-[#f3eee5]/10 transition-colors"
                                    >
                                        <FaSignOutAlt />
                                    </button>
                                </div>
                            </li>
                        )}

                        <li className="bg-[#f3eee5]/5 px-6 py-2 text-xs text-[#f3eee5]/50 uppercase tracking-wider">
                            Navigation
                        </li>

                        {/* Normal nav items for mobile */}
                        {navItems.map((item, index) => (
                            <li key={`mobile-${index}`}>
                                <Link 
                                    to={item.href} 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (item.name === 'Home') {
                                            // If Home is clicked, go to top of homepage
                                            if (location.pathname === '/') {
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: 'smooth'
                                                });
                                                setMobileMenuOpen(false);
                                            } else {
                                                window.location.href = '/';
                                            }
                                        } else {
                                            handleNavClick(item.href, item.section);
                                        }
                                    }}
                                    className="flex items-center px-6 py-4 hover:bg-[#f3eee5]/10 transition-colors"
                                >
                                    {item.icon ? item.icon : <span className="w-6"></span>}
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        
                        {/* Divider */}
                        <li className="bg-[#f3eee5]/5 px-6 py-2 text-xs text-[#f3eee5]/50 uppercase tracking-wider">
                            Quick Access
                        </li>
                        
                        {/* Special nav items for mobile */}
                        {specialNavItems.map((item, index) => (
                            <li key={`mobile-special-${index}`}>
                                <Link 
                                    to={item.href}
                                    onClick={() => setMobileMenuOpen(false)} 
                                    className={`flex items-center px-6 py-4 hover:bg-[#f3eee5]/10 transition-colors ${
                                        location.pathname === item.href ? 'bg-[#f3eee5]/10' : ''
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                    {location.pathname === item.href && (
                                        <span className="ml-2 bg-[#f3eee5] text-[#251c1a] text-xs px-2 py-0.5 rounded-full">
                                            Active
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Navbar;