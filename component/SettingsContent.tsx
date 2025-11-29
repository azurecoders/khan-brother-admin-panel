"use client";

const SettingsContent = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 text-lg">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Card */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="space-y-6">
          {/* Account Settings Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Account Settings
            </h3>
            <div className="space-y-4">
              {/* Admin Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Name
                </label>
                <input
                  type="text"
                  defaultValue="Khan Brothers Admin"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="khanbrothers.engsolution@gmail.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>

              {/* Save Button */}
              <button className="px-6 py-2.5 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Website Settings Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Website Settings
            </h3>
            <div className="space-y-4">
              {/* Site Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Website Title
                </label>
                <input
                  type="text"
                  defaultValue="Khan Brothers Engineering & Solutions"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="text"
                  defaultValue="+92 321 8980284"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>

              {/* Save Button */}
              <button className="px-6 py-2.5 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold rounded-lg transition-colors">
                Update Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
