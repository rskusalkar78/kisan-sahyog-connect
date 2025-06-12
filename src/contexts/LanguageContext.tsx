
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'mr' | 'hi' | 'ta' | 'te' | 'kn';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.schemes': 'Schemes',
    'nav.eligibility': 'Eligibility Check',
    'nav.documents': 'Documents',
    'nav.status': 'Application Status',
    'nav.support': 'Support',
    
    // Home page
    'home.title': 'AgriConnect',
    'home.subtitle': 'Your Digital Gateway to Agricultural Schemes',
    'home.description': 'Discover, apply for, and track government agricultural schemes designed to support farmers across India.',
    'home.get_started': 'Get Started',
    'home.explore_schemes': 'Explore Schemes',
    
    // Schemes
    'schemes.title': 'Government Schemes',
    'schemes.search_placeholder': 'Search schemes...',
    'schemes.filter_by_category': 'Filter by Category',
    'schemes.amount': 'Amount',
    'schemes.deadline': 'Deadline',
    'schemes.beneficiaries': 'Beneficiaries',
    'schemes.state': 'State',
    'schemes.apply': 'Apply Now',
    'schemes.details': 'View Details',
    'schemes.results': 'Showing {count} of {total} schemes',
    
    // Eligibility
    'eligibility.check': 'Check Eligibility',
    'eligibility.checking': 'Checking...',
    'eligibility.eligible': 'Eligible',
    'eligibility.not_eligible': 'Not Eligible',
    'eligibility.can_apply': 'You can apply for this scheme',
    'eligibility.cannot_apply': 'You cannot apply for this scheme',
    'eligibility.check_first': 'Check Eligibility First',
    'eligibility.check_before_apply': 'Please check your eligibility before applying',
    'eligibility.requirements_missing': 'requirements missing',
    'eligibility.land_size_required': 'Land size requirement not met',
    'eligibility.bank_account_required': 'Bank account required',
    'eligibility.age_requirement': 'Age requirement not met',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.submit': 'Submit',
    'common.close': 'Close',
  },
  mr: {
    // Navigation
    'nav.home': 'मुख्यपृष्ठ',
    'nav.schemes': 'योजना',
    'nav.eligibility': 'पात्रता तपासणी',
    'nav.documents': 'कागदपत्रे',
    'nav.status': 'अर्जाची स्थिती',
    'nav.support': 'सहाय्य',
    
    // Home page
    'home.title': 'कृषी कनेक्ट',
    'home.subtitle': 'कृषी योजनांसाठी तुमचे डिजिटल द्वार',
    'home.description': 'भारतातील शेतकऱ्यांना मदत करण्यासाठी डिझाइन केलेल्या सरकारी कृषी योजना शोधा, त्यांच्यासाठी अर्ज करा आणि त्यांचा मागोवा घ्या.',
    'home.get_started': 'सुरुवात करा',
    'home.explore_schemes': 'योजना पहा',
    
    // Schemes
    'schemes.title': 'सरकारी योजना',
    'schemes.search_placeholder': 'योजना शोधा...',
    'schemes.filter_by_category': 'श्रेणीनुसार फिल्टर करा',
    'schemes.amount': 'रक्कम',
    'schemes.deadline': 'शेवटची तारीख',
    'schemes.beneficiaries': 'लाभार्थी',
    'schemes.state': 'राज्य',
    'schemes.apply': 'आता अर्ज करा',
    'schemes.details': 'तपशील पहा',
    'schemes.results': '{total} पैकी {count} योजना दाखवत आहे',
    
    // Eligibility
    'eligibility.check': 'पात्रता तपासा',
    'eligibility.checking': 'तपासत आहे...',
    'eligibility.eligible': 'पात्र',
    'eligibility.not_eligible': 'अपात्र',
    'eligibility.can_apply': 'तुम्ही या योजनेसाठी अर्ज करू शकता',
    'eligibility.cannot_apply': 'तुम्ही या योजनेसाठी अर्ज करू शकत नाही',
    'eligibility.check_first': 'प्रथम पात्रता तपासा',
    'eligibility.check_before_apply': 'कृपया अर्ज करण्यापूर्वी तुमची पात्रता तपासा',
    'eligibility.requirements_missing': 'आवश्यकता अनुपस्थित',
    'eligibility.land_size_required': 'जमीन आकाराची आवश्यकता पूर्ण नाही',
    'eligibility.bank_account_required': 'बँक खाते आवश्यक',
    'eligibility.age_requirement': 'वयाची आवश्यकता पूर्ण नाही',
    
    // Common
    'common.loading': 'लोड होत आहे...',
    'common.error': 'त्रुटी',
    'common.success': 'यशस्वी',
    'common.cancel': 'रद्द करा',
    'common.save': 'जतन करा',
    'common.submit': 'सबमिट करा',
    'common.close': 'बंद करा',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.schemes': 'योजनाएं',
    'nav.eligibility': 'पात्रता जांच',
    'nav.documents': 'दस्तावेज़',
    'nav.status': 'आवेदन स्थिति',
    'nav.support': 'सहायता',
    
    // Home page
    'home.title': 'कृषि कनेक्ट',
    'home.subtitle': 'कृषि योजनाओं के लिए आपका डिजिटल द्वार',
    'home.description': 'भारत भर के किसानों की सहायता के लिए डिज़ाइन की गई सरकारी कृषि योजनाओं को खोजें, आवेदन करें और ट्रैक करें।',
    'home.get_started': 'शुरू करें',
    'home.explore_schemes': 'योजनाएं देखें',
    
    // Schemes
    'schemes.title': 'सरकारी योजनाएं',
    'schemes.search_placeholder': 'योजनाएं खोजें...',
    'schemes.filter_by_category': 'श्रेणी के अनुसार फ़िल्टर करें',
    'schemes.amount': 'राशि',
    'schemes.deadline': 'अंतिम तिथि',
    'schemes.beneficiaries': 'लाभार्थी',
    'schemes.state': 'राज्य',
    'schemes.apply': 'अभी आवेदन करें',
    'schemes.details': 'विवरण देखें',
    'schemes.results': '{total} में से {count} योजनाएं दिखा रहे हैं',
    
    // Eligibility
    'eligibility.check': 'पात्रता जांचें',
    'eligibility.checking': 'जांच रहे हैं...',
    'eligibility.eligible': 'पात्र',
    'eligibility.not_eligible': 'अपात्र',
    'eligibility.can_apply': 'आप इस योजना के लिए आवेदन कर सकते हैं',
    'eligibility.cannot_apply': 'आप इस योजना के लिए आवेदन नहीं कर सकते',
    'eligibility.check_first': 'पहले पात्रता जांचें',
    'eligibility.check_before_apply': 'कृपया आवेदन करने से पहले अपनी पात्रता जांचें',
    'eligibility.requirements_missing': 'आवश्यकताएं अनुपस्थित',
    'eligibility.land_size_required': 'भूमि आकार की आवश्यकता पूरी नहीं',
    'eligibility.bank_account_required': 'बैंक खाता आवश्यक',
    'eligibility.age_requirement': 'आयु की आवश्यकता पूरी नहीं',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफल',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें',
    'common.submit': 'सबमिट करें',
    'common.close': 'बंद करें',
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.schemes': 'திட்டங்கள்',
    'nav.eligibility': 'தகுதி சரிபார்ப்பு',
    'nav.documents': 'ஆவணங்கள்',
    'nav.status': 'விண்ணப்ப நிலை',
    'nav.support': 'ஆதரவு',
    
    // Home page
    'home.title': 'விவசாய இணைப்பு',
    'home.subtitle': 'விவசாய திட்டங்களுக்கான உங்கள் டிஜிட்டல் நுழைவாயில்',
    'home.description': 'இந்தியா முழுவதும் உள்ள விவசாயிகளுக்கு உதவ வடிவமைக்கப்பட்ட அரசு விவசாய திட்டங்களை கண்டறியவும், விண்ணப்பிக்கவும், கண்காணிக்கவும்.',
    'home.get_started': 'தொடங்குங்கள்',
    'home.explore_schemes': 'திட்டங்களை ஆராயுங்கள்',
    
    // Schemes
    'schemes.title': 'அரசு திட்டங்கள்',
    'schemes.search_placeholder': 'திட்டங்களை தேடுங்கள்...',
    'schemes.filter_by_category': 'வகையால் வடிகட்டுங்கள்',
    'schemes.amount': 'தொகை',
    'schemes.deadline': 'கடைசி தேதி',
    'schemes.beneficiaries': 'பயனாளிகள்',
    'schemes.state': 'மாநிலம்',
    'schemes.apply': 'இப்போது விண்ணப்பிக்கவும்',
    'schemes.details': 'விவரங்களை பார்க்கவும்',
    'schemes.results': '{total} இல் {count} திட்டங்களை காட்டுகிறது',
    
    // Eligibility
    'eligibility.check': 'தகுதியை சரிபார்க்கவும்',
    'eligibility.checking': 'சரிபார்க்கிறது...',
    'eligibility.eligible': 'தகுதியுள்ள',
    'eligibility.not_eligible': 'தகுதியற்ற',
    'eligibility.can_apply': 'நீங்கள் இந்த திட்டத்திற்கு விண்ணப்பிக்கலாம்',
    'eligibility.cannot_apply': 'நீங்கள் இந்த திட்டத்திற்கு விண்ணப்பிக்க முடியாது',
    'eligibility.check_first': 'முதலில் தகுதியை சரிபார்க்கவும்',
    'eligibility.check_before_apply': 'விண்ணப்பிக்கும் முன் உங்கள் தகுதியை சரிபார்க்கவும்',
    'eligibility.requirements_missing': 'தேவைகள் விடுபட்டுள்ளன',
    'eligibility.land_size_required': 'நில அளவு தேவை பூர்த்தி செய்யப்படவில்லை',
    'eligibility.bank_account_required': 'வங்கி கணக்கு தேவை',
    'eligibility.age_requirement': 'வயது தேவை பூர்த்தி செய்யப்படவில்லை',
    
    // Common
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.cancel': 'ரத்து செய்',
    'common.save': 'சேமிக்கவும்',
    'common.submit': 'சமர்ப்பிக்கவும்',
    'common.close': 'மூடு',
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.schemes': 'పథకాలు',
    'nav.eligibility': 'అర్హత తనిఖీ',
    'nav.documents': 'పత్రాలు',
    'nav.status': 'దరఖాస్తు స్థితి',
    'nav.support': 'మద్దతు',
    
    // Home page
    'home.title': 'వ్యవసాయ కనెక్ట్',
    'home.subtitle': 'వ్యవసాయ పథకాలకు మీ డిజిటల్ గేట్‌వే',
    'home.description': 'భారతదేశంలోని రైతులకు మద్దతు ఇవ్వడానికి రూపొందించిన ప్రభుత్వ వ్యవసాయ పథకాలను కనుగొనండి, దరఖాస్తు చేసుకోండి మరియు ట్రాక్ చేయండి.',
    'home.get_started': 'ప్రారంభించండి',
    'home.explore_schemes': 'పథకాలను అన్వేషించండి',
    
    // Schemes
    'schemes.title': 'ప్రభుత్వ పథకాలు',
    'schemes.search_placeholder': 'పథకాలను వెతకండి...',
    'schemes.filter_by_category': 'వర్గం ప్రకారం ఫిల్టర్ చేయండి',
    'schemes.amount': 'మొత్తం',
    'schemes.deadline': 'చివరి తేదీ',
    'schemes.beneficiaries': 'లబ్ధిదారులు',
    'schemes.state': 'రాష్ట్రం',
    'schemes.apply': 'ఇప్పుడే దరఖాస్తు చేయండి',
    'schemes.details': 'వివరాలను చూడండి',
    'schemes.results': '{total} లో {count} పథకాలను చూపిస్తోంది',
    
    // Eligibility
    'eligibility.check': 'అర్హతను తనిఖీ చేయండి',
    'eligibility.checking': 'తనిఖీ చేస్తోంది...',
    'eligibility.eligible': 'అర్హత ఉంది',
    'eligibility.not_eligible': 'అర్హత లేదు',
    'eligibility.can_apply': 'మీరు ఈ పథకానికి దరఖాస్తు చేసుకోవచ్చు',
    'eligibility.cannot_apply': 'మీరు ఈ పథకానికి దరఖాస్తు చేసుకోలేరు',
    'eligibility.check_first': 'మొదట అర్హతను తనిఖీ చేయండి',
    'eligibility.check_before_apply': 'దరఖాస్తు చేసే ముందు మీ అర్హతను తనిఖీ చేయండి',
    'eligibility.requirements_missing': 'అవసరాలు లేకపోవడం',
    'eligibility.land_size_required': 'భూమి పరిమాణం అవసరం తీర్చబడలేదు',
    'eligibility.bank_account_required': 'బ్యాంక్ ఖాతా అవసరం',
    'eligibility.age_requirement': 'వయస్సు అవసరం తీర్చబడలేదు',
    
    // Common
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.error': 'లోపం',
    'common.success': 'విజయం',
    'common.cancel': 'రద్దు చేయండి',
    'common.save': 'సేవ్ చేయండి',
    'common.submit': 'సమర్పించండి',
    'common.close': 'మూసివేయండి',
  },
  kn: {
    // Navigation
    'nav.home': 'ಮುಖ್ಯಪುಟ',
    'nav.schemes': 'ಯೋಜನೆಗಳು',
    'nav.eligibility': 'ಅರ್ಹತೆ ಪರಿಶೀಲನೆ',
    'nav.documents': 'ದಾಖಲೆಗಳು',
    'nav.status': 'ಅರ್ಜಿ ಸ್ಥಿತಿ',
    'nav.support': 'ಬೆಂಬಲ',
    
    // Home page
    'home.title': 'ಕೃಷಿ ಸಂಪರ್ಕ',
    'home.subtitle': 'ಕೃಷಿ ಯೋಜನೆಗಳಿಗೆ ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಗೇಟ್‌ವೇ',
    'home.description': 'ಭಾರತದಾದ್ಯಂತ ರೈತರನ್ನು ಬೆಂಬಲಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸರ್ಕಾರಿ ಕೃಷಿ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ, ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
    'home.get_started': 'ಪ್ರಾರಂಭಿಸಿ',
    'home.explore_schemes': 'ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    
    // Schemes
    'schemes.title': 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    'schemes.search_placeholder': 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ...',
    'schemes.filter_by_category': 'ವರ್ಗದ ಪ್ರಕಾರ ಫಿಲ್ಟರ್ ಮಾಡಿ',
    'schemes.amount': 'ಮೊತ್ತ',
    'schemes.deadline': 'ಅಂತಿಮ ದಿನಾಂಕ',
    'schemes.beneficiaries': 'ಫಲಾನುಭವಿಗಳು',
    'schemes.state': 'ರಾಜ್ಯ',
    'schemes.apply': 'ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    'schemes.details': 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    'schemes.results': '{total} ರಲ್ಲಿ {count} ಯೋಜನೆಗಳನ್ನು ತೋರಿಸುತ್ತಿದೆ',
    
    // Eligibility
    'eligibility.check': 'ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ',
    'eligibility.checking': 'ಪರಿಶೀಲಿಸುತ್ತಿದೆ...',
    'eligibility.eligible': 'ಅರ್ಹ',
    'eligibility.not_eligible': 'ಅನರ್ಹ',
    'eligibility.can_apply': 'ನೀವು ಈ ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು',
    'eligibility.cannot_apply': 'ನೀವು ಈ ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ',
    'eligibility.check_first': 'ಮೊದಲು ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ',
    'eligibility.check_before_apply': 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮೊದಲು ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ',
    'eligibility.requirements_missing': 'ಅವಶ್ಯಕತೆಗಳು ಕಾಣೆಯಾಗಿವೆ',
    'eligibility.land_size_required': 'ಭೂಮಿ ಗಾತ್ರದ ಅವಶ್ಯಕತೆ ಪೂರೈಸಲಾಗಿಲ್ಲ',
    'eligibility.bank_account_required': 'ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಗತ್ಯ',
    'eligibility.age_requirement': 'ವಯಸ್ಸಿನ ಅವಶ್ಯಕತೆ ಪೂರೈಸಲಾಗಿಲ್ಲ',
    
    // Common
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    'common.error': 'ದೋಷ',
    'common.success': 'ಯಶಸ್ಸು',
    'common.cancel': 'ರದ್ದುಗೊಳಿಸಿ',
    'common.save': 'ಉಳಿಸಿ',
    'common.submit': 'ಸಲ್ಲಿಸಿ',
    'common.close': 'ಮುಚ್ಚಿ',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
