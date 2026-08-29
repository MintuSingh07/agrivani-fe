/* ==========================================================================
   AgriVani Auth Application Logic
   Clean text without emojis, high-contrast accessible layout for farmers.
   Supports 12 Indian Regional Languages:
   English, Hindi, Marathi, Punjabi, Odia, Gujarati, Rajasthani, Tamil,
   Telugu, Nepali, Assamese, Bengali.
   ========================================================================== */

// Translations dictionary for 12 Indian regional languages (Farmer-Friendly, Clean Text)
const i18n = {
  en: {
    appName: "AgriVani",
    langName: "English",
    langEnglish: "English",
    signInTab: "Sign In",
    signUpTab: "Sign Up",
    welcomeBack: "Welcome Back",
    signInSub: "Sign in to continue to AgriVani",
    createAccount: "Create Account",
    signUpSub: "Join AgriVani and farm smarter",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    mobileNumber: "Mobile Number",
    mobilePlaceholder: "Mobile number",
    password: "Password",
    createPassword: "Create Password",
    enterPassword: "Enter password",
    minChars: "Minimum 6 characters",
    forgotPassword: "Forgot Password?",
    continueBtn: "Continue →",
    createAccountBtn: "Create Account",
    orSignInWith: "OR SIGN IN WITH",
    signInWithOtp: "Sign In with OTP",
    newToAgriVani: "New to AgriVani?",
    alreadyHaveAccount: "Already have an account?",
    securityText: "Your information is secure",
    otpTitle: "Verify Mobile Number",
    otpSubtitle: "Enter the 4-digit verification code sent to +91 ",
    verifyBtn: "Verify & Proceed",
    resendOtp: "Resend Code in ",
    toastSignInSuccess: "Welcome back to AgriVani!",
    toastSignUpSuccess: "Account created successfully! Welcome to AgriVani.",
    toastInvalidMobile: "Please enter a valid 10-digit mobile number",
    toastInvalidPass: "Password must be at least 6 characters"
  },
  hi: {
    appName: "एग्रीवाणी",
    langName: "हिन्दी",
    langEnglish: "Hindi",
    signInTab: "साइन इन",
    signUpTab: "साइन अप",
    welcomeBack: "वापसी पर स्वागत है",
    signInSub: "एग्रीवाणी जारी रखने के लिए साइन इन करें",
    createAccount: "खाता बनाएं",
    signUpSub: "एग्रीवाणी से जुड़ें और स्मार्ट खेती करें",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    mobileNumber: "मोबाइल नंबर",
    mobilePlaceholder: "मोबाइल नंबर",
    password: "पासवर्ड",
    createPassword: "पासवर्ड बनाएं",
    enterPassword: "पासवर्ड दर्ज करें",
    minChars: "कम से कम 6 अक्षर",
    forgotPassword: "पासवर्ड भूल गए?",
    continueBtn: "आगे बढ़ें →",
    createAccountBtn: "खाता बनाएं",
    orSignInWith: "या इसके साथ साइन इन करें",
    signInWithOtp: "ओटीपी से साइन इन करें",
    newToAgriVani: "एग्रीवाणी पर नए हैं?",
    alreadyHaveAccount: "पहले से खाता है?",
    securityText: "आपकी जानकारी पूर्णतः सुरक्षित है",
    otpTitle: "मोबाइल नंबर सत्यापित करें",
    otpSubtitle: "इस नंबर पर भेजा गया 4 अंकों का कोड दर्ज करें +91 ",
    verifyBtn: "सत्यापित करें और आगे बढ़ें",
    resendOtp: "कोड पुनः भेजें ",
    toastSignInSuccess: "एग्रीवाणी में आपका स्वागत है!",
    toastSignUpSuccess: "खाता सफलतापूर्वक बन गया! एग्रीवाणी में स्वागत है।",
    toastInvalidMobile: "कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें",
    toastInvalidPass: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए"
  },
  mr: {
    appName: "अ‍ॅग्रीवाणी",
    langName: "मराठी",
    langEnglish: "Marathi",
    signInTab: "साइन इन",
    signUpTab: "साइन अप",
    welcomeBack: "पुन्हा स्वागत आहे",
    signInSub: "अ‍ॅग्रीवाणी सुरू ठेवण्यासाठी साइन इन करा",
    createAccount: "खाते तयार करा",
    signUpSub: "अ‍ॅग्रीवाणीशी जोडा आणि स्मार्ट शेती करा",
    fullName: "पूर्ण नाव",
    fullNamePlaceholder: "आपले पूर्ण नाव टाका",
    mobileNumber: "मोबाईल नंबर",
    mobilePlaceholder: "मोबाईल नंबर",
    password: "पासवर्ड",
    createPassword: "पासवर्ड तयार करा",
    enterPassword: "पासवर्ड टाका",
    minChars: "किमान 6 अक्षरे",
    forgotPassword: "पासवर्ड विसरलात?",
    continueBtn: "पुढे जा →",
    createAccountBtn: "खाते तयार करा",
    orSignInWith: "किंवा यासह साइन इन करा",
    signInWithOtp: "OTP ने साइन इन करा",
    newToAgriVani: "अ‍ॅग्रीवाणीवर नवीन आहात?",
    alreadyHaveAccount: "आधीच खाते आहे का?",
    securityText: "आपली माहिती पूर्णपणे सुरक्षित आहे",
    otpTitle: "मोबाईल नंबर पडताळणी",
    otpSubtitle: "पाठवलेला 4 अंकी कोड प्रविष्ट करा +91 ",
    verifyBtn: "पडताळणी करा आणि पुढे जा",
    resendOtp: "कोड पुन्हा पाठवा ",
    toastSignInSuccess: "अ‍ॅग्रीवाणीमध्ये स्वागत आहे!",
    toastSignUpSuccess: "खाते यशस्वीरित्या तयार झाले!",
    toastInvalidMobile: "कृपया वैध 10 अंकी मोबाईल नंबर टाका",
    toastInvalidPass: "पासवर्ड किमान 6 अक्षरांचा असावा"
  },
  pa: {
    appName: "ਐਗਰੀਵਾਣੀ",
    langName: "ਪੰਜਾਬੀ",
    langEnglish: "Punjabi",
    signInTab: "ਸਾਈਨ ਇਨ",
    signUpTab: "ਸਾਈਨ ਅੱਪ",
    welcomeBack: "ਜੀ ਆਇਆਂ ਨੂੰ",
    signInSub: "ਐਗਰੀਵਾਣੀ ਜਾਰੀ ਰੱਖਣ ਲਈ ਸਾਈਨ ਇਨ ਕਰੋ",
    createAccount: "ਖਾਤਾ ਬਣਾਓ",
    signUpSub: "ਐਗਰੀਵਾਣੀ ਨਾਲ ਜੁੜੋ ਅਤੇ ਸਮਾਰਟ ਖੇਤੀ ਕਰੋ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    fullNamePlaceholder: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ",
    mobileNumber: "ਮੋਬਾਈਲ ਨੰਬਰ",
    mobilePlaceholder: "ਮੋਬਾਈਲ ਨੰਬਰ",
    password: "ਪਾਸਵਰਡ",
    createPassword: "ਪਾਸਵਰਡ ਬਣਾਓ",
    enterPassword: "ਪਾਸਵਰਡ ਦਰਜ ਕਰੋ",
    minChars: "ਘੱਟੋ-ਘੱਟ 6 ਅੱਖਰ",
    forgotPassword: "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
    continueBtn: "ਅੱਗੇ ਵਧੋ →",
    createAccountBtn: "ਖਾਤਾ ਬਣਾਓ",
    orSignInWith: "ਜਾਂ ਇਸ ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ",
    signInWithOtp: "OTP ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ",
    newToAgriVani: "ਐਗਰੀਵਾਣੀ ਤੇ ਨਵੇਂ ਹੋ?",
    alreadyHaveAccount: "ਪਹਿਲਾਂ ਹੀ ਖਾਤਾ ਹੈ?",
    securityText: "ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਸੁਰੱਖਿਅਤ ਹੈ",
    otpTitle: "ਮੋਬਾਈਲ ਨੰਬਰ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    otpSubtitle: "ਭੇਜਿਆ ਗਿਆ 4 ਅੰਕਾਂ ਦਾ ਕੋਡ ਦਰਜ ਕਰੋ +91 ",
    verifyBtn: "ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਅੱਗੇ ਵਧੋ",
    resendOtp: "ਕੋਡ ਦੁਬਾਰਾ ਭੇਜੋ ",
    toastSignInSuccess: "ਐਗਰੀਵਾਣੀ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ!",
    toastSignUpSuccess: "ਖਾਤਾ ਸਫਲਤਾਪੂਰਵਕ ਬਣਾਇਆ ਗਿਆ!",
    toastInvalidMobile: "ਕਿਰਪਾ ਕਰਕੇ ਸਹੀ 10 ਅੰਕਾਂ ਵਾਲਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ",
    toastInvalidPass: "ਪਾਸਵਰਡ ਘੱਟੋ-ਘੱਟ 6 ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ"
  },
  or: {
    appName: "ଏଗ୍ରିବାଣୀ",
    langName: "ଓଡ଼ିଆ",
    langEnglish: "Odia (Oriya)",
    signInTab: "ସାଇନ୍ ଇନ୍",
    signUpTab: "ସାଇନ୍ ଅପ୍",
    welcomeBack: "ପୁନର୍ବାର ସ୍ୱାଗତ",
    signInSub: "ଏଗ୍ରିବାଣୀ ଜାରି ରଖିବାକୁ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ",
    createAccount: "ଖାତା ଖୋଲନ୍ତୁ",
    signUpSub: "ଏଗ୍ରିବାଣୀ ସହିତ ଯୋଡି ହୁଅନ୍ତୁ ଏବଂ ସ୍ମାର୍ଟ ଚାଷ କରନ୍ତୁ",
    fullName: "ପୂରା ନାମ",
    fullNamePlaceholder: "ଆପଣଙ୍କର ପୂରା ନାମ ଲେଖନ୍ତୁ",
    mobileNumber: "ମୋବାଇଲ୍ ନମ୍ବର",
    mobilePlaceholder: "ମୋବାଇଲ୍ ନମ୍ବର",
    password: "ପାସୱାର୍ଡ",
    createPassword: "ପାସୱାର୍ଡ ବନାନ୍ତୁ",
    enterPassword: "ପାସୱାର୍ଡ ଦିଅନ୍ତୁ",
    minChars: "ଅତି କମରେ ୬ଟି ଅକ୍ଷର",
    forgotPassword: "ପାସୱାର୍ଡ ଭୁଲିଗଲେ କି?",
    continueBtn: "ଆଗକୁ ବଢ଼ନ୍ତୁ →",
    createAccountBtn: "ଖାତା ଖୋଲନ୍ତୁ",
    orSignInWith: "କିମ୍ବା ଏହା ସହିତ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ",
    signInWithOtp: "OTP ସହିତ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ",
    newToAgriVani: "ଏଗ୍ରିବାଣୀରେ ନୂଆ କି?",
    alreadyHaveAccount: "ପୂର୍ବରୁ ଖାତା ଅଛି କି?",
    securityText: "ଆପଣଙ୍କ ସୂଚନା ସମ୍ପୂର୍ଣ୍ଣ ସୁରକ୍ଷିତ",
    otpTitle: "ମୋବାଇଲ୍ ନମ୍ବର ଯାଞ୍ଚ କରନ୍ତୁ",
    otpSubtitle: "ପଠାଯାଇଥିବା ୪ ଅଙ୍କର କୋଡ୍ ପ୍ରବେଶ କରନ୍ତୁ +91 ",
    verifyBtn: "ଯାଞ୍ଚ କରି ଆଗକୁ ବଢ଼ନ୍ତୁ",
    resendOtp: "କୋଡ୍ ପୁନଃ ପଠାନ୍ତୁ ",
    toastSignInSuccess: "ଏଗ୍ରିବାଣୀକୁ ସ୍ୱାଗତ!",
    toastSignUpSuccess: "ଖାତା ସଫଳତାର ସହ ଖୋଲାଗଲା!",
    toastInvalidMobile: "ଦୟାକରି ସଠିକ୍ ୧୦ ଅଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର ଦିଅନ୍ତୁ",
    toastInvalidPass: "ପାସୱାର୍ଡ ଅତି କମରେ ୬ଟି ଅକ୍ଷର ହେବା ଆବଶ୍ୟକ"
  },
  gu: {
    appName: "એગ્રીવાણી",
    langName: "ગુજરાતી",
    langEnglish: "Gujarati",
    signInTab: "સાઇન ઇન",
    signUpTab: "સાઇન અપ",
    welcomeBack: "પાછા સ્વાગત છે",
    signInSub: "એગ્રીવાણી ચાલુ રાખવા માટે સાઇન ઇન કરો",
    createAccount: "ખાતું બનાવો",
    signUpSub: "એગ્રીવાણી સાથે જોડાઓ અને સ્માર્ટ ખેતી કરો",
    fullName: "પૂરું નામ",
    fullNamePlaceholder: "તમારું પૂરું નામ દાખલ કરો",
    mobileNumber: "મોબાઇલ નંબર",
    mobilePlaceholder: "મોબાઇલ નંબર",
    password: "પાસવર્ડ",
    createPassword: "પાસવર્ડ બનાવો",
    enterPassword: "પાસવર્ડ દાખલ કરો",
    minChars: "ઓછામાં ઓછા 6 અક્ષરો",
    forgotPassword: "પાસવર્ડ ભૂલી ગયા?",
    continueBtn: "આગળ વધો →",
    createAccountBtn: "ખાતું બનાવો",
    orSignInWith: "અથવા આનાથી સાઇન ઇન કરો",
    signInWithOtp: "OTP થી સાઇન ઇન કરો",
    newToAgriVani: "એગ્રીવાણી પર નવા છો?",
    alreadyHaveAccount: "પહેલેથી ખાતું છે?",
    securityText: "તમારી માહિતી સુરક્ષિત છે",
    otpTitle: "મોબાઇલ નંબર ચકાસો",
    otpSubtitle: "મોકલેલ 4 અંકનો કોડ દાખલ કરો +91 ",
    verifyBtn: "ચકાસો અને આગળ વધો",
    resendOtp: "કોડ ફરી મોકલો ",
    toastSignInSuccess: "એગ્રીવાણીમાં આપનું સ્વાગત છે!",
    toastSignUpSuccess: "ખાતું સફળતાપૂર્વક બનાવવામાં આવ્યું!",
    toastInvalidMobile: "કૃપા કરીને માન્ય 10 અંકનો મોબાઇલ નંબર દાખલ કરો",
    toastInvalidPass: "પાસવર્ડ ઓછામાં ઓછો 6 અક્ષરોનો હોવો જોઈએ"
  },
  raj: {
    appName: "एग्रीवाणी",
    langName: "राजस्थानी",
    langEnglish: "Rajasthani",
    signInTab: "साइन इन",
    signUpTab: "साइन अप",
    welcomeBack: "पधारो सा, पाछा स्वागत है",
    signInSub: "एग्रीवाणी चालू राखण खातर साइन इन करो",
    createAccount: "खातो बणाओ",
    signUpSub: "एग्रीवाणी सूं जुड़ो अर स्मार्ट खेती करो",
    fullName: "पूरो नाम",
    fullNamePlaceholder: "आपरौ पूरो नाम लिखो",
    mobileNumber: "मोबाइल नंबर",
    mobilePlaceholder: "मोबाइल नंबर",
    password: "पासवर्ड",
    createPassword: "पासवर्ड बणाओ",
    enterPassword: "पासवर्ड लिखो",
    minChars: "कम सूं कम 6 आखर",
    forgotPassword: "पासवर्ड भूल ग्या?",
    continueBtn: "आगे बधो →",
    createAccountBtn: "खातो बणाओ",
    orSignInWith: "या ईं सूं साइन इन करो",
    signInWithOtp: "OTP सूं साइन इन करो",
    newToAgriVani: "एग्रीवाणी पै नया हो?",
    alreadyHaveAccount: "पैलै सूं खातो है?",
    securityText: "आपरी जानकारी पूरी तरियां सुरक्षित है",
    otpTitle: "मोबाइल नंबर जाचो",
    otpSubtitle: "भेजियो गयो 4 अंका रो कोड लिखो +91 ",
    verifyBtn: "जाच करो अर आगे बधो",
    resendOtp: "कोड पाछो भेजो ",
    toastSignInSuccess: "एग्रीवाणी में आपरो स्वागत है!",
    toastSignUpSuccess: "खातो बण गयो! एग्रीवाणी में स्वागत है सा।",
    toastInvalidMobile: "कृपा कर'र सही 10 अंका रो मोबाइल नंबर लिखो",
    toastInvalidPass: "पासवर्ड कम सूं कम 6 आखरां रो होणो चाहिजे"
  },
  ta: {
    appName: "அக்ரிவாணி",
    langName: "தமிழ்",
    langEnglish: "Tamil",
    signInTab: "உள்நுழைக",
    signUpTab: "பதிவு செய்க",
    welcomeBack: "மீண்டும் வருக",
    signInSub: "அக்ரிவாணியைத் தொடர உள்நுழைக",
    createAccount: "கணக்கை உருவாக்குக",
    signUpSub: "அக்ரிவாணியில் இணைந்து ஸ்மார்ட்டாக விவசாயம் செய்யுங்கள்",
    fullName: "முழு பெயர்",
    fullNamePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
    mobileNumber: "கைபேசி எண்",
    mobilePlaceholder: "கைபேசி எண்",
    password: "கடவுச்சொல்",
    createPassword: "கடவுச்சொல்லை உருவாக்குக",
    enterPassword: "கடவுச்சொல்லை உள்ளிடவும்",
    minChars: "குறைந்தது 6 எழுத்துக்கள்",
    forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
    continueBtn: "தொடரவும் →",
    createAccountBtn: "கணக்கை உருவாக்குக",
    orSignInWith: "அல்லது இதனுடன் உள்நுழைக",
    signInWithOtp: "OTP மூலம் உள்நுழைக",
    newToAgriVani: "அக்ரிவாணிக்கு புதியவரா?",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    securityText: "உங்கள் தகவல்கள் பாதுகாப்பானவை",
    otpTitle: "கைபேசி எண்ணை சரிபார்க்கவும்",
    otpSubtitle: "அனுப்பப்பட்ட 4 இலக்க குறியீட்டை உள்ளிடவும் +91 ",
    verifyBtn: "சரிபார்த்து தொடரவும்",
    resendOtp: "குறியீட்டை மீண்டும் அனுப்பவும் ",
    toastSignInSuccess: "அக்ரிவாணிக்கு நல்வரவு!",
    toastSignUpSuccess: "கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!",
    toastInvalidMobile: "சரியான 10 இலக்க கைபேசி எண்ணை உள்ளிடவும்",
    toastInvalidPass: "கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்"
  },
  te: {
    appName: "అగ్రివాణి",
    langName: "తెలుగు",
    langEnglish: "Telugu",
    signInTab: "సైన్ ఇన్",
    signUpTab: "సైన్ అప్",
    welcomeBack: "తిరిగి స్వాగతం",
    signInSub: "అగ్రివాణిని కొనసాగించడానికి సైన్ ఇన్ చేయండి",
    createAccount: "ఖాతా సృష్టించండి",
    signUpSub: "అగ్రివాణితో చేరి స్మార్ట్‌గా వ్యవసాయం చేయండి",
    fullName: "పూర్తి పేరు",
    fullNamePlaceholder: "మీ పూర్తి పేరును నమోదు చేయండి",
    mobileNumber: "మొబైల్ నంబర్",
    mobilePlaceholder: "మొబైల్ నంబర్",
    password: "పాస్‌వర్డ్",
    createPassword: "పాస్‌వర్డ్ సృష్టించండి",
    enterPassword: "పాస్‌వర్డ్ నమోదు చేయండి",
    minChars: "కనీసం 6 అక్షరాలు",
    forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
    continueBtn: "కొనసాగించండి →",
    createAccountBtn: "ఖాతా సృష్టించండి",
    orSignInWith: "లేదా దీనితో సైన్ ఇన్ చేయండి",
    signInWithOtp: "OTPతో సైన్ ఇన్ చేయండి",
    newToAgriVani: "అగ్రివాణికి కొత్తవారా?",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    securityText: "మీ సమాచారం సురక్షితం",
    otpTitle: "మొబైల్ నంబర్ ధృవీకరించండి",
    otpSubtitle: "పంపిణీ చేసిన 4 అంకెల కోడ్‌ను నమోదు చేయండి +91 ",
    verifyBtn: "ధృవీకరించి ముందుకు సాగండి",
    resendOtp: "కోడ్‌ని మళ్లీ పంపండి ",
    toastSignInSuccess: "అగ్రివాణికి స్వాగతం!",
    toastSignUpSuccess: "ఖాతా విజయవంతంగా సృష్టించబడింది!",
    toastInvalidMobile: "దయచేసి సరైన 10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి",
    toastInvalidPass: "పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి"
  },
  ne: {
    appName: "एग्रीवाणी",
    langName: "नेपाली",
    langEnglish: "Nepali",
    signInTab: "साइन इन",
    signUpTab: "साइन अप",
    welcomeBack: "पुनः स्वागत छ",
    signInSub: "एग्रीवाणी जारी राख्न साइन इन गर्नुहोस्",
    createAccount: "खाता खोल्नुहोस्",
    signUpSub: "एग्रीवाणीसँग जोडिनुहोस् र स्मार्ट खेती गर्नुहोस्",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "आफ्नो पूरा नाम प्रविष्ट गर्नुहोस्",
    mobileNumber: "मोबाइल नम्बर",
    mobilePlaceholder: "मोबाइल नम्बर",
    password: "पासवर्ड",
    createPassword: "पासवर्ड बनाउनुहोस्",
    enterPassword: "पासवर्ड प्रविष्ट गर्नुहोस्",
    minChars: "कम्तिमा ६ वर्णहरू",
    forgotPassword: "पासवर्ड बिर्सनुभयो?",
    continueBtn: "अगाडि बढ्नुहोस् →",
    createAccountBtn: "खाता खोल्नुहोस्",
    orSignInWith: "वा यसबाट साइन इन गर्नुहोस्",
    signInWithOtp: "OTP मार्फत साइन इन गर्नुहोस्",
    newToAgriVani: "एग्रीवाणीमा नयाँ हुनुहुन्छ?",
    alreadyHaveAccount: "पहिल्यै खाता छ?",
    securityText: "तपाईंको जानकारी पूर्ण सुरक्षित छ",
    otpTitle: "मोबाइल नम्बर प्रमाणीकरण",
    otpSubtitle: "पठाइएको ४ अंकको कोड प्रविष्ट गर्नुहोस् +91 ",
    verifyBtn: "प्रमाणित गरी अगाडि बढ्नुहोस्",
    resendOtp: "कोड पुनः पठाउनुहोस् ",
    toastSignInSuccess: "एग्रीवाणीमा स्वागत छ!",
    toastSignUpSuccess: "खाता सफलतापूर्वक सिर्जना गरियो!",
    toastInvalidMobile: "कृपया मान्य १० अंकको मोबाइल नम्बर प्रविष्ट गर्नुहोस्",
    toastInvalidPass: "पासवर्ड कम्तिमा ६ वर्णको हुनुपर्छ"
  },
  as: {
    appName: "এগ্ৰীবাণী",
    langName: "অসমীয়া",
    langEnglish: "Assamese",
    signInTab: "ছাইন ইন",
    signUpTab: "ছাইন আপ",
    welcomeBack: "পুনৰ স্বাগতম",
    signInSub: "এগ্ৰীবাণী অব্যাহত ৰাখিবলৈ ছাইন ইন কৰক",
    createAccount: "একাউণ্ট খোলক",
    signUpSub: "এগ্ৰীবাণীৰ সৈতে সংযোগ কৰক আৰু স্মাৰ্ট খেতি কৰক",
    fullName: "সম্পূৰ্ণ নাম",
    fullNamePlaceholder: "আপোনাৰ সম্পূৰ্ণ নাম লিখক",
    mobileNumber: "মোবাইল নম্বৰ",
    mobilePlaceholder: "মোবাইল নম্বৰ",
    password: "পাছৱৰ্ড",
    createPassword: "পাছৱৰ্ড তৈয়াৰ কৰক",
    enterPassword: "পাছৱৰ্ড প্ৰৱেশ কৰক",
    minChars: "নূন্যতম ৬টা আখৰ",
    forgotPassword: "পাছৱৰ্ড পাহৰিলে নেকি?",
    continueBtn: "আগবাঢ়ক →",
    createAccountBtn: "একাউণ্ট খোলক",
    orSignInWith: "বা ইয়াৰ দ্বাৰা ছাইন ইন কৰক",
    signInWithOtp: "OTP ৰ সৈতে ছাইন ইন কৰক",
    newToAgriVani: "এগ্ৰীবাণীত নতুন নেকি?",
    alreadyHaveAccount: "ইতিমধ্যে একাউণ্ট আছে নেকি?",
    securityText: "আপোনাৰ তথ্য সম্পূৰ্ণ সুৰক্ষিত",
    otpTitle: "মোবাইল নম্বৰ পৰীক্ষা কৰক",
    otpSubtitle: "প্ৰেৰণ কৰা ৪-অংকৰ ক'ড প্ৰৱেশ কৰক +91 ",
    verifyBtn: "পৰীক্ষা কৰি আগবাঢ়ক",
    resendOtp: "ক'ড পুনৰ পঠাওক ",
    toastSignInSuccess: "এগ্ৰীবাণীলৈ স্বাগতম!",
    toastSignUpSuccess: "একাউণ্ট সফলতাৰে সৃষ্টি কৰা হ'ল!",
    toastInvalidMobile: "অনুগ্ৰহ কৰি বৈধ ১০টা সংখ্যাৰ মোবাইল নম্বৰ প্ৰৱেশ কৰক",
    toastInvalidPass: "পাছৱৰ্ড নূন্যতম ৬টা আখৰৰ হ'ব লাগিব"
  },
  bn: {
    appName: "এগ্রিবাণী",
    langName: "বাংলা",
    langEnglish: "Bengali",
    signInTab: "সাইন ইন",
    signUpTab: "সাইন আপ",
    welcomeBack: "ফিরে আসার জন্য স্বাগতম",
    signInSub: "এগ্রিবাণী চালু রাখতে সাইন ইন করুন",
    createAccount: "অ্যাকাউন্ট তৈরি করুন",
    signUpSub: "এগ্রিবাণীর সাথে যুক্ত হোন এবং স্মার্ট চাষ করুন",
    fullName: "পুরো নাম",
    fullNamePlaceholder: "আপনার পুরো নাম লিখুন",
    mobileNumber: "মোবাইল নম্বর",
    mobilePlaceholder: "মোবাইল নম্বর",
    password: "পাসওয়ার্ড",
    createPassword: "পাসওয়ার্ড তৈরি করুন",
    enterPassword: "পাসওয়ার্ড লিখুন",
    minChars: "কমপক্ষে ৬টি অক্ষর",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    continueBtn: "এগিয়ে যান →",
    createAccountBtn: "অ্যাকাউন্ট তৈরি করুন",
    orSignInWith: "অথবা এর মাধ্যমে সাইন ইন করুন",
    signInWithOtp: "OTP দিয়ে সাইন ইন করুন",
    newToAgriVani: "এগ্রিবাণীতে নতুন?",
    alreadyHaveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    securityText: "আপনার তথ্য সম্পূর্ণ সুরক্ষিত",
    otpTitle: "মোবাইল নম্বর যাচাই করুন",
    otpSubtitle: "পাঠানো ৪ ডিজিটের কোডটি লিখুন +91 ",
    verifyBtn: "যাচাই করে এগিয়ে যান",
    resendOtp: "কোড পুনরায় পাঠান ",
    toastSignInSuccess: "এগ্রিবাণীতে স্বাগতম!",
    toastSignUpSuccess: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!",
    toastInvalidMobile: "অনুগ্রহ করে সঠিক ১০ সংখ্যার মোবাইল নম্বর লিখুন",
    toastInvalidPass: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"
  }
};

