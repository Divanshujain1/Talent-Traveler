import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    earnings: 0,
    salesPercent: 0,
    revenue: 0,
    todaySales: 0,
    socialStats: {
      youtube: { growth: "1/8 REVX", views: "12.4K" },
      facebook: { growth: "4/5 26.9K", engagement: "8.2%" },
      twitter: { growth: "-6/10 6.9K", impressions: "24.1K" },
    },
    traffic: {
      direct: 0,
      social: 0,
      referral: 0,
      bounce: 0,
      internet: 0,
    },
  });

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/LoginPage");
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) throw new Error("No token found");

        const response = await fetch(
          "http://localhost:5000/api/dashboard-data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Server Error");
        const json = await response.json();

        setData((prev) => ({
          earnings: json.earnings || 0,
          salesPercent: json.salesPercent || 0,
          revenue: json.revenue || 0,
          todaySales: json.todaySales || 0,
          socialStats: {
            youtube: json.socialStats?.youtube || prev.socialStats.youtube,
            facebook: json.socialStats?.facebook || prev.socialStats.facebook,
            twitter: json.socialStats?.twitter || prev.socialStats.twitter,
          },
          traffic: {
            direct: json.traffic?.direct || 0,
            social: json.traffic?.social || 0,
            referral: json.traffic?.referral || 0,
            bounce: json.traffic?.bounce || 0,
            internet: json.traffic?.internet || 0,
          },
        }));
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err.message);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/LoginPage");
  };

  return (
    <>
      <header className="flex justify-between items-center mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-indigo-700">Talent Traveler</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 relative">
            <i className="fas fa-bell" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 pulse" />
          </button>
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold cursor-pointer">
            SG
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-8 shadow-lg card-hover animate-fadeIn">
        <h2 className="text-lg font-medium mb-1">All Earnings</h2>
        <p className="text-3xl font-bold mb-4">${data.earnings}</p>
        <div className="flex justify-between items-center">
          <span className="text-indigo-100">IDX changes on profit</span>
          <span className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
            +3.2%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover animate-fadeIn">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Sales Per Day
          </h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {data.salesPercent}%
              </p>
              <p className="text-green-500 text-sm font-medium">
                +1.2% from yesterday
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <i className="fas fa-chart-line text-green-600 text-xl" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover animate-fadeIn">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Revenue</h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold text-gray-800">
                ${data.revenue}
              </p>
              <p className="text-gray-500 text-sm">
                {data.todaySales} Today Sales
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <i className="fas fa-shopping-bag text-blue-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 card-hover animate-fadeIn">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Social Media Performance
        </h3>
        <div className="space-y-4">
          {["youtube", "facebook", "twitter"].map((platform) => (
            <div
              key={platform}
              className={`flex justify-between items-center p-3 ${
                platform === "youtube"
                  ? "bg-red-50"
                  : platform === "facebook"
                  ? "bg-blue-50"
                  : "bg-sky-50"
              } rounded-lg hover:scale-[1.01] hover:shadow transition duration-300`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    platform === "youtube"
                      ? "bg-red-100"
                      : platform === "facebook"
                      ? "bg-blue-100"
                      : "bg-sky-100"
                  }`}
                >
                  <i
                    className={`fab fa-${platform} ${
                      platform === "youtube"
                        ? "text-red-600"
                        : platform === "facebook"
                        ? "text-blue-600"
                        : "text-sky-500"
                    }`}
                  />
                </div>
                <span className="font-medium capitalize">{platform}</span>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {data.socialStats[platform].growth}
                </p>
                <p className="text-xs text-gray-500">
                  {platform === "youtube"
                    ? `Views: ${data.socialStats[platform].views}`
                    : platform === "facebook"
                    ? `Engagement: ${data.socialStats[platform].engagement}`
                    : `Impressions: ${data.socialStats[platform].impressions}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover animate-fadeIn">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Traffic Sources
        </h3>
        <div className="space-y-3">
          {Object.entries(data.traffic).map(([label, value]) => (
            <div key={label} className="flex items-center justify-between">
              <span className="w-24 font-medium capitalize">{label}</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`progress-bar h-2.5 rounded-full ${
                      label === "direct"
                        ? "bg-indigo-600"
                        : label === "social"
                        ? "bg-blue-500"
                        : label === "referral"
                        ? "bg-green-500"
                        : label === "bounce"
                        ? "bg-yellow-500"
                        : "bg-purple-500"
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
              <span className="w-10 text-right font-medium">{value}%</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
