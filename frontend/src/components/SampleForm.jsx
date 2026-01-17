import { useState } from 'react';

export default function SampleForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    sample_id: '',
    rock_type: '',
    description: '',
    latitude: '',
    longitude: '',
    strike: '',
    dip: '',
    collector: '',
    notes: '',
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
      <h3>Record New Sample</h3>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Sample ID *</label>
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
        <label style={labelStyle}>Rock Type *</label>
        <input
        name="rock_type"
        value={formData.rock_type}
        onChange={handleChange}
        required
        style={inputStyle}
        placeholder="e.g., Granite"
        />
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Description *</label>
        <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
        />
      </div>

    <div style={rowStyle}>
      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Longitude *</label>
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
        <label style={labelStyle}>Strike</label>
        <input
        name="strike"
        type="number"
        value={formData.strike}
        onChange={handleChange}
        style={inputStyle}
        placeholder="0-360"
        />
      </div>

      <div style={fieldGroupStyle}>
        <label style={labelStyle}>Dip</label>
        <input
        name="dip"
        type="number"
        value={formData.dip}
        onChange={handleChange}
        style={inputStyle}
        placeholder="0-90"
        />
      </div>
    </div>

    <div style={fieldGroupStyle}>
      <label style={labelStyle}>Collector *</label>
      <input
      name="collector"
      value={formData.collector}
      onChange={handleChange}
      required
      style={inputStyle}
      />
    </div>

    <div style={fieldGroupStyle}>
      <label style={labelStyle}>Notes</label>
      <textarea
      name="notes"
      value={formData.notes}
      onChange={handleChange}
      style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
      />
    </div>

    <div style={buttonRowStyle}>
      <button type="submit" style={submitButtonStyle}>Save Sample</button>
      <button type="button" onClick={onCancel} style={cancelButtonStyle}>Cancel</button>
    </div>
    </form>
  );
}

const formStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '20px',
  marginBottom: '20px',
};

const fieldGroupStyle = {
  marginBottom: '16px',
  flex: 1,
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '14px',
  fontWeight: '500',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px',
  fontFamily: 'inherit',
};

const rowStyle = {
  display: 'flex',
  gap: '12px',
};

const buttonRowStyle = {
  display: 'flex',
  gap: '8px',
  marginTop: '20px',
};

const submitButtonStyle = {
  padding: '10px 16px',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

const cancelButtonStyle = {
  padding: '10px 16px',
  backgroundColor: '#fff',
  color: '#000',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};