const NAV = ['Catalog', 'Cart', 'About', 'Contact']

function Header({ tab, onTab, cartCount }) {
  return (
    <header className="header">
      <span className="brand display"> Kelompok 14 Hebat</span>
      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item} 
            {item === 'Cart' && cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Header