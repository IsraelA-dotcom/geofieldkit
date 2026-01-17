import { useState, useEffect } from 'react';
import MapView from './components/MapView';
import SampleForm from './components/SampleForm';
import { getSamples, createSample } from './services/api';
import './App.css';

function App() {
  const [samples, setSamples] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSamples();
  }, []);

  const loadSamples = async () => {
    try {
      setError(null);
      const data = await getSamples();
      setSamples(data);
    } catch (err) {
      setError('Could not load samples. Check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSample = async (sampleData) => {
    try {
      await createSample(sampleData);
      await loadSamples();
      setShowForm(false);
    } catch (err) {
      setError('Failed to save sample. Try again');
      console.error(err);
    }
  };

  if (loading) {
    return <div style={loadingStyle}>Loading data...</div>;
  }

  return (
    <div className="App">
      <header style={headerStyle}>
        <h1>GeoFieldKit</h1>
        <div style={metaStyle}>
          {samples.length} {samples.length === 1 ? 'sample' : 'samples'} recorded
        </div>
      </header>

      {error && (
        <div style={errorStyle}>
          {error}
          <button onClick={() => setError(null)} style={dismissButtonStyle}>x</button>
        </div>
      )}

      <main style={mainStyle}>
        <div style={actionsStyle}>
          <button
          onClick={() => setShowForm(!showForm)}
          style={showForm ? activeButtonStyle : buttonStyle}
          >
            {showForm ? 'Cancel' : 'New Sample'}
          </button>
        </div>

        {showForm && (
          <SampleForm onSubmit={handleAddSample} />

        )}

        <MapView
        samples={samples}
        onMarkerClick={setSelectedSample}
        />

        {selectedSample && (
          <div style={detailsPanelStyle}>
            <button
            onClick={() => setSelectedSample(null)}
              style={closeButtonStyle}
              >
              Close
              </button>
              <h3>{selectedSample.sample_id}</h3>
              <table style={tableStyle}>
                <tbody>
                  <tr>
                    <td>Rock type</td>
                    <td>{selectedSample.rock_type}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{selectedSample.description}</td>
                  </tr>
                  <tr>
                    <td>Coordinates</td>
                    <td>{selectedSample.latitude.toFixed(6)}, {selectedSample.longitude.toFixed(6)}</td>
                  </tr>
                  {selectedSample.strike && (
                    <tr>
                      <td>Strike</td>
                      <td>{selectedSample.strike}°</td>
                    </tr>
                  )}
                  {selectedSample.dip && (
                    <tr>
                      <td>Dip</td>
                      <td>{selectedSample.dip}°</td>
                    </tr>
                  )}
                  <tr>
                    <td>Collector</td>
                    <td>{selectedSample.collector}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{new Date(selectedSample.collection_date).toLocaleString()}</td>
                  </tr>
                  {selectedSample.notes && (
                    <tr>
                  <td>Notes</td>
                  <td>{selectedSample.notes}</td>
                  </tr>
                  )}
                </tbody>
              </table>
          </div>
        )}

        <section style={listSectionStyle}>
          <h2>All Samples</h2>
          {samples.length === 0 ? (
            <p style={emptyStateStyle}>
No samples yet. Add one to get started.
            ) : (
              <div style={listStyle}>
                {samples.map((sample) => (
                  <div
                  key={sample.id}
                  style={sampleCardStyle}
                  onClick={() => setSelectedSample(sample)}
                  >
                    <div style={cardHeaderStyle}>
                      <strong>{sample.sample_id}</strong>
                      <span style={cardMetaStyle}>{sample.rock_type}</span>
                    </div>
                    <div style={cardLocationStyle}>
                      {sample.latitude.toFixed(4)}, {sample.longitude.toFixed(4)}

                    </div>
                    </div>
                ))}
              </div>
            )}
        </section>
      </main>
    </div>
  );
}

// Styles - organized by component
const headerStyle = {
  backgroundColor: '#1a1a1a',
  color: '#fff',
  padding: '16px 20px',
  borderBottom: '1px solid #333',
};

const metaStyle = {
  marginTop: '4px',
  fontSize: '14px',
  color: '#999',
};

const mainStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '20px',
};

const actionsStyle = {
  marginBottom: '20px',
};

const buttonStyle = {
  padding: '10px 16px',
  backgroundColor: '#fff',
  color: '#000',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#f5f5f5',
};

const errorStyle = {
  backgroundColor: '#fee',
  color: '#c00',
  padding: '12px 16px',
  margin: '20px',
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const dismissButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  color: '#c00',
};

const detailsPanelStyle = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '16px',
  marginTop: '20px',
};

const closeButtonStyle = {
  float: 'right',
  padding: '6px 12px',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '13px',
};

const tableStyle = {
  width: '100%',
  marginTop: '12px',
  borderCollapse: 'collapse',
};

  const listSectionStyle = {
    marginTop: '40px',
  };

  const emptyStateStyle ={
    color: '#666',
    fontStyle: 'italic',
  };

  const listStyle = {
    display: 'grid',
    gap: '12px',
    marginTop: '12px',
  };

  const sampleCardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '12px',
    cursor: 'pointer',
    transition: 'border-color 0.15s',
  };

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
  };

  const cardMetaStyle = {
    color: '#666',
    fontSize: '14px',
  };

  const cardLocationStyle = {
    fontSize: '13px',
    color: '#999',
    fontFamily: 'monospace',
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    color: '#666',
  };

  export default App;