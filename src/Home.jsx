import React, { useEffect, useState } from "react";
import "./index.css";
import "./asset/bootstrap.min.css";
import logo from "./asset/logo.png";
import video from "./asset/movie.mp4";

function HomePage() {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showRegisterForm) {
      alert(`Registration successful! Welcome ${formData.username}`);
      setShowRegisterForm(false);
    } else {
      alert(`Welcome back, ${formData.username || formData.email}!`);
      setShowLoginModal(false);
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
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#" onClick={() => setShowLoginModal(true)}>
            Register / Login
          </a>
          <a href="#about">About Us</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section id="home" className="hero position-relative">
        <video autoPlay muted loop playsInline className="background-video">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="overlay"></div>

        <div className="hero-content text-center">
          <h2>
            Welcome to Sky<span className="d">flix</span>
          </h2>
          <p>An Movie Platform Inspired by Netflix
          Browse & Enjoy Streaming</p>
        </div>
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
                letterSpacing: "1px",
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
                      className="card movie-card h-100 d-flex flex-column"
                      style={{
                        backgroundColor: "#252525",
                        border: "1px solid #ff0000",
                        borderRadius: "10px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="card-img-top"
                        style={{
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        className="card-body text-light d-flex flex-column justify-content-between"
                        style={{
                          padding: "15px",
                          flex: "1",
                        }}
                      >
                        <div>
                          <h5
                            className="card-title fw-bold text-danger"
                            style={{
                              fontSize: "1.1rem",
                              minHeight: "50px",
                            }}
                          >
                            {movie.title}
                          </h5>
                          <p
                            className="card-text text-secondary"
                            style={{
                              fontSize: "0.9rem",
                              minHeight: "60px",
                            }}
                          >
                            {movie.overview?.slice(0, 80)}...
                          </p>
                        </div>

                        <div>
                          <p className="mb-2">
                            Rating:{" "}
                            <span className="text-warning fw-semibold">
                              {movie.vote_average}
                            </span>
                          </p>
                          <button
                            className="btn w-100"
                            style={{
                              backgroundColor: "#ff0000",
                              color: "#fff",
                              border: "none",
                              fontWeight: "600",
                              padding: "10px 0",
                              borderRadius: "6px",
                            }}
                            onClick={() => setShowLoginModal(true)}
                          >
                            Watch now
                          </button>
                        </div>
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

      {/* REGISTER / LOGIN MODAL */}
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
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          <div
            className="modal-content text-light position-relative p-4 text-center"
            style={{
              backgroundColor: "#000",
              border: "2px solid #ff0000",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 0 20px rgba(255, 0, 0, 0.3)",
              animation: "slideUp 0.3s ease-in-out",
            }}
          >
            <h4 className="fw-bold mb-3" style={{ color: "#ff0000" }}>
              {showRegisterForm ? "Create an Account" : "Login to Skyflix"}
            </h4>

            <form onSubmit={handleSubmit}>
              {showRegisterForm && (
                <div className="mb-3 text-start">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
              {showRegisterForm ? "Already have an account?" : "New to Skyflix?"}{" "}
              <button
                className="btn btn-link p-0"
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
