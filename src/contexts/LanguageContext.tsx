
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'kn';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation dictionary
const translations = {
  en: {
    'app.title': 'Agriconnect',
    'app.subtitle': 'Government Schemes Portal',
    'header.notifications': 'Notifications',
    'header.login': 'Login / Register',
    'hero.title': 'Empowering Farmers with Government Schemes',
    'hero.subtitle': 'Access real-time information about government policies, subsidies, and schemes designed to support Indian agriculture',
    'search.placeholder': 'Search for schemes, policies, or benefits...',
    'search.button': 'Search',
    'nav.schemes': 'All Schemes',
    'nav.eligibility': 'Eligibility Checker',
    'nav.documents': 'Document Upload',
    'nav.status': 'Application Status',
    'nav.support': 'Contact Support'
  },
  hi: {
    'app.title': 'एग्रीकनेक्ट',
    'app.subtitle': 'सरकारी योजना पोर्टल',
    'header.notifications': 'सूचनाएं',
    'header.login': 'लॉगिन / रजिस्टर',
    'hero.title': 'सरकारी योजनाओं के साथ किसानों को सशक्त बनाना',
    'hero.subtitle': 'भारतीय कृषि का समर्थन करने के लिए डिज़ाइन की गई सरकारी नीतियों, सब्सिडी और योजनाओं के बारे में वास्तविक समय की जानकारी प्राप्त करें',
    'search.placeholder': 'योजनाओं, नीतियों या लाभों की खोज करें...',
    'search.button': 'खोजें',
    'nav.schemes': 'सभी योजनाएं',
    'nav.eligibility': 'पात्रता जांचकर्ता',
    'nav.documents': 'दस्तावेज़ अपलोड',
    'nav.status': 'आवेदन स्थिति',
    'nav.support': 'संपर्क सहायता'
  },
  mr: {
    'app.title': 'अॅग्रिकनेक्ट',
    'app.subtitle': 'सरकारी योजना पोर्टल',
    'header.notifications': 'सूचना',
    'header.login': 'लॉगिन / नोंदणी',
    'hero.title': 'सरकारी योजनांसह शेतकऱ्यांना सक्षम करणे',
    'hero.subtitle': 'भारतीय शेतीला पाठिंबा देण्यासाठी डिझाइन केलेल्या सरकारी धोरणे, अनुदान आणि योजनांबद्दल रिअल-टाइम माहिती मिळवा',
    'search.placeholder': 'योजना, धोरणे किंवा फायदे शोधा...',
    'search.button': 'शोधा',
    'nav.schemes': 'सर्व योजना',
    'nav.eligibility': 'पात्रता तपासक',
    'nav.documents': 'दस्तऐवज अपलोड',
    'nav.status': 'अर्ज स्थिती',
    'nav.support': 'संपर्क सहाय्य'
  },
  ta: {
    'app.title': 'அக்ரிகனெக்ட்',
    'app.subtitle': 'அரசு திட்ட போர்ட்டல்',
    'header.notifications': 'அறிவிப்புகள்',
    'header.login': 'உள்நுழைவு / பதிவு',
    'hero.title': 'அரசு திட்டங்களுடன் விவசாயிகளை வலுப்படுத்துதல்',
    'hero.subtitle': 'இந்திய விவசாயத்தை ஆதரிக்க வடிவமைக்கப்பட்ட அரசு கொள்கைகள், மானியங்கள் மற்றும் திட்டங்களைப் பற்றிய நிகழ்நேர தகவல்களை அணுகவும்',
    'search.placeholder': 'திட்டங்கள், கொள்கைகள் அல்லது நன்மைகளைத் தேடுங்கள்...',
    'search.button': 'தேடல்',
    'nav.schemes': 'அனைத்து திட்டங்கள்',
    'nav.eligibility': 'தகுதி சரிபார்ப்பு',
    'nav.documents': 'ஆவண பதிவேற்றம்',
    'nav.status': 'விண்ணப்ப நிலை',
    'nav.support': 'தொடர்பு ஆதரவு'
  },
  te: {
    'app.title': 'అగ్రికనెక్ట్',
    'app.subtitle': 'ప్రభుత్వ పథకాల పోర్టల్',
    'header.notifications': 'నోటిఫికేషన్లు',
    'header.login': 'లాగిన్ / రిజిస్టర్',
    'hero.title': 'ప్రభుత్వ పథకాలతో రైతులను శక్తివంతం చేయడం',
    'hero.subtitle': 'భారతీయ వ్యవసాయానికి మద్దతు ఇవ్వడానికి రూపొందించిన ప్రభుత్వ విధానాలు, సబ్సిడీలు మరియు పథకాల గురించి రియల్-టైమ్ సమాచారాన్ని పొందండి',
    'search.placeholder': 'పథకాలు, విధానాలు లేదా ప్రయోజనాల కోసం వెతకండి...',
    'search.button': 'వెతకండి',
    'nav.schemes': 'అన్ని పథకాలు',
    'nav.eligibility': 'అర్హత తనిఖీ',
    'nav.documents': 'డాక్యుమెంట్ అప్‌లోడ్',
    'nav.status': 'దరఖాస్తు స్థితి',
    'nav.support': 'సంప్రదింపు మద్దతు'
  },
  kn: {
    'app.title': 'ಅಗ್ರಿಕನೆಕ್ಟ್',
    'app.subtitle': 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಪೋರ್ಟಲ್',
    'header.notifications': 'ಅಧಿಸೂಚನೆಗಳು',
    'header.login': 'ಲಾಗಿನ್ / ನೋಂದಣಿ',
    'hero.title': 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳೊಂದಿಗೆ ರೈತರನ್ನು ಶಕ್ತಿಯುತಗೊಳಿಸುವುದು',
    'hero.subtitle': 'ಭಾರತೀಯ ಕೃಷಿಯನ್ನು ಬೆಂಬಲಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸರ್ಕಾರಿ ನೀತಿಗಳು, ಸಬ್ಸಿಡಿಗಳು ಮತ್ತು ಯೋಜನೆಗಳ ಬಗ್ಗೆ ನೈಜ-ಸಮಯದ ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಿ',
    'search.placeholder': 'ಯೋಜನೆಗಳು, ನೀತಿಗಳು ಅಥವಾ ಪ್ರಯೋಜನಗಳನ್ನು ಹುಡುಕಿ...',
    'search.button': 'ಹುಡುಕಿ',
    'nav.schemes': 'ಎಲ್ಲಾ ಯೋಜನೆಗಳು',
    'nav.eligibility': 'ಅರ್ಹತೆ ಪರಿಶೀಲಕ',
    'nav.documents': 'ದಾಖಲೆ ಅಪ್‌ಲೋಡ್',
    'nav.status': 'ಅರ್ಜಿ ಸ್ಥಿತಿ',
    'nav.support': 'ಸಂಪರ್ಕ ಬೆಂಬಲ'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