let currentLang = 'en';

// Update all text elements with the selected language
function setLanguage(langKey) {
  if (!i18n[langKey]) return;
  currentLang = langKey;
  const t = i18n[langKey];

  // Update Header Language Button Text
  document.querySelectorAll('.lang-btn-text').forEach(el => el.textContent = t.langName);

  // Highlight active language card in modal
  document.querySelectorAll('.lang-card-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === langKey);
  });

  // App Brand Titles
  document.querySelectorAll('.brand-title').forEach(el => el.textContent = t.appName);

  // Sign In Screen Updates
  document.querySelectorAll('[data-i18n="signInTab"]').forEach(el => el.textContent = t.signInTab);
  document.querySelectorAll('[data-i18n="signUpTab"]').forEach(el => el.textContent = t.signUpTab);
  document.querySelectorAll('[data-i18n="welcomeBack"]').forEach(el => el.textContent = t.welcomeBack);
  document.querySelectorAll('[data-i18n="signInSub"]').forEach(el => el.textContent = t.signInSub);
  document.querySelectorAll('[data-i18n="mobileNumber"]').forEach(el => el.textContent = t.mobileNumber);
  document.querySelectorAll('[data-i18n="mobilePlaceholder"]').forEach(el => el.placeholder = t.mobilePlaceholder);
  document.querySelectorAll('[data-i18n="password"]').forEach(el => el.textContent = t.password);
  document.querySelectorAll('[data-i18n="enterPassword"]').forEach(el => el.placeholder = t.enterPassword);
  document.querySelectorAll('[data-i18n="forgotPassword"]').forEach(el => el.textContent = t.forgotPassword);
  document.querySelectorAll('[data-i18n="continueBtn"]').forEach(el => el.innerHTML = `${t.continueBtn}`);
  document.querySelectorAll('[data-i18n="orSignInWith"]').forEach(el => el.textContent = t.orSignInWith);
  document.querySelectorAll('[data-i18n="signInWithOtp"]').forEach(el => el.textContent = t.signInWithOtp);
  document.querySelectorAll('[data-i18n="newToAgriVani"]').forEach(el => el.textContent = t.newToAgriVani);
  document.querySelectorAll('[data-i18n="createAccountLink"]').forEach(el => el.textContent = t.createAccount);
  document.querySelectorAll('[data-i18n="securityText"]').forEach(el => el.textContent = t.securityText);

  // Sign Up Screen Updates
  document.querySelectorAll('[data-i18n="createAccount"]').forEach(el => el.textContent = t.createAccount);
  document.querySelectorAll('[data-i18n="signUpSub"]').forEach(el => el.textContent = t.signUpSub);
  document.querySelectorAll('[data-i18n="fullName"]').forEach(el => el.textContent = t.fullName);
  document.querySelectorAll('[data-i18n="fullNamePlaceholder"]').forEach(el => el.placeholder = t.fullNamePlaceholder);
  document.querySelectorAll('[data-i18n="createPassword"]').forEach(el => el.textContent = t.createPassword);
  document.querySelectorAll('[data-i18n="minChars"]').forEach(el => el.placeholder = t.minChars);
  document.querySelectorAll('[data-i18n="createAccountBtn"]').forEach(el => el.textContent = t.createAccountBtn);
  document.querySelectorAll('[data-i18n="alreadyHaveAccount"]').forEach(el => el.textContent = t.alreadyHaveAccount);
  document.querySelectorAll('[data-i18n="signInLink"]').forEach(el => el.textContent = t.signInTab);

  // Modal texts
  document.querySelectorAll('[data-i18n="otpTitle"]').forEach(el => el.textContent = t.otpTitle);
  document.querySelectorAll('[data-i18n="verifyBtn"]').forEach(el => el.textContent = t.verifyBtn);
}

