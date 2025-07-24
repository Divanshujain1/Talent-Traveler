import React from "react";

export default function FreelancerDashboard() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Freelancer Dashboard</title>
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
          :root {
              --header-height: 4rem;
              --sidebar-width: 240px;
          }
          @keyframes slideDown {
              from { transform: translateY(-100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-down { animation: slideDown 0.5s ease-out; }
          .animate-fade-in { animation: fadeIn 0.5s ease-out; }
          .animate-slide-up { animation: slideUp 0.5s ease-out forwards; }
        `,
        }}
      />
      <div className="overlay fixed inset-0 bg-black/50 z-40 hidden opacity-0 transition-opacity duration-300" />
      <header className="fixed w-full bg-gray-900 text-white z-50 shadow-lg animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
          <button className="mobile-menu-button p-2 lg:hidden">
            <span className="material-icons-outlined text-2xl">menu</span>
          </button>
          <div className="text-xl font-bold text-white">
            Talent<span className="text-indigo-400">Traveler</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-400 transition-transform duration-300 hover:scale-110 hidden md:block">
              search
            </span>
            <span className="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-400 transition-transform duration-300 hover:scale-110 hidden md:block">
              notifications
            </span>
            <img
              className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
              src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg"
              alt="Profile"
            />
          </div>
        </div>
      </header>

      <div className="pt-16 max-w-7xl mx-auto flex text-white">
        <aside className="sidebar fixed lg:static w-[240px] bg-gray-800 h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4">
          <div className="bg-gray-900 rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <a
              href="#"
              className="flex items-center text-gray-300 hover:text-indigo-400 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <span className="material-icons-outlined mr-2">dashboard</span>
              Dashboard
              <span className="material-icons-outlined ml-auto">
                keyboard_arrow_right
              </span>
            </a>
            <a
              href="#"
              className="flex items-center text-gray-300 hover:text-indigo-400 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <span className="material-icons-outlined mr-2">work</span>
              My Projects
              <span className="material-icons-outlined ml-auto">
                keyboard_arrow_right
              </span>
            </a>
            <a
              href="#"
              className="flex items-center text-gray-300 hover:text-indigo-400 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <span className="material-icons-outlined mr-2">payments</span>
              Earnings
              <span className="material-icons-outlined ml-auto">
                keyboard_arrow_right
              </span>
            </a>
          </div>
          <div className="bg-gray-900 rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <a
              href="#"
              className="flex items-center text-gray-300 hover:text-indigo-400 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <span className="material-icons-outlined mr-2">face</span>
              Profile
              <span className="material-icons-outlined ml-auto">
                keyboard_arrow_right
              </span>
            </a>
            <a
              href="#"
              className="flex items-center text-gray-300 hover:text-indigo-400 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <span className="material-icons-outlined mr-2">settings</span>
              Settings
              <span className="material-icons-outlined ml-auto">
                keyboard_arrow_right
              </span>
            </a>
            <a
              href="#"
              className="flex items-center text-gray-300 hover:text-indigo-400 py-4 transition-all duration-300 hover:translate-x-1"
            >
              <span className="material-icons-outlined mr-2">
                power_settings_new
              </span>
              Log out
              <span className="material-icons-outlined ml-auto">
                keyboard_arrow_right
              </span>
            </a>
          </div>
        </aside>

        <main className="flex-1 p-4 bg-gray-950 min-h-screen">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl p-6 animate-fade-in">
              <h2 className="text-4xl md:text-5xl text-indigo-400">
                Total Earnings
                <br />
                <strong>₹1,45,000</strong>
              </h2>
              <span className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-700">
                This Month
              </span>
            </div>
            <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl p-6 animate-fade-in">
              <h2 className="text-4xl md:text-5xl text-indigo-400">
                Completed <br />
                <strong>12 Projects</strong>
              </h2>
              <a
                href="#"
                className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-700 hover:bg-blue-800 transition-transform duration-300 hover:scale-105"
              >
                View Portfolio
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              className="bg-gray-800 rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h3 className="text-xl font-bold text-indigo-400">
                Ongoing Projects: 3
              </h3>
            </div>
            <div
              className="bg-gray-800 rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-xl font-bold text-indigo-400">
                Pending Payments: ₹12,000
              </h3>
            </div>
            <div
              className="bg-gray-800 rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="text-xl font-bold text-indigo-400">
                Ratings: ★ 4.9/5
              </h3>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
