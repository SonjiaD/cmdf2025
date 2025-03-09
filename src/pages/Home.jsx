import React from "react";
import Layout from "../components/Layout";
import AnimatedHeading from "../components/AnimatedHeading";
import ContentBox from "../components/ContentBox";
import CloudFlare from "../components/CloudFlare";
import SpeechToTextAndCloudFlare from "./SpeechToTextAndCloudFlare";
import './pages/Home.css' ;

function Home() {
  function Home() {
    return (
      <div className="home-container">
        <Layout>
          <AnimatedHeading text="Welcome to the AI-Driven Speech Therapy App" />
  
          <ContentBox title="Our Solution">
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>AI-powered voice recognition to assess speech patterns</li>
              <li>Gamified exercises to motivate consistent practice</li>
              <li>Progress tracking with personalized feedback</li>
              <li>Stress and emotion tracking using MongoDB</li>
              <li>Robust cybersecurity measures to protect sensitive data</li>
            </ul>
          </ContentBox>
  
          <div className="mt-10 w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 border-4 border-orange-300">
            <h2 className="text-2xl font-semibold text-orange-500 mb-4 text-center">
              Chat with Our AI Speech Therapy Assistant
            </h2>
            <SpeechToTextAndCloudFlare />
          </div>
        </Layout>
      </div>
    );
  }
}  

export default Home;
