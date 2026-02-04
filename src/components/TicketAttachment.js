"use client";
import { useState, useEffect } from "react";
import { MdAttachFile, MdUpload, MdClose, MdInsertDriveFile } from "react-icons/md";

export default function TicketAttachment({ ticketId }) {
  const [attachments, setAttachments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`attachments_${ticketId}`);
    if (stored) {
      setAttachments(JSON.parse(stored));
    }
  }, [ticketId]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const attachment = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        data: reader.result,
        uploadedAt: new Date().toISOString()
      };

      const newAttachments = [...attachments, attachment];
      setAttachments(newAttachments);
      localStorage.setItem(`attachments_${ticketId}`, JSON.stringify(newAttachments));
      
      // Send only ID to backend
      console.log('Sending attachment ID to backend:', attachment.id);
      setIsUploading(false);
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const removeAttachment = (id) => {
    const newAttachments = attachments.filter(att => att.id !== id);
    setAttachments(newAttachments);
    localStorage.setItem(`attachments_${ticketId}`, JSON.stringify(newAttachments));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="attachments-section">
      <h3>Attachments ({attachments.length})</h3>
      
      <div className="upload-area">
        <input
          type="file"
          id="file-upload"
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileUpload}
          className="file-input"
        />
        <label htmlFor="file-upload" className="upload-btn">
          {isUploading ? (
            <><MdUpload /> Uploading...</>
          ) : (
            <><MdAttachFile /> Add Attachment</>
          )}
        </label>
      </div>

      {attachments.length > 0 && (
        <div className="attachments-grid">
          {attachments.map((att) => (
            <div key={att.id} className="attachment-card">
              {att.type.startsWith('image/') ? (
                <img src={att.data} alt={att.name} className="attachment-preview" />
              ) : (
                <div className="file-icon"><MdInsertDriveFile /></div>
              )}
              <div className="attachment-info">
                <p className="attachment-name">{att.name}</p>
                <p className="attachment-size">{formatFileSize(att.size)}</p>
              </div>
              <button
                onClick={() => removeAttachment(att.id)}
                className="remove-btn"
              >
                <MdClose />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}