import { useState } from 'react';
import './ProductList.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const [showCart, setShowCart] = useState(false);

    const plantCategories = [
  {
    category: "Air Purifying Plants",
    plants: [
      { name, image, price, description },
      { name, image, price, description }
    ]
  },
  {
    category: "Aromatic Plants",
    plants: [
      { ... },
      { ... }
    ]
  },
  {
    category: "Medicinal Plants",
    plants: [
      { ... },
      { ... }
    ]
  }
];


    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            {/* Navbar */}
            <div className="navbar">
                <div className="tag">
                    <div className="luxury">
                        <img
                            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                            alt="logo"
                        />
                        <a href="/" onClick={handleHomeClick}>
                            <div style={{ marginLeft: '40px' }}>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="ul">
                    <div>
                        <a href="#" onClick={handlePlantsClick}>Plants</a>
                    </div>

                    <div>
                        <a href="#" onClick={handleCartClick}>
                            <h1 className="cart">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="50" width="50">
                                    <circle cx="80" cy="216" r="12"></circle>
                                    <circle cx="184" cy="216" r="12"></circle>
                                    <path
                                        d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                        fill="none"
                                        stroke="#faf9f9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                    />
                                </svg>
                                <span className="cart_quantity_count">{totalItems}</span>
                            </h1>
                        </a>
                    </div>
                </div>
            </div>

            {/* Page Content */}
            {!showCart ? (
                <div className="product-grid">

                    {/* Category Title */}
                    <div className="plantname_heading">
                        <h2 className="plant_heading">Air Purifying Plants</h2>
                    </div>
                    <div className="product-list">
                        {plantCategories.map(cat => (
  							<div key={cat.category}>
    							<h2 className="plant_heading">{cat.category}</h2>

    							<div className="product-list">
      								{cat.plants.map(plant => (
        							<div key={plant.name} className="product-card">
          								<h4>{plant.name}</h4>
          								<img src={plant.image} alt={plant.name} />
          								<p>${plant.price}</p>
          								<button
            							disabled={cart.some(i => i.name === plant.name)}
            							onClick={() => dispatch(addItem({
              							name: plant.name,
              							cost: plant.price,
              							image: plant.image,
            							}))}
          								>
            							{cart.some(i => i.name === plant.name)
              							? "Added to Cart"
              							: "Add to Cart"}
          								</button>
       							 	</div>
      								))}
    							</div>
  							</div>
							))}
                    	</div>
                	</div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