// Switch active tab in Web Auth Card
function switchTab(targetTab) {
  const tabSignIn = document.getElementById('tabSignIn');
  const tabSignUp = document.getElementById('tabSignUp');
  const viewSignIn = document.getElementById('viewSignIn');
  const viewSignUp = document.getElementById('viewSignUp');

  if (targetTab === 'signin') {
    tabSignIn.classList.add('active');
    tabSignIn.setAttribute('aria-selected', 'true');
    tabSignUp.classList.remove('active');
    tabSignUp.setAttribute('aria-selected', 'false');

    viewSignIn.classList.add('active-form');
    viewSignUp.classList.remove('active-form');
  } else {
    tabSignUp.classList.add('active');
    tabSignUp.setAttribute('aria-selected', 'true');
    tabSignIn.classList.remove('active');
    tabSignIn.setAttribute('aria-selected', 'false');

    viewSignUp.classList.add('active-form');
    viewSignIn.classList.remove('active-form');
  }
}

// Toggle password visibility with clean SVG icon
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>`;
  } else {
    input.type = 'password';
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>`;
  }
}

// Show accessible toast feedback
function showToast(msg) {
  const toast = document.getElementById('globalToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// OTP Dialog open/close
function openOtpModal(mobileVal) {
  const modal = document.getElementById('otpModal');
  const targetMobileSpan = document.getElementById('otpTargetMobile');
  if (targetMobileSpan) {
    targetMobileSpan.textContent = mobileVal ? `+91 ${mobileVal}` : '+91 98765 43210';
  }
  modal.classList.add('open');
  setTimeout(() => {
    const firstBox = document.querySelector('.otp-digit-1');
    if (firstBox) firstBox.focus();
  }, 100);
}

function closeOtpModal() {
  document.getElementById('otpModal').classList.remove('open');
}

// Language Picker Modal open/close
function openLangModal() {
  document.getElementById('langModal').classList.add('open');
}

function closeLangModal() {
  document.getElementById('langModal').classList.remove('open');
}

function selectModalLanguage(langCode) {
  setLanguage(langCode);
  closeLangModal();
  showToast(`Language changed to ${i18n[langCode].langName} (${i18n[langCode].langEnglish})`);
}

// Forgot Password Modal
function openForgotPasswordModal() {
  document.getElementById('forgotModal').classList.add('open');
}

function closeForgotPasswordModal() {
  document.getElementById('forgotModal').classList.remove('open');
}

// Initialize Event Listeners on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  // Mobile number input restrictions (digits only, max 10)
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    });
  });

  // OTP inputs auto-advance
  const otpInputs = document.querySelectorAll('.otp-box');
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = val ? val[0] : '';
      if (val && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // Sign In Form Submission
  const signInForm = document.getElementById('formSignIn');
  if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mobile = document.getElementById('signinMobile').value;
      const pass = document.getElementById('signinPassword').value;
      
      if (mobile.length !== 10) {
        showToast(i18n[currentLang].toastInvalidMobile);
        return;
      }
      if (pass.length < 6) {
        showToast(i18n[currentLang].toastInvalidPass);
        return;
      }
      showToast(i18n[currentLang].toastSignInSuccess);
    });
  }

  // Sign Up Form Submission
  const signUpForm = document.getElementById('formSignUp');
  if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signupName').value;
      const mobile = document.getElementById('signupMobile').value;
      const pass = document.getElementById('signupPassword').value;

      if (!name.trim()) {
        showToast('Please enter your full name');
        return;
      }
      if (mobile.length !== 10) {
        showToast(i18n[currentLang].toastInvalidMobile);
        return;
      }
      if (pass.length < 6) {
        showToast(i18n[currentLang].toastInvalidPass);
        return;
      }
      showToast(i18n[currentLang].toastSignUpSuccess);
    });
  }

  // Set initial default language
  setLanguage('en');
});
