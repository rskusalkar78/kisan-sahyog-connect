
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

// Enhanced translation dictionary with comprehensive farmer-focused content
const translations = {
  en: {
    // App basics
    'app.title': 'Agriconnect',
    'app.subtitle': 'Government Schemes Portal',
    'header.notifications': 'Notifications',
    'header.login': 'Login / Register',
    
    // Hero section
    'hero.title': 'Empowering Farmers with Government Schemes',
    'hero.subtitle': 'Access real-time information about government policies, subsidies, and schemes designed to support Indian agriculture',
    'search.placeholder': 'Search for schemes, policies, or benefits...',
    'search.button': 'Search',
    
    // Navigation
    'nav.schemes': 'All Schemes',
    'nav.eligibility': 'Eligibility Checker',
    'nav.documents': 'Document Upload',
    'nav.status': 'Application Status',
    'nav.support': 'Contact Support',
    
    // Schemes
    'schemes.featured': 'Featured Schemes',
    'schemes.apply': 'Apply Now',
    'schemes.details': 'View Details',
    'schemes.amount': 'Benefit Amount',
    'schemes.deadline': 'Deadline',
    'schemes.beneficiaries': 'Beneficiaries',
    'schemes.eligibility': 'Eligibility',
    'schemes.category': 'Category',
    'schemes.status': 'Status',
    
    // Quick stats
    'stats.total_schemes': 'Total Schemes',
    'stats.beneficiaries': 'Active Beneficiaries',
    'stats.budget': 'Budget Allocated',
    'stats.states': 'States Covered',
    
    // Features
    'features.new': 'New Features',
    'features.schemes_db': 'Schemes Database',
    'features.schemes_desc': 'Browse comprehensive database of all government schemes',
    'features.eligibility': 'Eligibility Checker',
    'features.eligibility_desc': 'Check your eligibility for multiple schemes instantly',
    'features.documents': 'Document Upload',
    'features.documents_desc': 'Upload and manage your application documents',
    'features.status': 'Application Status',
    'features.status_desc': 'Track your application progress',
    'features.explore': 'Explore Schemes',
    'features.check': 'Check Eligibility',
    'features.upload': 'Upload Documents',
    'features.track': 'Check Status',
    
    // News and updates
    'news.title': 'Latest News & Updates',
    'news.view_all': 'View All News',
    'news.policy': 'Policy Update',
    'news.technology': 'Technology',
    'news.subsidy': 'Subsidy',
    
    // Quick access
    'quick.title': 'Quick Access',
    'quick.support': 'Contact Support',
    
    // Footer
    'footer.tagline': 'Connecting farmers with government schemes for a prosperous agricultural future',
    'footer.copyright': 'A Government of India Initiative',
    
    // Forms and applications
    'form.name': 'Full Name',
    'form.phone': 'Phone Number',
    'form.email': 'Email Address',
    'form.state': 'State',
    'form.district': 'District',
    'form.village': 'Village',
    'form.land_size': 'Land Size (in acres)',
    'form.crop_type': 'Primary Crop Type',
    'form.farming_experience': 'Farming Experience (years)',
    'form.submit': 'Submit Application',
    'form.required': 'Required field',
    
    // Farmer-specific terms
    'farmer.land_holding': 'Land Holding',
    'farmer.crop_season': 'Crop Season',
    'farmer.irrigation': 'Irrigation Type',
    'farmer.income': 'Annual Income',
    'farmer.category': 'Farmer Category',
    'farmer.small': 'Small Farmer',
    'farmer.marginal': 'Marginal Farmer',
    'farmer.large': 'Large Farmer',
    
    // Common actions
    'action.apply': 'Apply',
    'action.check': 'Check',
    'action.upload': 'Upload',
    'action.download': 'Download',
    'action.continue': 'Continue',
    'action.back': 'Back',
    'action.next': 'Next',
    'action.save': 'Save',
    'action.cancel': 'Cancel'
  },
  
  hi: {
    // App basics
    'app.title': 'एग्रीकनेक्ट',
    'app.subtitle': 'सरकारी योजना पोर्टल',
    'header.notifications': 'सूचनाएं',
    'header.login': 'लॉगिन / रजिस्टर',
    
    // Hero section
    'hero.title': 'सरकारी योजनाओं के साथ किसानों को सशक्त बनाना',
    'hero.subtitle': 'भारतीय कृषि का समर्थन करने के लिए डिज़ाइन की गई सरकारी नीतियों, सब्सिडी और योजनाओं के बारे में वास्तविक समय की जानकारी प्राप्त करें',
    'search.placeholder': 'योजनाओं, नीतियों या लाभों की खोज करें...',
    'search.button': 'खोजें',
    
    // Navigation
    'nav.schemes': 'सभी योजनाएं',
    'nav.eligibility': 'पात्रता जांचकर्ता',
    'nav.documents': 'दस्तावेज़ अपलोड',
    'nav.status': 'आवेदन स्थिति',
    'nav.support': 'संपर्क सहायता',
    
    // Schemes
    'schemes.featured': 'विशेष योजनाएं',
    'schemes.apply': 'अभी आवेदन करें',
    'schemes.details': 'विवरण देखें',
    'schemes.amount': 'लाभ राशि',
    'schemes.deadline': 'अंतिम तिथि',
    'schemes.beneficiaries': 'लाभार्थी',
    'schemes.eligibility': 'पात्रता',
    'schemes.category': 'श्रेणी',
    'schemes.status': 'स्थिति',
    
    // Quick stats
    'stats.total_schemes': 'कुल योजनाएं',
    'stats.beneficiaries': 'सक्रिय लाभार्थी',
    'stats.budget': 'आवंटित बजट',
    'stats.states': 'कवर किए गए राज्य',
    
    // Features
    'features.new': 'नई सुविधाएं',
    'features.schemes_db': 'योजना डेटाबेस',
    'features.schemes_desc': 'सभी सरकारी योजनाओं का व्यापक डेटाबेस ब्राउज़ करें',
    'features.eligibility': 'पात्रता जांचकर्ता',
    'features.eligibility_desc': 'तुरंत कई योजनाओं के लिए अपनी पात्रता जांचें',
    'features.documents': 'दस्तावेज़ अपलोड',
    'features.documents_desc': 'अपने आवेदन दस्तावेज़ अपलोड और प्रबंधित करें',
    'features.status': 'आवेदन स्थिति',
    'features.status_desc': 'अपने आवेदन की प्रगति ट्रैक करें',
    'features.explore': 'योजनाएं देखें',
    'features.check': 'पात्रता जांचें',
    'features.upload': 'दस्तावेज़ अपलोड करें',
    'features.track': 'स्थिति जांचें',
    
    // News and updates
    'news.title': 'नवीनतम समाचार और अपडेट',
    'news.view_all': 'सभी समाचार देखें',
    'news.policy': 'नीति अपडेट',
    'news.technology': 'प्रौद्योगिकी',
    'news.subsidy': 'सब्सिडी',
    
    // Quick access
    'quick.title': 'त्वरित पहुंच',
    'quick.support': 'संपर्क सहायता',
    
    // Footer
    'footer.tagline': 'समृद्ध कृषि भविष्य के लिए किसानों को सरकारी योजनाओं से जोड़ना',
    'footer.copyright': 'भारत सरकार की पहल',
    
    // Forms and applications
    'form.name': 'पूरा नाम',
    'form.phone': 'फोन नंबर',
    'form.email': 'ईमेल पता',
    'form.state': 'राज्य',
    'form.district': 'जिला',
    'form.village': 'गांव',
    'form.land_size': 'भूमि का आकार (एकड़ में)',
    'form.crop_type': 'मुख्य फसल प्रकार',
    'form.farming_experience': 'कृषि अनुभव (वर्ष)',
    'form.submit': 'आवेदन जमा करें',
    'form.required': 'आवश्यक फ़ील्ड',
    
    // Farmer-specific terms
    'farmer.land_holding': 'भूमि स्वामित्व',
    'farmer.crop_season': 'फसल मौसम',
    'farmer.irrigation': 'सिंचाई प्रकार',
    'farmer.income': 'वार्षिक आय',
    'farmer.category': 'किसान श्रेणी',
    'farmer.small': 'छोटा किसान',
    'farmer.marginal': 'सीमांत किसान',
    'farmer.large': 'बड़ा किसान',
    
    // Common actions
    'action.apply': 'आवेदन करें',
    'action.check': 'जांचें',
    'action.upload': 'अपलोड करें',
    'action.download': 'डाउनलोड करें',
    'action.continue': 'जारी रखें',
    'action.back': 'वापस',
    'action.next': 'अगला',
    'action.save': 'सेव करें',
    'action.cancel': 'रद्द करें'
  },
  
  mr: {
    // App basics
    'app.title': 'अॅग्रिकनेक्ट',
    'app.subtitle': 'सरकारी योजना पोर्टल',
    'header.notifications': 'सूचना',
    'header.login': 'लॉगिन / नोंदणी',
    
    // Hero section
    'hero.title': 'सरकारी योजनांसह शेतकऱ्यांना सक्षम करणे',
    'hero.subtitle': 'भारतीय शेतीला पाठिंबा देण्यासाठी डिझाइन केलेल्या सरकारी धोरणे, अनुदान आणि योजनांबद्दल रिअल-टाइम माहिती मिळवा',
    'search.placeholder': 'योजना, धोरणे किंवा फायदे शोधा...',
    'search.button': 'शोधा',
    
    // Navigation
    'nav.schemes': 'सर्व योजना',
    'nav.eligibility': 'पात्रता तपासक',
    'nav.documents': 'दस्तऐवज अपलोड',
    'nav.status': 'अर्ज स्थिती',
    'nav.support': 'संपर्क सहाय्य',
    
    // Schemes
    'schemes.featured': 'वैशिष्ट्यीकृत योजना',
    'schemes.apply': 'आता अर्ज करा',
    'schemes.details': 'तपशील पहा',
    'schemes.amount': 'लाभाची रक्कम',
    'schemes.deadline': 'शेवटची तारीख',
    'schemes.beneficiaries': 'लाभार्थी',
    'schemes.eligibility': 'पात्रता',
    'schemes.category': 'श्रेणी',
    'schemes.status': 'स्थिती',
    
    // Quick stats
    'stats.total_schemes': 'एकूण योजना',
    'stats.beneficiaries': 'सक्रिय लाभार्थी',
    'stats.budget': 'वाटप केलेले बजेट',
    'stats.states': 'समाविष्ट राज्ये',
    
    // Features
    'features.new': 'नवीन वैशिष्ट्ये',
    'features.schemes_db': 'योजना डेटाबेस',
    'features.schemes_desc': 'सर्व सरकारी योजनांचा सर्वसमावेशक डेटाबेस ब्राउझ करा',
    'features.eligibility': 'पात्रता तपासक',
    'features.eligibility_desc': 'तात्काळ अनेक योजनांसाठी तुमची पात्रता तपासा',
    'features.documents': 'दस्तऐवज अपलोड',
    'features.documents_desc': 'तुमचे अर्ज दस्तऐवज अपलोड आणि व्यवस्थापित करा',
    'features.status': 'अर्ज स्थिती',
    'features.status_desc': 'तुमच्या अर्जाची प्रगती ट्रॅक करा',
    'features.explore': 'योजना एक्सप्लोर करा',
    'features.check': 'पात्रता तपासा',
    'features.upload': 'दस्तऐवज अपलोड करा',
    'features.track': 'स्थिती तपासा',
    
    // News and updates
    'news.title': 'ताज्या बातम्या आणि अपडेट्स',
    'news.view_all': 'सर्व बातम्या पहा',
    'news.policy': 'धोरण अपडेट',
    'news.technology': 'तंत्रज्ञान',
    'news.subsidy': 'अनुदान',
    
    // Quick access
    'quick.title': 'द्रुत प्रवेश',
    'quick.support': 'संपर्क सहाय्य',
    
    // Footer
    'footer.tagline': 'समृद्ध कृषी भविष्यासाठी शेतकऱ्यांना सरकारी योजनांशी जोडणे',
    'footer.copyright': 'भारत सरकारचा उपक्रम',
    
    // Forms and applications
    'form.name': 'पूर्ण नाव',
    'form.phone': 'फोन नंबर',
    'form.email': 'ईमेल पत्ता',
    'form.state': 'राज्य',
    'form.district': 'जिल्हा',
    'form.village': 'गाव',
    'form.land_size': 'जमिनीचा आकार (एकरमध्ये)',
    'form.crop_type': 'मुख्य पीक प्रकार',
    'form.farming_experience': 'शेती अनुभव (वर्षे)',
    'form.submit': 'अर्ज सबमिट करा',
    'form.required': 'आवश्यक फील्ड',
    
    // Farmer-specific terms
    'farmer.land_holding': 'जमीन मालकी',
    'farmer.crop_season': 'पीक हंगाम',
    'farmer.irrigation': 'सिंचन प्रकार',
    'farmer.income': 'वार्षिक उत्पन्न',
    'farmer.category': 'शेतकरी श्रेणी',
    'farmer.small': 'लहान शेतकरी',
    'farmer.marginal': 'सीमांत शेतकरी',
    'farmer.large': 'मोठा शेतकरी',
    
    // Common actions
    'action.apply': 'अर्ज करा',
    'action.check': 'तपासा',
    'action.upload': 'अपलोड करा',
    'action.download': 'डाउनलोड करा',
    'action.continue': 'सुरू ठेवा',
    'action.back': 'मागे',
    'action.next': 'पुढे',
    'action.save': 'सेव्ह करा',
    'action.cancel': 'रद्द करा'
  },
  
  ta: {
    // App basics
    'app.title': 'அக்ரிகனெக்ட்',
    'app.subtitle': 'அரசு திட்ட போர்ட்டல்',
    'header.notifications': 'அறிவிப்புகள்',
    'header.login': 'உள்நுழைவு / பதிவு',
    
    // Hero section
    'hero.title': 'அரசு திட்டங்களுடன் விவசாயிகளை வலுப்படுத்துதல்',
    'hero.subtitle': 'இந்திய விவசாயத்தை ஆதரிக்க வடிவமைக்கப்பட்ட அரசு கொள்கைகள், மானியங்கள் மற்றும் திட்டங்களைப் பற்றிய நிகழ்நேர தகவல்களை அணுகவும்',
    'search.placeholder': 'திட்டங்கள், கொள்கைகள் அல்லது நன்மைகளைத் தேடுங்கள்...',
    'search.button': 'தேடல்',
    
    // Navigation
    'nav.schemes': 'அனைத்து திட்டங்கள்',
    'nav.eligibility': 'தகுதி சரிபார்ப்பு',
    'nav.documents': 'ஆவண பதிவேற்றம்',
    'nav.status': 'விண்ணப்ப நிலை',
    'nav.support': 'தொடர்பு ஆதரவு',
    
    // Schemes
    'schemes.featured': 'சிறப்பு திட்டங்கள்',
    'schemes.apply': 'இப்போது விண்ணப்பிக்கவும்',
    'schemes.details': 'விவரங்களைப் பார்க்கவும்',
    'schemes.amount': 'நன்மை தொகை',
    'schemes.deadline': 'கடைசி தேதி',
    'schemes.beneficiaries': 'பயனாளிகள்',
    'schemes.eligibility': 'தகுதி',
    'schemes.category': 'வகை',
    'schemes.status': 'நிலை',
    
    // Quick stats
    'stats.total_schemes': 'மொத்த திட்டங்கள்',
    'stats.beneficiaries': 'செயலில் உள்ள பயனாளிகள்',
    'stats.budget': 'ஒதுக்கப்பட்ட பட்ஜெட்',
    'stats.states': 'மாநிலங்கள் உள்ளடக்கியது',
    
    // Features
    'features.new': 'புதிய அம்சங்கள்',
    'features.schemes_db': 'திட்ட தரவுத்தளம்',
    'features.schemes_desc': 'அனைத்து அரசு திட்டங்களின் விரிவான தரவுத்தளத்தை உலாவவும்',
    'features.eligibility': 'தகுதி சரிபார்ப்பு',
    'features.eligibility_desc': 'பல திட்டங்களுக்கான உங்கள் தகுதியை உடனடியாக சரிபார்க்கவும்',
    'features.documents': 'ஆவண பதிவேற்றம்',
    'features.documents_desc': 'உங்கள் விண்ணப்ப ஆவணங்களைப் பதிவேற்றி நிர்வகிக்கவும்',
    'features.status': 'விண்ணப்ப நிலை',
    'features.status_desc': 'உங்கள் விண்ணப்ப முன்னேற்றத்தைக் கண்காணிக்கவும்',
    'features.explore': 'திட்டங்களை ஆராயுங்கள்',
    'features.check': 'தகுதியைச் சரிபார்க்கவும்',
    'features.upload': 'ஆவணங்களைப் பதிவேற்றவும்',
    'features.track': 'நிலையைச் சரிபார்க்கவும்',
    
    // News and updates
    'news.title': 'சமீபத்திய செய்திகள் மற்றும் புதுப்பிப்புகள்',
    'news.view_all': 'அனைத்து செய்திகளையும் பார்க்கவும்',
    'news.policy': 'கொள்கை புதுப்பிப்பு',
    'news.technology': 'தொழில்நுட்பம்',
    'news.subsidy': 'மானியம்',
    
    // Quick access
    'quick.title': 'விரைவு அணுகல்',
    'quick.support': 'தொடர்பு ஆதரவு',
    
    // Footer
    'footer.tagline': 'செழிப்பான விவசாய எதிர்காலத்திற்காக விவசாயிகளை அரசு திட்டங்களுடன் இணைத்தல்',
    'footer.copyright': 'இந்திய அரசின் முன்முயற்சி',
    
    // Forms and applications
    'form.name': 'முழு பெயர்',
    'form.phone': 'தொலைபேசி எண்',
    'form.email': 'மின்னஞ்சல் முகவரி',
    'form.state': 'மாநிலம்',
    'form.district': 'மாவட்டம்',
    'form.village': 'கிராமம்',
    'form.land_size': 'நில அளவு (ஏக்கரில்)',
    'form.crop_type': 'முதன்மை பயிர் வகை',
    'form.farming_experience': 'விவசாய அனுபவம் (ஆண்டுகள்)',
    'form.submit': 'விண்ணப்பத்தை சமர்ப்பிக்கவும்',
    'form.required': 'தேவையான புலம்',
    
    // Farmer-specific terms
    'farmer.land_holding': 'நில உடைமை',
    'farmer.crop_season': 'பயிர் பருவம்',
    'farmer.irrigation': 'பாசன வகை',
    'farmer.income': 'வருடாந்திர வருமானம்',
    'farmer.category': 'விவசாயி வகை',
    'farmer.small': 'சிறு விவசாயி',
    'farmer.marginal': 'ஒட்டுமொத்த விவசாயி',
    'farmer.large': 'பெரிய விவசாயி',
    
    // Common actions
    'action.apply': 'விண்ணப்பிக்கவும்',
    'action.check': 'சரிபார்க்கவும்',
    'action.upload': 'பதிவேற்றவும்',
    'action.download': 'பதிவிறக்கவும்',
    'action.continue': 'தொடரவும்',
    'action.back': 'பின்',
    'action.next': 'அடுத்து',
    'action.save': 'சேமிக்கவும்',
    'action.cancel': 'ரத்து செய்'
  },
  
  te: {
    // App basics
    'app.title': 'అగ్రికనెక్ట్',
    'app.subtitle': 'ప్రభుత్వ పథకాల పోర్టల్',
    'header.notifications': 'నోటిఫికేషన్లు',
    'header.login': 'లాగిన్ / రిజిస్టర్',
    
    // Hero section
    'hero.title': 'ప్రభుత్వ పథకాలతో రైతులను శక్తివంతం చేయడం',
    'hero.subtitle': 'భారతీయ వ్యవసాయానికి మద్దతు ఇవ్వడానికి రూపొందించిన ప్రభుత్వ విధానాలు, సబ్సిడీలు మరియు పథకాల గురించి రియల్-టైమ్ సమాచారాన్ని పొందండి',
    'search.placeholder': 'పథకాలు, విధానాలు లేదా ప్రయోజనాల కోసం వెతకండి...',
    'search.button': 'వెతకండి',
    
    // Navigation
    'nav.schemes': 'అన్ని పథకాలు',
    'nav.eligibility': 'అర్హత తనిఖీ',
    'nav.documents': 'డాక్యుమెంట్ అప్‌లోడ్',
    'nav.status': 'దరఖాస్తు స్థితి',
    'nav.support': 'సంప్రదింపు మద్దతు',
    
    // Schemes
    'schemes.featured': 'ప్రత్యేక పథకాలు',
    'schemes.apply': 'ఇప్పుడే దరఖాస్తు చేసుకోండి',
    'schemes.details': 'వివరాలు చూడండి',
    'schemes.amount': 'ప్రయోజన మొత్తం',
    'schemes.deadline': 'చివరి తేదీ',
    'schemes.beneficiaries': 'లబ్ధిదారులు',
    'schemes.eligibility': 'అర్హత',
    'schemes.category': 'వర్గం',
    'schemes.status': 'స్థితి',
    
    // Quick stats
    'stats.total_schemes': 'మొత్తం పథకాలు',
    'stats.beneficiaries': 'క్రియాశీల లబ్ధిదారులు',
    'stats.budget': 'కేటాయించిన బడ్జెట్',
    'stats.states': 'కవర్ చేసిన రాష్ట్రాలు',
    
    // Features
    'features.new': 'కొత్త లక్షణాలు',
    'features.schemes_db': 'పథకాల డేటాబేస్',
    'features.schemes_desc': 'అన్ని ప్రభుత్వ పథకాల సమగ్ర డేటాబేస్‌ను బ్రౌజ్ చేయండి',
    'features.eligibility': 'అర్హత తనిఖీ',
    'features.eligibility_desc': 'అనేక పథకాలకు మీ అర్హతను తక్షణమే తనిఖీ చేయండి',
    'features.documents': 'డాక్యుమెంట్ అప్‌లోడ్',
    'features.documents_desc': 'మీ దరఖాస్తు డాక్యుమెంట్లను అప్‌లోడ్ చేసి నిర్వహించండి',
    'features.status': 'దరఖాస్తు స్థితి',
    'features.status_desc': 'మీ దరఖాస్తు పురోగతిని ట్రాక్ చేయండి',
    'features.explore': 'పథకాలను అన్వేషించండి',
    'features.check': 'అర్హతను తనిఖీ చేయండి',
    'features.upload': 'డాక్యుమెంట్లను అప్‌లోడ్ చేయండి',
    'features.track': 'స్థితిని తనిఖీ చేయండి',
    
    // News and updates
    'news.title': 'తాజా వార్తలు మరియు అప్‌డేట్లు',
    'news.view_all': 'అన్ని వార్తలను చూడండి',
    'news.policy': 'విధాన అప్‌డేట్',
    'news.technology': 'సాంకేతికత',
    'news.subsidy': 'సబ్సిడీ',
    
    // Quick access
    'quick.title': 'త్వరిత ప్రవేశం',
    'quick.support': 'సంప్రదింపు మద్దతు',
    
    // Footer
    'footer.tagline': 'సమృద్ధ వ్యవసాయ భవిష్యత్తు కోసం రైతులను ప్రభుత్వ పథకాలతో కనెక్ట్ చేయడం',
    'footer.copyright': 'భారత ప్రభుత్వ చొరవ',
    
    // Forms and applications
    'form.name': 'పూర్తి పేరు',
    'form.phone': 'ఫోన్ నంబర్',
    'form.email': 'ఇమెయిల్ చిరునామా',
    'form.state': 'రాష్ట్రం',
    'form.district': 'జిల్లా',
    'form.village': 'గ్రామం',
    'form.land_size': 'భూమి పరిమాణం (ఎకరాలలో)',
    'form.crop_type': 'ప్రాథమిక పంట రకం',
    'form.farming_experience': 'వ్యవసాయ అనుభవం (సంవత్సరాలు)',
    'form.submit': 'దరఖాస్తును సమర్పించండి',
    'form.required': 'అవసరమైన ఫీల్డ్',
    
    // Farmer-specific terms
    'farmer.land_holding': 'భూమి స్వాధీనం',
    'farmer.crop_season': 'పంట సీజన్',
    'farmer.irrigation': 'నీటిపారుదల రకం',
    'farmer.income': 'వార్షిక ఆదాయం',
    'farmer.category': 'రైతు వర్గం',
    'farmer.small': 'చిన్న రైతు',
    'farmer.marginal': 'ఉపాంత రైతు',
    'farmer.large': 'పెద్ద రైతు',
    
    // Common actions
    'action.apply': 'దరఖాస్తు చేయండి',
    'action.check': 'తనిఖీ చేయండి',
    'action.upload': 'అప్‌లోడ్ చేయండి',
    'action.download': 'డౌన్‌లోడ్ చేయండి',
    'action.continue': 'కొనసాగించండి',
    'action.back': 'వెనుకకు',
    'action.next': 'తరువాత',
    'action.save': 'సేవ్ చేయండి',
    'action.cancel': 'రద్దు చేయండి'
  },
  
  kn: {
    // App basics
    'app.title': 'ಅಗ್ರಿಕನೆಕ್ಟ್',
    'app.subtitle': 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಪೋರ್ಟಲ್',
    'header.notifications': 'ಅಧಿಸೂಚನೆಗಳು',
    'header.login': 'ಲಾಗಿನ್ / ನೋಂದಣಿ',
    
    // Hero section
    'hero.title': 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳೊಂದಿಗೆ ರೈತರನ್ನು ಶಕ್ತಿಯುತಗೊಳಿಸುವುದು',
    'hero.subtitle': 'ಭಾರತೀಯ ಕೃಷಿಯನ್ನು ಬೆಂಬಲಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸರ್ಕಾರಿ ನೀತಿಗಳು, ಸಬ್ಸಿಡಿಗಳು ಮತ್ತು ಯೋಜನೆಗಳ ಬಗ್ಗೆ ನೈಜ-ಸಮಯದ ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಿ',
    'search.placeholder': 'ಯೋಜನೆಗಳು, ನೀತಿಗಳು ಅಥವಾ ಪ್ರಯೋಜನಗಳನ್ನು ಹುಡುಕಿ...',
    'search.button': 'ಹುಡುಕಿ',
    
    // Navigation
    'nav.schemes': 'ಎಲ್ಲಾ ಯೋಜನೆಗಳು',
    'nav.eligibility': 'ಅರ್ಹತೆ ಪರಿಶೀಲಕ',
    'nav.documents': 'ದಾಖಲೆ ಅಪ್‌ಲೋಡ್',
    'nav.status': 'ಅರ್ಜಿ ಸ್ಥಿತಿ',
    'nav.support': 'ಸಂಪರ್ಕ ಬೆಂಬಲ',
    
    // Schemes
    'schemes.featured': 'ವಿಶೇಷ ಯೋಜನೆಗಳು',
    'schemes.apply': 'ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    'schemes.details': 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    'schemes.amount': 'ಪ್ರಯೋಜನ ಮೊತ್ತ',
    'schemes.deadline': 'ಅಂತಿಮ ದಿನಾಂಕ',
    'schemes.beneficiaries': 'ಫಲಾನುಭವಿಗಳು',
    'schemes.eligibility': 'ಅರ್ಹತೆ',
    'schemes.category': 'ವರ್ಗ',
    'schemes.status': 'ಸ್ಥಿತಿ',
    
    // Quick stats
    'stats.total_schemes': 'ಒಟ್ಟು ಯೋಜನೆಗಳು',
    'stats.beneficiaries': 'ಸಕ್ರಿಯ ಫಲಾನುಭವಿಗಳು',
    'stats.budget': 'ಹಂಚಿದ ಬಜೆಟ್',
    'stats.states': 'ಒಳಗೊಂಡ ರಾಜ್ಯಗಳು',
    
    // Features
    'features.new': 'ಹೊಸ ಲಕ್ಷಣಗಳು',
    'features.schemes_db': 'ಯೋಜನೆಗಳ ಡೇಟಾಬೇಸ್',
    'features.schemes_desc': 'ಎಲ್ಲಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಸಮಗ್ರ ಡೇಟಾಬೇಸ್ ಅನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ',
    'features.eligibility': 'ಅರ್ಹತೆ ಪರಿಶೀಲಕ',
    'features.eligibility_desc': 'ಅನೇಕ ಯೋಜನೆಗಳಿಗೆ ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ತಕ್ಷಣ ಪರಿಶೀಲಿಸಿ',
    'features.documents': 'ದಾಖಲೆ ಅಪ್‌ಲೋಡ್',
    'features.documents_desc': 'ನಿಮ್ಮ ಅರ್ಜಿ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮತ್ತು ನಿರ್ವಹಿಸಿ',
    'features.status': 'ಅರ್ಜಿ ಸ್ಥಿತಿ',
    'features.status_desc': 'ನಿಮ್ಮ ಅರ್ಜಿ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    'features.explore': 'ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
    'features.check': 'ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ',
    'features.upload': 'ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    'features.track': 'ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ',
    
    // News and updates
    'news.title': 'ಇತ್ತೀಚಿನ ಸುದ್ದಿ ಮತ್ತು ನವೀಕರಣಗಳು',
    'news.view_all': 'ಎಲ್ಲಾ ಸುದ್ದಿಗಳನ್ನು ನೋಡಿ',
    'news.policy': 'ನೀತಿ ನವೀಕರಣ',
    'news.technology': 'ತಂತ್ರಜ್ಞಾನ',
    'news.subsidy': 'ಸಬ್ಸಿಡಿ',
    
    // Quick access
    'quick.title': 'ತ್ವರಿತ ಪ್ರವೇಶ',
    'quick.support': 'ಸಂಪರ್ಕ ಬೆಂಬಲ',
    
    // Footer
    'footer.tagline': 'ಸಮೃದ್ಧ ಕೃಷಿ ಭವಿಷ್ಯಕ್ಕಾಗಿ ರೈತರನ್ನು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು',
    'footer.copyright': 'ಭಾರತ ಸರ್ಕಾರದ ಉಪಕ್ರಮ',
    
    // Forms and applications
    'form.name': 'ಪೂರ್ಣ ಹೆಸರು',
    'form.phone': 'ಫೋನ್ ಸಂಖ್ಯೆ',
    'form.email': 'ಇಮೇಲ್ ವಿಳಾಸ',
    'form.state': 'ರಾಜ್ಯ',
    'form.district': 'ಜಿಲ್ಲೆ',
    'form.village': 'ಗ್ರಾಮ',
    'form.land_size': 'ಭೂಮಿ ಗಾತ್ರ (ಎಕರೆಗಳಲ್ಲಿ)',
    'form.crop_type': 'ಪ್ರಾಥಮಿಕ ಬೆಳೆ ವಿಧ',
    'form.farming_experience': 'ಕೃಷಿ ಅನುಭವ (ವರ್ಷಗಳು)',
    'form.submit': 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    'form.required': 'ಅಗತ್ಯ ಕ್ಷೇತ್ರ',
    
    // Farmer-specific terms
    'farmer.land_holding': 'ಭೂಮಿ ಹಿಡುವಳಿ',
    'farmer.crop_season': 'ಬೆಳೆ ಋತು',
    'farmer.irrigation': 'ನೀರಾವರಿ ವಿಧ',
    'farmer.income': 'ವಾರ್ಷಿಕ ಆದಾಯ',
    'farmer.category': 'ರೈತ ವರ್ಗ',
    'farmer.small': 'ಸಣ್ಣ ರೈತ',
    'farmer.marginal': 'ಅಂಚಿನ ರೈತ',
    'farmer.large': 'ದೊಡ್ಡ ರೈತ',
    
    // Common actions
    'action.apply': 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    'action.check': 'ಪರಿಶೀಲಿಸಿ',
    'action.upload': 'ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    'action.download': 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    'action.continue': 'ಮುಂದುವರಿಸಿ',
    'action.back': 'ಹಿಂದೆ',
    'action.next': 'ಮುಂದೆ',
    'action.save': 'ಉಳಿಸಿ',
    'action.cancel': 'ರದ್ದುಗೊಳಿಸಿ'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

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
