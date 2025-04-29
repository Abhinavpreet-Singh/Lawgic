import React, { useState, useEffect } from 'react';
import { FaGavel, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Handle scroll effect with more granular control
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate opacity based on scroll position
    const scrolled = scrollPosition > 20;
    const gradientOpacity = Math.min(scrollPosition / 300, 0.75);

    // Navigation items
    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact', href: '#contact' }
    ];

    const handleNavClick = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'py-3' : 'py-5'
            }`}
            style={{
                background: scrolled 
                    ? `linear-gradient(to right, rgba(37, 28, 26, ${gradientOpacity}), rgba(58, 45, 42, ${gradientOpacity}))`
                    : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                boxShadow: scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.05)' : 'none'
            }}
        >
            <div className="container mx-auto px-6 md:px-12">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="text-2xl font-bold transition-colors text-[#f3eee5]">
                            <div className="flex items-center gap-2">
                                <div className={`w-10 h-10 rounded-full ${
                                    scrolled ? 'bg-[#f3eee5]' : 'bg-[#251c1a]'
                                } flex items-center justify-center transition-colors duration-300`}>
                                    <FaGavel className={`text-lg ${
                                        scrolled ? 'text-[#251c1a]' : 'text-[#f3eee5]'
                                    } transition-colors duration-300`} />
                                </div>
                                {scrolled ? 'Lawgic' : (
                                <span className="text-[#251c1a]">Lawgic</span>
                                )}
                            </div>
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center space-x-6 text-base font-medium transition-colors duration-300">
                        {navItems.map((item, index) => (
                            <li key={index} className="hover:opacity-70 transition-opacity relative group">
                                <a 
                                    href={item.href} 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item.href);
                                    }}
                                    className={`py-2 ${scrolled ? 'text-[#f3eee5]' : 'text-[#251c1a]'} transition-colors duration-300`}
                                >
                                    {item.name}
                                </a>
                                <div className={`absolute w-full h-0.5 ${
                                    scrolled ? 'bg-[#f3eee5]/70' : 'bg-[#251c1a]/70'
                                } scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`}></div>
                            </li>
                        ))}
                    </ul>

                    {/* Search and Mobile Menu Toggle */}
                    <div className="flex items-center">
                        {/* Search Button */}
                        <button className={`p-2 rounded-full mr-2 ${
                            scrolled ? 'text-[#f3eee5] hover:bg-[#f3eee5]/10' : 'text-[#251c1a] hover:bg-[#251c1a]/10'
                        } transition-all duration-300`}>
                            <FaSearch className="text-lg" />
                        </button>
                        
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`md:hidden p-2 rounded-full ${
                                scrolled ? 'text-[#f3eee5] hover:bg-[#f3eee5]/10' : 'text-[#251c1a] hover:bg-[#251c1a]/10'
                            } transition-all duration-300`}
                        >
                            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`md:hidden transition-all duration-300 overflow-hidden ${
                    mobileMenuOpen ? 'max-h-80' : 'max-h-0'
                }`}
                style={{
                    background: `linear-gradient(to right, rgba(37, 28, 26, 0.85), rgba(58, 45, 42, 0.85))`,
                    backdropFilter: 'blur(8px)'
                }}
            >
                <ul className="flex flex-col text-[#f3eee5] font-medium">
                    {navItems.map((item, index) => (
                        <li key={index} className={index !== navItems.length - 1 ? "border-b border-[#f3eee5]/10" : ""}>
                            <a 
                                href={item.href} 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.href);
                                }}
                                className="block px-6 py-4 hover:bg-[#f3eee5]/10 transition-colors"
                            >
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}

export default Navbar;