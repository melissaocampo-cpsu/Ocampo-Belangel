import React, { useEffect, useState } from "react";
import "./index.css";
import "./asset/bootstrap.min.css";
import logo from "./asset/logo.png";
import video from "./asset/movie.mp4";
import { FaUserCircle } from "react-icons/fa";

function HomePage() {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [favorites, setFavorites] = useState([]); // ✅ Add favorites state

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const genres = [
    { id: 28, name: "Action" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 35, name: "Comedy" },
  ];

  const apiKey = "c1635c51fb2a380f9a4e20436e695fe9";

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      const results = {};
      for (let genre of genres) {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre.id}`
        );
        const data = await response.json();
        results[genre.name] = data.results.slice(0, 8);
      }
      setMoviesByGenre(results);
    };
    fetchMoviesByGenre();
  }, []);

  // --- Register ---
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill all fields!");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost/psit4/backend/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      if (result.status === "error") {
        alert(result.message);
      } else {
        alert("Registration successful!");
        setShowRegisterForm(false);
        setLoggedInUser(formData.username);
        setFormData({ username: "", email: "", password: "" });
        setShowLoginModal(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something went wrong on the server.");
    }
  };

  // --- LOGIN ---
 // --- LOGIN (mock login, no PHP) ---
const handleLogin = (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    alert("Please enter email and password!");
    return;
  }

  // Mock login: accept any email/password
  const userName = formData.username || formData.email.split("@")[0]; // use username if entered
  setLoggedInUser(userName);
  alert("Login successful!");
  setShowLoginModal(false);
  setFormData({ username: "", email: "", password: "" });
};


  // --- LOGOUT ---
  const handleLogout = () => {
    setLoggedInUser(null);
    setShowUserMenu(false);
    setFavorites([]); // clear favorites on logout
  };

  // --- WATCH BUTTON ---
  const handleWatchClick = () => {
    if (!loggedInUser) {
      setShowLoginModal(true);
      return;
    }
    alert("Start watching!");
  };

  // --- FAVORITES HANDLERS ---
  const addFavorite = (movie) => {
    if (!loggedInUser) return setShowLoginModal(true);
    setFavorites((prev) => [...prev, movie]);
  };

  const deleteFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const openEdit = (movie) => {
    const newTitle = prompt("Edit movie title:", movie.title);
    if (newTitle) {
      setFavorites((prev) =>
        prev.map((fav) => (fav.id === movie.id ? { ...fav, title: newTitle } : fav))
      );
    }
  };

  return (
    <>
      {/* HEADER */}
      <header>
        <div className="logo d-flex align-items-center">
          <img src={logo} alt="Skyflix Logo" className="logo-img" />
          <h1 className="sky mb-0 ms-2">Sky</h1>
          <span>
            <h1 className="mb-0">flix</h1>
          </span>
        </div>

        <nav className="nav">
          {!loggedInUser ? (
            <>
              <a href="#home">Home</a>
              <a href="#categories">Categories</a>
              <a href="#" onClick={() => setShowLoginModal(true)}>
                Register / Login
              </a>
            </>
          ) : (
            <div
              className="user-icon-container position-relative"
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#fff",
              }}
            >
              <FaUserCircle size={30} color="#ff0000" />
              <span style={{ fontWeight: "600" }}>{loggedInUser}</span>

              {showUserMenu && (
                <div
                  className="user-menu position-absolute"
                  style={{
                    top: "120%",
                    right: 0,
                    backgroundColor: "#111",
                    border: "1px solid #ff0000",
                    borderRadius: "10px",
                    padding: "10px 15px",
                    minWidth: "200px",
                    zIndex: 999,
                  }}
                >
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      marginBottom: "10px",
                      borderBottom: "1px solid #333",
                      paddingBottom: "5px",
                    }}
                  >
                    {loggedInUser}
                  </p>

                  <div style={{ maxHeight: "150px", overflowY: "auto", marginBottom: "10px" }}>
                    <h6 style={{ color: "#ff0000", marginBottom: "5px" }}>Favorites</h6>
                    {favorites.length === 0 ? (
                      <p style={{ color: "#ccc", fontSize: "0.85rem" }}>No favorites yet</p>
                    ) : (
                      favorites.map((fav) => (
                        <div
                          key={fav.id}
                          className="d-flex justify-content-between align-items-center mb-1"
                        >
                          <span style={{ color: "#fff", fontSize: "0.85rem" }}>{fav.title}</span>
                          <div className="d-flex gap-1">
                            <button
                              onClick={() => openEdit(fav)}
                              className="btn btn-sm btn-warning"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => deleteFavorite(fav.id)}
                              className="btn btn-sm btn-danger"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="btn w-100"
                    style={{
                      backgroundColor: "#ff0000",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: "600",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="hero position-relative">
        <video autoPlay muted loop playsInline className="background-video">
          <source src={video} type="video/mp4" />
        </video>
        <div className="overlay"></div>

        {!loggedInUser ? (
          <div className="hero-content text-center">
            <h2>
              Welcome to Sky<span className="d">flix</span>
            </h2>
            <p>A Movie Platform Inspired by Netflix — Browse & Enjoy Streaming</p>
          </div>
        ) : (
          <div className="hero-content text-center">
            <h2 style={{ color: "#ff0000" }}>Welcome Back, {loggedInUser}!</h2>
            <p>Enjoy exploring movies tailored just for you 🍿</p>
            <button
              className="btn fw-bold mt-3"
              style={{
                backgroundColor: "#ff0000",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "10px 20px",
              }}
            >
              Continue Watching
            </button>
          </div>
        )}
      </section>

      {/* MOVIE CATEGORIES */}
      <section id="categories" className="categories container my-5">
        {genres.map((genre) => (
          <div key={genre.id} className="genre-section mb-5 text-center">
            <h3
              className="fw-bold mb-4"
              style={{
                color: "#ff0000",
                borderBottom: "3px solid #ff0000",
                display: "inline-block",
                paddingBottom: "6px",
              }}
            >
              {genre.name}
            </h3>

            <div className="row g-4 mt-3">
              {moviesByGenre[genre.name] ? (
                moviesByGenre[genre.name].map((movie) => (
                  <div
                    key={movie.id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                  >
                    <div
                      className="card movie-card h-100"
                      style={{
                        backgroundColor: "#252525",
                        border: "1px solid #ff0000",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="card-img-top"
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <div className="card-body text-light">
                        <h5
                          className="card-title fw-bold text-danger"
                          style={{ fontSize: "1.1rem", minHeight: "50px" }}
                        >
                          {movie.title}
                        </h5>
                        <p
                          className="card-text text-secondary"
                          style={{ fontSize: "0.9rem", minHeight: "60px" }}
                        >
                          {movie.overview?.slice(0, 80)}...
                        </p>
                        <p className="mb-2">
                          Rating:{" "}
                          <span className="text-warning fw-semibold">
                            {movie.vote_average}
                          </span>
                        </p>

                        <button
                          className="btn w-100"
                          onClick={() => {
                            handleWatchClick();
                            addFavorite(movie); // ✅ Add to favorites on click
                          }}
                          style={{
                            backgroundColor: "#ff0000",
                            color: "#fff",
                            border: "none",
                            fontWeight: "600",
                            padding: "10px 0",
                            borderRadius: "6px",
                          }}
                        >
                          Watch now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-secondary">Loading...</p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* LOGIN & REGISTER MODAL */}
      {showLoginModal && (
        <div
          className="modal-backdrop-custom d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            zIndex: 1050,
          }}
        >
          <div
            className="modal-content text-light p-4 text-center"
            style={{
              backgroundColor: "#000",
              border: "2px solid #ff0000",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <h4 className="fw-bold mb-3" style={{ color: "#ff0000" }}>
              {showRegisterForm ? "Create an Account" : "Login to Skyflix"}
            </h4>

            <form onSubmit={showRegisterForm ? handleRegister : handleLogin}>
              {showRegisterForm && (
                <div className="mb-3 text-start">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                    style={{
                      backgroundColor: "#1a1a1a",
                      color: "#fff",
                      border: "1px solid #333",
                    }}
                  />
                </div>
              )}

              <div className="mb-3 text-start">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  style={{
                    backgroundColor: "#1a1a1a",
                    color: "#fff",
                    border: "1px solid #333",
                  }}
                />
              </div>

              <div className="mb-4 text-start">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  style={{
                    backgroundColor: "#1a1a1a",
                    color: "#fff",
                    border: "1px solid #333",
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn w-100 fw-bold mb-3"
                style={{
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  border: "none",
                  padding: "10px 0",
                  borderRadius: "6px",
                }}
              >
                {showRegisterForm ? "Register" : "Login"}
              </button>
            </form>

            <p className="text-center text-secondary">
              {showRegisterForm ? "Already have an account?" : "New to Skyflix?"}
              <button
                className="btn btn-link p-0 ms-1"
                onClick={() => setShowRegisterForm(!showRegisterForm)}
                style={{ color: "#ff0000", textDecoration: "none" }}
              >
                {showRegisterForm ? "Login" : "Register here"}
              </button>
            </p>

            <button
              onClick={() => setShowLoginModal(false)}
              className="btn fw-semibold mt-2"
              style={{
                backgroundColor: "#1a1a1a",
                color: "#ffffff",
                border: "1px solid #444",
                width: "100%",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
