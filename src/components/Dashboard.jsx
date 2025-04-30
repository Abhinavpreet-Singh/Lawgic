import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, FaSearch, FaFolder, FaFileAlt, FaStar, FaClock,
  FaChartBar, FaPlus, FaUserTie, FaBell, FaEllipsisH, FaRegCalendarAlt,
  FaBalanceScale, FaPencilAlt, FaTrash, FaRegCheckCircle
} from 'react-icons/fa';
0

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('recent');
  
  const caseFiles = [
    {
      id: 1,
      title: "Sharma vs. Mehta Property Dispute",
      type: "Property Law",
      modified: "Today",
      star: true,
      status: "In Progress"
    },
    {
      id: 2,
      title: "IndiTech Contract Review",
      type: "Contract Law",
      modified: "Yesterday",
      star: false,
      status: "Completed"
    },
    {
      id: 3,
      title: "Kumar Intellectual Property Case",
      type: "IP Law",
      modified: "Apr 27, 2025",
      star: true,
      status: "In Progress"
    },
    {
      id: 4,
      title: "Singh Family Trust",
      type: "Trust Law",
      modified: "Apr 25, 2025",
      star: false,
      status: "Review"
    },
    {
      id: 5,
      title: "Patel Corporate Compliance Analysis",
      type: "Corporate Law",
      modified: "Apr 21, 2025",
      star: false,
      status: "Completed"
    }
  ];
  
  const recentSearches = [
    "Supreme Court judgments on right to privacy 2025",
    "Specific performance of contracts case law",
    "Digital evidence admissibility in Indian courts",
    "Corporate tax restructuring legal framework",
    "Intellectual property in AI generated content"
  ];
  
  const upcomingEvents = [
    {
      title: "Case Review: Sharma vs. Mehta",
      date: "Today, 14:30",
      type: "Meeting"
    },
    {
      title: "Contract Draft Deadline",
      date: "Tomorrow, 18:00",
      type: "Deadline"
    },
    {
      title: "Legal Tech Conference",
      date: "May 3, 2025",
      type: "Event"
    }
  ];

  const renderStatusBadge = (status) => {
    switch(status) {
      case 'In Progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">In Progress</span>;
      case 'Completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Completed</span>;
      case 'Review':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Review</span>;
      default:
        return null;
    }
  };

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
              <h1 className="text-xl font-bold">Legal Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <FaBell className="text-[#f3eee5]/70 hover:text-[#f3eee5] transition-colors cursor-pointer" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              
              <div className="h-8 w-8 rounded-full bg-[#f3eee5]/20 flex items-center justify-center font-medium">
                RP
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Search cases, documents, legal codes..."
              className="w-full bg-[#f3eee5]/10 border border-[#f3eee5]/20 rounded-full py-2 pl-10 pr-4 text-[#f3eee5] placeholder-[#f3eee5]/50 focus:outline-none focus:ring-2 focus:ring-[#f3eee5]/30"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#f3eee5]/50" />
          </div>
          
          {/* Navigation */}
          <nav className="flex mt-6 border-b border-[#f3eee5]/10">
            <button 
              onClick={() => setActiveTab('recent')}
              className={`px-4 py-2 font-medium text-sm relative ${
                activeTab === 'recent' ? 'text-[#f3eee5]' : 'text-[#f3eee5]/60 hover:text-[#f3eee5]/90'
              }`}
            >
              Recent
              {activeTab === 'recent' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f3eee5]"></div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 font-medium text-sm relative ${
                activeTab === 'documents' ? 'text-[#f3eee5]' : 'text-[#f3eee5]/60 hover:text-[#f3eee5]/90'
              }`}
            >
              Documents
              {activeTab === 'documents' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f3eee5]"></div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 font-medium text-sm relative ${
                activeTab === 'analytics' ? 'text-[#f3eee5]' : 'text-[#f3eee5]/60 hover:text-[#f3eee5]/90'
              }`}
            >
              Analytics
              {activeTab === 'analytics' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f3eee5]"></div>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('clients')}
              className={`px-4 py-2 font-medium text-sm relative ${
                activeTab === 'clients' ? 'text-[#f3eee5]' : 'text-[#f3eee5]/60 hover:text-[#f3eee5]/90'
              }`}
            >
              Clients
              {activeTab === 'clients' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f3eee5]"></div>
              )}
            </button>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto p-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Files */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-[#251c1a]">Your Case Files</h2>
                <button className="bg-[#251c1a] text-white rounded-lg py-2 px-3 text-sm flex items-center hover:bg-[#251c1a]/90 transition-colors">
                  <FaPlus className="mr-1" size={12} />
                  New Case
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {caseFiles.map(file => (
                  <div key={file.id} className="p-4 hover:bg-[#f3eee5]/20 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-[#251c1a]/10 w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                          <FaFileAlt className="text-[#251c1a]" />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#251c1a]">{file.title}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-[#251c1a]/60 mr-3">{file.type}</span>
                            <span className="text-xs text-[#251c1a]/60 mr-3">Modified: {file.modified}</span>
                            {renderStatusBadge(file.status)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button className={`mr-2 ${file.star ? 'text-yellow-500' : 'text-[#251c1a]/30 hover:text-yellow-500'}`}>
                          <FaStar />
                        </button>
                        <button className="text-[#251c1a]/50 hover:text-[#251c1a] transition-colors">
                          <FaEllipsisH />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-gray-50 text-center">
                <button className="text-[#251c1a]/70 text-sm font-medium hover:text-[#251c1a] transition-colors">
                  View All Cases
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-[#251c1a]">Recent Activity</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <FaPencilAlt className="text-blue-700 text-sm" />
                    </div>
                    <div>
                      <p className="text-[#251c1a] font-medium">You edited "Sharma vs. Mehta Property Dispute"</p>
                      <p className="text-sm text-[#251c1a]/60">Today, 10:24 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <FaRegCheckCircle className="text-green-700 text-sm" />
                    </div>
                    <div>
                      <p className="text-[#251c1a] font-medium">You marked "IndiTech Contract Review" as completed</p>
                      <p className="text-sm text-[#251c1a]/60">Yesterday, 3:45 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 rounded-full p-2 mr-3">
                      <FaBalanceScale className="text-purple-700 text-sm" />
                    </div>
                    <div>
                      <p className="text-[#251c1a] font-medium">New precedent added to "Kumar IP Case"</p>
                      <p className="text-sm text-[#251c1a]/60">Apr 28, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 rounded-full p-2 mr-3">
                      <FaTrash className="text-red-700 text-sm" />
                    </div>
                    <div>
                      <p className="text-[#251c1a] font-medium">Deleted draft document from "Singh Family Trust"</p>
                      <p className="text-sm text-[#251c1a]/60">Apr 26, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 text-center">
                <button className="text-[#251c1a]/70 text-sm font-medium hover:text-[#251c1a] transition-colors">
                  View Activity Log
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h2 className="text-lg font-semibold text-[#251c1a] mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-[#251c1a]/5 hover:bg-[#251c1a]/10 text-[#251c1a] py-3 px-4 rounded-lg flex flex-col items-center transition-colors">
                  <FaFileAlt className="mb-2" />
                  <span className="text-sm">New Document</span>
                </button>
                <button className="bg-[#251c1a]/5 hover:bg-[#251c1a]/10 text-[#251c1a] py-3 px-4 rounded-lg flex flex-col items-center transition-colors">
                  <FaFolder className="mb-2" />
                  <span className="text-sm">New Case</span>
                </button>
                <button className="bg-[#251c1a]/5 hover:bg-[#251c1a]/10 text-[#251c1a] py-3 px-4 rounded-lg flex flex-col items-center transition-colors">
                  <FaUserTie className="mb-2" />
                  <span className="text-sm">Add Client</span>
                </button>
                <Link to="/chatbot" className="bg-[#251c1a]/5 hover:bg-[#251c1a]/10 text-[#251c1a] py-3 px-4 rounded-lg flex flex-col items-center transition-colors">
                  <FaRobot className="mb-2" />
                  <span className="text-sm">Chat with AI</span>
                </Link>
              </div>
            </div>

            {/* Recent Searches */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h2 className="text-lg font-semibold text-[#251c1a] mb-4">Recent Searches</h2>
              <ul className="space-y-3">
                {recentSearches.map((search, index) => (
                  <li key={index}>
                    <button className="flex items-center text-left w-full py-2 px-3 rounded-lg hover:bg-[#251c1a]/5 transition-colors">
                      <FaClock className="text-[#251c1a]/50 mr-2 flex-shrink-0" />
                      <span className="text-sm text-[#251c1a]/80 line-clamp-1">{search}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upcoming */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h2 className="text-lg font-semibold text-[#251c1a] mb-4">Upcoming</h2>
              <ul className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <li key={index} className="border-l-2 border-[#251c1a] pl-3">
                    <p className="font-medium text-[#251c1a]">{event.title}</p>
                    <div className="flex items-center mt-1">
                      <FaRegCalendarAlt className="text-xs text-[#251c1a]/60 mr-1" />
                      <span className="text-xs text-[#251c1a]/60">{event.date}</span>
                      <span className="text-xs bg-[#251c1a]/10 text-[#251c1a]/70 px-2 py-0.5 rounded ml-2">{event.type}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-4 bg-[#251c1a]/5 hover:bg-[#251c1a]/10 text-[#251c1a] py-2 rounded-lg text-sm transition-colors">
                View Calendar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;