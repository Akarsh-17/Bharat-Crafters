import React from 'react';
import './home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* <nav className="navbar">
                <div className="logo">ArtisanHub</div>
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li><a href="#testimonials">Testimonials</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#login" className="login-button">Login</a></li>
                </ul>
            </nav> */}
            <header className="hero-section">
    <div className="hero-background"></div>
    <div className="hero-section-text-section">
        <h1>Welcome to ArtisanHub</h1>
        <p>Empowering Local Artisans and MSMEs</p>
        <button className="hero-button">Start Selling</button>
    </div>
</header>
            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="products">
                    <div className="product-card">
                        <img src="product1.jpg" alt="Product 1" />
                        <h3>Handcrafted Pottery</h3>
                        <p>by Artisan A</p>
                    </div>
                    <div className="product-card">
                        <img src="product2.jpg" alt="Product 2" />
                        <h3>Handwoven Basket</h3>
                        <p>by Artisan B</p>
                    </div>
                    <div className="product-card">
                        <img src="product3.jpg" alt="Product 3" />
                        <h3>Organic Soap</h3>
                        <p>by MSME C</p>
                    </div>
                </div>
            </section>
            <section className="how-it-works" id="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <h3>Step 1</h3>
                        <p>Register as a seller and create your profile.</p>
                    </div>
                    <div className="step">
                        <h3>Step 2</h3>
                        <p>List your handmade products with detailed descriptions and photos.</p>
                    </div>
                    <div className="step">
                        <h3>Step 3</h3>
                        <p>Start selling and manage your orders from our dashboard.</p>
                    </div>
                </div>
            </section>
            <section className="testimonials" id="testimonials">
                <h2>What Our Sellers Say</h2>
                <div className="testimonials-container">
                    <div className="testimonial">
                        <p>"ArtisanHub has helped me reach a wider audience and grow my business!"</p>
                        <h4>- Artisan A</h4>
                    </div>
                    <div className="testimonial">
                        <p>"The platform is user-friendly and the support team is fantastic."</p>
                        <h4>- Artisan B</h4>
                    </div>
                    <div className="testimonial">
                        <p>"Thanks to ArtisanHub, my handcrafted items are now available globally."</p>
                        <h4>- MSME C</h4>
                    </div>
                </div>
            </section>
            <section className="join-community" id="join">
                <h2>Join Our Community</h2>
                <p>Connect with other local artisans, share your experiences, and collaborate on projects.</p>
                <button className="join-button">Join Now</button>
            </section>
            <footer className="footer">
                <p>&copy; 2024 ArtisanHub. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="#privacy">Privacy Policy</a></li>
                    <li><a href="#terms">Terms of Service</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default Home;

