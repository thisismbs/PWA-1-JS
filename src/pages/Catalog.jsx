import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({ onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  
  // State mode sorting: 'none', 'name-asc', 'name-desc', 'price-asc', 'price-desc'
  const [sortMode, setSortMode] = useState('none')

  // Fungsi toggle sorting Nama dengan siklus: none -> name-asc -> name-desc -> none
  const toggleSortName = () => {
    if (sortMode === 'none' || sortMode.startsWith('price')) {
      setSortMode('name-asc')
    } else if (sortMode === 'name-asc') {
      setSortMode('name-desc')
    } else {
      setSortMode('none')
    }
  }

  // Fungsi toggle sorting Harga dengan siklus: none -> price-asc -> price-desc -> none
  const toggleSortPrice = () => {
    if (sortMode === 'none' || sortMode.startsWith('name')) {
      setSortMode('price-asc')
    } else if (sortMode === 'price-asc') {
      setSortMode('price-desc')
    } else {
      setSortMode('none')
    }
  }

  // Logika Filter (Pencarian Nama & Tipe Produk)
  let filteredGuns = GUNS.filter((gun) => {
    const matchesSearch = gun.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'All' || gun.type === selectedType
    return matchesSearch && matchesType
  })

  // Logika Pengurutan berdasarkan nilai sortMode aktif
  if (sortMode === 'name-asc') {
    filteredGuns.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortMode === 'name-desc') {
    filteredGuns.sort((a, b) => b.name.localeCompare(a.name))
  } else if (sortMode === 'price-asc') {
    filteredGuns.sort((a, b) => a.price - b.price)
  } else if (sortMode === 'price-desc') {
    filteredGuns.sort((a, b) => b.price - a.price)
  }

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

          {/* Tombol Toggle Pengurutan Nama */}
          <button
            type="button"
            className={sortMode.startsWith('name') ? 'toggle-btn active' : 'toggle-btn'}
            onClick={toggleSortName}
          >
            Sort Name: {sortMode === 'name-asc' ? 'A → Z' : sortMode === 'name-desc' ? 'Z → A' : 'Default'}
          </button>

          {/* Tombol Toggle Pengurutan Harga */}
          <button
            type="button"
            className={sortMode.startsWith('price') ? 'toggle-btn active' : 'toggle-btn'}
            onClick={toggleSortPrice}
          >
            Sort Price: {sortMode === 'price-asc' ? 'Low → High' : sortMode === 'price-desc' ? 'High → Low' : 'Default'}
          </button>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{filteredGuns.length} pieces</span>
        </div>

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