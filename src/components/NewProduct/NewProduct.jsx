import React from "react";
import Navbar from "../Navbar/Navbar";

const NewProduct = () => {
  return (
    <>
      <Navbar />
      <section id="pingusvilla" style={{ padding: "2rem", marginTop: "80px" }}>
        <h1>Pingu's Villa</h1>
        <div className="container">
        <img
          src="https://media.istockphoto.com/id/506903162/it/foto/villa-di-lusso-con-piscina.jpg?s=612x612&w=0&k=20&c=dSStX3C7SKwRcS5bWyotD3REj7FKO_rhJLybTi83ZnI="
          alt="Pingu's Villa"
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "auto",
            borderRadius: "12px",
            marginBottom: "1.5rem",
          }}
        />
        <p>
          Welcome to Pingu's Villa — a modern, luxurious escape designed for
          comfort and elegance. Nestled by the coast, this stunning home
          perfectly blends technology and nature for a unique living experience.
        </p>
        </div>
         <div style={{ marginTop: "2rem" }}>
          <h2>Key Features</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "1rem auto", maxWidth: "500px" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>🌊 Ocean View:</strong> Enjoy panoramic sea views from every room.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>🏊 Private Pool:</strong> Relax in a serene, temperature-controlled infinity pool.
            </li>
            <li>
              <strong>🏠 Domotic Home:</strong> Fully automated smart home system for lights, climate, and security.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default NewProduct;