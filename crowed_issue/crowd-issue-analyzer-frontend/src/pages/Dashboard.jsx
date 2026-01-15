import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { MapPin, Calendar, CheckCircle, Clock, AlertTriangle, Filter, Eye, Trash2 } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");

  // Mock data - in a real app, this would come from an API
  const mockIssues = [
    {
      id: 1,
      type: "Road Damage",
      description: "Large pothole on Main Street causing traffic hazards",
      location: "Main Street & 5th Avenue",
      status: "resolved",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
      icon: "🛣️"
    },
    {
      id: 2,
      type: "Garbage Issue",
      description: "Overflowing dumpster near the park",
      location: "Central Park Entrance",
      status: "in-progress",
      date: "2024-01-20",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
      icon: "🗑️"
    },
    {
      id: 3,
      type: "Street Light",
      description: "Street light not working for 3 days",
      location: "Elm Street, Block 12",
      status: "pending",
      date: "2024-01-22",
      image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab1b?w=400",
      icon: "💡"
    },
    {
      id: 4,
      type: "Water Leakage",
      description: "Water main break flooding the sidewalk",
      location: "Oak Avenue & Pine Street",
      status: "resolved",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
      icon: "💧"
    },
    {
      id: 5,
      type: "Road Damage",
      description: "Cracked pavement with exposed utilities",
      location: "Broadway & 10th Street",
      status: "in-progress",
      date: "2024-01-25",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
      icon: "🛣️"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "resolved":
        return <CheckCircle size={16} />;
      case "in-progress":
        return <Clock size={16} />;
      case "pending":
        return <AlertTriangle size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  const filteredIssues = filter === "all" ? mockIssues : mockIssues.filter(issue => issue.status === filter);

  const stats = {
    total: mockIssues.length,
    resolved: mockIssues.filter(i => i.status === "resolved").length,
    inProgress: mockIssues.filter(i => i.status === "in-progress").length,
    pending: mockIssues.filter(i => i.status === "pending").length
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Eye size={32} className="text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                My Reported Issues
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Track the status of all issues you've reported and see the impact of your contributions.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
              <div className="text-sm text-gray-600 font-medium">Total Issues</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-3xl font-bold text-green-600 mb-1">{stats.resolved}</div>
              <div className="text-sm text-gray-600 font-medium">Resolved</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-3xl font-bold text-yellow-600 mb-1">{stats.inProgress}</div>
              <div className="text-sm text-gray-600 font-medium">In Progress</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
              <div className="text-3xl font-bold text-red-600 mb-1">{stats.pending}</div>
              <div className="text-sm text-gray-600 font-medium">Pending</div>
            </div>
          </div>
        </div>

        {/* Filter and Issues */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Your Issues</h2>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Issues</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Issues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <div key={issue.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={issue.image}
                    alt={issue.type}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="text-3xl">{issue.icon}</div>
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(issue.status)} flex items-center space-x-1`}>
                    {getStatusIcon(issue.status)}
                    <span className="capitalize">{issue.status.replace("-", " ")}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{issue.type}</h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{issue.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      <span>{issue.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      <span>{new Date(issue.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredIssues.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No issues found</h3>
              <p className="text-gray-600">Try adjusting your filter or report a new issue.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
