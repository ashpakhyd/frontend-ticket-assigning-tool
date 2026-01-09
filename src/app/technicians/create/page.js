"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import "../technicians.css";

export default function CreateTechnician() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      specialty: [],
      experience: "",
      address: ""
    },
    mode: "onChange"
  });

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

  const onSubmit = async (data) => {
    try {
      console.log("Creating technician:", data);
      alert("Technician created successfully!");
      router.push("/technicians");
    } catch (error) {
      alert("Failed to create technician");
    }
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="tech-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter full name"
              />
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                {...register("phone", { required: "Phone is required" })}
                placeholder="Enter phone number"
              />
              {errors.phone && <span className="error">{errors.phone.message}</span>}
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter email address"
              />
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label>Specialty *</label>
              <select
                {...register("specialty", { required: "At least one specialty is required" })}
                multiple
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              {errors.specialty && <span className="error">{errors.specialty.message}</span>}
            </div>

            <div className="form-group">
              <label>Experience (Years)</label>
              <input
                type="number"
                {...register("experience", { min: 0, max: 50 })}
                placeholder="Years of experience"
                min="0"
                max="50"
              />
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <textarea
                {...register("address")}
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
              disabled={!isValid}
              loading={isSubmitting}
            >
              Create Technician
            </Button>
          </div>
        </form>
      </main>
    </ProtectedRoute>
  );
}