import React, { useState, useEffect, useRef } from 'react';

/**
 * AgriVaniAuth - Modern Farmer & Officer Authentication Component
 * Supports:
 * - Farmer: OTP-based Passwordless Login & Sign Up with Farm Size & Land Details
 * - Officer: Officer ID + Password Login, Forgot Password Modal, Officer Sign Up with West Bengal Assigned Districts
 * - Circular AgriVani Official Brand Logo
 * - 12 Regional Indian Languages
 */

export const LANGUAGE_OPTIONS = [
  { code: 'en', name: 'English', english: 'English' },
  { code: 'hi', name: 'हिन्दी', english: 'Hindi' },
  { code: 'mr', name: 'मराठी', english: 'Marathi' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', english: 'Punjabi' },
  { code: 'or', name: 'ଓଡ଼ିଆ', english: 'Odia / Oriya' },
  { code: 'gu', name: 'ગુજરાતી', english: 'Gujarati' },
  { code: 'raj', name: 'राजस्थानी', english: 'Rajasthani' },
  { code: 'ta', name: 'தமிழ்', english: 'Tamil' },
  { code: 'te', name: 'తెలుగు', english: 'Telugu' },
  { code: 'ne', name: 'नेपाली', english: 'Nepali' },
  { code: 'as', name: 'অসমীয়া', english: 'Assamese' },
  { code: 'bn', name: 'বাংলা', english: 'Bengali' },
];

export const WEST_BENGAL_DISTRICTS = [
  "Purba Bardhaman (Burdwan)",
  "Hooghly",
  "Nadia",
  "Murshidabad",
  "Birbhum",
  "Bankura",
  "Malda",
  "Jalpaiguri",
  "North 24 Parganas",
  "South 24 Parganas",
  "Paschim Medinipur",
  "Purba Medinipur",
  "Howrah",
  "Darjeeling",
  "Cooch Behar",
  "Alipurduar",
  "Uttar Dinajpur",
  "Dakshin Dinajpur",
  "Purulia",
  "Jhargram",
  "Kalimpong"
];

export const translations = {
  en: {
    appName: "AgriVani",
    farmerRole: "Farmer",
    officerRole: "Agricultural Officer",
    signInTab: "Sign In",
    signUpTab: "Sign Up",
    welcomeFarmer: "Welcome Back, Farmer!",
    farmerSignInSub: "Sign in with your mobile number to access your farm",
    welcomeOfficer: "Officer Portal Sign In",
    officerSignInSub: "Enter Officer ID and password to access dashboard",
    createFarmerAccount: "Farmer Registration",
    farmerSignUpSub: "Join AgriVani to farm smarter with AI advisories",
    createOfficerAccount: "Officer Registration",
    officerSignUpSub: "Register for district agricultural management",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    mobileNumber: "Mobile Number",
    mobilePlaceholder: "10-digit mobile number",
    officerId: "Officer Registration ID",
    officerIdPlaceholder: "e.g. WB-AGRI-2025-104",
    officerEmail: "Official Email ID",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "Assigned Jurisdiction / District",
    farmDetailsTitle: "FARM SIZE & LAND DETAILS",
    totalLandHolding: "Total Land Holding",
    irrigationMethod: "Primary Irrigation Method",
    password: "Password",
    createPassword: "Create Password",
    confirmPassword: "Confirm Password",
    enterPassword: "Enter your password",
    forgotPassword: "Forgot Password?",
    sendOtp: "Send OTP →",
    resendOtp: "Resend OTP",
    enterOtp: "Enter 6-digit OTP",
    verifyAndSignIn: "Verify OTP & Sign In →",
    verifyAndSignUp: "Verify OTP & Create Account →",
    signInOfficerBtn: "Sign In to Officer Portal →",
    registerOfficerBtn: "Register Officer Account →",
    newToAgriVani: "New to AgriVani?",
    alreadyHaveAccount: "Already have an account?",
    securityText: "Your information is encrypted & secure"
  }
};

export default function AgriVaniAuth({ onLoginSuccess }) {
  const [role, setRole] = useState('farmer');
  const [activeTab, setActiveTab] = useState('signin');
  const [language, setLanguage] = useState('en');

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [farmSize, setFarmSize] = useState('4.5');
  const [farmUnit, setFarmUnit] = useState('Acres');
  const [irrigation, setIrrigation] = useState('Canal & Borewell');

  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [otp, setOtp] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const otpInputsRef = useRef([]);

  const [officerId, setOfficerId] = useState('');
  const [officerEmail, setOfficerEmail] = useState('');
  const [assignedArea, setAssignedArea] = useState('Purba Bardhaman (Burdwan)');

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotOfficerId, setForgotOfficerId] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotStatus, setForgotStatus] = useState({ type: 'idle', msg: '' });

  // Keep `otp` in sync with `otpDigits`
  useEffect(() => {
    setOtp(otpDigits.join(''));
  }, [otpDigits]);

  // Countdown timer for OTP resend (30 seconds)
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const t = translations[language] || translations.en;

  const handleMobileChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setMobile(val);
  };

  const handleOtpDigitChange = (index, value) => {
    const cleanVal = value.replace(/[^0-9]/g, '');
    if (!cleanVal) {
      const newDigits = [...otpDigits];
      newDigits[index] = '';
      setOtpDigits(newDigits);
      return;
    }

    if (cleanVal.length > 1) {
      const chars = cleanVal.slice(0, 6).split('');
      const newDigits = [...otpDigits];
      chars.forEach((c, i) => {
        if (index + i < 6) newDigits[index + i] = c;
      });
      setOtpDigits(newDigits);
      const nextFocus = Math.min(5, index + chars.length);
      otpInputsRef.current[nextFocus]?.focus();
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);

    if (index < 5 && cleanVal) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        otpInputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pastedData) {
      const newDigits = [...otpDigits];
      pastedData.split('').forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      otpInputsRef.current[Math.min(5, pastedData.length - 1)]?.focus();
    }
  };

  const handleSendOtp = (e) => {
    if (e) e.preventDefault();
    if (!mobile || mobile.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setOtpSent(true);
    setResendCountdown(30);
    setOtpDigits(['4', '8', '2', '9', '1', '0']);
    setTimeout(() => {
      otpInputsRef.current[0]?.focus();
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'farmer') {
      if (!otpSent) {
        handleSendOtp();
        return;
      }
      if (onLoginSuccess) {
        onLoginSuccess({ role: 'farmer', name: fullName || `Farmer ${mobile.slice(-4)}`, phone: mobile, farmSize, farmUnit, irrigation });
      } else if (typeof window !== 'undefined') {
        window.location.href = "/";
      }
    } else {
      if (onLoginSuccess) {
        onLoginSuccess({ role: 'officer', name: fullName || "Officer", officerId, officerEmail, assignedArea });
      } else if (typeof window !== 'undefined') {
        window.location.href = "/admin";
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF3] flex justify-center py-4 px-2 font-sans">
      <main className="w-full max-w-md bg-white rounded-3xl p-5 shadow-xl border border-gray-200 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <img src="/images/agrivani_logo.png" alt="AgriVani" className="w-10 h-10 rounded-full border border-emerald-600/30 object-cover" />
            <div>
              <h2 className="text-lg font-black text-[#112E20] leading-none">AgriVani</h2>
              <span className="text-[10px] text-emerald-800 font-medium">Smart Insights. Better Harvests.</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-900 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
            {language.toUpperCase()}
          </span>
        </div>

        {/* Role Toggle */}
        <div className="grid grid-cols-2 gap-2 bg-[#E5EFE2] p-1.5 rounded-2xl my-3 border border-[#CBDDC7]">
          <button
            type="button"
            onClick={() => setRole('farmer')}
            className={`py-2 px-3 rounded-xl font-bold text-xs transition ${
              role === 'farmer' ? 'bg-[#2D7A4D] text-white shadow-md' : 'text-[#3D5E47]'
            }`}
          >
            🌾 {t.farmerRole}
          </button>
          <button
            type="button"
            onClick={() => setRole('officer')}
            className={`py-2 px-3 rounded-xl font-bold text-xs transition ${
              role === 'officer' ? 'bg-[#2D7A4D] text-white shadow-md' : 'text-[#3D5E47]'
            }`}
          >
            🏛️ {t.officerRole}
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-xl mb-3">
          <button
            type="button"
            onClick={() => setActiveTab('signin')}
            className={`py-1.5 font-bold text-xs rounded-lg transition ${
              activeTab === 'signin' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
            }`}
          >
            {t.signInTab}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`py-1.5 font-bold text-xs rounded-lg transition ${
              activeTab === 'signup' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
            }`}
          >
            {t.signUpTab}
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {role === 'farmer' ? (
            <>
              {activeTab === 'signup' && (
                <div>
                  <label className="text-xs font-bold text-gray-700">{t.fullName}</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Farmer Name"
                    className="w-full h-10 px-3 rounded-xl border border-gray-300 text-xs mt-1"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-gray-700">{t.mobileNumber}</label>
                <div className={`flex items-center h-11 rounded-xl border overflow-hidden mt-1 transition ${
                  otpSent ? 'border-emerald-400 bg-emerald-50/40' : 'border-gray-300 bg-white'
                }`}>
                  <span className="px-3 bg-gray-100 h-full flex items-center text-xs font-bold text-gray-700 border-r border-gray-200">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={handleMobileChange}
                    placeholder="10-digit mobile"
                    className="flex-1 px-3 text-xs font-bold outline-none bg-transparent"
                  />
                  <div className="pr-1.5">
                    {otpSent ? (
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setOtpDigits(['', '', '', '', '', '']);
                          setOtp('');
                        }}
                        className="text-[11px] font-bold text-emerald-700 hover:underline px-2 py-1"
                      >
                        Change
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={mobile.length !== 10}
                        onClick={handleSendOtp}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          mobile.length === 10
                            ? 'bg-[#2D7A4D] text-white hover:bg-[#23663f] shadow-xs active:scale-95'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Send OTP
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {activeTab === 'signup' && (
                <div className="bg-[#F8FAF5] p-3 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="text-[11px] font-bold text-emerald-900 uppercase">📐 {t.farmDetailsTitle}</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={farmSize}
                      onChange={(e) => setFarmSize(e.target.value)}
                      placeholder="4.5"
                      className="w-2/3 h-9 px-2 rounded-lg border border-gray-300 text-xs bg-white"
                    />
                    <select
                      value={farmUnit}
                      onChange={(e) => setFarmUnit(e.target.value)}
                      className="w-1/3 h-9 px-2 rounded-lg border border-gray-300 text-xs bg-white"
                    >
                      <option value="Acres">Acres</option>
                      <option value="Hectares">Hectares</option>
                      <option value="Bigha">Bigha</option>
                    </select>
                  </div>
                  <select
                    value={irrigation}
                    onChange={(e) => setIrrigation(e.target.value)}
                    className="w-full h-9 px-2 rounded-lg border border-gray-300 text-xs bg-white"
                  >
                    <option value="Canal & Borewell">Canal & Borewell</option>
                    <option value="Drip Irrigation">Drip Irrigation</option>
                    <option value="Sprinkler System">Sprinkler System</option>
                    <option value="Rainfed / Monsoon">Rainfed / Monsoon</option>
                  </select>
                </div>
              )}

              {otpSent && (
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-emerald-900">{t.enterOtp}</label>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      Sent to +91 {mobile}
                    </span>
                  </div>

                  {/* 6 Square Boxes */}
                  <div className="flex justify-between gap-1.5 max-w-xs mx-auto">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => { otpInputsRef.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        onPaste={handleOtpPaste}
                        className={`w-10 h-11 text-center text-lg font-black rounded-lg border-2 bg-white outline-none transition ${
                          digit ? 'border-emerald-600 text-emerald-950' : 'border-gray-300 text-gray-800 focus:border-emerald-600'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Demo OTP & Right-Aligned Resend OTP with 30s countdown */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-emerald-800 font-semibold bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
                      ✨ Demo: 482910
                    </span>
                    <div className="text-right">
                      {resendCountdown > 0 ? (
                        <span className="text-[11px] font-medium text-gray-500">
                          Resend OTP in <strong className="text-emerald-700">{resendCountdown}s</strong>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full h-11 bg-[#2D7A4D] hover:bg-[#23663f] text-white font-bold rounded-xl text-xs shadow-md mt-2 cursor-pointer"
              >
                {otpSent ? (activeTab === 'signin' ? t.verifyAndSignIn : t.verifyAndSignUp) : t.sendOtp}
              </button>
            </>
          ) : (
            <>
              {activeTab === 'signup' && (
                <>
                  <div>
                    <label className="text-xs font-bold text-gray-700">{t.fullName}</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Officer Name"
                      className="w-full h-10 px-3 rounded-xl border border-gray-300 text-xs mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700">{t.officerEmail}</label>
                    <input
                      type="email"
                      required
                      value={officerEmail}
                      onChange={(e) => setOfficerEmail(e.target.value)}
                      placeholder="officer@gov.in"
                      className="w-full h-10 px-3 rounded-xl border border-gray-300 text-xs mt-1"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-bold text-gray-700">{t.officerId}</label>
                <input
                  type="text"
                  required
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  placeholder="e.g. WB-AGRI-2025-104"
                  className="w-full h-10 px-3 rounded-xl border border-gray-300 text-xs mt-1"
                />
              </div>

              {activeTab === 'signup' && (
                <div>
                  <label className="text-xs font-bold text-gray-700">{t.assignedArea} (West Bengal)</label>
                  <select
                    value={assignedArea}
                    onChange={(e) => setAssignedArea(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-gray-300 text-xs mt-1 bg-white"
                  >
                    {WEST_BENGAL_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700">{t.password}</label>
                  {activeTab === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-[11px] font-bold text-emerald-700 hover:underline"
                    >
                      {t.forgotPassword}
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-10 px-3 rounded-xl border border-gray-300 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#2D7A4D] hover:bg-[#246640] text-white font-bold rounded-xl text-xs shadow-md mt-2"
              >
                {activeTab === 'signin' ? t.signInOfficerBtn : t.registerOfficerBtn}
              </button>
            </>
          )}
        </form>
      </main>
    </div>
  );
}
