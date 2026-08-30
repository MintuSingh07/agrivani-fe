"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * AgriVaniAuth - Modern, High-Contrast Farmer & Officer Authentication Component
 * Features:
 * 1. Role Toggle: Farmer vs Agricultural Officer (high visual contrast)
 * 2. Farmer Sign In: Phone + OTP flow (password & forgot password removed, guest sign in removed)
 * 3. Officer Sign In: Officer ID + Password with "Forgot Password?" modal (Officer ID, Official Email, New Password, Confirm Password)
 * 4. Farmer Sign Up: Full Name, Phone, Farm Size & Land Details (Holding + Unit + Irrigation Method) + OTP verification
 * 5. Officer Sign Up: Full Name, Phone, Official Email, Officer Reg No, Password, Assigned Area (West Bengal dummy areas)
 * 6. Redirection: Farmer -> `/` (Farmer Home), Officer -> `/officer` (Officer Portal)
 * 7. AgriVani circular logo in top bar
 * 8. Multilingual Support across 12 Indian regional languages
 */

export type SupportedLanguage = 
  | 'en' | 'hi' | 'mr' | 'pa' | 'or' | 'gu' 
  | 'raj' | 'ta' | 'te' | 'ne' | 'as' | 'bn';

interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  english: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
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

export const translations: Record<SupportedLanguage, {
  appName: string;
  farmerRole: string;
  officerRole: string;
  signInTab: string;
  signUpTab: string;
  welcomeFarmer: string;
  farmerSignInSub: string;
  welcomeOfficer: string;
  officerSignInSub: string;
  createFarmerAccount: string;
  farmerSignUpSub: string;
  createOfficerAccount: string;
  officerSignUpSub: string;
  fullName: string;
  fullNamePlaceholder: string;
  mobileNumber: string;
  mobilePlaceholder: string;
  officerId: string;
  officerIdPlaceholder: string;
  officerEmail: string;
  officerEmailPlaceholder: string;
  assignedArea: string;
  selectDistrict: string;
  farmDetailsTitle: string;
  totalLandHolding: string;
  irrigationMethod: string;
  password: string;
  createPassword: string;
  confirmPassword: string;
  enterPassword: string;
  forgotPassword: string;
  sendOtp: string;
  resendOtp: string;
  enterOtp: string;
  verifyAndSignIn: string;
  verifyAndSignUp: string;
  signInOfficerBtn: string;
  registerOfficerBtn: string;
  goToOfficerPortal: string;
  backToFarmerLogin: string;
  newToAgriVani: string;
  alreadyHaveAccount: string;
  securityText: string;
}> = {
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
    selectDistrict: "Select assigned district (West Bengal)",
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
    goToOfficerPortal: "Officer Portal Login →",
    backToFarmerLogin: "← Back to Farmer Login",
    newToAgriVani: "New to AgriVani?",
    alreadyHaveAccount: "Already have an account?",
    securityText: "Your information is encrypted & secure"
  },
  hi: {
    appName: "एग्रीवाणी",
    farmerRole: "किसान",
    officerRole: "कृषि अधिकारी",
    signInTab: "साइन इन",
    signUpTab: "साइन अप",
    welcomeFarmer: "वापसी पर स्वागत है, किसान भाई!",
    farmerSignInSub: "अपने खेत की जानकारी के लिए मोबाइल नंबर से साइन इन करें",
    welcomeOfficer: "कृषि अधिकारी पोर्टल साइन इन",
    officerSignInSub: "डैशबोर्ड के लिए अधिकारी आईडी और पासवर्ड दर्ज करें",
    createFarmerAccount: "किसान पंजीकरण",
    farmerSignUpSub: "स्मार्ट खेती के लिए एग्रीवाणी से जुड़ें",
    createOfficerAccount: "अधिकारी पंजीकरण",
    officerSignUpSub: "जिला कृषि प्रबंधन हेतु खाता बनाएं",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    mobileNumber: "मोबाइल नंबर",
    mobilePlaceholder: "10 अंकों का मोबाइल नंबर",
    officerId: "अधिकारी पंजीकरण संख्या / आईडी",
    officerIdPlaceholder: "उदा. WB-AGRI-2025-104",
    officerEmail: "आधिकारिक ईमेल आईडी",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "नियुक्त क्षेत्र / जिला",
    selectDistrict: "नियुक्त जिला चुनें (पश्चिम बंगाल)",
    farmDetailsTitle: "खेत का आकार और भूमि विवरण",
    totalLandHolding: "कुल भूमि जोत",
    irrigationMethod: "मुख्य सिंचाई विधि",
    password: "पासवर्ड",
    createPassword: "पासवर्ड बनाएं",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    enterPassword: "पासवर्ड दर्ज करें",
    forgotPassword: "पासवर्ड भूल गए?",
    sendOtp: "ओटीपी भेजें →",
    resendOtp: "ओटीपी पुनः भेजें",
    enterOtp: "6 अंकों का ओटीपी दर्ज करें",
    verifyAndSignIn: "ओटीपी सत्यापित करें और साइन इन करें →",
    verifyAndSignUp: "ओटीपी सत्यापित करें और खाता बनाएं →",
    signInOfficerBtn: "अधिकारी पोर्टल में साइन इन करें →",
    registerOfficerBtn: "अधिकारी खाता बनाएं →",
    goToOfficerPortal: "अधिकारी पोर्टल लॉगिन →",
    backToFarmerLogin: "← किसान लॉगिन पर वापस जाएं",
    newToAgriVani: "एग्रीवाणी पर नए हैं?",
    alreadyHaveAccount: "पहले से खाता है?",
    securityText: "आपकी जानकारी सुरक्षित और एन्क्रिप्टेड है"
  },
  bn: {
    appName: "এগ্রিবাণী",
    farmerRole: "কৃষক",
    officerRole: "কৃষি আধিকারিক",
    signInTab: "সাইন ইন",
    signUpTab: "সাইন আপ",
    welcomeFarmer: "স্বাগতম, কৃষক বন্ধু!",
    farmerSignInSub: "আপনার খামারের তথ্যের জন্য মোবাইল নম্বর দিয়ে সাইন ইন করুন",
    welcomeOfficer: "কৃষি আধিকারিক পোর্টাল সাইন ইন",
    officerSignInSub: "ড্যাশবোর্ডের জন্য আধিকারিক আইডি ও পাসওয়ার্ড লিখুন",
    createFarmerAccount: "কৃষক নিবন্ধন",
    farmerSignUpSub: "স্মার্ট চাষের জন্য এগ্রিবাণীতে যোগ দিন",
    createOfficerAccount: "আধিকারিক নিবন্ধন",
    officerSignUpSub: "জেলা কৃষি পরিচালনার জন্য অ্যাকাউন্ট তৈরি করুন",
    fullName: "পুরো নাম",
    fullNamePlaceholder: "আপনার পুরো নাম লিখুন",
    mobileNumber: "মোবাইল নম্বর",
    mobilePlaceholder: "১০ সংখ্যার মোবাইল নম্বর",
    officerId: "আধিকারিক নিবন্ধন আইডি",
    officerIdPlaceholder: "যেমন: WB-AGRI-2025-104",
    officerEmail: "অফিসিয়াল ইমেইল আইডি",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "দায়িত্বপ্রাপ্ত এলাকা / জেলা",
    selectDistrict: "দায়িত্বপ্রাপ্ত জেলা নির্বাচন করুন (পশ্চিমবঙ্গ)",
    farmDetailsTitle: "জমির আয়তন ও চাষের বিবরণ",
    totalLandHolding: "মোট জমির পরিমাণ",
    irrigationMethod: "প্রধান সেচ পদ্ধতি",
    password: "পাসওয়ার্ড",
    createPassword: "পাসওয়ার্ড তৈরি করুন",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    enterPassword: "পাসওয়ার্ড লিখুন",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    sendOtp: "ওটিপি পাঠান →",
    resendOtp: "পুনরায় ওটিপি পাঠান",
    enterOtp: "৬ সংখ্যার ওটিপি লিখুন",
    verifyAndSignIn: "ওটিপি যাচাই করে সাইন ইন করুন →",
    verifyAndSignUp: "ওটিপি যাচাই করে অ্যাকাউন্ট খুলুন →",
    signInOfficerBtn: "আধিকারিক পোর্টালে সাইন ইন করুন →",
    registerOfficerBtn: "আধিকারিক অ্যাকাউন্ট তৈরি করুন →",
    goToOfficerPortal: "আধিকারিক পোর্টাল লগইন →",
    backToFarmerLogin: "← কৃষক লগইনে ফিরে যান",
    newToAgriVani: "এগ্রিবাণীতে নতুন?",
    alreadyHaveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    securityText: "আপনার তথ্য সম্পূর্ণ সুরক্ষিত ও এনক্রিপ্ট করা"
  },
  mr: {
    appName: "अ‍ॅग्रीवाणी",
    farmerRole: "शेतकरी",
    officerRole: "कृषी अधिकारी",
    signInTab: "साइन इन",
    signUpTab: "साइन अप",
    welcomeFarmer: "पुन्हा स्वागत आहे, शेतकरी मित्र!",
    farmerSignInSub: "शेतीच्या माहितीसाठी मोबाईल क्रमांकाने साइन इन करा",
    welcomeOfficer: "कृषी अधिकारी पोर्टल साइन इन",
    officerSignInSub: "डॅशबोर्डसाठी अधिकारी आयडी आणि पासवर्ड टाका",
    createFarmerAccount: "शेतकरी नोंदणी",
    farmerSignUpSub: "स्मार्ट शेतीसाठी अ‍ॅग्रीवाणीशी जोडा",
    createOfficerAccount: "अधिकारी नोंदणी",
    officerSignUpSub: "जिल्हा कृषी व्यवस्थापनासाठी खाते तयार करा",
    fullName: "पूर्ण नाव",
    fullNamePlaceholder: "आपले पूर्ण नाव टाका",
    mobileNumber: "मोबाईल नंबर",
    mobilePlaceholder: "१० अंकी मोबाईल नंबर",
    officerId: "अधिकारी नोंदणी आयडी",
    officerIdPlaceholder: "उदा. WB-AGRI-2025-104",
    officerEmail: "अधिकृत ईमेल आयडी",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "नियुक्त क्षेत्र / जिल्हा",
    selectDistrict: "जिल्हा निवडा",
    farmDetailsTitle: "शेतीचा आकार आणि जमिनीचा तपशील",
    totalLandHolding: "एकूण जमीन धारकता",
    irrigationMethod: "मुख्य सिंचन पद्धत",
    password: "पासवर्ड",
    createPassword: "पासवर्ड तयार करा",
    confirmPassword: "पासवर्डची पुष्टी करा",
    enterPassword: "पासवर्ड टाका",
    forgotPassword: "पासवर्ड विसरलात?",
    sendOtp: "OTP पाठवा →",
    resendOtp: "पुन्हा OTP पाठवा",
    enterOtp: "६ अंकी OTP टाका",
    verifyAndSignIn: "OTP सत्यापित करा आणि साइन इन करा →",
    verifyAndSignUp: "OTP सत्यापित करा आणि खाते तयार करा →",
    signInOfficerBtn: "अधिकारी पोर्टलमध्ये साइन इन करा →",
    registerOfficerBtn: "अधिकारी खाते तयार करा →",
    goToOfficerPortal: "अधिकारी पोर्टल लॉगिन →",
    backToFarmerLogin: "← शेतकरी लॉगिनवर परत जा",
    newToAgriVani: "अ‍ॅग्रीवाणीवर नवीन आहात?",
    alreadyHaveAccount: "आधीच खाते आहे का?",
    securityText: "आपली माहिती सुरक्षित आहे"
  },
  pa: {
    appName: "ਐਗਰੀਵਾਣੀ",
    farmerRole: "ਕਿਸਾਨ",
    officerRole: "ਖੇਤੀਬਾੜੀ ਅਧਿਕਾਰੀ",
    signInTab: "ਸਾਈਨ ਇਨ",
    signUpTab: "ਸਾਈਨ ਅੱਪ",
    welcomeFarmer: "ਜੀ ਆਇਆਂ ਨੂੰ, ਕਿਸਾਨ ਵੀਰ!",
    farmerSignInSub: "ਮੋਬਾਈਲ ਨੰਬਰ ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ",
    welcomeOfficer: "ਅਧਿਕਾਰੀ ਪੋਰਟਲ ਸਾਈਨ ਇਨ",
    officerSignInSub: "ਅਧਿਕਾਰੀ ਆਈਡੀ ਅਤੇ ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ",
    createFarmerAccount: "ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
    farmerSignUpSub: "ਸਮਾਰਟ ਖੇਤੀ ਲਈ ਐਗਰੀਵਾਣੀ ਨਾਲ ਜੁੜੋ",
    createOfficerAccount: "ਅਧਿਕਾਰੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
    officerSignUpSub: "ਜ਼ਿਲ੍ਹਾ ਖੇਤੀ ਪ੍ਰਬੰਧਨ ਲਈ ਖਾਤਾ ਬਣਾਓ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    fullNamePlaceholder: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    mobileNumber: "ਮੋਬਾਈਲ ਨੰਬਰ",
    mobilePlaceholder: "10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ",
    officerId: "ਅਧਿਕਾਰੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਆਈਡੀ",
    officerIdPlaceholder: "e.g. WB-AGRI-2025-104",
    officerEmail: "ਦਫ਼ਤਰੀ ਈਮੇਲ ਆਈਡੀ",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "ਨਿਯੁਕਤ ਖੇਤਰ / ਜ਼ਿਲ੍ਹਾ",
    selectDistrict: "ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",
    farmDetailsTitle: "ਖੇਤ ਦਾ ਆਕਾਰ ਅਤੇ ਜ਼ਮੀਨ ਦਾ ਵੇਰਵਾ",
    totalLandHolding: "ਕੁੱਲ ਜ਼ਮੀਨ",
    irrigationMethod: "ਮੁੱਖ ਸਿੰਚਾਈ ਤਰੀਕਾ",
    password: "ਪਾਸਵਰਡ",
    createPassword: "ਪਾਸਵਰਡ ਬਣਾਓ",
    confirmPassword: "ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    enterPassword: "ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ",
    forgotPassword: "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
    sendOtp: "OTP ਭੇਜੋ →",
    resendOtp: "ਦੁਬਾਰਾ OTP ਭੇਜੋ",
    enterOtp: "6 ਅੰਕਾਂ ਦਾ OTP ਦਰਜ ਕਰੋ",
    verifyAndSignIn: "OTP ਤਸਦੀਕ ਕਰੋ ਅਤੇ ਸਾਈਨ ਇਨ ਕਰੋ →",
    verifyAndSignUp: "OTP ਤਸਦੀਕ ਕਰੋ ਅਤੇ ਖਾਤਾ ਬਣਾਓ →",
    signInOfficerBtn: "ਅਧਿਕਾਰੀ ਪੋਰਟਲ 'ਤੇ ਜਾਓ →",
    registerOfficerBtn: "ਅਧਿਕਾਰੀ ਖਾਤਾ ਬਣਾਓ →",
    goToOfficerPortal: "ਅਧਿਕਾਰੀ ਪੋਰਟਲ ਲੌਗਇਨ →",
    backToFarmerLogin: "← ਕਿਸਾਨ ਲੌਗਇਨ 'ਤੇ ਵਾਪਸ ਜਾਓ",
    newToAgriVani: "ਐਗਰੀਵਾਣੀ ਤੇ ਨਵੇਂ ਹੋ?",
    alreadyHaveAccount: "ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?",
    securityText: "ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਪੂਰੀ ਤਰ੍ਹਾਂ ਸੁਰੱਖਿਅਤ ਹੈ"
  },
  or: {
    appName: "ଏଗ୍ରିବାଣୀ",
    farmerRole: "କୃଷକ",
    officerRole: "କୃଷି ଅଧିକାରୀ",
    signInTab: "ସାଇନ୍ ଇନ୍",
    signUpTab: "ସାଇନ୍ ଅପ୍",
    welcomeFarmer: "ସ୍ୱାଗତ, କୃଷକ ବନ୍ଧୁ!",
    farmerSignInSub: "ମୋବାଇଲ୍ ନମ୍ବର ସହିତ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ",
    welcomeOfficer: "ଅଧିକାରୀ ପୋର୍ଟାଲ୍ ସାଇନ୍ ଇନ୍",
    officerSignInSub: "ଅଧିକାରୀ ଆଇଡି ଓ ପାସୱାର୍ଡ ଦିଅନ୍ତୁ",
    createFarmerAccount: "କୃଷକ ପଞ୍ଜୀକରଣ",
    farmerSignUpSub: "ସ୍ମାର୍ଟ ଚାଷ ପାଇଁ ଏଗ୍ରିବାଣୀ ସହିତ ଯୋଡି ହୁଅନ୍ତୁ",
    createOfficerAccount: "ଅଧିକାରୀ ପଞ୍ଜୀକରଣ",
    officerSignUpSub: "କୃଷି ପ୍ରବନ୍ଧନ ପାଇଁ ଖାତା ଖୋଲନ୍ତୁ",
    fullName: "ପୂରା ନାମ",
    fullNamePlaceholder: "ଆପଣଙ୍କ ପୂରା ନାମ ଲେଖନ୍ତୁ",
    mobileNumber: "ମୋବାଇଲ୍ ନମ୍ବର",
    mobilePlaceholder: "୧୦ ଅଙ୍କ ବିଶିଷ୍ଟ ମୋବାଇଲ୍ ନମ୍ବର",
    officerId: "ଅଧିକାରୀ ଆଇଡି",
    officerIdPlaceholder: "e.g. WB-AGRI-2025-104",
    officerEmail: "ସରକାରୀ ଇମେଲ୍",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "ଦାୟିତ୍ୱପ୍ରାପ୍ତ ଜିଲ୍ଲା",
    selectDistrict: "ଜିଲ୍ଲା ବାଛନ୍ତୁ",
    farmDetailsTitle: "ଜମି ପରିମାଣ ଓ ଜଳସେଚନ ବିବରଣୀ",
    totalLandHolding: "ମୋଟ ଜମି ପରିମାଣ",
    irrigationMethod: "ମୁଖ୍ୟ ଜଳସେଚନ ପଦ୍ଧତି",
    password: "ପାସୱାର୍ଡ",
    createPassword: "ପାସୱାର୍ଡ ବନାନ୍ତୁ",
    confirmPassword: "ପାସୱାର୍ଡ ନିଶ୍ଚିତ କରନ୍ତୁ",
    enterPassword: "ପାସୱାର୍ଡ ଦିଅନ୍ତୁ",
    forgotPassword: "ପାସୱାର୍ଡ ଭୁଲିଗଲେ କି?",
    sendOtp: "OTP ପଠାନ୍ତୁ →",
    resendOtp: "ପୁନର୍ବାର OTP ପଠାନ୍ତୁ",
    enterOtp: "୬ ଅଙ୍କର OTP ଦିଅନ୍ତୁ",
    verifyAndSignIn: "OTP ଯାଞ୍ଚ କରି ସାଇନ୍ ଇନ୍ କରନ୍ତୁ →",
    verifyAndSignUp: "OTP ଯାଞ୍ଚ କରି ଖାତା ଖୋଲନ୍ତୁ →",
    signInOfficerBtn: "ଅଧିକାରୀ ପୋର୍ଟାଲ୍ ଯାଆନ୍ତୁ →",
    registerOfficerBtn: "ଅଧିକାରୀ ଖାତା ଖୋଲନ୍ତୁ →",
    goToOfficerPortal: "ଅଧିକାରୀ ପୋର୍ଟାଲ୍ ଲଗଇନ୍ →",
    backToFarmerLogin: "← କୃଷକ ଲଗଇନ୍ କୁ ଫେରନ୍ତୁ",
    newToAgriVani: "ଏଗ୍ରିବାଣୀରେ ନୂଆ କି?",
    alreadyHaveAccount: "ପୂର୍ବରୁ ଖାତା ଅଛି କି?",
    securityText: "ଆପଣଙ୍କ ସୂଚନା ସମ୍ପୂର୍ଣ୍ଣ ସୁରକ୍ଷିତ"
  },
  gu: {
    appName: "એગ્રીવાણી",
    farmerRole: "ખેડૂત",
    officerRole: "કૃષિ અધિકારી",
    signInTab: "સાઇન ઇન",
    signUpTab: "સાઇન અપ",
    welcomeFarmer: "પાછા સ્વાગત છે, ખેડૂત મિત્ર!",
    farmerSignInSub: "મોબાઇલ નંબર વડે સાઇન ઇન કરો",
    welcomeOfficer: "અધિકારી પોર્ટલ સાઇન ઇન",
    officerSignInSub: "અધિકારી આઈડી અને પાસવર્ડ દાખલ કરો",
    createFarmerAccount: "ખેડૂત નોંધણી",
    farmerSignUpSub: "સ્માર્ટ ખેતી માટે એગ્રીવાણી સાથે જોડાઓ",
    createOfficerAccount: "અધિકારી નોંધણી",
    officerSignUpSub: "જિલ્લા કૃષિ વ્યવસ્થાપન માટે ખાતું બનાવો",
    fullName: "પૂરું નામ",
    fullNamePlaceholder: "તમારું પૂરું નામ દાખલ કરો",
    mobileNumber: "મોબાઇલ નંબર",
    mobilePlaceholder: "10 અંકનો મોબાઇલ નંબર",
    officerId: "અધિકારી આઈડી",
    officerIdPlaceholder: "e.g. WB-AGRI-2025-104",
    officerEmail: "સત્તાવાર ઇમેઇલ",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "સોંપાયેલ જિલ્લો",
    selectDistrict: "જિલ્લો પસંદ કરો",
    farmDetailsTitle: "ખેતરનું માપ અને જમીનની વિગત",
    totalLandHolding: "કુલ જમીન",
    irrigationMethod: "મુખ્ય પિયત પદ્ધતિ",
    password: "પાસવર્ડ",
    createPassword: "પાસવર્ડ બનાવો",
    confirmPassword: "પાસવર્ડ કન્ફર્મ કરો",
    enterPassword: "પાસવર્ડ દાખલ કરો",
    forgotPassword: "પાસવર્ડ ભૂલી ગયા?",
    sendOtp: "OTP મોકલો →",
    resendOtp: "ફરીથી OTP મોકલો",
    enterOtp: "6 અંકનો OTP દાખલ કરો",
    verifyAndSignIn: "OTP ચકાસો અને સાઇન ઇન કરો →",
    verifyAndSignUp: "OTP ચકાસો અને ખાતું બનાવો →",
    signInOfficerBtn: "અધિકારી પોર્ટલમાં સાઇન ઇન કરો →",
    registerOfficerBtn: "અધિકારી ખાતું બનાવો →",
    goToOfficerPortal: "અધિકારી પોર્ટલ લૉગિન →",
    backToFarmerLogin: "← ખેડૂત લૉગિન પર પાછા જાઓ",
    newToAgriVani: "એગ્રીવાણી પર નવા છો?",
    alreadyHaveAccount: "પહેલેથી ખાતું છે?",
    securityText: "તમારી માહિતી સુરક્ષિત છે"
  },
  raj: {
    appName: "एग्रीवाणी",
    farmerRole: "किसान",
    officerRole: "कृषि अधिकारी",
    signInTab: "साइन इन",
    signUpTab: "साइन अप",
    welcomeFarmer: "पधारो सा, किसान भाई!",
    farmerSignInSub: "मोबाइल नंबर सूं साइन इन करो",
    welcomeOfficer: "अधिकारी पोर्टल साइन इन",
    officerSignInSub: "अधिकारी आईडी अर पासवर्ड लिखो",
    createFarmerAccount: "किसान पंजीकरण",
    farmerSignUpSub: "स्मार्ट खेती खातर एग्रीवाणी सूं जुड़ो",
    createOfficerAccount: "अधिकारी पंजीकरण",
    officerSignUpSub: "कृषि प्रबंध खातर खातो बणाओ",
    fullName: "पूरो नाम",
    fullNamePlaceholder: "आपरौ पूरो नाम लिखो",
    mobileNumber: "मोबाइल नंबर",
    mobilePlaceholder: "10 अंक रो मोबाइल नंबर",
    officerId: "अधिकारी आईडी",
    officerIdPlaceholder: "e.g. WB-AGRI-2025-104",
    officerEmail: "सरकारी ईमेल",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "नियुक्त जिलो",
    selectDistrict: "जिलो चुणो",
    farmDetailsTitle: "खेत रो आकार अर जमीन री विगत",
    totalLandHolding: "कुल जमीन",
    irrigationMethod: "मुख्य सिंचाई रो साधन",
    password: "पासवर्ड",
    createPassword: "पासवर्ड बणाओ",
    confirmPassword: "पासवर्ड पक्को करो",
    enterPassword: "पासवर्ड लिखो",
    forgotPassword: "पासवर्ड भूल ग्या?",
    sendOtp: "OTP भेजो →",
    resendOtp: "पाछो OTP भेजो",
    enterOtp: "6 अंक रो OTP लिखो",
    verifyAndSignIn: "OTP जांचो अर साइन इन करो →",
    verifyAndSignUp: "OTP जांचो अर खातो बणाओ →",
    signInOfficerBtn: "अधिकारी पोर्टल पै जाओ →",
    registerOfficerBtn: "अधिकारी खातो बणाओ →",
    goToOfficerPortal: "अधिकारी पोर्टल लॉगिन →",
    backToFarmerLogin: "← किसान लॉगिन पर पाछा जाओ",
    newToAgriVani: "एग्रीवाणी पै नया हो?",
    alreadyHaveAccount: "पैलै सूं खातो है?",
    securityText: "आपरी जानकारी पूरी तरियां सुरक्षित है"
  },
  ta: {
    appName: "அக்ரிவாணி",
    farmerRole: "விவசாயி",
    officerRole: "வேளாண் அதிகாரி",
    signInTab: "உள்நுழைக",
    signUpTab: "பதிவு செய்க",
    welcomeFarmer: "மீண்டும் வருக, விவசாயி!",
    farmerSignInSub: "கைபேசி எண் மூலம் உள்நுழைக",
    welcomeOfficer: "அதிகாரி தளம் உள்நுழைக",
    officerSignInSub: "அதிகாரி ஐடி மற்றும் கடவுச்சொல்லை உள்ளிடவும்",
    createFarmerAccount: "விவசாயி பதிவு",
    farmerSignUpSub: "ஸ்மார்ட் விவசாயத்திற்கு அக்ரிவாணியில் இணையுங்கள்",
    createOfficerAccount: "அதிகாரி பதிவு",
    officerSignUpSub: "வேளாண் மேலாண்மைக்கு கணக்கு தொடங்குக",
    fullName: "முழு பெயர்",
    fullNamePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
    mobileNumber: "கைபேசி எண்",
    mobilePlaceholder: "10 இலக்க கைபேசி எண்",
    officerId: "அதிகாரி பதிவு ஐடி",
    officerIdPlaceholder: "e.g. WB-AGRI-2025-104",
    officerEmail: "அலுவலக மின்னஞ்சல்",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "ஒதுக்கப்பட்ட மாவட்டம்",
    selectDistrict: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
    farmDetailsTitle: "நில அளவு மற்றும் பாசன விவரங்கள்",
    totalLandHolding: "மொத்த நிலப்பரப்பு",
    irrigationMethod: "முக்கிய பாசன முறை",
    password: "கடவுச்சொல்",
    createPassword: "கடவுச்சொல்லை உருவாக்குக",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்துக",
    enterPassword: "கடவுச்சொல்லை உள்ளிடவும்",
    forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
    sendOtp: "OTP அனுப்புக →",
    resendOtp: "மீண்டும் OTP அனுப்புக",
    enterOtp: "6 இலக்க OTP உள்ளிடவும்",
    verifyAndSignIn: "OTP சரிபார்த்து உள்நுழைக →",
    verifyAndSignUp: "OTP சரிபார்த்து பதிவு செய்க →",
    signInOfficerBtn: "அதிகாரி தளத்தில் நுழைக →",
    registerOfficerBtn: "அதிகாரி கணக்கை உருவாக்குக →",
    goToOfficerPortal: "அதிகாரி தளம் உள்நுழைக →",
    backToFarmerLogin: "← உழவர் உள்நுழைவுக்குத் திரும்பு",
    newToAgriVani: "அக்ரிவாணிக்கு புதியவரா?",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    securityText: "உங்கள் தகவல்கள் பாதுகாப்பானவை"
  },
  te: {
    appName: "అగ్రివాణి",
    farmerRole: "రైతు",
    officerRole: "వ్యవసాయ అధికారి",
    signInTab: "సైన్ ఇన్",
    signUpTab: "సైన్ అప్",
    welcomeFarmer: "తిరిగి స్వాగతం, రైతు సోదరా!",
    farmerSignInSub: "మొబైల్ నంబర్‌తో సైన్ ఇన్ చేయండి",
    welcomeOfficer: "అధికారి పోర్టల్ సైన్ ఇన్",
    officerSignInSub: "అధికారి ఐడి మరియు పాస్‌వర్డ్ నమోదు చేయండి",
    createFarmerAccount: "రైతు నమోదు",
    farmerSignUpSub: "స్మార్ట్ వ్యవసాయం కోసం అగ్రివాణితో చేరండి",
    createOfficerAccount: "అధికారి నమోదు",
    officerSignUpSub: "వ్యవసాయ నిర్వహణ కోసం ఖాతా సృష్టించండి",
    fullName: "పూర్తి పేరు",
    fullNamePlaceholder: "మీ పూర్తి పేరును నమోదు చేయండి",
    mobileNumber: "మొబైల్ నంబర్",
    mobilePlaceholder: "10 అంకెల మొబైల్ నంబర్",
    officerId: "అధికారి ఐడి",
    officerIdPlaceholder: "e.g. WB-AGRI-2025-104",
    officerEmail: "అధికారిక ఈమెయిల్",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "కేటాయించిన జిల్లా",
    selectDistrict: "జిల్లాను ఎంచుకోండి",
    farmDetailsTitle: "వ్యవసాయ భూమి పరిమాణం & వివరాలు",
    totalLandHolding: "మొత్తం భూమి విస్తీర్ణం",
    irrigationMethod: "ప్రధాన సాగునీటి పద్ధతి",
    password: "పాస్‌వర్డ్",
    createPassword: "పాస్‌వర్డ్ సృష్టించండి",
    confirmPassword: "పాస్‌వర్డ్ నిర్ధారించండి",
    enterPassword: "పాస్‌వర్డ్ నమోదు చేయండి",
    forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
    sendOtp: "OTP పంపండి →",
    resendOtp: "మళ్లీ OTP పంపండి",
    enterOtp: "6 అంకెల OTP నమోదు చేయండి",
    verifyAndSignIn: "OTP ధృవీకరించి సైన్ ఇన్ చేయండి →",
    verifyAndSignUp: "OTP ధృవీకరించి ఖాతా సృష్టించండి →",
    signInOfficerBtn: "అధికారి పోర్టల్‌కు వెళ్లండి →",
    registerOfficerBtn: "అధికారి ఖాతా సృష్టించండి →",
    goToOfficerPortal: "అధికారి పోర్టల్ లాగిన్ →",
    backToFarmerLogin: "← రైతు లాగిన్‌కు తిరిగి వెళ్ళండి",
    newToAgriVani: "అగ్రివాణికి కొత్తవారా?",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    securityText: "మీ సమాచారం సురక్షితం"
  },
  ne: {
    appName: "एग्रीवाणी",
    farmerRole: "किसान",
    officerRole: "कृषि अधिकृत",
    signInTab: "साइन इन",
    signUpTab: "साइन अप",
    welcomeFarmer: "पुनः स्वागत छ, किसान साथी!",
    farmerSignInSub: "मोबाइल नम्बरबाट साइन इन गर्नुहोस्",
    welcomeOfficer: "अधिकृत पोर्टल साइन इन",
    officerSignInSub: "अधिकृत आईडी र पासवर्ड प्रविष्ट गर्नुहोस्",
    createFarmerAccount: "किसान दर्ता",
    farmerSignUpSub: "स्मार्ट खेतीका लागि एग्रीवाणीसँग जोडिनुहोस्",
    createOfficerAccount: "अधिकृत दर्ता",
    officerSignUpSub: "कृषि व्यवस्थापनका लागि खाता खोल्नुहोस्",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "आफ्नो पूरा नाम प्रविष्ट गर्नुहोस्",
    mobileNumber: "मोबाइल नम्बर",
    mobilePlaceholder: "१० अंकको मोबाइल नम्बर",
    officerId: "अधिकृत दर्ता आईडी",
    officerIdPlaceholder: "e.g. WB-AGRI-2025-104",
    officerEmail: "आधिकारिक इमेल",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "जिम्मेवारी पाएको जिल्ला",
    selectDistrict: "जिल्ला छान्नुहोस्",
    farmDetailsTitle: "खेतको क्षेत्रफल र जमिनको विवरण",
    totalLandHolding: "कुल जमिन",
    irrigationMethod: "मुख्य सिँचाइ विधि",
    password: "पासवर्ड",
    createPassword: "पासवर्ड बनाउनुहोस्",
    confirmPassword: "पासवर्ड पुष्टि गर्नुहोस्",
    enterPassword: "पासवर्ड प्रविष्ट गर्नुहोस्",
    forgotPassword: "पासवर्ड बिर्सनुभयो?",
    sendOtp: "OTP पठाउनुहोस् →",
    resendOtp: "पुनः OTP पठाउनुहोस्",
    enterOtp: "६ अंकको OTP प्रविष्ट गर्नुहोस्",
    verifyAndSignIn: "OTP प्रमाणित गरी साइन इन गर्नुहोस् →",
    verifyAndSignUp: "OTP प्रमाणित गरी खाता खोल्नुहोस् →",
    signInOfficerBtn: "अधिकृत पोर्टलमा जानुहोस् →",
    registerOfficerBtn: "अधिकृत खाता खोल्नुहोस् →",
    goToOfficerPortal: "अधिकृत पोर्टल लगइन →",
    backToFarmerLogin: "← किसान लगइनमा फर्कनुहोस्",
    newToAgriVani: "एग्रीवाणीमा नयाँ हुनुहुन्छ?",
    alreadyHaveAccount: "पहिल्यै खाता छ?",
    securityText: "तपाईंको जानकारी पूर्ण सुरक्षित छ"
  },
  as: {
    appName: "এগ্ৰীবাণী",
    farmerRole: "কৃষক",
    officerRole: "কৃষি বিষয়া",
    signInTab: "ছাইন ইন",
    signUpTab: "ছাইন আপ",
    welcomeFarmer: "পুনৰ স্বাগতম, কৃষক বন্ধু!",
    farmerSignInSub: "মবাইল নম্বৰেৰে ছাইন ইন কৰক",
    welcomeOfficer: "কৃষি বিষয়া প'ৰ্টেল ছাইন ইন",
    officerSignInSub: "বিষয়া আইডি আৰু পাছৱৰ্ড প্ৰৱেশ কৰক",
    createFarmerAccount: "কৃষক পঞ্জীয়ন",
    farmerSignUpSub: "স্মাৰ্ট খেতিৰ বাবে এগ্ৰীবাণীৰ সৈতে সংযোগ কৰক",
    createOfficerAccount: "বিষয়া পঞ্জীয়ন",
    officerSignUpSub: "কৃষি ব্যৱস্থাপনাৰ বাবে একাউণ্ট খোলক",
    fullName: "সম্পূৰ্ণ নাম",
    fullNamePlaceholder: "আপোনাৰ সম্পূৰ্ণ নাম লিখক",
    mobileNumber: "মোবাইল নম্বৰ",
    mobilePlaceholder: "১০ টা সংখ্যাৰ মোবাইল নম্বৰ",
    officerId: "বিষয়া পঞ্জীয়ন আইডি",
    officerIdPlaceholder: "e.g. WB-AGRI-2025-104",
    officerEmail: "চৰকাৰী ইমেইল",
    officerEmailPlaceholder: "officer@gov.in",
    assignedArea: "দায়িত্বপ্ৰাপ্ত জিলা",
    selectDistrict: "জিলা বাছক",
    farmDetailsTitle: "খেতিৰ মাটিকালি আৰু ভূমিৰ বিৱৰণ",
    totalLandHolding: "মুঠ মাটিৰ পৰিমাণ",
    irrigationMethod: "প্ৰধান জলসিঞ্চন পদ্ধতি",
    password: "পাছৱৰ্ড",
    createPassword: "পাছৱৰ্ড তৈয়াৰ কৰক",
    confirmPassword: "পাছৱৰ্ড নিশ্চিত কৰক",
    enterPassword: "পাছৱৰ্ড প্ৰৱেশ কৰক",
    forgotPassword: "পাছৱৰ্ড পাহৰিলে নেকি?",
    sendOtp: "OTP প্ৰেৰণ কৰক →",
    resendOtp: "পুনৰ OTP প্ৰেৰণ কৰক",
    enterOtp: "৬ টা সংখ্যাৰ OTP লিখক",
    verifyAndSignIn: "OTP পৰীক্ষা কৰি ছাইন ইন কৰক →",
    verifyAndSignUp: "OTP পৰীক্ষা কৰি একাউণ্ট খোলক →",
    signInOfficerBtn: "বিষয়া প'ৰ্টেললৈ যাওক →",
    registerOfficerBtn: "বিষয়া একাউণ্ট খোলক →",
    goToOfficerPortal: "বিষয়া প'ৰ্টেল লগইন →",
    backToFarmerLogin: "← কৃষক লগইনলৈ উভতি যাওক",
    newToAgriVani: "এগ্ৰীবাণীত নতুন নেকি?",
    alreadyHaveAccount: "ইতিমধ্যে একাউণ্ট আছে নেকি?",
    securityText: "আপোনাৰ তথ্য সম্পূৰ্ণ সুৰক্ষিত"
  }
};

