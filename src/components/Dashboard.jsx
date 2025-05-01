import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, FaBell, FaExternalLinkAlt, 
  FaRegFileAlt, FaGavel, FaNewspaper,
  FaBalanceScale, FaChevronDown
} from 'react-icons/fa';

const Dashboard = () => {
  const [showMoreNews, setShowMoreNews] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#f3eee5]">
      {/* Header */}
      <header className="bg-[#251c1a] text-white shadow-lg">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="mr-4 hover:opacity-80 transition-opacity">
                <FaArrowLeft />
              </Link>
              <h1 className="text-xl font-bold">Lawgic Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FaBell className="text-[#f3eee5]/70 hover:text-[#f3eee5] transition-colors cursor-pointer" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-[#c8a27c] rounded-full"></div>
              </div>
              
              <div className="h-8 w-8 rounded-full bg-[#c8a27c] flex items-center justify-center font-medium">
                RP
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column with AI Models */}
          <div className="lg:col-span-3">
            <div>
              <h2 className="text-2xl font-bold text-[#251c1a] mb-4 border-b-2 border-[#c8a27c] pb-2">AI Legal Assistants</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Legal Research Chatbot */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="h-36 bg-gradient-to-r from-[#251c1a] to-[#3b2a25] flex items-center justify-center p-6">
                    <div className="bg-[#f3eee5]/30 p-4 rounded-full">
                      <FaBalanceScale className="text-[#f3eee5] text-3xl" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#251c1a] mb-3">Legal Research Chatbot</h3>
                    <p className="text-[#251c1a]/80 mb-4">
                      Intelligent assistant for legal research and case law analysis.
                    </p>
                    <div className="flex mb-5">
                      <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded mr-2">Research</span>
                      <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded">Case Law</span>
                    </div>
                    <button className="w-full bg-[#251c1a] text-[#f3eee5] py-2 px-4 rounded-lg hover:bg-[#3b2a25] transition-colors text-sm">
                      Launch Assistant
                    </button>
                  </div>
                </div>

                {/* Legal Case Document Reader */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="h-36 bg-gradient-to-r from-[#3b2a25] to-[#4e3730] flex items-center justify-center p-6">
                    <div className="bg-[#f3eee5]/30 p-4 rounded-full">
                      <FaRegFileAlt className="text-[#f3eee5] text-3xl" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#251c1a] mb-3">Case Document Reader</h3>
                    <p className="text-[#251c1a]/80 mb-4">
                      Extract insights and analyze legal documents automatically.
                    </p>
                    <div className="flex mb-5">
                      <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded mr-2">Documents</span>
                      <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded">Analysis</span>
                    </div>
                    <a 
                      href="https://lawgic-case-doc-reader.onrender.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block w-full bg-[#251c1a] text-[#f3eee5] py-2 px-4 rounded-lg hover:bg-[#3b2a25] transition-colors text-sm text-center"
                    >
                      Launch Assistant
                    </a>
                  </div>
                </div>

                {/* Legal IPC Finder */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="h-36 bg-gradient-to-r from-[#4e3730] to-[#614639] flex items-center justify-center p-6">
                    <div className="bg-[#f3eee5]/30 p-4 rounded-full">
                      <FaGavel className="text-[#f3eee5] text-3xl" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#251c1a] mb-3">IPC Code Finder</h3>
                    <p className="text-[#251c1a]/80 mb-4">
                      Quickly identify relevant Indian Penal Code sections.
                    </p>
                    <div className="flex mb-5">
                      <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded mr-2">IPC</span>
                      <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded">Indian Law</span>
                    </div>
                    <button className="w-full bg-[#251c1a] text-[#f3eee5] py-2 px-4 rounded-lg hover:bg-[#3b2a25] transition-colors text-sm">
                      Launch Assistant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column with Legal News */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-[#251c1a] mb-4 border-b-2 border-[#c8a27c] pb-2">
              <FaNewspaper className="inline-block mr-2 text-[#c8a27c]" />
              Legal News
            </h2>
            
            <div className="space-y-4">
              <a href="https://www.livelaw.in/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-36 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')"}}>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/20 text-[#251c1a] rounded">Supreme Court</span>
                    <FaExternalLinkAlt className="text-xs text-[#251c1a]/50" />
                  </div>
                  <h3 className="font-medium text-[#251c1a] mb-1">Supreme Court Upholds New Privacy Law</h3>
                  <p className="text-sm text-[#251c1a]/70 mb-2">LiveLaw.in</p>
                </div>
              </a>
              
              <a href="https://www.barandbench.com/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/20 text-[#251c1a] rounded">Legislation</span>
                    <FaExternalLinkAlt className="text-xs text-[#251c1a]/50" />
                  </div>
                  <h3 className="font-medium text-[#251c1a] mb-1">New Amendments to Corporate Law Take Effect</h3>
                  <p className="text-sm text-[#251c1a]/70 mb-2">Bar & Bench</p>
                </div>
              </a>
              
              <a href="https://indianexpress.com/section/india/indian-legal/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/20 text-[#251c1a] rounded">High Court</span>
                    <FaExternalLinkAlt className="text-xs text-[#251c1a]/50" />
                  </div>
                  <h3 className="font-medium text-[#251c1a] mb-1">Delhi High Court Rules on Digital Evidence Standards</h3>
                  <p className="text-sm text-[#251c1a]/70 mb-2">Indian Express</p>
                </div>
              </a>
              
              <a href="https://www.lawsisto.com/" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/20 text-[#251c1a] rounded">Legal Tech</span>
                    <FaExternalLinkAlt className="text-xs text-[#251c1a]/50" />
                  </div>
                  <h3 className="font-medium text-[#251c1a] mb-1">AI Adoption in Legal Sector Grows 40%</h3>
                  <p className="text-sm text-[#251c1a]/70 mb-2">LawSisto</p>
                </div>
              </a>
              
              {/* More Legal News Toggle Button */}
              <button 
                onClick={() => setShowMoreNews(!showMoreNews)} 
                className="flex items-center justify-center w-full bg-[#f3eee5] hover:bg-[#e8e2d9] text-[#251c1a] border border-[#c8a27c]/30 rounded-lg py-2 text-sm transition-colors"
              >
                {showMoreNews ? 'Show Less' : 'More Legal News'} 
                <FaChevronDown className={`ml-1 transition-transform ${showMoreNews ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Additional News Articles that show when expanded */}
              {showMoreNews && (
                <div className="space-y-4 mt-4 transition-all duration-300">
                  <a href="https://timesofindia.indiatimes.com/india/supreme-court" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/20 text-[#251c1a] rounded">Supreme Court</span>
                        <FaExternalLinkAlt className="text-xs text-[#251c1a]/50" />
                      </div>
                      <h3 className="font-medium text-[#251c1a] mb-1">SC Orders States to Implement Police Reforms</h3>
                      <p className="text-sm text-[#251c1a]/70 mb-2">Times of India</p>
                    </div>
                  </a>
                  
                  <a href="https://www.hindustantimes.com/india-news/legal" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/20 text-[#251c1a] rounded">Criminal Law</span>
                        <FaExternalLinkAlt className="text-xs text-[#251c1a]/50" />
                      </div>
                      <h3 className="font-medium text-[#251c1a] mb-1">Parliament Approves New Criminal Procedure Bill</h3>
                      <p className="text-sm text-[#251c1a]/70 mb-2">Hindustan Times</p>
                    </div>
                  </a>
                  
                  <a href="https://www.thehindu.com/news/national/courts" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/20 text-[#251c1a] rounded">Constitutional</span>
                        <FaExternalLinkAlt className="text-xs text-[#251c1a]/50" />
                      </div>
                      <h3 className="font-medium text-[#251c1a] mb-1">Constitutional Bench to Review Electoral Bond Case</h3>
                      <p className="text-sm text-[#251c1a]/70 mb-2">The Hindu</p>
                    </div>
                  </a>
                  
                  <a href="https://economictimes.indiatimes.com/news/india/law-courts" target="_blank" rel="noopener noreferrer" className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/20 text-[#251c1a] rounded">Tax Laws</span>
                        <FaExternalLinkAlt className="text-xs text-[#251c1a]/50" />
                      </div>
                      <h3 className="font-medium text-[#251c1a] mb-1">High Court Strikes Down Retrospective Tax Amendment</h3>
                      <p className="text-sm text-[#251c1a]/70 mb-2">Economic Times</p>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;