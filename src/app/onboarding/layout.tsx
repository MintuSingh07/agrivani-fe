import React from "react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-[100dvh] h-[100dvh] bg-[#F5F4EE] flex items-center justify-center overflow-hidden">
      {/* Native full viewport on all Mobile & Tablet devices (iPhone SE -> iPad Pro -> Foldables) */}
      <div className="w-full h-full max-w-none md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-between overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
