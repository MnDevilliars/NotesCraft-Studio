import React, { useRef } from 'react';
import { X, RotateCcw, Upload, Image } from 'lucide-react';

export default function BrandingModal({ isOpen, onClose, branding, setBranding }) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const defaultBranding = {
    channelName: 'Ganit Kaksha - Md Noorain',
    logoUrl: '/playstore.png',
    contactNumber: 'Offline Classes: 82760 13329',
  };

  const handleReset = () => {
    setBranding(defaultBranding);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBranding({ ...branding, logoUrl: event.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Customise Teacher & Channel Branding</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Logo Upload Section */}
          <div className="form-group">
            <label className="form-label">Channel / Teacher Logo</label>
            <div className="logo-upload-row">
              <img
                src={branding.logoUrl || '/playstore.png'}
                alt="Brand Logo"
                className="branding-logo-preview"
                style={{ width: '56px', height: '56px', objectFit: 'contain' }}
              />
              <div className="logo-upload-actions">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={handleLogoUpload}
                />
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={14} />
                  <span>Upload Logo</span>
                </button>
                <span className="logo-upload-hint">
                  Displays at 56px top-right of every page with no border or shield.
                </span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Channel / Teacher Name (Footer Left)</label>
            <input
              type="text"
              className="form-input"
              value={branding.channelName}
              onChange={(e) =>
                setBranding({ ...branding, channelName: e.target.value })
              }
              placeholder="e.g. Ganit Kaksha - Md Noorain"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Offline Classes / Contact Number (Footer Right)</label>
            <input
              type="text"
              className="form-input"
              value={branding.contactNumber}
              onChange={(e) =>
                setBranding({ ...branding, contactNumber: e.target.value })
              }
              placeholder="e.g. Offline Classes: 82760 13329"
            />
          </div>

          {/* Live Preview Card */}
          <div className="branding-preview-card">
            <div className="preview-label">Live Footer Preview:</div>
            <div className="preview-row">
              <img
                src={branding.logoUrl || '/playstore.png'}
                alt="Logo"
                style={{ width: '42px', height: '42px', objectFit: 'contain' }}
              />
              <div className="preview-details">
                <div className="preview-channel">▶ {branding.channelName}</div>
                <div className="preview-contact">✆ {branding.contactNumber}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            <RotateCcw size={15} />
            <span>Reset to Default</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
          >
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
}
