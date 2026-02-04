"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MdPerson, MdLogout, MdSettings, MdInfo, MdEdit, MdSave, MdCancel, MdSecurity, MdNotifications, MdHelp, MdBusiness } from "react-icons/md";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [mounted, setMounted] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@company.com",
    phone: "+91 9876543210",
    role: "System Administrator",
    department: "IT Operations",
    joinDate: "2023-01-15",
    lastLogin: "2024-02-04 18:45:00"
  });

  const [editData, setEditData] = useState(profileData);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      router.push("/login");
    }
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const renderProfileTab = () => (
    <div className="profile-content">
      <div className="profile-info-card">
        <div className="profile-avatar-large">
          <MdPerson />
        </div>
        
        <div className="profile-details">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                className="profile-input"
                placeholder="Full Name"
              />
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
                className="profile-input"
                placeholder="Email"
              />
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => setEditData({...editData, phone: e.target.value})}
                className="profile-input"
                placeholder="Phone"
              />
              <input
                type="text"
                value={editData.department}
                onChange={(e) => setEditData({...editData, department: e.target.value})}
                className="profile-input"
                placeholder="Department"
              />
              
              <div className="profile-actions">
                <button className="btn btn-success btn-sm" onClick={handleSave}>
                  <MdSave /> Save
                </button>
                <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
                  <MdCancel /> Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>{profileData.name}</h2>
              <p className="profile-role">{profileData.role}</p>
              
              <div className="profile-info-grid">
                <div className="info-item">
                  <label>Email:</label>
                  <span>{profileData.email}</span>
                </div>
                <div className="info-item">
                  <label>Phone:</label>
                  <span>{profileData.phone}</span>
                </div>
                <div className="info-item">
                  <label>Department:</label>
                  <span>{profileData.department}</span>
                </div>
                <div className="info-item">
                  <label>Join Date:</label>
                  <span>{new Date(profileData.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="info-item">
                  <label>Last Login:</label>
                  <span>{mounted ? new Date(profileData.lastLogin).toLocaleString() : profileData.lastLogin}</span>
                </div>
              </div>
              
              <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                <MdEdit /> Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="settings-content">
      <div className="settings-section">
        <h3><MdNotifications /> Notifications</h3>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked />
            Email notifications for new tickets
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked />
            SMS alerts for urgent tickets
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" />
            Weekly performance reports
          </label>
        </div>
      </div>

      <div className="settings-section">
        <h3><MdSecurity /> Security</h3>
        <button className="btn btn-secondary btn-sm">Change Password</button>
        <button className="btn btn-secondary btn-sm">Enable 2FA</button>
      </div>

      <div className="settings-section">
        <h3><MdBusiness /> System Preferences</h3>
        <div className="setting-item">
          <label>Theme:</label>
          <select className="setting-select">
            <option>Light</option>
            <option>Dark</option>
            <option>Auto</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Language:</label>
          <select className="setting-select">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAboutTab = () => (
    <div className="about-content">
      <div className="about-section">
        <h3><MdInfo /> System Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>App Version:</label>
            <span>v1.0.0</span>
          </div>
          <div className="info-item">
            <label>Build:</label>
            <span>2024.01.15</span>
          </div>
          <div className="info-item">
            <label>Environment:</label>
            <span>Production</span>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h3><MdHelp /> Support</h3>
        <p>For technical support, contact:</p>
        <p><strong>Email:</strong> support@company.com</p>
        <p><strong>Phone:</strong> +91 1800-123-456</p>
      </div>

      <div className="about-section">
        <h3>Quick Stats</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Total Tickets</h4>
            <span>1,234</span>
          </div>
          <div className="stat-card">
            <h4>Active Technicians</h4>
            <span>45</span>
          </div>
          <div className="stat-card">
            <h4>Completed Today</h4>
            <span>23</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ProtectedRoute>
      <main className="profile-container">
        <header className="profile-header">
          <h1>Admin Profile</h1>
          <p>Manage your account and system settings</p>
        </header>

        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <MdPerson /> Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <MdSettings /> Settings
          </button>
          <button 
            className={`tab-btn ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            <MdInfo /> About
          </button>
        </div>

        <div className="profile-body">
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "settings" && renderSettingsTab()}
          {activeTab === "about" && renderAboutTab()}
        </div>

        <div className="profile-footer">
          <button className="btn btn-danger" onClick={handleLogout}>
            <MdLogout /> Logout
          </button>
        </div>
      </main>
    </ProtectedRoute>
  );
}