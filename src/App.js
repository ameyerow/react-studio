import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function BakeryItem(item, addBakeryItemToCart) {
  return ( 
    <div class="BakeryItem">
      <img src={item.image} alt={item.name}></img>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <div>
        <p>{item.price}</p>
        <button onClick={() => addBakeryItemToCart(item.name, item.price)}>Add to Cart</button>
      </div>
    </div>
  );
}

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [totalCheckoutPrice, setTotalCheckoutPrice] = useState(0);
  const [checkoutItems, setCheckoutItems] = useState(new Map());

  const addBakeryItemToCart = (name, price) => {  
    let items = new Map(checkoutItems);
    if (items.has(name)) {
      items.set(name, items.get(name) + 1);
    } else {
      items.set(name, 1);
    }
    setCheckoutItems(items);
    setTotalCheckoutPrice(totalCheckoutPrice + price);
  }

  return (
    <div className="App">
      <div class="bakery">
        <h1>My Bakery</h1> {/* TODO: personalize your bakery (if you want) */}

        <div class="gallery-container">
          {bakeryData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
            BakeryItem(item, addBakeryItemToCart) // replace with BakeryItem component
          ))}
        </div>
      </div>
      
      <div>
        <div className="cart">
          <h2>Cart</h2>
          {/* TODO: render a list of items in the cart */}
          {[...checkoutItems].map(([name, numItems]) => (
            <p>{name} x {numItems}</p>
          ))}
          <p>Total: ${totalCheckoutPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
