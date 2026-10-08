import React from 'react';
import { Shield, Globe, Award, Users, Compass, Map } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Premium Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-content">
          <div className="hero-badge">Welcome to TourVista</div>
          <h1 className="hero-title">Redefining How You Experience the World</h1>
          <p className="hero-subtitle">
            Your passport to unforgettable journeys, premium travel experiences, and memories that last a lifetime.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section container">
        <div className="grid grid-cols-2 align-items-center">
          <div className="story-text">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem' }}>Our Story</h2>
            <h3 className="story-lead">A Passion for Exploration</h3>
            <p className="story-desc">
              Founded by avid travelers, TourVista set out to elevate the standard of globetrotting. We believe that traveling is more than just checking off destinations—it's about forging profound connections with cultures, tasting new cuisines, and creating breathtaking memories.
            </p>
            <p className="story-desc">
              Over the years, we have meticulously curated exclusive travel experiences that cater to adventurers, romantics, and families. Whether it's a seamless weekend getaway or an epic cross-continental voyage, we handle the intricacies so you can focus on the adventure.
            </p>
            <div className="stats-row mt-4">
              <div className="stat-box">
                <h4 className="stat-number">50+</h4>
                <p className="stat-label">Destinations</p>
              </div>
              <div className="stat-box">
                <h4 className="stat-number">10k+</h4>
                <p className="stat-label">Happy Travelers</p>
              </div>
              <div className="stat-box">
                <h4 className="stat-number">15+</h4>
                <p className="stat-label">Years Experience</p>
              </div>
            </div>
          </div>
          <div className="story-image-wrapper">
            <div className="story-image card">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" alt="Team Travel" className="card-img" style={{ position: 'relative' }} />
            </div>
            <div className="floating-card hover-lift">
              <Compass size={32} color="var(--primary)" />
              <div>
                <h5>Expert Planning</h5>
                <span>Tailored for you</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Why Choose TourVista</h2>
          <p className="section-subtitle">We pride ourselves on offering the highest quality service tailored to your needs.</p>
          
          <div className="grid grid-cols-4">
            <div className="card feature-card">
              <div className="card-body text-center">
                <div className="feature-icon"><Globe size={36} /></div>
                <h3 className="card-title" style={{fontSize: '1.2rem'}}>Global Reach</h3>
                <p className="card-text">We cover beautiful destinations across the globe, ensuring authentic experiences.</p>
              </div>
            </div>
            <div className="card feature-card">
              <div className="card-body text-center">
                <div className="feature-icon"><Shield size={36} /></div>
                <h3 className="card-title" style={{fontSize: '1.2rem'}}>Safe & Secure</h3>
                <p className="card-text">Your safety is our top priority. We partner with reliable transport and elite hotels.</p>
              </div>
            </div>
            <div className="card feature-card">
              <div className="card-body text-center">
                <div className="feature-icon"><Award size={36} /></div>
                <h3 className="card-title" style={{fontSize: '1.2rem'}}>Premium Quality</h3>
                <p className="card-text">From luxury stays to exquisite dining, we demand the best for our travelers.</p>
              </div>
            </div>
            <div className="card feature-card">
              <div className="card-body text-center">
                <div className="feature-icon"><Users size={36} /></div>
                <h3 className="card-title" style={{fontSize: '1.2rem'}}>Expert Guides</h3>
                <p className="card-text">Passionate, knowledgeable guides who breathe life into every monument you visit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
