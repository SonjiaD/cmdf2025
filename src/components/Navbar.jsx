import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MySite</h2>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/exercises" style={styles.link}>Exercises</Link></li>
        <li><Link to="/progress" style={styles.link}>Progress</Link></li>
        <li><Link to="/settings" style={styles.link}>Settings</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      background: "#333",
      color: "white"
    },
    logo: { margin: 0 },
    navLinks: { display: "flex", listStyle: "none", gap: "15px", padding: 0 },
    link: { color: "white", textDecoration: "none" }
  };
  
  export default Navbar;