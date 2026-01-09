"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Button from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../technicians.css";

export default function CreateTechnician() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    specialty: "",
    experience: "",
    address: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const specialties = [
    "AC Repair",
    "Refrigerator Repair", 
    "Washing Machine Repair",
    "TV Repair",
    "Water Purifier Service",
    "Microwave Repair",
    "Dishwasher Repair",
    "Geyser Repair",
    "Kitchen Chimney Service",
    "Oven Repair",
    "General Appliance Repair"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // API call would go here
      console.log("Creating technician:", formData);
      alert("Technician created successfully!");
      router.push("/technicians");
    } catch (error) {
      alert("Failed to create technician");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.name && formData.phone && formData.email && formData.specialty;

  return (
    <ProtectedRoute>
      <main className="create-tech-container">
        <header className="create-tech-header">
          <div className="tech-icon-large">👨🔧</div>
          <div className="header-info">
            <h1>Add New Technician</h1>
            <p>Fill in the details to add a new technician</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="tech-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="form-group">
              <label>Specialty *</label>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                required
              >
                <option value="">Select specialty</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Experience (Years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Years of experience"
                min="0"
                max="50"
              />
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows="3"
              />
            </div>
          </div>

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isFormValid}
              loading={isLoading}
            >
              Create Technician
            </Button>
          </div>
        </form>
      </main>
    </ProtectedRoute>
  );
}