import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch history on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost/backend/api/history.php");
      if (res.data.status === 1) {
        setHistory(res.data.history);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary("");
    setAudioUrl("");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost/backend/api/upload.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.status === 1) {
        alert("File uploaded successfully!");
        generateSummary(res.data.file);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const generateSummary = async (fileName) => {
    try {
      const res = await axios.post(
        "http://localhost/backend/api/summarize.php",
        { file: fileName },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === 1) {
        setSummary(res.data.summary);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate summary");
    }
  };

  const generateAudio = async () => {
    if (!summary) {
      alert("No summary to generate audio from!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost/backend/api/generate_audio.php",
        { text: summary },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === 1) {
        setAudioUrl(res.data.audio);
        fetchHistory(); // refresh history
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate audio");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          AI Podcast Generator
        </h2>

        <div className="flex flex-col space-y-4 mb-6">
          <input type="file" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Uploading..." : "Upload & Summarize"}
          </button>
        </div>

        {summary && (
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">Summary:</h3>
            <p className="bg-gray-100 p-4 rounded-lg">{summary}</p>
            <button
              onClick={generateAudio}
              className="mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Generate Audio
            </button>
          </div>
        )}

        {audioUrl && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Your Podcast:</h3>
            <audio controls src={audioUrl} className="w-full" />
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-3">History:</h3>
          {history.length === 0 ? (
            <p>No podcasts yet.</p>
          ) : (
            <ul className="space-y-2">
              {history.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                >
                  <span>{item.file_name}</span>
                  {item.audio_file && (
                    <audio controls src={item.audio_file} className="w-40" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
