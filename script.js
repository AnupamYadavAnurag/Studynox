const courses = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    instructor: "Prof. A. Sharma",
    lessons: 72,
    price: "₹7,999",
    tag: "Most popular",
    desc: "Build real-world projects using HTML, CSS, JavaScript, React, Node and MongoDB.",
    video: "xK4j80Hx_dw",
  },
  {
    id: 2,
    title: "Data Science & ML",
    instructor: "Dr. S. Verma",
    lessons: 58,
    price: "₹9,499",
    tag: "Career track",
    desc: "Statistics, Python, Pandas, Scikit-learn, and deep learning fundamentals.",
    video: "PccMf_OQSHk",
  },
  {
    id: 3,
    title: "Competitive Programming",
    instructor: "Coach R. Patel",
    lessons: 40,
    price: "Free",
    tag: "Free",
    desc: "Problem solving, algorithms, data structures, and contest strategy.",
    video: "PEt5fjv1_o0",
  },
  {
    id: 4,
    title: "UI / UX Design",
    instructor: "M. Kaur",
    lessons: 32,
    price: "₹4,499",
    tag: "Design",
    desc: "Design systems, Figma workflow, prototyping, and accessibility.",
    video: "dQw4w9WgXcQ",
  },
];

const videos = [
  {
    id: "xK4j80Hx_dw",
    title: "PW Skills — Python Lab Setup (Lecture 1)",
    thumb: "https://i.ytimg.com/vi/xK4j80Hx_dw/hqdefault.jpg",
  },
  {
    id: "PccMf_OQSHk",
    title: "PW Skills — Orientation Session",
    thumb: "https://i.ytimg.com/vi/PccMf_OQSHk/hqdefault.jpg",
  },
  {
    id: "PEt5fjv1_o0",
    title: "PW — The Future of Skills (featured)",
    thumb: "https://i.ytimg.com/vi/PEt5fjv1_o0/hqdefault.jpg",
  },
  {
    id: "y3OOaXrFy-Q",
    title: "PW — Extra: Design Basics",
    thumb: "https://i.ytimg.com/vi/y3OOaXrFy-Q/hqdefault.jpg",
  }
,
];

// DOM refs
const coursesGrid = document.getElementById("coursesGrid");
const count = document.getElementById("count");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const modalBack = document.getElementById("modalBack");
const modalTitle = document.getElementById("modalTitle");
const modalMeta = document.getElementById("modalMeta");
const modalDesc = document.getElementById("modalDesc");
const modalClose = document.getElementById("modalClose");
const modalVideoLink = document.getElementById("modalVideoLink");
const ytPlayer = document.getElementById("ytPlayer");
const videoList = document.getElementById("videoList");

function renderCourses(list) {
  coursesGrid.innerHTML = "";
  list.forEach((c) => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <div class="card-top">
        <div>
          <div class="tag">${c.tag}</div>
          <h3>${c.title}</h3>
          <div class="muted">${c.desc}</div>
        </div>
        <div class="price-block">
          <div class="price">${c.price}</div>
          <div class="muted small">${c.lessons} lessons</div>
        </div>
      </div>
      <div class="card-actions">
        <div class="muted">${c.instructor}</div>
        <div style="display:flex;gap:8px">
          <button class="small-btn" data-preview='${c.id}'>Preview</button>
          <button class="btn" data-enroll='${c.id}'>Enroll</button>
        </div>
      </div>
    `;
    coursesGrid.appendChild(el);
  });
  count.textContent = `Showing ${list.length} of ${courses.length}`;

  // attach preview handlers
  document.querySelectorAll("[data-preview]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-preview"));
      openModal(id);
    });
  });
}

function openModal(courseId) {
  const c = courses.find((x) => x.id === courseId);
  if (!c) return;
  modalTitle.textContent = c.title;
  modalMeta.textContent = `${c.instructor} • ${c.lessons} lessons`;
  modalDesc.textContent = c.desc;
  modalVideoLink.href = `https://www.youtube-nocookie.com/watch?v=${c.video}`;
  modalVideoLink.textContent = "Watch related video";
  modalBack.style.display = "flex";
}

modalClose.addEventListener("click", () => (modalBack.style.display = "none"));
modalBack.addEventListener("click", (e) => {
  if (e.target === modalBack) modalBack.style.display = "none";
});

// search
function doSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) return renderCourses(courses);
  const filtered = courses.filter(
    (c) => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
  );
  renderCourses(filtered);
}
searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") doSearch();
});

// load videos list
function renderVideos() {
  videoList.innerHTML = "";
  videos.forEach((v) => {
    const d = document.createElement("div");
    d.className = "thumb";
    d.innerHTML = `<img src='${v.thumb}' alt='thumb'><div class='tmeta'><div class="title">${v.title}</div><div class='muted' style='margin-top:6px;font-size:12px'>Click to play</div></div>`;
    d.addEventListener("click", () => {
      // use no-cookie domain and autoplay param (user interaction allows autoplay)
      ytPlayer.src = `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&autoplay=1`;
    });
    videoList.appendChild(d);
  });
}

// initial render
renderCourses(courses);
renderVideos();

// preview featured
document
  .getElementById("previewFeatured")
  .addEventListener("click", () => openModal(1));

// enroll buttons (global delegation)
document.addEventListener("click", (e) => {
  const enroll = e.target.getAttribute && e.target.getAttribute("data-enroll");
  if (enroll) {
    alert(
      "Enroll clicked for course id " + enroll + " (implement signup flow)"
    );
  }
});