export default function AuthPage() {
  const router = useRouter();

  // Role: 'farmer' | 'officer'
  const [role, setRole] = useState<'farmer' | 'officer'>('farmer');
  
  // Tab: 'signin' | 'signup'
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  // Language state
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Common input states
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Farmer specific states
  const [farmSize, setFarmSize] = useState('4.5');
  const [farmUnit, setFarmUnit] = useState('Acres');
  const [irrigation, setIrrigation] = useState('Canal & Borewell');
  
  // OTP flow states (Farmer)
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [otp, setOtp] = useState('');
  const [resendCountdown, setResendCountdown] = useState(0);
  const [otpMessage, setOtpMessage] = useState('');
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Officer specific states
  const [officerId, setOfficerId] = useState('');
  const [officerEmail, setOfficerEmail] = useState('');
  const [assignedArea, setAssignedArea] = useState('Purba Bardhaman (Burdwan)');

  // Officer Forgot Password Modal states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotOfficerId, setForgotOfficerId] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotStatus, setForgotStatus] = useState<{ type: 'idle' | 'success' | 'error'; msg: string }>({ type: 'idle', msg: '' });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("agrivani_app_language") as SupportedLanguage;
      if (savedLang && translations[savedLang]) {
        setLanguage(savedLang);
      }
      const params = new URLSearchParams(window.location.search);
      if (params.get("role") === "officer") {
        setRole("officer");
      }
    }
  }, []);

  // Keep `otp` in sync with `otpDigits`
  useEffect(() => {
    setOtp(otpDigits.join(''));
  }, [otpDigits]);

  // Countdown timer for OTP resend (30 seconds)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const t = translations[language] || translations.en;

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setMobile(val);
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("agrivani_app_language", newLang);
      const chosen = LANGUAGE_OPTIONS.find((l) => l.code === newLang);
      if (chosen) {
        localStorage.setItem("agrivani_app_language_name", `${chosen.english} / ${chosen.name}`);
      }
    }
  };

  // 6-digit OTP Box Handlers
  const handleOtpDigitChange = (index: number, value: string) => {
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

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleOtpPaste = (e: React.ClipboardEvent) => {
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

  // Farmer: Send OTP handler (30s timer)
  const handleSendOtp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!mobile || mobile.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setOtpSent(true);
    setResendCountdown(30);
    setOtpMessage("Demo OTP sent: 482910");
    setOtpDigits(['4', '8', '2', '9', '1', '0']);
    setTimeout(() => {
      otpInputsRef.current[0]?.focus();
    }, 100);
  };

  // Main Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (role === 'farmer') {
      // If OTP was not sent yet, prompt to send OTP first
      if (!otpSent) {
        handleSendOtp();
        return;
      }

      if (!otp || otp.length < 4) {
        alert("Please enter the verification OTP.");
        return;
      }

      const farmerName = fullName.trim() || (mobile ? `Farmer ${mobile.slice(-4)}` : "Zara Patel");
      
      if (typeof window !== "undefined") {
        localStorage.setItem("agrivani_user_role", "farmer");
        localStorage.setItem("agrivani_farmer_name", farmerName);
        
        const existingProfile = localStorage.getItem("agrivani_farmer_profile");
        const profileData = existingProfile ? JSON.parse(existingProfile) : {};
        profileData.name = farmerName;
        profileData.phone = `+91 ${mobile || "98765 43210"}`;
        profileData.farmSize = farmSize || "4.5";
        profileData.farmUnit = farmUnit || "Acres";
        profileData.irrigation = irrigation || "Canal & Borewell";
        if (!profileData.location) profileData.location = "Purba Bardhaman, West Bengal";
        localStorage.setItem("agrivani_farmer_profile", JSON.stringify(profileData));
      }

      // Redirect to Farmer Home
      router.push("/");
    } else {
      // Officer Authentication
      if (activeTab === 'signin') {
        if (!officerId.trim()) {
          alert("Please enter your Officer Registration ID.");
          return;
        }
        if (!password) {
          alert("Please enter your password.");
          return;
        }
      } else {
        // Officer Sign Up
        if (!fullName.trim() || !officerId.trim() || !officerEmail.trim() || !password) {
          alert("Please fill in all officer registration fields.");
          return;
        }
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
      }

      const officerDisplayName = fullName.trim() || "Dr. Subhashish Roy";
      const officerData = {
        name: officerDisplayName,
        id: officerId.trim() || "WB-AGRI-2025-884",
        email: officerEmail.trim() || "s.roy@wb.gov.in",
        phone: mobile ? `+91 ${mobile}` : "+91 94340 12890",
        assignedArea: assignedArea || "Purba Bardhaman (Burdwan)",
        role: "Senior Block Agriculture Officer (BAO)",
        department: "Department of Agriculture, Govt. of West Bengal",
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("agrivani_user_role", "officer");
        localStorage.setItem("agrivani_officer_name", officerDisplayName);
        localStorage.setItem("agrivani_officer_profile", JSON.stringify(officerData));
      }

      // Redirect to Officer Home Portal
      router.push("/officer");
    }
  };

  // Handle Forgot Password Submit
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotOfficerId.trim() || !forgotEmail.trim() || !forgotNewPassword) {
      setForgotStatus({ type: 'error', msg: 'Please complete all required fields.' });
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotStatus({ type: 'error', msg: 'New passwords do not match.' });
      return;
    }

    // Success simulation
    setForgotStatus({
      type: 'success',
      msg: 'Password updated successfully! You can now sign in with your new credentials.'
    });

    setTimeout(() => {
      setShowForgotModal(false);
      setForgotStatus({ type: 'idle', msg: '' });
      setOfficerId(forgotOfficerId);
      setPassword(forgotNewPassword);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-900/10 flex justify-center py-0 sm:py-6 px-0 sm:px-4 font-sans">
      
      {/* Mobile/Tablet Centered App Container */}
      <main className="w-full max-w-md md:max-w-xl bg-[#F8FAF3] min-h-screen flex flex-col relative pb-10 shadow-2xl overflow-hidden sm:rounded-3xl border-0 sm:border sm:border-gray-200">
        
        {/* Top Header Bar with Official Circular AgriVani Logo */}
        <div className="px-5 pt-4 pb-2.5 flex items-center justify-between z-30 border-b border-[#E3ECE1]/80 bg-white/60 backdrop-blur-xs">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[#112E20] active:scale-95 transition"
          >
            {/* AgriVani Circular Logo Image */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-[1.5px] border-[#2D7A4D]/40 shadow-xs flex items-center justify-center bg-[#F4F7F4] shrink-0">
              <img
                src="/images/agrivani_logo.png"
                alt="AgriVani Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[19px] font-extrabold text-[#112E20] tracking-tight leading-tight">
                {t.appName}
              </span>
              <span className="text-[10px] font-medium text-[#4A7255] tracking-wide">
                Smart Insights. Better Harvests.
              </span>
            </div>
          </Link>

          {/* Language Selector Dropdown */}
          <div className="relative flex items-center">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
              className="bg-[#E8F1E7] border-[1.5px] border-[#BED5C1] rounded-[10px] pl-7 pr-3 py-1.5 text-[12px] font-semibold text-[#234732] outline-none cursor-pointer hover:bg-[#DFEBE0] appearance-none transition"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name} ({opt.english})
                </option>
              ))}
            </select>
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#2D7A4D]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-5 pt-3 pb-6 flex flex-col overflow-y-auto">
          


          {/* 2. SIGN IN / SIGN UP SEGMENTED CONTROL TABS */}
          <div className="bg-[#E7F0E5] border-[1.5px] border-[#D2E4D3] rounded-[14px] p-1 grid grid-cols-2 gap-1 mb-3.5">
            <button
              type="button"
              onClick={() => {
                setActiveTab('signin');
                setOtpSent(false);
                setOtp('');
              }}
              className={`py-2 text-[14px] font-bold rounded-[11px] transition-all text-center cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-white text-[#163625] shadow-[0_2px_6px_rgba(0,0,0,0.06)]'
                  : 'text-[#6B8A73] hover:text-[#163625]'
              }`}
            >
              {t.signInTab}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('signup');
                setOtpSent(false);
                setOtp('');
              }}
              className={`py-2 text-[14px] font-bold rounded-[11px] transition-all text-center cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-white text-[#163625] shadow-[0_2px_6px_rgba(0,0,0,0.06)]'
                  : 'text-[#6B8A73] hover:text-[#163625]'
              }`}
            >
              {t.signUpTab}
            </button>
          </div>

          {/* 3. DYNAMIC GREETING BLOCK */}
          <div className="mb-3.5">
            <h1 className="text-[22px] font-black text-[#10291D] tracking-tight mb-0.5">
              {role === 'farmer'
                ? activeTab === 'signin'
                  ? t.welcomeFarmer
                  : t.createFarmerAccount
                : activeTab === 'signin'
                  ? t.welcomeOfficer
                  : t.createOfficerAccount}
            </h1>
            <p className="text-[13px] font-medium text-[#5A7665]">
              {role === 'farmer'
                ? activeTab === 'signin'
                  ? t.farmerSignInSub
                  : t.farmerSignUpSub
                : activeTab === 'signin'
                  ? t.officerSignInSub
                  : t.officerSignUpSub}
            </p>
          </div>

          {/* 4. AUTHENTICATION FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
            
            {/* ========================================================================= */}
            {/* FARMER SIGN IN FLOW: Phone -> Send OTP -> Enter OTP -> Verify & Sign In */}
            {/* ========================================================================= */}
            {role === 'farmer' && activeTab === 'signin' && (
              <>
                {/* Mobile Number Field with Embedded Send OTP Action */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13.5px] font-bold text-[#1B382A]">
                    {t.mobileNumber}
                  </label>
                  <div className={`flex items-center h-[50px] rounded-2xl bg-white border-[1.5px] transition-all overflow-hidden ${
                    otpSent
                      ? 'border-[#94C39B] bg-[#F7FAF6]'
                      : 'border-[#C4D9C7] focus-within:border-[#2D7A4D] focus-within:ring-4 focus-within:ring-[#2D7A4D]/15'
                  }`}>
                    <div className="px-3.5 h-full bg-[#EFF4EE] border-r-[1.5px] border-[#C4D9C7] flex items-center justify-center font-bold text-[#234732] text-[14px]">
                      +91
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobile}
                      onChange={handleMobileChange}
                      placeholder={t.mobilePlaceholder || "10-digit mobile number"}
                      className="flex-1 px-3.5 bg-transparent text-[#153224] text-[15px] font-bold tracking-wide placeholder-[#9BB3A1] outline-none"
                    />
                    
                    {/* Send OTP button on right side of mobile input */}
                    <div className="pr-2">
                      {otpSent ? (
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpDigits(['', '', '', '', '', '']);
                            setOtp('');
                          }}
                          className="text-[11.5px] font-bold text-[#2D7A4D] hover:underline px-2 py-1 cursor-pointer flex items-center gap-1"
                        >
                          <span>Change</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={mobile.length !== 10}
                          onClick={handleSendOtp}
                          className={`px-3 py-1.5 rounded-xl text-[12.5px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            mobile.length === 10
                              ? 'bg-[#2D7A4D] text-white hover:bg-[#22603C] shadow-sm active:scale-95'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <span>Send OTP</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* OTP Section with 6 Separate Square Boxes (Appears after Send OTP) */}
                {otpSent ? (
                  <div className="bg-[#EBF4E8] p-4 rounded-2xl border-[1.5px] border-[#B7D8BB] space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 shadow-xs">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] font-extrabold text-[#153823]">
                        {t.enterOtp}
                      </label>
                      <span className="text-[11px] font-bold text-[#2D7A4D] bg-white px-2.5 py-0.5 rounded-full border border-[#C2DAC5]">
                        OTP sent to +91 {mobile}
                      </span>
                    </div>

                    {/* 6 SEPARATE SQUARE BOXES */}
                    <div className="flex justify-between items-center gap-2 max-w-sm mx-auto pt-1">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => { otpInputsRef.current[idx] = el; }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          onPaste={handleOtpPaste}
                          className={`w-11 h-12 sm:w-12 sm:h-13 text-center text-[20px] font-extrabold rounded-xl border-[2px] transition-all outline-none ${
                            digit
                              ? 'bg-white border-[#2D7A4D] text-[#143B25] shadow-xs'
                              : 'bg-white/90 border-[#CBDDC7] text-[#143B25] focus:border-[#2D7A4D] focus:ring-4 focus:ring-[#2D7A4D]/15'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Bottom row: Demo hint on left, Resend OTP with 30s timer on right */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <div className="flex items-center gap-1 text-[11.5px] font-bold text-[#2D7A4D] bg-white/70 px-2 py-0.5 rounded-lg border border-[#C2DAC5]/60">
                        <span>✨</span>
                        <span>Demo OTP: 482910</span>
                      </div>

                      {/* Right side: Resend OTP with 30s countdown timer */}
                      <div className="text-right">
                        {resendCountdown > 0 ? (
                          <span className="text-[12px] font-medium text-gray-500">
                            Resend OTP in <strong className="text-[#2D7A4D] font-bold">{resendCountdown}s</strong>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="text-[12.5px] font-extrabold text-[#2D7A4D] hover:text-[#1B4D30] hover:underline cursor-pointer transition flex items-center gap-1"
                          >
                            <span>Resend OTP</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="mt-1 h-[48px] bg-[#2D7A4D] hover:bg-[#246640] active:bg-[#1B4D30] text-white font-bold text-[15px] rounded-[13px] shadow-[0_4px_12px_rgba(45,122,77,0.22)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {otpSent ? t.verifyAndSignIn : t.sendOtp}
                </button>
              </>
            )}

            {/* ========================================================================= */}
            {/* FARMER SIGN UP FLOW: Name + Phone + Land Details + OTP -> Verify */}
            {/* ========================================================================= */}
            {role === 'farmer' && activeTab === 'signup' && (
              <>
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-[13.5px] font-bold text-[#1B382A]">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.fullNamePlaceholder}
                    className="w-full h-[46px] px-3.5 rounded-[13px] bg-white border-[1.5px] border-[#C4D9C7] text-[#153224] text-[14.5px] font-medium placeholder-[#9BB3A1] focus:border-[#2D7A4D] focus:ring-3 focus:ring-[#2D7A4D]/15 outline-none transition-all"
                  />
                </div>

                {/* Mobile Number with Send OTP */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13.5px] font-bold text-[#1B382A]">
                    {t.mobileNumber}
                  </label>
                  <div className={`flex items-center h-[48px] rounded-[13px] bg-white border-[1.5px] transition-all overflow-hidden ${
                    otpSent
                      ? 'border-[#94C39B] bg-[#F7FAF6]'
                      : 'border-[#C4D9C7] focus-within:border-[#2D7A4D] focus-within:ring-3 focus-within:ring-[#2D7A4D]/15'
                  }`}>
                    <div className="px-3 bg-[#EFF4EE] border-r-[1.5px] border-[#C4D9C7] flex items-center justify-center font-bold text-[#234732] text-[13.5px]">
                      +91
                    </div>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={mobile}
                      onChange={handleMobileChange}
                      placeholder={t.mobilePlaceholder || "10-digit number"}
                      className="flex-1 px-3 bg-transparent text-[#153224] text-[14.5px] font-bold tracking-wide placeholder-[#9BB3A1] outline-none"
                    />
                    
                    {/* Send OTP button */}
                    <div className="pr-2">
                      {otpSent ? (
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpDigits(['', '', '', '', '', '']);
                            setOtp('');
                          }}
                          className="text-[11.5px] font-bold text-[#2D7A4D] hover:underline px-2 py-1 cursor-pointer flex items-center gap-1"
                        >
                          <span>Change</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={mobile.length !== 10}
                          onClick={handleSendOtp}
                          className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                            mobile.length === 10
                              ? 'bg-[#2D7A4D] text-white hover:bg-[#22603C] shadow-sm active:scale-95'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <span>Send OTP</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* EXACT FARM SIZE & LAND DETAILS SECTION */}
                <div className="bg-white rounded-2xl p-3.5 border-[1.5px] border-[#BED5C1] shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-[#144733] font-bold text-[12.5px] tracking-wider uppercase border-b border-gray-100 pb-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
                      <path d="m14.5 12.5 2-2"/>
                      <path d="m11.5 9.5 2-2"/>
                      <path d="m8.5 6.5 2-2"/>
                      <path d="m17.5 15.5 2-2"/>
                    </svg>
                    <span>{t.farmDetailsTitle}</span>
                  </div>

                  {/* Total Land Holding + Unit Selector */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[12.5px] font-semibold text-gray-700">
                      {t.totalLandHolding}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={farmSize}
                        onChange={(e) => setFarmSize(e.target.value)}
                        placeholder="4.5"
                        className="flex-1 h-[44px] px-3.5 rounded-xl bg-[#F8FAF5] border-[1.5px] border-[#CBDDC7] text-[#153224] font-semibold text-[14.5px] outline-none focus:bg-white focus:border-[#2D7A4D]"
                      />
                      <select
                        value={farmUnit}
                        onChange={(e) => setFarmUnit(e.target.value)}
                        className="h-[44px] px-3 rounded-xl bg-[#F8FAF5] border-[1.5px] border-[#CBDDC7] text-[#153224] font-semibold text-[13.5px] outline-none cursor-pointer focus:bg-white focus:border-[#2D7A4D]"
                      >
                        <option value="Acres">Acres</option>
                        <option value="Hectares">Hectares</option>
                        <option value="Bigha">Bigha</option>
                        <option value="Guntha">Guntha</option>
                        <option value="Decimal">Decimal</option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Irrigation Method Dropdown */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[12.5px] font-semibold text-gray-700">
                      {t.irrigationMethod}
                    </label>
                    <select
                      value={irrigation}
                      onChange={(e) => setIrrigation(e.target.value)}
                      className="w-full h-[44px] px-3.5 rounded-xl bg-[#F8FAF5] border-[1.5px] border-[#CBDDC7] text-[#153224] font-semibold text-[13.5px] outline-none cursor-pointer focus:bg-white focus:border-[#2D7A4D]"
                    >
                      <option value="Canal & Borewell">Canal & Borewell</option>
                      <option value="Drip Irrigation">Drip Irrigation (Micro-irrigation)</option>
                      <option value="Sprinkler System">Sprinkler System</option>
                      <option value="Rainfed / Monsoon">Rainfed / Monsoon Dependent</option>
                      <option value="River / Pond Lift">River / Pond Lift Irrigation</option>
                      <option value="Tube Well">Deep Tube Well</option>
                    </select>
                  </div>
                </div>

                {/* Farmer Signup OTP Box with 6 Square Boxes & 30s timer */}
                {otpSent && (
                  <div className="bg-[#EBF4E8] p-4 rounded-2xl border-[1.5px] border-[#B7D8BB] space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 shadow-xs">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] font-extrabold text-[#153823]">
                        {t.enterOtp}
                      </label>
                      <span className="text-[11px] font-bold text-[#2D7A4D] bg-white px-2.5 py-0.5 rounded-full border border-[#C2DAC5]">
                        OTP sent to +91 {mobile}
                      </span>
                    </div>

                    {/* 6 SEPARATE SQUARE BOXES */}
                    <div className="flex justify-between items-center gap-2 max-w-sm mx-auto pt-1">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => { otpInputsRef.current[idx] = el; }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          onPaste={handleOtpPaste}
                          className={`w-11 h-12 sm:w-12 sm:h-13 text-center text-[20px] font-extrabold rounded-xl border-[2px] transition-all outline-none ${
                            digit
                              ? 'bg-white border-[#2D7A4D] text-[#143B25] shadow-xs'
                              : 'bg-white/90 border-[#CBDDC7] text-[#143B25] focus:border-[#2D7A4D] focus:ring-4 focus:ring-[#2D7A4D]/15'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Demo hint + Resend OTP on right */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <div className="flex items-center gap-1 text-[11.5px] font-bold text-[#2D7A4D] bg-white/70 px-2 py-0.5 rounded-lg border border-[#C2DAC5]/60">
                        <span>✨</span>
                        <span>Demo OTP: 482910</span>
                      </div>

                      {/* Right side: Resend OTP with 30s countdown timer */}
                      <div className="text-right">
                        {resendCountdown > 0 ? (
                          <span className="text-[12px] font-medium text-gray-500">
                            Resend OTP in <strong className="text-[#2D7A4D] font-bold">{resendCountdown}s</strong>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="text-[12.5px] font-extrabold text-[#2D7A4D] hover:text-[#1B4D30] hover:underline cursor-pointer transition flex items-center gap-1"
                          >
                            <span>Resend OTP</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit / Verify Button */}
                <button
                  type="submit"
                  className="mt-1 h-[48px] bg-[#2D7A4D] hover:bg-[#246640] active:bg-[#1B4D30] text-white font-bold text-[15px] rounded-[13px] shadow-[0_4px_12px_rgba(45,122,77,0.22)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {otpSent ? t.verifyAndSignUp : t.sendOtp}
                </button>
              </>
            )}

            {/* ========================================================================= */}
            {/* OFFICER SIGN IN FLOW: Officer ID + Password + Forgot Password Modal */}
            {/* ========================================================================= */}
            {role === 'officer' && activeTab === 'signin' && (
              <>
                {/* Officer ID */}
                <div className="flex flex-col gap-1">
                  <label className="text-[13.5px] font-bold text-[#1B382A]">
                    {t.officerId}
                  </label>
                  <input
                    type="text"
                    required
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    placeholder={t.officerIdPlaceholder}
                    className="w-full h-[46px] px-3.5 rounded-[13px] bg-white border-[1.5px] border-[#C4D9C7] text-[#153224] text-[14.5px] font-medium placeholder-[#9BB3A1] focus:border-[#2D7A4D] focus:ring-3 focus:ring-[#2D7A4D]/15 outline-none transition-all"
                  />
                </div>

                {/* Officer Password + Forgot Password Action */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[13.5px] font-bold text-[#1B382A]">
                      {t.password}
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotOfficerId(officerId);
                        setShowForgotModal(true);
                      }}
                      className="text-[12.5px] font-bold text-[#2D7A4D] hover:text-[#1B4D30] hover:underline cursor-pointer transition"
                    >
                      {t.forgotPassword}
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.enterPassword}
                      className="w-full h-[46px] pl-3.5 pr-11 rounded-[13px] bg-white border-[1.5px] border-[#C4D9C7] text-[#153224] text-[14.5px] font-medium placeholder-[#9BB3A1] focus:border-[#2D7A4D] focus:ring-3 focus:ring-[#2D7A4D]/15 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 p-1 text-[#6B8A73] hover:text-[#11281C] transition cursor-pointer"
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Officer Sign In Submit Button */}
                <button
                  type="submit"
                  className="mt-1 h-[48px] bg-[#2D7A4D] hover:bg-[#246640] active:bg-[#1B4D30] text-white font-bold text-[15px] rounded-[13px] shadow-[0_4px_12px_rgba(45,122,77,0.22)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  <span>{t.signInOfficerBtn}</span>
                </button>
              </>
            )}

            {/* ========================================================================= */}
            {/* OFFICER SIGN UP FLOW: Name + Phone + Email + ID + Password + Assigned Area */}
            {/* ========================================================================= */}
            {role === 'officer' && activeTab === 'signup' && (
              <>
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-[#1B382A]">
                    {t.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Subhashish Roy"
                    className="w-full h-[44px] px-3.5 rounded-[12px] bg-white border-[1.5px] border-[#C4D9C7] text-[#153224] text-[14px] font-medium outline-none focus:border-[#2D7A4D]"
                  />
                </div>

                {/* Mobile Number & Official Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[#1B382A]">
                      {t.mobileNumber}
                    </label>
                    <div className="flex h-[44px] rounded-[12px] bg-white border-[1.5px] border-[#C4D9C7] overflow-hidden focus-within:border-[#2D7A4D]">
                      <div className="px-2.5 bg-[#EFF4EE] border-r-[1.5px] border-[#C4D9C7] flex items-center justify-center font-bold text-[#234732] text-[13px]">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={handleMobileChange}
                        placeholder={t.mobilePlaceholder}
                        className="flex-1 px-2.5 bg-transparent text-[#153224] text-[13.5px] font-medium outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[#1B382A]">
                      {t.officerEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={officerEmail}
                      onChange={(e) => setOfficerEmail(e.target.value)}
                      placeholder={t.officerEmailPlaceholder}
                      className="w-full h-[44px] px-3 rounded-[12px] bg-white border-[1.5px] border-[#C4D9C7] text-[#153224] text-[13.5px] font-medium outline-none focus:border-[#2D7A4D]"
                    />
                  </div>
                </div>

                {/* Officer Reg ID */}
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-[#1B382A]">
                    {t.officerId}
                  </label>
                  <input
                    type="text"
                    required
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    placeholder={t.officerIdPlaceholder}
                    className="w-full h-[44px] px-3.5 rounded-[12px] bg-white border-[1.5px] border-[#C4D9C7] text-[#153224] text-[14px] font-medium outline-none focus:border-[#2D7A4D]"
                  />
                </div>

                {/* Assigned Jurisdiction Area (West Bengal Dropdown) */}
                <div className="flex flex-col gap-1">
                  <label className="text-[13px] font-bold text-[#1B382A] flex items-center justify-between">
                    <span>{t.assignedArea}</span>
                    <span className="text-[11px] text-[#2D7A4D] font-semibold">West Bengal</span>
                  </label>
                  <select
                    value={assignedArea}
                    onChange={(e) => setAssignedArea(e.target.value)}
                    className="w-full h-[44px] px-3.5 rounded-[12px] bg-white border-[1.5px] border-[#C4D9C7] text-[#153224] font-semibold text-[13.5px] outline-none cursor-pointer focus:border-[#2D7A4D]"
                  >
                    {WEST_BENGAL_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Password & Confirm Password Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[#1B382A]">
                      {t.createPassword}
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 chars"
                        className="w-full h-[44px] pl-3 pr-8 rounded-[12px] bg-white border-[1.5px] border-[#C4D9C7] text-[#153224] text-[13px] font-medium outline-none focus:border-[#2D7A4D]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 p-0.5 text-gray-500 hover:text-gray-900"
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[#1B382A]">
                      {t.confirmPassword}
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter"
                        className="w-full h-[44px] pl-3 pr-8 rounded-[12px] bg-white border-[1.5px] border-[#C4D9C7] text-[#153224] text-[13px] font-medium outline-none focus:border-[#2D7A4D]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2.5 p-0.5 text-gray-500 hover:text-gray-900"
                      >
                        {showConfirmPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Officer Sign Up Submit Button */}
                <button
                  type="submit"
                  className="mt-1 h-[48px] bg-[#2D7A4D] hover:bg-[#246640] active:bg-[#1B4D30] text-white font-bold text-[15px] rounded-[13px] shadow-[0_4px_12px_rgba(45,122,77,0.22)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/>
                    <line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                  <span>{t.registerOfficerBtn}</span>
                </button>
              </>
            )}

            {/* Switch Sign In / Sign Up Footer */}
            <div className="text-center mt-2 text-[13.5px] font-medium text-[#5A7665]">
              {activeTab === 'signin' ? (
                <>
                  <span>{t.newToAgriVani} </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signup');
                      setOtpSent(false);
                    }}
                    className="font-bold text-[#2D7A4D] hover:underline cursor-pointer"
                  >
                    {t.signUpTab}
                  </button>
                </>
              ) : (
                <>
                  <span>{t.alreadyHaveAccount} </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signin');
                      setOtpSent(false);
                    }}
                    className="font-bold text-[#2D7A4D] hover:underline cursor-pointer"
                  >
                    {t.signInTab}
                  </button>
                </>
              )}
            </div>

            {/* Direct to Officer Portal Banner / Button (Shown on Farmer Page) */}
            {role === 'farmer' && (
              <div className="mt-3 pt-3 border-t border-[#DDEADC]">
                <div className="w-full bg-[#EBF3E8] border border-[#CBDDC7] rounded-2xl p-3 flex items-center justify-between transition-all hover:bg-[#E2EFE0] hover:border-[#ADC9AA] shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#2D7A4D] text-white flex items-center justify-center shadow-xs shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#456A50] uppercase tracking-wider">
                        Official / Govt Access
                      </p>
                      <p className="text-[13px] font-bold text-[#143926]">
                        {t.officerRole} Portal
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRole('officer');
                      setOtpSent(false);
                      setOtp('');
                    }}
                    className="px-3 py-2 bg-[#2D7A4D] hover:bg-[#246640] active:bg-[#1B4D30] text-white text-[12px] font-bold rounded-xl shadow-xs transition active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-1"
                  >
                    <span>{t.goToOfficerPortal}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Back to Farmer Login Link (Shown on Officer Page) */}
            {role === 'officer' && (
              <div className="text-center mt-2.5 pt-2.5 border-t border-[#DDEADC]">
                <button
                  type="button"
                  onClick={() => {
                    setRole('farmer');
                    setOtpSent(false);
                    setOtp('');
                  }}
                  className="text-[13px] font-bold text-[#2D7A4D] hover:text-[#183B2B] hover:underline cursor-pointer flex items-center justify-center gap-1.5 mx-auto transition"
                >
                  <span>{t.backToFarmerLogin}</span>
                </button>
              </div>
            )}

            {/* Security Guarantee Badge */}
            <div className="mt-auto pt-3 flex items-center justify-center gap-2 text-xs font-semibold text-[#667A6C]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C98813" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>{t.securityText}</span>
            </div>

          </form>

        </div>

        {/* ========================================================================= */}
        {/* OFFICER FORGOT PASSWORD MODAL WINDOW */}
        {/* ========================================================================= */}
        {showForgotModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-gray-200 space-y-3.5 animate-in slide-in-from-bottom duration-300">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F1E7] text-[#2D7A4D] flex items-center justify-center border border-[#BED5C1]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      Officer Password Reset
                    </h3>
                    <p className="text-[11.5px] text-gray-500 font-medium">
                      Enter officer credentials to reset password
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition active:scale-95 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Status Message */}
              {forgotStatus.msg && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    forgotStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  <span>{forgotStatus.type === 'success' ? '✅' : '⚠️'}</span>
                  <span>{forgotStatus.msg}</span>
                </div>
              )}

              {/* Forgot Password Form */}
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                {/* 1. Officer ID */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700">
                    Officer Registration ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={forgotOfficerId}
                    onChange={(e) => setForgotOfficerId(e.target.value)}
                    placeholder="e.g. WB-AGRI-2025-104"
                    className="w-full h-[42px] px-3.5 rounded-xl bg-[#F8FAF5] border border-gray-300 text-xs font-semibold text-gray-900 focus:bg-white focus:border-[#2D7A4D] outline-none"
                  />
                </div>

                {/* 2. Official Email ID */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700">
                    Official Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="officer@wb.gov.in"
                    className="w-full h-[42px] px-3.5 rounded-xl bg-[#F8FAF5] border border-gray-300 text-xs font-semibold text-gray-900 focus:bg-white focus:border-[#2D7A4D] outline-none"
                  />
                </div>

                {/* 3. New Password & Confirm Password */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={forgotNewPassword}
                      onChange={(e) => setForgotNewPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="w-full h-[42px] px-3 rounded-xl bg-[#F8FAF5] border border-gray-300 text-xs font-semibold text-gray-900 focus:bg-white focus:border-[#2D7A4D] outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-700">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={forgotConfirmPassword}
                      onChange={(e) => setForgotConfirmPassword(e.target.value)}
                      placeholder="Re-enter"
                      className="w-full h-[42px] px-3 rounded-xl bg-[#F8FAF5] border border-gray-300 text-xs font-semibold text-gray-900 focus:bg-white focus:border-[#2D7A4D] outline-none"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#2D7A4D] hover:bg-[#246640] text-white py-2.5 rounded-xl text-xs font-bold transition active:scale-98 shadow-md cursor-pointer"
                  >
                    Reset &amp; Update Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl text-xs font-bold transition active:scale-98 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
