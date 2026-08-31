"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import OnboardingDiagnosisScreen from "@/components/OnboardingDiagnosisScreen";
import OnboardingVoiceScreen from "@/components/OnboardingVoiceScreen";
import OnboardingPestScreen from "@/components/OnboardingPestScreen";
import OnboardingWeatherScreen from "@/components/OnboardingWeatherScreen";
import SplashScreen from "@/components/SplashScreen";

export default function OnboardingPage() {
  const [showSplash, setShowSplash] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const router = useRouter();

  // Redirect if user is already logged in
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("agrivani_is_logged_in") === "true";
      const userRole = localStorage.getItem("agrivani_user_role");
      if (isLoggedIn) {
        if (userRole === "officer" || userRole === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/home");
        }
      }
    }
  }, [router]);

  const handleFinish = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("agrivani_onboarded", "true");
    }
    router.push("/auth");
  };

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const steps = [
    {
      key: "step-diagnosis",
      component: (
        <OnboardingDiagnosisScreen
          onNext={() => goToStep(1)}
          onSkip={handleFinish}
        />
      ),
    },
    {
      key: "step-voice",
      component: (
        <OnboardingVoiceScreen
          onNext={() => goToStep(2)}
          onBack={() => goToStep(0)}
          onSkip={handleFinish}
        />
      ),
    },
    {
      key: "step-pest",
      component: (
        <OnboardingPestScreen
          onNext={() => goToStep(3)}
          onBack={() => goToStep(1)}
          onSkip={handleFinish}
        />
      ),
    },
    {
      key: "step-weather",
      component: (
        <OnboardingWeatherScreen
          onNext={handleFinish}
          onBack={() => goToStep(2)}
          onSkip={handleFinish}
        />
      ),
    },
  ];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full min-h-screen h-[100dvh] bg-[#F5F4EE] flex flex-col justify-between overflow-hidden relative">
      {/* 1. Underlying Onboarding Steps */}
      <div className="w-full h-full flex flex-col flex-1 relative min-h-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={steps[currentStep].key}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full h-full flex flex-col flex-1 min-h-0"
          >
            {steps[currentStep].component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Seamless Splash Overlay with Cinematic Dissolve */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash-overlay"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.03,
              filter: "blur(8px)",
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 z-50 bg-[#F5F4EE] flex flex-col"
          >
            <SplashScreen
              onComplete={() => setShowSplash(false)}
              durationMs={2800}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
