"use client";

import { useState } from "react";

const videos = [
  { title: "Amazing Nature 🌿 Beautiful World", channel: "Nature World", views: "1.2M views", time: "2 days ago", color: "#237a57", icon: "🌿", duration: "12:45" },
  { title: "Learn Coding From Zero 🚀", channel: "Code Academy", views: "850K views", time: "1 week ago", color: "#5546a8", icon: "💻", duration: "18:32" },
  { title: "Relaxing Music for Your Mind 🎧", channel: "Chill Vibes", views: "2.4M views", time: "3 days ago", color: "#ba694e", icon: "🎧", duration: "1:02:15" },
  { title: "Explore the Beautiful Mountains 🏔️", channel: "Travel India", views: "430K views", time: "5 days ago", color: "#317a9e", icon: "🏔️", duration: "14:08" },
  { title: "Easy Cooking Recipes 🍕", channel: "Food Studio", views: "670K views", time: "2 weeks ago", color: "#ba8a30", icon: "🍕", duration: "09:51" },
  { title: "Best Gaming Moments 🎮", channel: "Pro Gamer", views: "980K views", time: "1 day ago", color: "#873f70", icon: "🎮", duration: "21:16" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");
  const [menu, setMenu] = useState(false);
const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);
const [uploadedName, setUploadedName] = useState("");

function handleVideoUpload(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("video/")) {
    alert("Bhai, sirf video file select karna!");
    return;
  }

  if (file.size > 100 * 1024 * 1024) {
    alert("Bhai, abhi 100 MB se chhoti video select kar!");
    return;
  }

  if (uploadedVideo) URL.revokeObjectURL(uploadedVideo);

  setUploadedVideo(URL.createObjectURL(file));
  setUploadedName(file.name);
  setMyUploadedVideos((previous) => [
  ...previous,
  {
    title: file.name.replace(/\.[^/.]+$/, " "),
    url: URL.createObjectURL(file),
    channel: "My Channel",
  },
]);
}const [myUploadedVideos, setMyUploadedVideos] = useState<
  { title: string; url: string; channel: string }[]
>([]);
  const shown = videos.filter((v) =>
    (v.title + " " + v.channel).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: "#0f0f0f", color: "white", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <header style={{ height: 68, display: "flex", alignItems: "center", gap: 20, padding: "0 4%", borderBottom: "1px solid #272727", position: "sticky", top: 0, background: "#0f0f0f", zIndex: 2 }}>
        <button onClick={() => setMenu(!menu)} style={{ background: "none", border: 0, color: "white", fontSize: 25, cursor: "pointer" }}>☰</button>
        <div style={{ fontSize: 23, fontWeight: 800, whiteSpace: "nowrap" }}>▶ <span style={{ color: "#ff3333" }}>MyTube</span></div>
        <div style={{ display: "flex", flex: 1, maxWidth: 600, margin: "auto" }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search videos..." style={{ minWidth: 0, flex: 1, padding: "12px 18px", background: "#121212", border: "1px solid #444", borderRadius: "24px 0 0 24px", color: "white", fontSize: 16, outline: "none" }} />
          <button style={{ padding: "0 22px", background: "#272727", color: "white", border: "1px solid #444", borderRadius: "0 24px 24px 0", cursor: "pointer" }}>🔍</button>
        </div>
        <label style={{ padding: "10px 14px", borderRadius: 22, background: "#272727", color: "white", cursor: "pointer", whiteSpace: "nowrap" }}>
  ＋ Upload
  <input
    type="file"
    accept="video/*"
    onChange={handleVideoUpload}
    style={{ display: "none" }}
  />
</label>
      </header>

      <div style={{ display: "flex" }}>
        {uploadedVideo && (
  <div style={{ padding: "20px 4%", background: "#181818" }}>
    <h2 style={{ marginBottom: 12 }}>▶ {uploadedName}</h2>

    <video
      src={uploadedVideo}
      controls
      autoPlay
      style={{
        width: "100%",
        maxWidth: 900,
        maxHeight: 500,
        background: "black",
        borderRadius: 12,
      }}
    />

    <p style={{ color: "#aaa", fontSize: 13 }}>
      Your video is playing locally in this browser.
    </p>
  </div>
)}
        {menu && <aside style={{ width: 190, padding: 20, flexShrink: 0, background: "#181818", minHeight: "calc(100vh - 68px)" }}>
          <p>🏠 Home</p><p>🔥 Trending</p><p>📺 Subscriptions</p><hr style={{ borderColor: "#333" }} /><p>▶ Your videos</p><p>🕘 History</p><p>👍 Liked videos</p>
        </aside>}

        <main style={{ padding: "24px 4%", flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 25 }}>
            {["All", "Music", "Coding", "Gaming", "Travel", "Cooking"].map((category) =>
              <button key={category} onClick={() => setActive(category)} style={{ flexShrink: 0, padding: "9px 16px", borderRadius: 9, border: 0, background: active === category ? "white" : "#272727", color: active === category ? "black" : "white", cursor: "pointer" }}>{category}</button>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(245px, 1fr))", gap: 28 }}>
            {shown.filter((v) => active === "All" || (active === "Music" && v.channel === "Chill Vibes") || (active === "Coding" && v.channel === "Code Academy") || (active === "Gaming" && v.channel === "Pro Gamer") || (active === "Travel" && v.channel === "Travel India") || (active === "Cooking" && v.channel === "Food Studio")).map((video, i) =>
              <article key={video.title} style={{ cursor: "pointer" }}>
                <div style={{ background: `linear-gradient(135deg, ${video.color}, #171717)`, height: 165, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ fontSize: 68 }}>{video.icon}</span>
                  <span style={{ position: "absolute", bottom: 8, right: 8, background: "#000c", padding: "4px 6px", borderRadius: 4, fontSize: 12 }}>{video.duration}</span>
                </div>
                <div style={{ display: "flex", gap: 12, paddingTop: 13 }}>
                  <div style={{ background: video.color, borderRadius: "50%", width: 38, height: 38, display: "grid", placeItems: "center", flexShrink: 0 }}>{video.icon}</div>
                  <div><div style={{ fontWeight: 700, lineHeight: 1.45 }}>{video.title}</div><div style={{ color: "#aaa", fontSize: 13, marginTop: 7 }}>{video.channel}</div><div style={{ color: "#aaa", fontSize: 13, marginTop: 4 }}>{video.views} · {video.time}</div></div>
                </div>
              </article>
            )}
          </div>
          {shown.length === 0 && <p style={{ color: "#aaa", textAlign: "center", marginTop: 50 }}>Koi video nahi mili. Kuch aur search karo.</p>}
          <p style={{ color: "#777", fontSize: 13, marginTop: 50, textAlign: "center" }}>MyTube · Your video world</p>
        </main>
      </div>
    </div>
  );
}