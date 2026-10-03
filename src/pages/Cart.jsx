function Cart({ cart, onUpdate, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="page">
      <h1 className="display">Your Cart</h1>
      
      {cart.length === 0 ? (
        <p className="lede">Your cart is completely empty. Head to the catalog to add some weapons.</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              
              <div className="cart-item-info">
                <h3 className="name display">{item.name}</h3>
                <p className="price">${item.price.toLocaleString()}</p>
              </div>
              
              <div className="cart-item-actions">
                <button onClick={() => onUpdate(item.name, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdate(item.name, 1)}>+</button>
                <button className="remove-btn" onClick={() => onRemove(item.name)}>Remove</button>
              </div>
            </div>
          ))}
          
          <div className="cart-total">
            <h2 className="display">Total: ${total.toLocaleString()}</h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart