import Logo from './Logo';
import { FaSun } from 'react-icons/fa'; // Sun icon for Day Mode
import { FaMoon } from 'react-icons/fa'; // Moon icon for Night Mode

function Navbar({ isDarkMode, toggleTheme }) {
  return (
    <header className="header" >
      <Logo />
      <button className="theme-toggle" onClick={toggleTheme}  style={{ marginLeft: "auto" }}>
        {isDarkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
      </button>
    </header>
  );
}

export default Navbar;