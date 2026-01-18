import { useState, useEffect } from "react";
import MapView from "./components/MapView";
import SampleForm from "./components/SampleForm";
import { getSamples, createSample } from "./services/api";
import "./App.css";

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
      setError("Could not load samples. Check your connection.");
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
      setError("Failed to save sample.");
      console.error(err);
    }
  };

  if (loading) {
    return <div style={loadingStyle}>Loading data...</div>;
  }

  return (
    <div style={appContainerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>GeoFieldKit</h1>
        <div style={headerMetaStyle}>
          {samples.length} {samples.length === 1 ? "sample" : "samples"}
        </div>
      </header>

      {error && (
        <div style={errorStyle}>
          {error}
          <button onClick={() => setError(null)} style={dismissButtonStyle}>
            ×
          </button>
        </div>
      )}

      <div style={mainLayoutStyle} className="main-layout">
        <aside style={sidebarStyle} className="sidebar">
          <button
            onClick={() => setShowForm(!showForm)}
            style={showForm ? cancelButtonStyle : newSampleButtonStyle}
          >
            {showForm ? "Cancel" : "+ New Sample"}
          </button>

          {showForm ? (
            <div style={formContainerStyle}>
              <SampleForm
                onSubmit={handleAddSample}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <>
              {samples.length === 0 ? (
                <div style={emptyStateStyle}>
                  <div style={emptyIconStyle}>🧪</div>
                  <p>No samples yet</p>
                  <small>
                    Click "New Sample" to record your first field sample
                  </small>
                </div>
              ) : (
                <div style={sampleListStyle}>
                  <h3 style={sidebarHeadingStyle}>Recent Samples</h3>
                  {samples.map((sample) => (
                    <div
                      key={sample.id}
                      style={
                        selectedSample?.id === sample.id
                          ? selectedSampleCardStyle
                          : sampleCardStyle
                      }
                      onClick={() => setSelectedSample(sample)}
                    >
                      <div style={cardIdStyle}>{sample.sample_id}</div>
                      <div style={cardRockTypeStyle}>{sample.rock_type}</div>
                      <div style={cardCoordsStyle}>
                        {sample.latitude.toFixed(4)},{" "}
                        {sample.longitude.toFixed(4)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </aside>

        <main style={mapAreaStyle} className="map-area">
          <MapView samples={samples} onMarkerClick={setSelectedSample} />

          {selectedSample && !showForm && (
            <div style={detailsPanelStyle} className="details-panel">
              <div style={detailsHeaderStyle}>
                <h3 style={detailsTitleStyle}>{selectedSample.sample_id}</h3>
                <button
                  onClick={() => setSelectedSample(null)}
                  style={closeButtonStyle}
                >
                  ×
                </button>
              </div>

              <table style={tableStyle}>
                <tbody>
                  <tr>
                    <td style={tableLabelStyle}>Rock type</td>
                    <td>{selectedSample.rock_type}</td>
                  </tr>
                  <tr>
                    <td style={tableLabelStyle}>Description</td>
                    <td>{selectedSample.description}</td>
                  </tr>
                  <tr>
                    <td style={tableLabelStyle}>Coordinates</td>
                    <td style={monoStyle}>
                      {selectedSample.latitude.toFixed(6)},{" "}
                      {selectedSample.longitude.toFixed(6)}
                    </td>
                  </tr>
                  {selectedSample.strike && (
                    <tr>
                      <td style={tableLabelStyle}>Strike</td>
                      <td>{selectedSample.strike}°</td>
                    </tr>
                  )}
                  {selectedSample.dip && (
                    <tr>
                      <td style={tableLabelStyle}>Dip</td>
                      <td>{selectedSample.dip}°</td>
                    </tr>
                  )}
                  <tr>
                    <td style={tableLabelStyle}>Collector</td>
                    <td>{selectedSample.collector}</td>
                  </tr>
                  <tr>
                    <td style={tableLabelStyle}>Date</td>
                    <td>
                      {new Date(
                        selectedSample.collection_date
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                  {selectedSample.notes && (
                    <tr>
                      <td style={tableLabelStyle}>Notes</td>
                      <td>{selectedSample.notes}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const appContainerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
};

const headerStyle = {
  backgroundColor: "#1a1a1a",
  color: "#fff",
  padding: "12px 20px",
  borderBottom: "1px solid #333",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexShrink: 0,
};

const titleStyle = {
  margin: 0,
  fontSize: "20px",
  fontWeight: "600",
};

const headerMetaStyle = {
  fontSize: "13px",
  color: "#999",
};

const mainLayoutStyle = {
  display: "flex",
  flex: 1,
  overflow: "hidden",
  width: "100%",
};

const sidebarStyle = {
  width: "100%",
  maxWidth: "360px",
  minWidth: "280px",
  backgroundColor: "#f5f5f5",
  borderRight: "1px solid #ddd",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  flexShrink: 0,
};

const mapAreaStyle = {
  flex: 1,
  position: "relative",
  overflow: "hidden",
  minWidth: 0,
};

const newSampleButtonStyle = {
  margin: "16px",
  padding: "12px",
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
};

const cancelButtonStyle = {
  margin: "16px",
  padding: "12px",
  backgroundColor: "#666",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
};

const formContainerStyle = {
  flex: 1,
  overflowY: "auto",
  padding: "0 16px 16px",
};

const emptyStateStyle = {
  textAlign: "center",
  padding: "60px 20px",
  color: "#666",
};

const emptyIconStyle = {
  fontSize: "48px",
  marginBottom: "16px",
};

const sampleListStyle = {
  flex: 1,
  overflowY: "auto",
  padding: "0 16px 16px",
};

const sidebarHeadingStyle = {
  fontSize: "13px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "#666",
  marginBottom: "12px",
};

const sampleCardStyle = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "4px",
  padding: "10px",
  marginBottom: "8px",
  cursor: "pointer",
  transition: "border-color 0.15s",
};

const selectedSampleCardStyle = {
  backgroundColor: "#fff",
  border: "2px solid #000",
  borderRadius: "4px",
  padding: "10px",
  marginBottom: "8px",
  cursor: "pointer",
};

const cardIdStyle = {
  fontWeight: "600",
  fontSize: "13px",
  marginBottom: "4px",
};

const cardRockTypeStyle = {
  fontSize: "12px",
  color: "#666",
  marginBottom: "4px",
};

const cardCoordsStyle = {
  fontSize: "11px",
  color: "#999",
  fontFamily: "monospace",
};

const detailsPanelStyle = {
  position: "absolute",
  bottom: "20px",
  right: "20px",
  width: "320px",
  maxHeight: "400px",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "6px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  overflow: "auto",
};

const detailsHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
  position: "sticky",
  top: 0,
  backgroundColor: "#fff",
};

const detailsTitleStyle = {
  margin: 0,
  fontSize: "16px",
  fontWeight: "600",
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  color: "#999",
  padding: "0",
  lineHeight: 1,
};

const tableStyle = {
  width: "100%",
  fontSize: "13px",
  padding: "12px 16px",
};

const tableLabelStyle = {
  fontWeight: "500",
  color: "#666",
  paddingRight: "12px",
  paddingBottom: "8px",
  verticalAlign: "top",
  width: "100px",
};

const monoStyle = {
  fontFamily: "monospace",
};

const errorStyle = {
  backgroundColor: "#fee",
  color: "#c00",
  padding: "12px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "13px",
};

const dismissButtonStyle = {
  background: "none",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  color: "#c00",
};

const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  color: "#666",
};

export default App;
