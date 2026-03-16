import { useState, useEffect } from "react";

const ayahs = [
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    english: "Indeed, with hardship comes ease.",
    ref: "Ash-Sharh 94:5",
  },
  {
    arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    english: "And He is with you wherever you are.",
    ref: "Al-Hadid 57:4",
  },
  {
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    english: "My Lord, increase me in knowledge.",
    ref: "Ta-Ha 20:114",
  },
];

const DailyAyah = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % ayahs.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        background: "#f0fdf4",
        borderBottom: "1px solid #bbf7d0",
        borderTop: "1px solid #bbf7d0",
        padding: "16px 24px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to right, transparent, #bbf7d0)",
            }}
          />
          <div>
            <p
              style={{
                fontFamily: "Amiri, serif",
                fontSize: "20px",
                color: "#15803d",
                margin: "0 0 4px",
              }}
            >
              {ayahs[i].arabic}
            </p>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "13px",
                color: "#64748b",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              "{ayahs[i].english}" —{" "}
              <span style={{ color: "#94a3b8" }}>{ayahs[i].ref}</span>
            </p>
          </div>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(to left, transparent, #bbf7d0)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DailyAyah;
