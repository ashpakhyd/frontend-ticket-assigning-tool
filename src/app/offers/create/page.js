"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateOfferMutation, useUpdateOfferMutation, useGetOfferQuery } from "@/store/api/offers/offersApi";
import AppLayout from "@/components/AppLayout";
import * as MdIcons from "react-icons/md";

export default function CreateOfferPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const { data: editData } = useGetOfferQuery(editId, { skip: !editId });
  const [createOffer, { isLoading: creating }] = useCreateOfferMutation();
  const [updateOffer, { isLoading: updating }] = useUpdateOfferMutation();

  const [formData, setFormData] = useState({
    title: "", description: "", category: "SERVICE", type: "OFFER",
    price: { original: "", discounted: "", currency: "INR" },
    images: [""], validFrom: "", validTill: "", termsConditions: "",
    maxRedemptions: "", targetAudience: { customerType: "ALL", locations: [] },
    tags: [], priority: 1,
  });

  const [locationInput, setLocationInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ticket_uploads');
    const response = await fetch('https://api.cloudinary.com/v1_1/dsrmkwxbm/image/upload', { method: 'POST', body: formData });
    const data = await response.json();
    return data.secure_url;
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      updateImage(index, url);
    } catch (err) {
      alert('Upload failed');
    }
    setUploading(false);
  };

  useEffect(() => {
    if (editData?.offer) {
      const o = editData.offer;
      setFormData({
        title: o.title || "", description: o.description || "", category: o.category || "SERVICE", type: o.type || "OFFER",
        price: o.price || { original: "", discounted: "", currency: "PKR" }, images: o.images || [""],
        validFrom: o.validFrom ? new Date(o.validFrom).toISOString().slice(0, 16) : "",
        validTill: o.validTill ? new Date(o.validTill).toISOString().slice(0, 16) : "",
        termsConditions: o.termsConditions || "", maxRedemptions: o.maxRedemptions || "",
        targetAudience: o.targetAudience || { customerType: "ALL", locations: [] },
        tags: o.tags || [], priority: o.priority || 1,
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: { original: Number(formData.price.original), discounted: Number(formData.price.discounted), currency: formData.price.currency },
        maxRedemptions: Number(formData.maxRedemptions), priority: Number(formData.priority),
        validFrom: new Date(formData.validFrom).toISOString(), validTill: new Date(formData.validTill).toISOString(),
        images: formData.images.filter(img => img.trim()),
      };
      if (editId) {
        await updateOffer({ id: editId, data: payload }).unwrap();
        alert("Offer updated successfully!");
      } else {
        await createOffer(payload).unwrap();
        alert("Offer created successfully!");
      }
      router.push("/offers");
    } catch (err) {
      alert(err?.data?.message || "Failed to save offer");
    }
  };

  const addLocation = () => { if (locationInput.trim()) { setFormData({ ...formData, targetAudience: { ...formData.targetAudience, locations: [...formData.targetAudience.locations, locationInput.trim()] } }); setLocationInput(""); } };
  const removeLocation = (i) => setFormData({ ...formData, targetAudience: { ...formData.targetAudience, locations: formData.targetAudience.locations.filter((_, idx) => idx !== i) } });
  const addTag = () => { if (tagInput.trim()) { setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] }); setTagInput(""); } };
  const removeTag = (i) => setFormData({ ...formData, tags: formData.tags.filter((_, idx) => idx !== i) });
  const addImageField = () => setFormData({ ...formData, images: [...formData.images, ""] });
  const updateImage = (i, v) => { const imgs = [...formData.images]; imgs[i] = v; setFormData({ ...formData, images: imgs }); };
  const removeImage = (i) => setFormData({ ...formData, images: formData.images.filter((_, idx) => idx !== i) });

  const inputStyle = { width: '100%', padding: '0.75rem', border: '1px solid #e0e0e0', borderRadius: '4px', fontSize: '0.9rem' };
  const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: '#212121' };
  const sectionStyle = { marginBottom: '1.5rem' };
  const headingStyle = { fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#212121', display: 'flex', alignItems: 'center', gap: '0.5rem' };

  return (
    <AppLayout>
      <div className="flipkart-home">
        <div className="flipkart-header">
          <div className="header-content">
            <button onClick={() => router.back()} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MdIcons.MdArrowBack /> Back
            </button>
            <h1>{editId ? "Edit Offer" : "Create New Offer"}</h1>
            <p>Fill in the details to create an amazing offer</p>
          </div>
        </div>

        <div className="section">
          <form onSubmit={handleSubmit} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={sectionStyle}>
              <h3 style={headingStyle}><MdIcons.MdInfo style={{ color: '#2874f0' }} /> Basic Information</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={inputStyle} placeholder="e.g., 50% Off AC Service" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Description *</label>
                <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} style={inputStyle} placeholder="Describe your offer..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                <div><label style={labelStyle}>Category *</label><select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={inputStyle}><option value="SERVICE">Service</option><option value="PRODUCT">Product</option><option value="BUNDLE">Bundle</option></select></div>
                <div><label style={labelStyle}>Type *</label><select required value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} style={inputStyle}><option value="OFFER">Offer</option><option value="DEAL">Deal</option><option value="DISCOUNT">Discount</option></select></div>
                <div><label style={labelStyle}>Priority</label><input type="number" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} style={inputStyle} min="1" /></div>
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={headingStyle}><MdIcons.MdAttachMoney style={{ color: '#22c55e' }} /> Pricing</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div><label style={labelStyle}>Original Price *</label><input type="number" required value={formData.price.original} onChange={(e) => setFormData({ ...formData, price: { ...formData.price, original: e.target.value } })} style={inputStyle} placeholder="2000" /></div>
                <div><label style={labelStyle}>Discounted Price *</label><input type="number" required value={formData.price.discounted} onChange={(e) => setFormData({ ...formData, price: { ...formData.price, discounted: e.target.value } })} style={inputStyle} placeholder="1000" /></div>
                <div><label style={labelStyle}>Currency</label><select value={formData.price.currency} onChange={(e) => setFormData({ ...formData, price: { ...formData.price, currency: e.target.value } })} style={inputStyle}><option value="INR">INR</option><option value="USD">USD</option><option value="EUR">EUR</option></select></div>
              </div>
              {formData.price.original && formData.price.discounted && (
                <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px', padding: '0.75rem', color: '#155724', fontWeight: '600' }}>
                  Discount: {Math.round(((formData.price.original - formData.price.discounted) / formData.price.original) * 100)}% OFF
                </div>
              )}
            </div>

            <div style={sectionStyle}>
              <h3 style={headingStyle}><MdIcons.MdCalendarToday style={{ color: '#2874f0' }} /> Validity Period</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div><label style={labelStyle}>Valid From *</label><input type="datetime-local" required value={formData.validFrom} onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })} style={inputStyle} /></div>
                <div><label style={labelStyle}>Valid Till *</label><input type="datetime-local" required value={formData.validTill} onChange={(e) => setFormData({ ...formData, validTill: e.target.value })} style={inputStyle} /></div>
                <div><label style={labelStyle}>Max Redemptions *</label><input type="number" required value={formData.maxRedemptions} onChange={(e) => setFormData({ ...formData, maxRedemptions: e.target.value })} style={inputStyle} placeholder="100" min="1" /></div>
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={headingStyle}><MdIcons.MdImage style={{ color: '#ff9f00' }} /> Images</h3>
              {formData.images.map((img, i) => (
                <div key={i} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i)} style={{ flex: 1, padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '4px' }} />
                    <button type="button" onClick={() => removeImage(i)} className="btn btn-danger btn-sm"><MdIcons.MdDelete /></button>
                  </div>
                  {img && <img src={img} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #e0e0e0' }} />}
                </div>
              ))}
              <button type="button" onClick={addImageField} className="btn btn-primary btn-sm" disabled={uploading}><MdIcons.MdAdd /> Add Image</button>
              {uploading && <span style={{ marginLeft: '0.5rem', color: '#2874f0' }}>Uploading...</span>}
            </div>

            <div style={sectionStyle}>
              <h3 style={headingStyle}><MdIcons.MdPeople style={{ color: '#ff6b6b' }} /> Target Audience</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Customer Type</label>
                <select value={formData.targetAudience.customerType} onChange={(e) => setFormData({ ...formData, targetAudience: { ...formData.targetAudience, customerType: e.target.value } })} style={inputStyle}>
                  <option value="ALL">All Customers</option><option value="NEW">New Customers</option><option value="EXISTING">Existing Customers</option><option value="VIP">VIP Customers</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Locations</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLocation())} style={{ ...inputStyle, flex: 1 }} placeholder="e.g., Parbhani" />
                  <button type="button" onClick={addLocation} className="btn btn-primary btn-sm"><MdIcons.MdAdd /></button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {formData.targetAudience.locations.map((loc, i) => (
                    <span key={i} style={{ background: '#e8f4fd', color: '#2874f0', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {loc}<button type="button" onClick={() => removeLocation(i)} style={{ background: 'none', border: 'none', color: '#2874f0', cursor: 'pointer', padding: 0 }}><MdIcons.MdClose /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={headingStyle}><MdIcons.MdLabel style={{ color: '#9c27b0' }} /> Tags</h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} style={{ ...inputStyle, flex: 1 }} placeholder="e.g., AC, Service" />
                <button type="button" onClick={addTag} className="btn btn-primary btn-sm"><MdIcons.MdAdd /></button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {formData.tags.map((tag, i) => (
                  <span key={i} style={{ background: '#f3e5f5', color: '#9c27b0', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {tag}<button type="button" onClick={() => removeTag(i)} style={{ background: 'none', border: 'none', color: '#9c27b0', cursor: 'pointer', padding: 0 }}><MdIcons.MdClose /></button>
                  </span>
                ))}
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={headingStyle}><MdIcons.MdDescription style={{ color: '#607d8b' }} /> Terms & Conditions</h3>
              <textarea value={formData.termsConditions} onChange={(e) => setFormData({ ...formData, termsConditions: e.target.value })} rows={4} style={inputStyle} placeholder="Enter terms and conditions..." />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" disabled={creating || updating} className="btn btn-primary" style={{ flex: 1 }}>
                {creating || updating ? "Saving..." : editId ? "Update Offer" : "Create Offer"}
              </button>
              <button type="button" onClick={() => router.back()} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
