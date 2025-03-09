import React from "react";
import Layout from "../components/Layout";
import AnimatedHeading from "../components/AnimatedHeading";
import ContentBox from "../components/ContentBox";
import SpeechToTextAndCloudFlare from "../components/SpeechToTextAndCloudFlare";
import myImage from '/src/assets/main logo.svg';
import "./Home.css";

function Home() {
  return (
    <Layout>
      {/* Page Title Section */}
      <div className="container">
      <div className="text-container">
        <AnimatedHeading className="title-subtitle" text="Welcome to the AI-Driven Speech Therapy App" />
        <p className="intro-text">This app helps users with speech therapy, tracking emotional changes and stress levels to provide personalized feedback and improve speech quality.</p>
      </div>
      <div className="icon-container">
        <img src={myImage} alt="Logo" className="logo-image" />
      </div>
    </div>


{/* Middle Rotating Banner Section */}
<div className="middle-banner">
</div>


      {/* Solution Section */}
      <div className="solutions-container">
        <section className="solution-header">
          {/* <h2 className="solution-title">Our Approach</h2> */}
          <p className="solution-description">
            Explore how we leverage cutting-edge technology to provide personalized, effective, and engaging solutions.
          </p>
        </section>

        <div className="solution-list">
          <div className="solution-row">
            <div className="solution-item">
              <h3 className="solution-item-title">Speech Recognition</h3>
              <p className="solution-item-description">
                Harnessing AI-powered voice recognition to analyze speech patterns and provide real-time feedback.
              </p>
            </div>
            <div className="solution-item">
              <h3 className="solution-item-title">Gamified Learning</h3>
              <p className="solution-item-description">
                Engaging exercises designed to motivate consistent practice through interactive challenges.
              </p>
            </div>
          </div>

          <div className="solution-row">
            <div className="solution-item">
              <h3 className="solution-item-title">Personalized Progress</h3>
              <p className="solution-item-description">
                Track your speech improvement with custom feedback tailored to your needs and growth.
              </p>
            </div>
            <div className="solution-item">
              <h3 className="solution-item-title">Emotion & Stress Tracking</h3>
              <p className="solution-item-description">
                Monitor emotional and stress levels using real-time data, providing a holistic approach to therapy.
              </p>
            </div>
          </div>

          {/* <div className="solution-row">
            <div className="solution-item">
              <h3 className="solution-item-title">Data Security</h3>
              <p className="solution-item-description">
                Advanced cybersecurity protocols to protect sensitive patient data and ensure privacy.
              </p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Chatbot Section */}
      <div className="mt-10 w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 border-4 border-orange-300">
        <SpeechToTextAndCloudFlare />
      </div>
    </Layout>
  );
}

export default Home;
