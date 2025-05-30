import './Sidebar.css';

const Sidebar = ({ activePage, setActivePage }) => {
  const pages = [
    { name: 'My Plants', icon: '🌿' },
    { name: 'Dashboard', icon: '📊' },
    { name: 'Profiles', icon: '📁' },
    { name: 'Controls', icon: '⚙️' },
    { name: 'Analytics', icon: '📉' },
    { name: 'Settings', icon: '🔧' },
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">EcoBreath</h2>
      <ul>
        {pages.map((page) => (
          <li
            key={page.name}
            className={activePage === page.name ? 'active' : ''}
            onClick={() => setActivePage(page.name)}
          >
            <span className="icon">{page.icon}</span> {page.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;