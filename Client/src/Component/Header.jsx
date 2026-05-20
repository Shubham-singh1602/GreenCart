import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [islogin, setislogin] = useState(sessionStorage.getItem("token"));
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  const navigate = useNavigate();

  // Apply theme to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const handalRedirect = () => {
    if (islogin) {
      navigate(`/cart`);
    } else {
      navigate(`/login`);
    }
  };

  const handalLogout = () => {
    sessionStorage.removeItem("token");
    setislogin(false);
    navigate(`/`);
  };

  return (
    <header className="header" data-header="">
      <div className="nav-wrapper">
        <div className="container">
          <h1 className="h1">
            <a href="/" className="logo">
              Organ<span className="span">ica</span>
            </a>
          </h1>
          <button
            className="nav-open-btn"
            aria-label="Open Menu"
            data-nav-open-btn=""
          >
            <ion-icon name="menu-outline" />
          </button>
          <nav className="navbar" data-navbar="">
            <button
              className="nav-close-btn"
              aria-label="Close Menu"
              data-nav-close-btn=""
            >
              <ion-icon name="close-outline" />
            </button>
            <ul className="navbar-list">
              <li>
                <a href="/" className="navbar-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/#contact" className="navbar-link">
                  About
                </a>
              </li>
              <li>
                <a href="/shop" className="navbar-link">
                  Shop
                </a>
              </li>
              <li>
                <a href="/#contact" className="navbar-link">
                  Blog
                </a>
              </li>
              <li>
                <a href="/#products" className="navbar-link">
                  Products
                </a>
              </li>
              <li>
                <a href="/#contact" className="navbar-link">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="header-action">
            <div className="search-wrapper" data-search-wrapper="">
              <button
                className="header-action-btn"
                aria-label="Toggle search"
                data-search-btn=""
              >
                <ion-icon name="search-outline" className="search-icon" />
              </button>
              <div className="input-wrapper">
                <input
                  type="search"
                  name="search"
                  placeholder="Search here"
                  className="search-input"
                />
                <button className="search-submit" aria-label="Submit search">
                  <ion-icon name="search-outline" />
                </button>
              </div>
            </div>

            {/* Dark / Light mode toggle */}
            <button
              className="header-action-btn theme-toggle-btn"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <ion-icon name={isDark ? "sunny-outline" : "moon-outline"} />
            </button>

            {!islogin ? (
              <button
                className="header-action-btn"
                aria-label="Open shopping cart"
                data-panel-btn="cart"
                onClick={handalRedirect}
              >
                <ion-icon name="person-circle-outline"></ion-icon>
              </button>
            ) : (
              <>
                <button
                  className="header-action-btn"
                  aria-label="Open shopping cart"
                  data-panel-btn="cart"
                  onClick={handalRedirect}
                >
                  <ion-icon name="basket-outline" />
                  <data className="btn-badge" value={2}>
                    02
                  </data>
                </button>
              </>
            )}
            {islogin ? (
              <button
                className="header-action-btn"
                aria-label="Logout"
                data-panel-btn="cart"
                onClick={() => handalLogout()}
              >
                <ion-icon name="log-out-outline"></ion-icon>
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
