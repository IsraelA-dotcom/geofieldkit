import { useState } from "react";

export default function SampleForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    sample_id: "",
    rock_type: "",
    description: "",
    latitude: "",
    longitude: "",
    strike: "",
    dip: "",
    collector: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      strike: formData.strike ? parseFloat(formData.strike) : null,
      dip: formData.dip ? parseFloat(formData.dip) : null,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={formTitleStyle}>Record New Sample</h3>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>
          Sample ID <span style={requiredStyle}>*</span>
        </label>
        <input
          name="sample_id"
          value={formData.sample_id}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="e.g., SAMPLE001"
        />
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>
          Rock Type <span style={requiredStyle}>*</span>
        </label>
        <input
          name="rock_type"
          value={formData.rock_type}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="e.g., Granite, Basalt"
        />
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>
          Description <span style={requiredStyle}>*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }}
          placeholder="Brief description of the sample"
        />
      </div>

      <div style={rowStyle}>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>
            Latitude <span style={requiredStyle}>*</span>
          </label>
          <input
            name="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="6.5244"
          />
        </div>

        <div style={fieldGroupStyle}>
          <label style={labelStyle}>
            Longitude <span style={requiredStyle}>*</span>
          </label>
          <input
            name="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="3.3792"
          />
        </div>
      </div>

      <div style={rowStyle}>
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Strike (°)</label>
          <input
            name="strike"
            type="number"
            min="0"
            max="360"
            value={formData.strike}
            onChange={handleChange}
            style={inputStyle}
            placeholder="0-360"
          />
        </div>

        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Dip (°)</label>
          <input
            name="dip"
            type="number"
            min="0"
            max="90"
            value={formData.dip}
            onChange={handleChange}
            style={inputStyle}
            placeholder="0-90"
          />
        </div>
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>
          Collector <span style={requiredStyle}>*</span>
        </label>
        <input
          name="collector"
          value={formData.collector}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="Your name"
        />
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }}
          placeholder="Additional observations (optional)"
        />
      </div>

      <div style={buttonRowStyle}>
        <button type="submit" style={submitButtonStyle}>
          Save Sample
        </button>
        <button type="button" onClick={onCancel} style={cancelButtonStyle}>
          Cancel
        </button>
      </div>
    </form>
  );
}

const formStyle = {
  backgroundColor: "#fff",
  borderRadius: "6px",
  padding: "16px",
};

const formTitleStyle = {
  margin: "0 0 16px 0",
  fontSize: "16px",
  fontWeight: "600",
};

const fieldGroupStyle = {
  marginBottom: "14px",
  flex: 1,
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontSize: "13px",
  fontWeight: "500",
  color: "#333",
};

const requiredStyle = {
  color: "#c00",
};

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "13px",
  fontFamily: "inherit",
};

const rowStyle = {
  display: "flex",
  gap: "10px",
};

const buttonRowStyle = {
  display: "flex",
  gap: "8px",
  marginTop: "16px",
};

const submitButtonStyle = {
  flex: 1,
  padding: "10px",
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
};

const cancelButtonStyle = {
  flex: 1,
  padding: "10px",
  backgroundColor: "#fff",
  color: "#000",
  border: "1px solid #ddd",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "13px",
};
