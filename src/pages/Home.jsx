import React from "react";
import Layout from "../components/Layout";
import AnimatedHeading from "../components/AnimatedHeading";
import ContentBox from "../components/ContentBox";
import SpeechToTextAndCloudFlare from "../components/SpeechToTextAndCloudFlare";

function Home() {
  return (
    <Layout>
      {/* Page Title */}
      <AnimatedHeading text="Welcome to the AI-Driven Speech Therapy App" />

      {/* Solution Box */}
      <ContentBox title="Our Solution">
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>AI-powered voice recognition to assess speech patterns</li>
          <li>Gamified exercises to motivate consistent practice</li>
          <li>Progress tracking with personalized feedback</li>
          <li>Stress and emotion tracking using MongoDB</li>
          <li>Robust cybersecurity measures to protect sensitive data</li>
        </ul>
      </ContentBox>

      {/* Chatbot Section */}
      <div className="mt-10 w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 border-4 border-orange-300">
        <SpeechToTextAndCloudFlare />
      </div>
    </Layout>
  );
}

export default Home;
