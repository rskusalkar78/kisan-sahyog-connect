import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

const translations = {
  en: {
    app: {
      title: "AgriConnect",
      subtitle: "Empowering Farmers, Enriching Agriculture",
    },
    nav: {
      schemes: "Schemes",
      eligibility: "Eligibility",
      documents: "Documents",
      status: "Application Status",
      support: "Contact Support",
    },
    header: {
      notifications: "Notifications",
      login: "Login",
    },
    hero: {
      title: "Discover Government Schemes for Farmers",
      subtitle: "Find the right schemes to boost your agricultural practices and income.",
    },
    search: {
      placeholder: "Search for schemes...",
      button: "Search",
    },
    stats: {
      total_schemes: "Total Schemes",
      beneficiaries: "Beneficiaries",
      budget: "Total Budget",
      states: "States Covered",
    },
    features: {
      new: "New Features",
      schemes_db: "Schemes Database",
      schemes_desc: "Explore a comprehensive database of government schemes.",
      eligibility: "Eligibility Checker",
      eligibility_desc: "Check your eligibility for various schemes.",
      documents: "Document Upload",
      documents_desc: "Upload and manage required documents easily.",
      status: "Application Status",
      status_desc: "Track the status of your applications in real-time.",
      explore: "Explore Schemes",
      check: "Check Eligibility",
      upload: "Upload Documents",
      track: "Track Status",
    },
    schemes: {
      featured: "Featured Schemes",
      amount: "Amount",
      beneficiaries: "Beneficiaries",
      deadline: "Deadline",
      state: "State",
      apply: "Apply Now",
      details: "View Details",
    },
    news: {
      title: "Recent News & Updates",
      view_all: "View All",
      policy: "Policy Updates",
      technology: "Technology",
      subsidy: "Subsidy",
    },
    quick: {
      title: "Quick Access",
    },
    footer: {
      tagline: "Connecting farmers to the resources they need.",
      copyright: "All rights reserved.",
    },
    eligibility: {
      check: "Check Eligibility",
      checking: "Checking...",
      eligible: "Eligible",
      not_eligible: "Not Eligible",
      can_apply: "You can apply for this scheme",
      cannot_apply: "You cannot apply for this scheme",
      check_first: "Check Eligibility First",
      check_before_apply: "Please check your eligibility before applying",
      requirements_missing: "requirements missing",
      land_size_required: "Small/marginal farmer land size required",
      bank_account_required: "Bank account required",
      age_requirement: "Age requirement not met"
    }
  },
  hi: {
    app: {
      title: "कृषि कनेक्ट",
      subtitle: "किसानों को सशक्त बनाना, कृषि को समृद्ध करना",
    },
    nav: {
      schemes: "योजनाएं",
      eligibility: "पात्रता",
      documents: "दस्तावेज़",
      status: "आवेदन स्थिति",
      support: "संपर्क समर्थन",
    },
    header: {
      notifications: "सूचनाएं",
      login: "लॉगिन",
    },
    hero: {
      title: "किसानों के लिए सरकारी योजनाएं खोजें",
      subtitle: "अपनी कृषि पद्धतियों और आय को बढ़ावा देने के लिए सही योजनाएं खोजें।",
    },
    search: {
      placeholder: "योजनाओं के लिए खोजें...",
      button: "खोजें",
    },
    stats: {
      total_schemes: "कुल योजनाएं",
      beneficiaries: "लाभार्थी",
      budget: "कुल बजट",
      states: "राज्य शामिल",
    },
    features: {
      new: "नई विशेषताएं",
      schemes_db: "योजनाएं डेटाबेस",
      schemes_desc: "सरकारी योजनाओं के एक व्यापक डेटाबेस का अन्वेषण करें।",
      eligibility: "पात्रता जांचकर्ता",
      eligibility_desc: "विभिन्न योजनाओं के लिए अपनी पात्रता जांचें।",
      documents: "दस्तावेज़ अपलोड",
      documents_desc: "आवश्यक दस्तावेज़ आसानी से अपलोड और प्रबंधित करें।",
      status: "आवेदन स्थिति",
      status_desc: "वास्तविक समय में अपने आवेदनों की स्थिति को ट्रैक करें।",
      explore: "योजनाएं खोजें",
      check: "पात्रता जांचें",
      upload: "दस्तावेज़ अपलोड करें",
      track: "स्थिति ट्रैक करें",
    },
    schemes: {
      featured: "विशेष योजनाएं",
      amount: "राशि",
      beneficiaries: "लाभार्थी",
      deadline: "अंतिम तिथि",
      state: "राज्य",
      apply: "अभी आवेदन करें",
      details: "विवरण देखें",
    },
    news: {
      title: "नवीनतम समाचार और अपडेट",
      view_all: "सभी देखें",
      policy: "नीति अपडेट",
      technology: "प्रौद्योगिकी",
      subsidy: "सब्सिडी",
    },
    quick: {
      title: "त्वरित पहुंच",
    },
    footer: {
      tagline: "किसानों को उनकी जरूरत के संसाधनों से जोड़ना।",
      copyright: "सर्वाधिकार सुरक्षित।",
    },
     eligibility: {
      check: "पात्रता जांचें",
      checking: "जांच रहे हैं...",
      eligible: "पात्र",
      not_eligible: "अपात्र",
      can_apply: "आप इस योजना के लिए आवेदन कर सकते हैं",
      cannot_apply: "आप इस योजना के लिए आवेदन नहीं कर सकते",
      check_first: "पहले पात्रता जांचें",
      check_before_apply: "कृपया आवेदन से पहले अपनी पात्रता जांचें",
      requirements_missing: "आवश्यकताएं गुम",
      land_size_required: "छोटे/सीमांत किसान भूमि का आकार आवश्यक",
      bank_account_required: "बैंक खाता आवश्यक",
      age_requirement: "आयु आवश्यकता पूरी नहीं"
    }
  },
  mr: {
    app: {
      title: "ॲग्रीकनेक्ट",
      subtitle: "शेतकऱ्यांना सक्षम करा, कृषी समृद्ध करा",
    },
    nav: {
      schemes: "योजना",
      eligibility: "पात्रता",
      documents: "दस्तऐवज",
      status: "अर्ज स्थिती",
      support: "संपर्क समर्थन",
    },
    header: {
      notifications: "सूचना",
      login: "लॉगिन",
    },
    hero: {
      title: "शेतकऱ्यांसाठी सरकारी योजना शोधा",
      subtitle: "तुमच्या कृषी पद्धती आणि उत्पन्न वाढवण्यासाठी योग्य योजना शोधा.",
    },
    search: {
      placeholder: "योजना शोधा...",
      button: "शोधा",
    },
    stats: {
      total_schemes: "एकूण योजना",
      beneficiaries: "लाभार्थी",
      budget: "एकूण बजेट",
      states: "राज्ये समाविष्ट",
    },
    features: {
      new: "नवीन वैशिष्ट्ये",
      schemes_db: "योजना डेटाबेस",
      schemes_desc: "सरकारी योजनांच्या विस्तृत डेटाबेसचा शोध घ्या.",
      eligibility: "पात्रता तपासक",
      eligibility_desc: "विविध योजनांसाठी तुमची पात्रता तपासा.",
      documents: "दस्तऐवज अपलोड",
      documents_desc: "आवश्यक कागदपत्रे सहजपणे अपलोड आणि व्यवस्थापित करा.",
      status: "अर्ज स्थिती",
      status_desc: "रिअल-टाइममध्ये तुमच्या अर्जांची स्थिती मागोवा.",
      explore: "योजना शोधा",
      check: "पात्रता तपासा",
      upload: "दस्तऐवज अपलोड करा",
      track: "स्थिती मागोवा",
    },
    schemes: {
      featured: "वैशिष्ट्यीकृत योजना",
      amount: "रक्कम",
      beneficiaries: "लाभार्थी",
      deadline: "अंतिम मुदत",
      state: "राज्य",
      apply: "आता अर्ज करा",
      details: "तपशील पहा",
    },
    news: {
      title: "नवीनतम बातम्या आणि अद्यतने",
      view_all: "सर्व पहा",
      policy: "धोरण अद्यतने",
      technology: "तंत्रज्ञान",
      subsidy: "अनुदान",
    },
    quick: {
      title: "त्वरित प्रवेश",
    },
    footer: {
      tagline: "शेतकऱ्यांना आवश्यक असलेल्या संसाधनांशी जोडणे.",
      copyright: "सर्व अधिकार आरक्षित.",
    },
    eligibility: {
      check: "पात्रता तपासा",
      checking: "तपासत आहे...",
      eligible: "पात्र",
      not_eligible: "अपात्र",
      can_apply: "तुम्ही या योजनेसाठी अर्ज करू शकता",
      cannot_apply: "तुम्ही या योजनेसाठी अर्ज करू शकत नाही",
      check_first: "प्रथम पात्रता तपासा",
      check_before_apply: "कृपया अर्ज करण्यापूर्वी तुमची पात्रता तपासा",
      requirements_missing: "आवश्यकता गहाळ",
      land_size_required: "लहान/सीमांत शेतकरी जमिनीचा आकार आवश्यक",
      bank_account_required: "बँक खाते आवश्यक",
      age_requirement: "वय आवश्यकता पूर्ण नाही"
    }
  },
  ta: {
    app: {
      title: "அக்ரி கனெக்ட்",
      subtitle: "விவசாயிகளுக்கு அதிகாரம் அளித்தல், விவசாயத்தை வளப்படுத்துதல்",
    },
    nav: {
      schemes: "திட்டங்கள்",
      eligibility: "தகுதி",
      documents: "ஆவணங்கள்",
      status: "விண்ணப்ப நிலை",
      support: "தொடர்பு ஆதரவு",
    },
    header: {
      notifications: "அறிவிப்புகள்",
      login: "உள்நுழை",
    },
    hero: {
      title: "விவசாயிகளுக்கான அரசு திட்டங்களைக் கண்டறியவும்",
      subtitle: "உங்கள் விவசாய நடைமுறைகள் மற்றும் வருமானத்தை அதிகரிக்க சரியான திட்டங்களைக் கண்டறியவும்.",
    },
    search: {
      placeholder: "திட்டங்களுக்குத் தேடுங்கள்...",
      button: "தேடு",
    },
    stats: {
      total_schemes: "மொத்த திட்டங்கள்",
      beneficiaries: "பயனாளிகள்",
      budget: "மொத்த பட்ஜெட்",
      states: "மாநிலங்கள் உள்ளடக்கியது",
    },
    features: {
      new: "புதிய அம்சங்கள்",
      schemes_db: "திட்டங்கள் தரவுத்தளம்",
      schemes_desc: "அரசு திட்டங்களின் விரிவான தரவுத்தளத்தை ஆராயுங்கள்.",
      eligibility: "தகுதி சரிபார்ப்பு",
      eligibility_desc: "பல்வேறு திட்டங்களுக்கு உங்கள் தகுதியை சரிபார்க்கவும்.",
      documents: "ஆவண பதிவேற்றம்",
      documents_desc: "தேவையான ஆவணங்களை எளிதாக பதிவேற்றி நிர்வகிக்கவும்.",
      status: "விண்ணப்ப நிலை",
      status_desc: "உண்மையான நேரத்தில் உங்கள் விண்ணப்பங்களின் நிலையை கண்காணிக்கவும்.",
      explore: "திட்டங்களை ஆராயுங்கள்",
      check: "தகுதியை சரிபார்க்கவும்",
      upload: "ஆவணங்களைப் பதிவேற்றவும்",
      track: "நிலையை கண்காணிக்கவும்",
    },
    schemes: {
      featured: "சிறப்பு திட்டங்கள்",
      amount: "தொகை",
      beneficiaries: "பயனாளிகள்",
      deadline: "கடைசி தேதி",
      state: "மாநிலம்",
      apply: "இப்போது விண்ணப்பிக்கவும்",
      details: "விவரங்களைக் காண்க",
    },
    news: {
      title: "சமீபத்திய செய்திகள் & புதுப்பிப்புகள்",
      view_all: "எல்லாவற்றையும் காட்டு",
      policy: "கொள்கை புதுப்பிப்புகள்",
      technology: "தொழில்நுட்பம்",
      subsidy: "மானிய",
    },
    quick: {
      title: "விரைவு அணுகல்",
    },
    footer: {
      tagline: "விவசாயிகளுக்கு தேவையான ஆதாரங்களுடன் இணைக்கிறது.",
      copyright: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    },
    eligibility: {
      check: "தகுதியை சரிபார்க்கவும்",
      checking: "சரிபார்க்கிறது...",
      eligible: "தகுதியுள்ள",
      not_eligible: "தகுதியற்ற",
      can_apply: "இந்த திட்டத்திற்கு நீங்கள் விண்ணப்பிக்கலாம்",
      cannot_apply: "இந்த திட்டத்திற்கு நீங்கள் விண்ணப்பிக்க முடியாது",
      check_first: "முதலில் தகுதியை சரிபார்க்கவும்",
      check_before_apply: "விண்ணப்பிக்கும் முன் உங்கள் தகுதியை சரிபார்க்கவும்",
      requirements_missing: "தேவைகள் விடுபட்டுள்ளன",
      land_size_required: "சிறு/விளிம்பு விவசாயி நில அளவு தேவை",
      bank_account_required: "வங்கி கணக்கு தேவை",
      age_requirement: "வயது தேவை பூர்த்தி செய்யப்படவில்லை"
    }
  },
  te: {
    app: {
      title: "అగ్రి కనెక్ట్",
      subtitle: "రైతులకు సాధికారత, వ్యవసాయాన్ని సుసంపన్నం చేయడం",
    },
    nav: {
      schemes: "పథకాలు",
      eligibility: "అర్హత",
      documents: "పత్రాలు",
      status: "దరఖాస్తు స్థితి",
      support: "సంప్రదింపు మద్దతు",
    },
    header: {
      notifications: "నోటిఫికేషన్లు",
      login: "లాగిన్",
    },
    hero: {
      title: "రైతుల కోసం ప్రభుత్వ పథకాలను కనుగొనండి",
      subtitle: "మీ వ్యవసాయ పద్ధతులు మరియు ఆదాయాన్ని పెంచడానికి సరైన పథకాలను కనుగొనండి.",
    },
    search: {
      placeholder: "పథకాల కోసం వెతకండి...",
      button: "వెతకండి",
    },
    stats: {
      total_schemes: "మొత్తం పథకాలు",
      beneficiaries: "లబ్ధిదారులు",
      budget: "మొత్తం బడ్జెట్",
      states: "రాష్ట్రాలు కవర్ చేయబడ్డాయి",
    },
    features: {
      new: "కొత్త లక్షణాలు",
      schemes_db: "పథకాల డేటాబేస్",
      schemes_desc: "ప్రభుత్వ పథకాల యొక్క సమగ్ర డేటాబేస్ను అన్వేషించండి.",
      eligibility: "అర్హత తనిఖీ",
      eligibility_desc: "వివిధ పథకాల కోసం మీ అర్హతను తనిఖీ చేయండి.",
      documents: "పత్రం అప్లోడ్",
      documents_desc: "అవసరమైన పత్రాలను సులభంగా అప్లోడ్ చేయండి మరియు నిర్వహించండి.",
      status: "దరఖాస్తు స్థితి",
      status_desc: "నిజ సమయంలో మీ దరఖాస్తుల స్థితిని ట్రాక్ చేయండి.",
      explore: "పథకాలను అన్వేషించండి",
      check: "అర్హతను తనిఖీ చేయండి",
      upload: "పత్రాలను అప్లోడ్ చేయండి",
      track: "స్థితిని ట్రాక్ చేయండి",
    },
    schemes: {
      featured: "ఫీచర్ చేసిన పథకాలు",
      amount: "మొత్తం",
      beneficiaries: "లబ్ధిదారులు",
      deadline: "చివరి తేదీ",
      state: "రాష్ట్రం",
      apply: "ఇప్పుడే దరఖాస్తు చేయండి",
      details: "వివరాలను చూడండి",
    },
    news: {
      title: "సமீபத்திய వార్తలు & నవీకరణలు",
      view_all: "అన్నింటినీ చూడండి",
      policy: "విధాన నవీకరణలు",
      technology: "సాంకేతికం",
      subsidy: "సబ్సిడీ",
    },
    quick: {
      title: "త్వరిత ప్రాప్యత",
    },
    footer: {
      tagline: "రైతులకు అవసరమైన వనరులతో కనెక్ట్ చేయడం.",
      copyright: "అన్ని హక్కులూ ప్రత్యేకించబడినవి.",
    },
    eligibility: {
      check: "అర్హతను తనిఖీ చేయండి",
      checking: "తనిఖీ చేస్తోంది...",
      eligible: "అర్హత కలిగిన",
      not_eligible: "అర్హత లేని",
      can_apply: "మీరు ఈ పథకానికి దరఖాస్తు చేసుకోవచ్చు",
      cannot_apply: "మీరు ఈ పథకానికి దరఖాస్తు చేసుకోలేరు",
      check_first: "మొదట అర్హతను తనిఖీ చేయండి",
      check_before_apply: "దరఖాస్తు చేసుకునే ముందు మీ అర్హతను తనిఖీ చేయండి",
      requirements_missing: "అవసరాలు లేవు",
      land_size_required: "చిన్న/సరిహద్దు రైతు భూమి పరిమాణం అవసరం",
      bank_account_required: "బ్యాంకు ఖాతా అవసరం",
      age_requirement: "వయస్సు అవసరం తీర్చలేదు"
    }
  },
  kn: {
    app: {
      title: "ಅಗ್ರಿ ಕನೆಕ್ಟ್",
      subtitle: "ರೈತರಿಗೆ ಸಬಲೀಕರಣ, ಕೃಷಿಯನ್ನು ಸಮೃದ್ಧಗೊಳಿಸುವುದು",
    },
    nav: {
      schemes: "ಯೋಜನೆಗಳು",
      eligibility: "ಅರ್ಹತೆ",
      documents: "ದಾಖಲೆಗಳು",
      status: "ಅರ್ಜಿ ಸ್ಥಿತಿ",
      support: "ಸಂಪರ್ಕ ಬೆಂಬಲ",
    },
    header: {
      notifications: "ಅಧಿಸೂಚನೆಗಳು",
      login: "ಲಾಗಿನ್",
    },
    hero: {
      title: "ರೈತರಿಗಾಗಿ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
      subtitle: "ನಿಮ್ಮ ಕೃಷಿ ಪದ್ಧತಿಗಳು ಮತ್ತು ಆದಾಯವನ್ನು ಹೆಚ್ಚಿಸಲು ಸರಿಯಾದ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ.",
    },
    search: {
      placeholder: "ಯೋಜನೆಗಳಿಗಾಗಿ ಹುಡುಕಿ...",
      button: "ಹುಡುಕಿ",
    },
    stats: {
      total_schemes: "ಒಟ್ಟು ಯೋಜನೆಗಳು",
      beneficiaries: "ಫಲಾನುಭವಿಗಳು",
      budget: "ಒಟ್ಟು ಬಜೆಟ್",
      states: "ರಾಜ್ಯಗಳು ಒಳಗೊಂಡಿದೆ",
    },
    features: {
      new: "ಹೊಸ ವೈಶಿಷ್ಟ್ಯಗಳು",
      schemes_db: "ಯೋಜನೆಗಳ ಡೇಟಾಬೇಸ್",
      schemes_desc: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಸಮಗ್ರ ಡೇಟಾಬೇಸ್ ಅನ್ನು ಅನ್ವೇಷಿಸಿ.",
      eligibility: "ಅರ್ಹತಾ ಪರೀಕ್ಷಕ",
      eligibility_desc: "ವಿವಿಧ ಯೋಜನೆಗಳಿಗೆ ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
      documents: "ದಾಖಲೆ ಅಪ್ಲೋಡ್",
      documents_desc: "ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ಸುಲಭವಾಗಿ ಅಪ್ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ.",
      status: "ಅರ್ಜಿ ಸ್ಥಿತಿ",
      status_desc: "ನಿಮ್ಮ ಅಪ್ಲಿಕೇಶನ್‌ಗಳ ಸ್ಥಿತಿಯನ್ನು ನೈಜ ಸಮಯದಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
      explore: "ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
      check: "ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
      upload: "ದಾಖಲೆಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
      track: "ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    },
    schemes: {
      featured: "ವೈಶಿಷ್ಟ್ಯಗೊಳಿಸಿದ ಯೋಜನೆಗಳು",
      amount: "ಮೊತ್ತ",
      beneficiaries: "ಫಲಾನುಭವಿಗಳು",
      deadline: "ಕೊನೆಯ ದಿನಾಂಕ",
      state: "ರಾಜ್ಯ",
      apply: "ಈಗ ಅನ್ವಯಿಸು",
      details: "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    },
    news: {
      title: "ಇತ್ತೀಚಿನ ಸುದ್ದಿ & ನವೀಕರಣಗಳು",
      view_all: "ಎಲ್ಲವನ್ನು ವೀಕ್ಷಿಸಿ",
      policy: "ನೀತಿ ನವೀಕರಣಗಳು",
      technology: "ತಂತ್ರಜ್ಞಾನ",
      subsidy: "ಸಬ್ಸಿಡಿ",
    },
    quick: {
      title: "ತ್ವರಿತ ಪ್ರವೇಶ",
    },
    footer: {
      tagline: "ರೈತರಿಗೆ ಅಗತ್ಯವಿರುವ ಸಂಪನ್ಮೂಲಗಳಿಗೆ ಸಂಪರ್ಕ ಕಲ್ಪಿಸುವುದು.",
      copyright: "ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    },
    eligibility: {
      check: "ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
      checking: "ಪರಿಶೀಲಿಸುತ್ತಿದೆ...",
      eligible: "ಅರ್ಹ",
      not_eligible: "ಅನರ್ಹ",
      can_apply: "ನೀವು ಈ ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು",
      cannot_apply: "ನೀವು ಈ ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ",
      check_first: "ಮೊದಲು ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
      check_before_apply: "ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಮೊದಲು ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
      requirements_missing: "ಅವಶ್ಯಕತೆಗಳು ಕಾಣೆ",
      land_size_required: "ಸಣ್ಣ/ಹಾಶಿಯ ಕೃಷಿಕ ಭೂಮಿ ಗಾತ್ರ ಅಗತ್ಯ",
      bank_account_required: "ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಗತ್ಯ",
      age_requirement: "ವಯಸ್ಸಿನ ಅವಶ್ಯಕತೆ ಪೂರೈಸಲಾಗಿಲ್ಲ"
    }
  }
};

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k as keyof typeof value];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  return useContext(LanguageContext);
};

export { LanguageProvider, useLanguage };
