"use client";

import { useState } from "react";
import { FiSun, FiMoon, FiGithub, FiPackage, FiCopy } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

import {
  MagneticButton,
  ElasticStretchButton,
  NeonGlowButton,
  DepthPerceptionButton,
  BouncyButton,
  LiquidFillButton,
  GhostTrailButton,
  ShatterButton,
  OrbitingButton,
  MagneticRepelButton,
  FrictionButton,
  HoverRippleButton,
  PixelateButton,
  LavaLampButton,
  ExplodingConfettiButton,
} from "@basatmaqsood/react-buttons";

export default function ButtonShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyInstallCmd = async () => {
    await navigator.clipboard.writeText("npm i @basatmaqsood/react-icons");
    toast.info("Command copied to clipboard!");
    // setCopied(true);
    // setTimeout(() => setCopied(false), 2000);
  };

  const categories = [
    { id: "all", name: "All Buttons" },
    { id: "interactive", name: "Interactive" },
    { id: "animated", name: "Animated" },
    { id: "hover", name: "Hover Effects" },
    { id: "click", name: "Click Effects" },
    { id: "physics", name: "Physics-based" },
  ];

  const CopyCode = function (text: string) {
    navigator.clipboard.writeText(text);
    // alert("Code copied to clipboard!");
    toast.info("Code copied to clipboard!");
  };

  const buttons = [
    {
      id: "magnetic",
      name: "Magnetic Button",
      component: (
        <MagneticButton
          strength={60}
          radius={120}
          // backgroundColor={darkMode ? "#4f46e5" : "#6366f1"}
          className="w-40 h-12"
        >
          Magnetic Pull
        </MagneticButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { MagneticButton } from "@basatmaqsood/react-buttons"; */}
      <MagneticButton
          strength={60}
          radius={120}
          // backgroundColor={darkMode ? "#4f46e5" : "#6366f1"}
          className="w-40 h-12"
        >
          Magnetic Pull
        </MagneticButton>`,
      description: "Attracts to cursor movements with a magnetic pull effect",
      categories: ["interactive", "hover", "physics"],
    },
    {
      id: "elastic",
      name: "Elastic Stretch",
      component: (
        <ElasticStretchButton
          stretchAmount={1.2}
          direction="both"
          backgroundColor={darkMode ? "#9333ea" : "#a855f7"}
          className="w-40 h-12"
        >
          Stretch Me
        </ElasticStretchButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { ElasticStretchButton } from "@basatmaqsood/react-buttons"; */}
      <ElasticStretchButton
          stretchAmount={1.2}
          direction="both"
          backgroundColor={darkMode ? "#9333ea" : "#a855f7"}
          className="w-40 h-12"
        >
          Stretch Me
        </ElasticStretchButton>`,
      description: "Stretches elastically when hovered",
      categories: ["hover", "animated"],
    },
    {
      id: "neon",
      name: "Neon Glow",
      component: (
        <NeonGlowButton
          glowColor="#00ffff"
          glowIntensity={1.5}
          backgroundColor={darkMode ? "#0f172a" : "#1e293b"}
          className="w-40 h-12"
        >
          Neon Glow
        </NeonGlowButton>
      ),
      code: `
      
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { NeonGlowButton } from "@basatmaqsood/react-buttons"; */}
      <NeonGlowButton
          glowColor="#00ffff"
          glowIntensity={1.5}
          backgroundColor={darkMode ? "#0f172a" : "#1e293b"}
          className="w-40 h-12"
        >
          Neon Glow
        </NeonGlowButton>`,
      description: "Vibrant neon glow effect on hover",
      categories: ["hover"],
    },
    {
      id: "depth",
      name: "3D Depth",
      component: (
        <DepthPerceptionButton
          rotationAngle={20}
          depth={40}
          backgroundColor={darkMode ? "#ea580c" : "#f97316"}
          className="w-40 h-12"
        >
          3D Button
        </DepthPerceptionButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { DepthPerceptionButton } from "@basatmaqsood/react-buttons"; */}
      <DepthPerceptionButton
          rotationAngle={20}
          depth={40}
          backgroundColor={darkMode ? "#ea580c" : "#f97316"}
          className="w-40 h-12"
        >
          3D Button
        </DepthPerceptionButton>`,
      description: "3D depth perception that responds to mouse movements",
      categories: ["interactive", "hover", "physics"],
    },
    {
      id: "bouncy",
      name: "Bouncy Button",
      component: (
        <BouncyButton
          bounceHeight={25}
          bounceCount={3}
          backgroundColor={darkMode ? "#0284c7" : "#0ea5e9"}
          className="w-40 h-12"
        >
          Bounce!
        </BouncyButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { BouncyButton } from "@basatmaqsood/react-buttons"; */}
      <BouncyButton
          bounceHeight={25}
          bounceCount={3}
          backgroundColor={darkMode ? "#0284c7" : "#0ea5e9"}
          className="w-40 h-12"
        >
          Bounce!
        </BouncyButton>`,
      description: "Bounces when clicked with customizable physics",
      categories: ["click", "animated", "physics"],
    },
    {
      id: "liquid",
      name: "Liquid Fill",
      component: (
        <LiquidFillButton
          liquidColor={darkMode ? "#f97316" : "#fb923c"}
          fillDirection="center"
          backgroundColor="transparent"
          textColor={darkMode ? "#f97316" : "#fb923c"}
          hoverTextColor="#fff"
          className="w-40 h-12 border-2 border-orange-400"
        >
          Liquid Fill
        </LiquidFillButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { LiquidFillButton } from "@basatmaqsood/react-buttons"; */}
      <LiquidFillButton
          liquidColor={darkMode ? "#f97316" : "#fb923c"}
          fillDirection="center"
          backgroundColor="transparent"
          textColor={darkMode ? "#f97316" : "#fb923c"}
          hoverTextColor="#fff"
          className="w-40 h-12 border-2 border-orange-400"
        >
          Liquid Fill
        </LiquidFillButton>`,
      description: "Fills with a liquid-like animation on hover",
      categories: ["hover", "animated"],
    },
    {
      id: "ghost",
      name: "Ghost Trail",
      component: (
        <GhostTrailButton
          trailColor="rgba(255, 255, 255, 0.6)"
          trailDuration={1}
          backgroundColor={darkMode ? "#7c3aed" : "#8b5cf6"}
          className="w-40 h-12"
        >
          Ghost Trail
        </GhostTrailButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { GhostTrailButton } from "@basatmaqsood/react-buttons"; */}
      <GhostTrailButton
          trailColor="rgba(255, 255, 255, 0.6)"
          trailDuration={1}
          backgroundColor={darkMode ? "#7c3aed" : "#8b5cf6"}
          className="w-40 h-12"
        >
          Ghost Trail
        </GhostTrailButton>`,
      description: "Leaves ghost trails when the mouse moves over it",
      categories: ["interactive", "hover"],
    },
    {
      id: "shatter",
      name: "Shatter Effect",
      component: (
        <ShatterButton
          shatterSpeed={0.6}
          shardCount={20}
          backgroundColor={darkMode ? "#be185d" : "#db2777"}
          className="w-40 h-12"
        >
          Shatter!
        </ShatterButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { ShatterButton } from "@basatmaqsood/react-buttons"; */}
      <ShatterButton
          shatterSpeed={0.6}
          shardCount={20}
          backgroundColor={darkMode ? "#be185d" : "#db2777"}
          className="w-40 h-12"
        >
          Shatter!
        </ShatterButton>`,
      description: "Shatters into pieces when clicked",
      categories: ["click", "animated"],
    },
    {
      id: "orbiting",
      name: "Orbiting Button",
      component: (
        <OrbitingButton
          orbitSpeed={4}
          orbitSize={60}
          onClickEffect="converge"
          orbitCount={8}
          backgroundColor={darkMode ? "#1e293b" : "#334155"}
          className="w-40 h-12"
        >
          Orbit
        </OrbitingButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { OrbitingButton } from "@basatmaqsood/react-buttons"; */}
      <OrbitingButton
          orbitSpeed={4}
          orbitSize={60}
          onClickEffect="converge"
          orbitCount={8}
          backgroundColor={darkMode ? "#1e293b" : "#334155"}
          className="w-40 h-12"
        >
          Orbit
        </OrbitingButton>`,
      description: "Particles orbit around the button",
      categories: ["interactive", "animated", "physics"],
    },
    {
      id: "repel",
      name: "Magnetic Repel",
      component: (
        <MagneticRepelButton
          repelStrength={0.7}
          maxDisplacement={40}
          backgroundColor={darkMode ? "#0f766e" : "#14b8a6"}
          className="w-40 h-12"
        >
          Repel Me
        </MagneticRepelButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { MagneticRepelButton } from "@basatmaqsood/react-buttons"; */}
      <MagneticRepelButton
          repelStrength={0.7}
          maxDisplacement={40}
          backgroundColor={darkMode ? "#0f766e" : "#14b8a6"}
          className="w-40 h-12"
        >
          Repel Me
        </MagneticRepelButton>`,
      description: "Repels away from the cursor",
      categories: ["interactive", "hover", "physics"],
    },
    {
      id: "friction",
      name: "Friction Button",
      component: (
        <FrictionButton
          friction={0.9}
          maxDistance={150}
          backgroundColor={darkMode ? "#475569" : "#64748b"}
          className="w-40 h-12"
        >
          Drag Me
        </FrictionButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { FrictionButton } from "@basatmaqsood/react-buttons"; */}
      <FrictionButton
          friction={0.9}
          maxDistance={150}
          backgroundColor={darkMode ? "#475569" : "#64748b"}
          className="w-40 h-12"
        >
          Drag Me
        </FrictionButton>`,
      description: "Can be dragged with physics-based friction",
      categories: ["interactive", "physics"],
    },
    {
      id: "ripple",
      name: "Hover Ripple",
      component: (
        <HoverRippleButton
          rippleColor="rgba(255, 255, 255, 0.7)"
          rippleSize={120}
          backgroundColor={darkMode ? "#1d4ed8" : "#2563eb"}
          className="w-40 h-12"
        >
          Ripple Effect
        </HoverRippleButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { HoverRippleButton } from "@basatmaqsood/react-buttons"; */}
      <HoverRippleButton
          rippleColor="rgba(255, 255, 255, 0.7)"
          rippleSize={120}
          backgroundColor={darkMode ? "#1d4ed8" : "#2563eb"}
          className="w-40 h-12"
        >
          Ripple Effect
        </HoverRippleButton>`,
      description: "Creates ripples as you move your cursor across it",
      categories: ["interactive", "hover"],
    },
    {
      id: "pixelate",
      name: "Pixelate Button",
      component: (
        <PixelateButton
          pixelSize={10}
          pixelSpeed={1.2}
          backgroundColor={darkMode ? "#4338ca" : "#4f46e5"}
          className="w-40 h-12"
        >
          Pixelate
        </PixelateButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { PixelateButton } from "@basatmaqsood/react-buttons"; */}
      <PixelateButton
          pixelSize={10}
          pixelSpeed={1.2}
          backgroundColor={darkMode ? "#4338ca" : "#4f46e5"}
          className="w-40 h-12"
        >
          Pixelate
        </PixelateButton>`,
      description: "Pixelates and dissolves when clicked",
      categories: ["click", "animated"],
    },
    {
      id: "lava",
      name: "Lava Lamp",
      component: (
        <LavaLampButton
          waveSpeed={0.8}
          blobSize={0.7}
          blobCount={6}
          primaryColor={darkMode ? "#f59e0b" : "#fbbf24"}
          secondaryColor={darkMode ? "#d97706" : "#f59e0b"}
          // borderWidth={0}
          className="w-40 h-12"
        >
          Lava Effect
        </LavaLampButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { LavaLampButton } from "@basatmaqsood/react-buttons"; */}
      <LavaLampButton
          waveSpeed={0.8}
          blobSize={0.7}
          blobCount={6}
          primaryColor={darkMode ? "#f59e0b" : "#fbbf24"}
          secondaryColor={darkMode ? "#d97706" : "#f59e0b"}
          // borderWidth={0}
          className="w-40 h-12"
        >
          Lava Effect
        </LavaLampButton>`,
      description: "Mesmerizing lava lamp fluid animations",
      categories: ["animated", "interactive"],
    },
    {
      id: "confetti",
      name: "Confetti Button",
      component: (
        <ExplodingConfettiButton
          confettiCount={150}
          explosionForce={1.2}
          backgroundColor={darkMode ? "#1e293b" : "#334155"}
          className="w-40 h-12"
        >
          Celebrate!
        </ExplodingConfettiButton>
      ),
      code: `
      {/* Run this in terminal : npm i @basatmaqsood/react-icons */}
      {/* Add import Statement on top of file : import { ExplodingConfettiButton } from "@basatmaqsood/react-buttons"; */}
      <ExplodingConfettiButton
          confettiCount={150}
          explosionForce={1.2}
          backgroundColor={darkMode ? "#1e293b" : "#334155"}
          className="w-40 h-12"
        >
          Celebrate!
        </ExplodingConfettiButton>`,
      description: "Explodes with colorful confetti when clicked",
      categories: ["click", "animated"],
    },
  ];

  const filteredButtons =
    activeCategory === "all"
      ? buttons
      : buttons.filter((button) => button.categories.includes(activeCategory));

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Hero Section */}
      {/* <div
        className={`relative overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 ${
              darkMode
                ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-20"
                : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
            }`}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className={`text-4xl md:text-5xl font-extrabold tracking-tight ${
                darkMode ? "text-white" : "text-gray-900"
              } sm:text-6xl`}
            >
              <span className="block mb-3">@basatmaqsood/react-buttons</span>
              <span
                className={`block ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                Showcase
              </span>
            </h1>
            <p
              className={`mt-6 max-w-lg mx-auto text-xl ${
                darkMode ? "text-gray-300" : "text-gray-500"
              } sm:max-w-3xl`}
            >
              Explore My collection of beautiful, interactive, and animated
              buttons for your next web project.
            </p>
            <div className="mt-10 flex sm:flex-row gap-4 flex-col justify-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                  darkMode
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                } transition-all duration-300`}
              >
                {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </button>
              <a
                href="https://www.npmjs.com/package/@basatmaqsood/react-buttons"
                target="_blank"
                className={`px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                  darkMode
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                } transition-all duration-300`}
              >
                Use these Cool Buttons
              </a>
            </div>
          </div>
        </div>
      </div> */}

      <div
        className={`relative overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 ${
              darkMode
                ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-20"
                : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
            }`}
          ></div>
        </div>

        {/* Navbar */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1
            className={`text-lg font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            @basatmaqsood/react-buttons
          </h1>
          <div className="flex gap-4 items-center">
            <a
              href="https://github.com/basatmaqsood/react-buttons"
              target="_blank"
              className="hover:opacity-80 transition"
            >
              <FiGithub
                className={`w-5 h-5 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              />
            </a>
            <a
              href="https://www.npmjs.com/package/@basatmaqsood/react-buttons"
              target="_blank"
              className="hover:opacity-80 transition"
            >
              <FiPackage
                className={`w-5 h-5 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              />
            </a>
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <FiSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className={`text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="block mb-3">@basatmaqsood/react-buttons</span>
              <span
                className={`block ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                Beautiful & Animated Buttons
              </span>
            </h1>
            <p
              className={`mt-6 mb-6 mx-auto text-lg sm:text-xl max-w-2xl ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Explore my hand-crafted collection of responsive, interactive, and
              animated buttons for your next React project.
            </p>
            <a
              className={`px-2 py-1 mx-auto text-lg sm:text-xl max-w-2xl ${
                darkMode ? "text-gray-800 bg-white" : "bg-indigo-600 text-white"
              }`}
              href="https://www.basatmaqsood.live"
              target="_blank"
            >
              Visit Developer
            </a>
          </div>
        </div>

        {/* Steps Section */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 pb-16">
          <div className="grid gap-10 md:grid-cols-3 text-center">
            {/* Step 1 */}
            <div>
              <h2
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Step 1: Install Package with this command
              </h2>
              <div
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-mono border ${
                  darkMode
                    ? "bg-gray-900 text-indigo-400 border-gray-700"
                    : "bg-gray-100 text-gray-800 border-gray-300"
                }`}
              >
                <span>npm i @basatmaqsood/react-icons</span>
                <button
                  onClick={copyInstallCmd}
                  className="ml-2 hover:opacity-80"
                >
                  <FiCopy className="w-4 h-4" />
                </button>
              </div>
              {copied && <p className="text-green-400 mt-2 text-sm">Copied!</p>}
            </div>

            {/* Step 2 */}
            <div>
              <h2
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Step 2: Copy Component Code
              </h2>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Choose the component you like and click the copy icon next to
                it.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <h2
                className={`text-xl font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Step 3: Use & Customize the buttons
              </h2>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Paste the code into your React app and tweak styles or props as
                needed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <div className="flex items-center space-x-2 md:space-x-4 py-4 min-w-max px-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-2 text-sm md:text-base font-medium rounded-md whitespace-nowrap transition-all duration-200 ${
                    activeCategory === category.id
                      ? darkMode
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-100 text-indigo-700"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Button Grid */}
      <div className={`${darkMode ? "bg-gray-900" : "bg-gray-50"} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredButtons.map((button) => (
              <div
                key={button.id}
                className={`flex flex-col items-center justify-center p-8 rounded-xl shadow-lg transform transition-all duration-300  ${
                  darkMode
                    ? "bg-gray-800 hover:shadow-indigo-500/20"
                    : "bg-white hover:shadow-xl"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {button.name}
                </h3>
                <div className="h-24 flex items-center justify-center mb-6">
                  {button.component}
                </div>
                <p
                  className={`text-center mb-2 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {button.description}
                </p>
                <button
                  onClick={() => CopyCode(`${button?.code}`)}
                  className={`px-2 py-1 mt-4 border border-transparent text-base font-bold rounded-sm ${
                    darkMode
                      ? "bg-white text-gray-900 hover:bg-gray-100"
                      : "bg-gray-900 text-gray-100 hover:bg-gray-800"
                  } transition-all duration-300`}
                >
                  Copy Code
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? "bg-gray-800" : "bg-white"} py-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p
              className={`text-base ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Made with <span className="text-red-500">❤️</span> using{" "}
              <a
                href="https://www.npmjs.com/package/@basatmaqsood/react-buttons"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium ${
                  darkMode
                    ? "text-indigo-400 hover:text-indigo-300"
                    : "text-indigo-600 hover:text-indigo-500"
                }`}
              >
                @basatmaqsood/react-buttons
              </a>
            </p>
            <p
              className={`mt-4 text-sm mb-2 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              © {new Date().getFullYear()} Basat Maqsood. All rights reserved.
            </p>
            <a
              href="https://www.basatmaqsood.live"
              target="_blank"
              className={` text-md  ${
                darkMode ? "text-gray-500" : "text-gray-400"
              } `}
            >
              Visit Developer
            </a>
          </div>
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
}
