import { useEffect, useState, memo } from "react";

const initialProducts = [
  {
    heading: "Wireless Earbuds",
    description: "Compact and clear sound quality.",
    price: 49.99,
    quantity: 150,
    addToCart: false,
  },
  {
    heading: "Gaming Keyboard",
    description: "RGB backlit with mechanical keys.",
    price: 79.99,
    quantity: 200,
    addToCart: false,
  },
  {
    heading: "Smartwatch",
    description: "Track fitness with style and ease.",
    price: 199.99,
    quantity: 100,
    addToCart: false,
  },
  {
    heading: "Laptop Stand",
    description: "Ergonomic design for better posture.",
    price: 29.99,
    quantity: 300,
    addToCart: false,
  },
  {
    heading: "Bluetooth Speaker",
    description: "Portable with deep bass sound.",
    price: 59.99,
    quantity: 120,
    addToCart: false,
  },
  {
    heading: "Fitness Tracker",
    description: "Monitor your activity and sleep.",
    price: 89.99,
    quantity: 80,
    addToCart: false,
  },
];

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(function () {
    setProducts([...initialProducts]);
  }, []);

  // Function Handlers
  function handleCart(product) {
    setCart((c) => [...c, product]);
    // don't do cart.push
    // cart.push(product);
  }

  return (
    <>
      <Navbar />
      <div className="mt-small">
        <PageLayout
          setProducts={setProducts}
          products={products}
          cart={cart}
          onHandleCartProduct={handleCart}
        />
      </div>
    </>
  );
}

const Navbar = memo(function Navbar() {
  return (
    <div className="navbar">
      <Logo />
      <Search />
    </div>
  );
});

function PageLayout({ products, setProducts, cart, onHandleCartProduct }) {
  const [val, setVal] = useState(250);

  function handleRange(e) {
    setVal(e.target.value);
  }

  function handleSortLow() {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  }

  function handleSortHigh() {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
  }

  return (
    <div className="app-layout">
      <Filter
        val={val}
        onHandleRange={handleRange}
        products={products}
        onHandleSortLow={handleSortLow}
        onHandleSortHigh={handleSortHigh}
      />
      <Product
        products={products}
        onHandleCartProduct={onHandleCartProduct}
        filteredPrice={val}
      />
      <Cart cart={cart} />
    </div>
  );
}

function Filter({
  val,
  onHandleRange,
  onHandleSortLow,
  onHandleSortHigh,
  products,
}) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(250);

  return (
    <div className="filter">
      <Headings>Filter</Headings>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="range">
          <label htmlFor="range">{`Price < than: ${val}`}</label>
          <input
            type="range"
            onChange={(e) => onHandleRange(e)}
            id="range"
            min={min}
            max={max}
            value={val}
          />
        </div>
      </form>

      <SortProductPrice
        products={products}
        onHandleSortHigh={onHandleSortHigh}
        onHandleSortLow={onHandleSortLow}
      />
    </div>
  );
}

const SortProductPrice = memo(function ({
  products,
  onHandleSortLow,
  onHandleSortHigh,
}) {
  function handleLow() {
    onHandleSortLow();
  }

  function handleHigh() {
    onHandleSortHigh();
  }

  return (
    <div>
      <h3>Sort</h3>

      <button className="btn-sort mt-small" onClick={handleLow}>
        Price - low to high
      </button>
      <button className="btn-sort mt-small" onClick={handleHigh}>
        Price - high to low
      </button>
    </div>
  );
});

const Product = memo(function Product({
  products,
  onHandleCartProduct,
  filteredPrice,
}) {
  const filteredProducts = products.filter((p) => {
    return p.price < filteredPrice;
  });

  return (
    <div className="product">
      <Headings>Products</Headings>
      <ProductContainer
        products={filteredProducts}
        onHandleCartProduct={onHandleCartProduct}
      />
    </div>
  );
});

function ProductContainer({ products, onHandleCartProduct }) {
  return (
    <ul className="product-list-container mt-small">
      {products.map((product, i) => {
        return (
          <ProductList
            product={product}
            onHandleCartProduct={onHandleCartProduct}
            key={i}
          />
        );
      })}
    </ul>
  );
}

function ProductList({ product, onHandleCartProduct }) {
  return (
    <li className="product-list">
      <div className="product-container">
        <h2 className="product-heading">{product.heading}</h2>
        {/* <img className="product-img" src="" /> */}
        <span className="product-price">Price: ${product.price}</span>
        <p className="product-desc">{product.description}</p>

        <AddButton
          product={product}
          onHandleCartProduct={onHandleCartProduct}
        />
      </div>
    </li>
  );
}

function AddButton({ product, onHandleCartProduct }) {
  function handleCartProduct() {
    onHandleCartProduct(product);
  }

  return (
    <button onClick={handleCartProduct} className="add-btn">
      Add to cart
    </button>
  );
}

const Cart = memo(function ({ cart }) {
  return (
    <div className="cart">
      <Headings>Cart</Headings>
      <ProductCart cart={cart} />
      <ProductInfo cart={cart} />
    </div>
  );
});

function ProductCart({ cart }) {
  return (
    <ul className="cart-container mt-small">
      {cart.length > 0 ? (
        cart.map((item, i) => {
          return <ProductCartList item={item} key={i} />;
        })
      ) : (
        <Message>Your cart is empty.</Message>
      )}
    </ul>
  );
}

function ProductCartList({ item }) {
  return (
    <li className="cart-list">
      <div>
        <h3>{item.heading}</h3>
        <p>{item.description}</p>
        <span>Price ${item.price}</span>
      </div>
    </li>
  );
}

function ProductInfo({ cart }) {
  const totalCost = cart.reduce(function (acc, p) {
    return acc + p.price;
  }, 0);
  const formattedCost = totalCost.toFixed(2);
  const productQuantity = cart.length;

  return (
    <div className="product-details">
      <h3>
        Total: <span>${formattedCost}</span>
      </h3>
      <h3>
        Product Quantity: <span>{productQuantity}</span>
      </h3>

      <Order />
    </div>
  );
}

function Order() {
  return <button className="order-btn mt-small">Order Now</button>;
}

function Message({ children }) {
  return <p className="message">{children}</p>;
}

function Headings({ children }) {
  return <h1 className="headings">{children}</h1>;
}

function Logo() {
  return <p className="logo">React Ecom</p>;
}

function Search() {
  return (
    <form>
      <input placeholder="Search" />
    </form>
  );
}

export default App;
