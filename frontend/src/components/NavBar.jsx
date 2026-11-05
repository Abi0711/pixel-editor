import React from "react";
import "../styles/NavBar.css";

function NavBar({ onLogout}) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">🎨</span>
        <h1 className="navbar-title">Pixel Editor</h1>
      </div>

      <div className="navbar-right">
        <button
          onClick={onLogout}
          className="navbar-logout-btn"
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#dc2626")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#ef4444")
          }
        >
          Logout
        </button>
      </div>
    </header>
  );
}
export default NavBar;
