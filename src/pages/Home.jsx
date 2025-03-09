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
      {/* Page Title */}

      <div className="title-container">
      <div className="text-container">
        <AnimatedHeading className="title" text="Welcome to Pr0nunc!ate" />
        <AnimatedHeading className="title-subtitle" text="Welcome to the AI-Driven Speech Therapy App" />
      </div>
      <img src={myImage} alt="Logo" style={{ width: '200px', height: 'auto' }} />
    </div>

      


{/* Solution Box */}
<div className="solution-Box">
  <ContentBox className="list-title" title="Our Solution">
    <ul className="list-disc list-inside text-gray-600 space-y-2 list-desc">
      <li>AI-powered voice recognition to assess speech patterns</li>
      <li>Gamified exercises to motivate consistent practice</li>
      <li>Progress tracking with personalized feedback</li>
      <li>Stress and emotion tracking using MongoDB</li>
      <li>Robust cybersecurity measures to protect sensitive data</li>
    </ul>
  </ContentBox>
</div>

     

      {/* Chatbot Section */}
      <div className="mt-10 w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 border-4 border-orange-300">
        <SpeechToTextAndCloudFlare />
      </div>
    </Layout>
  );
}

export default Home;
