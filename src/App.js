import { useEffect, useState } from "react";

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

  useEffect(function () {
    setProducts([...initialProducts]);
  }, []);

  // console.log(products);

  return (
    <>
      <Navbar />
      <div className="mt-small">
        <PageLayout products={products} />
      </div>
    </>
  );
}

function Navbar() {
  return (
    <div className="navbar">
      <Logo />
      <Search />
    </div>
  );
}

function PageLayout({ products }) {
  return (
    <div className="app-layout">
      <Filter />
      <Product products={products} />
      <Cart />
    </div>
  );
}

function Filter() {
  return (
    <div className="filter">
      <Headings>Filter</Headings>
    </div>
  );
}

function Product({ products }) {
  return (
    <div className="product">
      <Headings>Products</Headings>
      <ProductContainer products={products} />
      {/* <AddButton /> */}
    </div>
  );
}

function ProductContainer({ products }) {
  return (
    <ul className="product-list-container mt-small">
      {products.map((product, i) => {
        return <ProductList product={product} key={i} />;
      })}
    </ul>
  );
}

function ProductList({ product }) {
  console.log(product);

  return (
    <li className="product-list">
      <div className="product-container">
        <h2 className="product-heading">{product.heading}</h2>
        {/* <img className="product-img" src="" /> */}
        <span className="product-price">Price: ${product.price}</span>
        <p className="product-desc">{product.description}</p>

        <AddButton />
      </div>
    </li>
  );
}

function AddButton() {
  return <button className="add-btn">Add to cart</button>;
}

function Cart() {
  return (
    <div className="cart">
      <Headings>Cart</Headings>
    </div>
  );
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
