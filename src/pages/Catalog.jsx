import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({ onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [sortOption, setSortOption] = useState('name-asc')

  let filteredGuns = GUNS.filter((gun) => {
    const matchesSearch = gun.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'All' || gun.type === selectedType
    return matchesSearch && matchesType
  })

  filteredGuns.sort((a, b) => {
    if (sortOption === 'name-asc') return a.name.localeCompare(b.name)
    if (sortOption === 'name-desc') return b.name.localeCompare(a.name)
    if (sortOption === 'price-asc') return a.price - b.price
    if (sortOption === 'price-desc') return b.price - a.price
    return 0
  })

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price &mdash; nothing else.
        </p>
      </section>

      <section>
        {/* 3. Tambahkan block div controls ini tepat di atas <div className="list-head"> */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search gun name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Pistol">Pistol</option>
            <option value="Rifle">Rifle</option>
            <option value="Shotgun">Shotgun</option>
          </select>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="name-asc">Sort: Name (A-Z)</option>
            <option value="name-desc">Sort: Name (Z-A)</option>
            <option value="price-asc">Sort: Price (Lowest)</option>
            <option value="price-desc">Sort: Price (Highest)</option>
          </select>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          {/* 4. Ubah hitungan menjadi berdasarkan array yang difilter */}
          <span className="count">{filteredGuns.length} pieces</span>
        </div>

        {/* 5. Ubah block <ul> stock menjadi conditional rendering ini: */}
        {filteredGuns.length === 0 ? (
          <p className="no-match">No guns match your search criteria.</p>
        ) : (
          <ul className="stock">
            {filteredGuns.map((gun) => (
              <GunCard key={gun.name} gun={gun} onAddToCart={() => onAddToCart(gun)} />
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
export default Catalog