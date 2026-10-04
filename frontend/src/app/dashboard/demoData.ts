import { AnalysisResult } from "./types";

export const DEMO_CASES: Record<number, Record<string, AnalysisResult>> = {
  1: {
    English: {
      risk_level: "CRITICAL",
      risk_score: 92,
      summary: "This message displays multiple hallmarks of a financial investment scam: guaranteed returns, manufactured urgency, advance payment demands, and promotion of unregulated Telegram groups.",
      red_flags: [
        { title: "Guaranteed High Returns", severity: "HIGH", evidence: "Double your money in 30 days", explanation: "No regulated financial product can legally guarantee doubling returns in 30 days. This is a classic hallmark of Ponzi-style schemes." },
        { title: "Advance Payment Demand", severity: "HIGH", evidence: "Pay ₹5000 advance to our account", explanation: "Legitimate investment platforms do not demand upfront payments to personal accounts. This is a common fund-extraction tactic." },
        { title: "Manufactured Urgency", severity: "MEDIUM", evidence: "Act now, only 5 spots left!", explanation: "Creating artificial scarcity pressures victims into impulsive decisions without due diligence." },
        { title: "Unregulated Channel", severity: "MEDIUM", evidence: "premium Telegram group", explanation: "Telegram investment groups operate outside regulatory oversight. SEBI-registered advisors use official, auditable channels." }
      ],
      claims: [
        { claim: "Double your money in 30 days", assessment: "UNVERIFIED", reason: "No verifiable evidence provided. Such returns are statistically implausible through legitimate means." },
        { claim: "Daily multibagger stock tips", assessment: "QUESTIONABLE", reason: "Consistent multibagger predictions are not achievable. This language is designed to attract inexperienced investors." }
      ],
      recommended_actions: [
        "Do not transfer any money to personal accounts.",
        "Do not join unregulated Telegram or WhatsApp investment groups.",
        "Report this message to your local cyber crime cell.",
        "Verify any investment advisor's SEBI registration at sebi.gov.in."
      ],
      verification_steps: [
        "Check the sender's SEBI registration number on sebi.gov.in.",
        "Ask for audited historical performance records.",
        "Consult a registered financial advisor before investing."
      ],
      disclaimer: "⚠ DEMO MODE — This is a deterministic sample analysis for demonstration purposes. Not investment or legal advice.",
      analysis_source: "demo"
    },
    Hindi: {
      risk_level: "CRITICAL",
      risk_score: 92,
      summary: "यह संदेश वित्तीय निवेश घोटाले के कई संकेत दिखाता है: गारंटीकृत रिटर्न, कृत्रिम तात्कालिकता, अग्रिम भुगतान की मांग, और अनियंत्रित टेलीग्राम समूहों का प्रचार।",
      red_flags: [
        { title: "गारंटीकृत उच्च रिटर्न", severity: "HIGH", evidence: "30 दिनों में अपना पैसा दोगुना करें", explanation: "कोई भी विनियमित वित्तीय उत्पाद कानूनी रूप से 30 दिनों में रिटर्न दोगुना करने की गारंटी नहीं दे सकता है। यह पोंजी-शैली योजनाओं की एक क्लासिक पहचान है।" },
        { title: "अग्रिम भुगतान की मांग", severity: "HIGH", evidence: "हमारे खाते में ₹5000 अग्रिम भुगतान करें", explanation: "वैध निवेश प्लेटफॉर्म व्यक्तिगत खातों में अग्रिम भुगतान की मांग नहीं करते हैं। यह एक सामान्य धन-निकासी रणनीति है।" },
        { title: "कृत्रिम तात्कालिकता", severity: "MEDIUM", evidence: "अभी कार्रवाई करें, केवल 5 स्थान शेष हैं!", explanation: "कृत्रिम कमी पैदा करने से पीड़ितों पर बिना उचित जांच के आवेगी निर्णय लेने का दबाव पड़ता है।" },
        { title: "अनियंत्रित चैनल", severity: "MEDIUM", evidence: "प्रीमियम टेलीग्राम समूह", explanation: "टेलीग्राम निवेश समूह नियामक निरीक्षण के बाहर काम करते हैं। SEBI-पंजीकृत सलाहकार आधिकारिक, ऑडिट योग्य चैनलों का उपयोग करते हैं।" }
      ],
      claims: [
        { claim: "30 दिनों में अपना पैसा दोगुना करें", assessment: "UNVERIFIED", reason: "कोई सत्यापन योग्य प्रमाण प्रदान नहीं किया गया। वैध माध्यमों से ऐसा रिटर्न सांख्यिकीय रूप से असंभव है।" },
        { claim: "दैनिक मल्टीबैगर स्टॉक टिप्स", assessment: "QUESTIONABLE", reason: "लगातार मल्टीबैगर भविष्यवाणियां प्राप्त नहीं की जा सकती हैं। यह भाषा अनुभवहीन निवेशकों को आकर्षित करने के लिए डिज़ाइन की गई है।" }
      ],
      recommended_actions: [
        "व्यक्तिगत खातों में कोई पैसा ट्रांसफर न करें।",
        "अनियंत्रित टेलीग्राम या व्हाट्सएप निवेश समूहों में शामिल न हों।",
        "अपने स्थानीय साइबर क्राइम सेल में इस संदेश की रिपोर्ट करें।",
        "sebi.gov.in पर किसी भी निवेश सलाहकार के SEBI पंजीकरण को सत्यापित करें।"
      ],
      verification_steps: [
        "sebi.gov.in पर प्रेषक की SEBI पंजीकरण संख्या की जांच करें।",
        "ऑडिट किए गए ऐतिहासिक प्रदर्शन रिकॉर्ड मांगें।",
        "निवेश करने से पहले एक पंजीकृत वित्तीय सलाहकार से परामर्श करें।"
      ],
      disclaimer: "⚠ डेमो मोड — यह प्रदर्शन उद्देश्यों के लिए एक नियतात्मक नमूना विश्लेषण है। निवेश या कानूनी सलाह नहीं।",
      analysis_source: "demo"
    },
    Marathi: {
      risk_level: "CRITICAL",
      risk_score: 92,
      summary: "हा संदेश आर्थिक फसवणुकीची अनेक लक्षणे दर्शवतो: हमखास परतावा, कृत्रिम निकड, आगाऊ पेमेंटची मागणी आणि अनियंत्रित टेलिग्राम ग्रुप्सची जाहिरात.",
      red_flags: [
        { title: "हमखास उच्च परतावा", severity: "HIGH", evidence: "30 दिवसांत तुमचे पैसे दुप्पट करा", explanation: "कोणतेही नियमन केलेले आर्थिक उत्पादन कायदेशीररित्या 30 दिवसांत परतावा दुप्पट करण्याची हमी देऊ शकत नाही. हे पोंझी-शैलीतील योजनांचे क्लासिक लक्षण आहे." },
        { title: "आगाऊ पेमेंटची मागणी", severity: "HIGH", evidence: "आमच्या खात्यात ₹5000 आगाऊ भरा", explanation: "कायदेशीर गुंतवणूक प्लॅटफॉर्म वैयक्तिक खात्यांमध्ये आगाऊ पेमेंटची मागणी करत नाहीत. ही एक सामान्य फसवणुकीची युक्ती आहे." },
        { title: "कृत्रिम निकड", severity: "MEDIUM", evidence: "आता कृती करा, फक्त 5 जागा शिल्लक आहेत!", explanation: "कृत्रिम टंचाई निर्माण केल्याने बळी पडलेल्यांवर योग्य काळजी न घेता घाईघाईने निर्णय घेण्यास दबाव पडतो." },
        { title: "अनियंत्रित चॅनेल", severity: "MEDIUM", evidence: "प्रीमियम टेलिग्राम ग्रुप", explanation: "टेलिग्राम गुंतवणूक गट नियामक देखरेखीच्या बाहेर चालतात. SEBI-नोंदणीकृत सल्लागार अधिकृत चॅनेल वापरतात." }
      ],
      claims: [
        { claim: "30 दिवसांत तुमचे पैसे दुप्पट करा", assessment: "UNVERIFIED", reason: "कोणताही पडताळणी करण्यायोग्य पुरावा दिलेला नाही. कायदेशीर मार्गांनी असा परतावा सांख्यिकीयदृष्ट्या अशक्य आहे." },
        { claim: "दैनिक मल्टीबॅगर स्टॉक टिप्स", assessment: "QUESTIONABLE", reason: "सातत्यपूर्ण मल्टीबॅगर अंदाज शक्य नाहीत. ही भाषा अननुभवी गुंतवणूकदारांना आकर्षित करण्यासाठी बनवली आहे." }
      ],
      recommended_actions: [
        "वैयक्तिक खात्यांमध्ये कोणतेही पैसे ट्रान्सफर करू नका.",
        "अनियंत्रित टेलिग्राम किंवा व्हॉट्सॲप गुंतवणूक गटांमध्ये सामील होऊ नका.",
        "तुमच्या स्थानिक सायबर क्राईम सेलला या संदेशाची तक्रार करा.",
        "sebi.gov.in वर कोणत्याही गुंतवणूक सल्लागाराची SEBI नोंदणी सत्यापित करा."
      ],
      verification_steps: [
        "sebi.gov.in वर प्रेषकाचा SEBI नोंदणी क्रमांक तपासा.",
        "ऑडिट केलेल्या ऐतिहासिक कामगिरीच्या नोंदी मागा.",
        "गुंतवणूक करण्यापूर्वी नोंदणीकृत आर्थिक सल्लागाराचा सल्ला घ्या."
      ],
      disclaimer: "⚠ डेमो मोड — हे प्रात्यक्षिक हेतूंसाठी एक निश्चित नमुना विश्लेषण आहे. गुंतवणूक किंवा कायदेशीर सल्ला नाही.",
      analysis_source: "demo"
    },
    Hinglish: {
      risk_level: "CRITICAL",
      risk_score: 92,
      summary: "Ye message financial scam ke kai sanket dikhata hai: guaranteed returns, banawati urgency, advance payment ki maang, aur unregulated Telegram groups ka prachar.",
      red_flags: [
        { title: "Guaranteed High Returns", severity: "HIGH", evidence: "30 dinon mein apna paisa double karein", explanation: "Koi bhi regulated financial product legally 30 dinon mein return double karne ki guarantee nahi de sakta. Ye Ponzi-style schemes ki classic pehchaan hai." },
        { title: "Advance Payment Demand", severity: "HIGH", evidence: "Humare account mein ₹5000 advance pay karein", explanation: "Legitimate investment platforms personal accounts mein advance payment nahi maangte. Ye ek common fraud tactic hai." },
        { title: "Manufactured Urgency", severity: "MEDIUM", evidence: "Abhi action lein, sirf 5 spots baaki hain!", explanation: "Artificial scarcity create karke victims par bina soche samjhe decision lene ka pressure banaya jata hai." },
        { title: "Unregulated Channel", severity: "MEDIUM", evidence: "premium Telegram group", explanation: "Telegram investment groups regulatory oversight ke bina operate karte hain. SEBI-registered advisors official channels use karte hain." }
      ],
      claims: [
        { claim: "30 dinon mein apna paisa double karein", assessment: "UNVERIFIED", reason: "Koi verifiable proof nahi diya gaya. Legitimate tareeqon se aise returns statistically impossible hain." },
        { claim: "Daily multibagger stock tips", assessment: "QUESTIONABLE", reason: "Consistent multibagger predictions possible nahi hain. Ye language inexperienced investors ko attract karne ke liye hai." }
      ],
      recommended_actions: [
        "Personal accounts mein koi paisa transfer na karein.",
        "Unregulated Telegram ya WhatsApp investment groups join na karein.",
        "Apne local cyber crime cell mein is message ki report karein.",
        "sebi.gov.in par kisi bhi investment advisor ki SEBI registration verify karein."
      ],
      verification_steps: [
        "sebi.gov.in par sender ka SEBI registration number check karein.",
        "Audited historical performance records maangein.",
        "Invest karne se pehle ek registered financial advisor se consult karein."
      ],
      disclaimer: "⚠ DEMO MODE — Ye demonstration ke liye ek deterministic sample analysis hai. Investment ya legal advice nahi.",
      analysis_source: "demo"
    }
  },
  2: {
    English: {
      risk_level: "CRITICAL",
      risk_score: 90,
      summary: "This message falsely claims SEBI approval while offering illegal guaranteed fixed returns and directing funds to a personal bank account.",
      red_flags: [
        { title: "False Regulatory Claim", severity: "HIGH", evidence: "official SEBI-approved trading platform", explanation: "SEBI does not approve platforms offering guaranteed fixed returns. This is a fraudulent authority claim." },
        { title: "Guaranteed Fixed Returns", severity: "HIGH", evidence: "10% monthly fixed returns", explanation: "SEBI regulations prohibit promising guaranteed returns on investments. 10% monthly (120% annual) returns are unrealistic." },
        { title: "Personal Account Transfer", severity: "HIGH", evidence: "Transfer funds to our secure nodal officer account (HDFC Acc: 123456789)", explanation: "Legitimate platforms use registered escrow or pooling accounts, not personal bank accounts labeled as 'nodal officer' accounts." }
      ],
      claims: [
        { claim: "Official SEBI-approved platform", assessment: "UNVERIFIED", reason: "No SEBI registration number provided. This claim cannot be verified without one." },
        { claim: "10% monthly fixed returns", assessment: "QUESTIONABLE", reason: "No regulated financial instrument can guarantee such returns. This violates SEBI advertising guidelines." },
        { claim: "Risk-free investment journey", assessment: "UNVERIFIED", reason: "All investments carry risk. Claiming otherwise is misleading and likely illegal under SEBI regulations." }
      ],
      recommended_actions: [
        "Do not transfer any funds to the provided account.",
        "Verify SEBI registration at sebi.gov.in.",
        "Report this to SEBI's SCORES portal (scores.gov.in).",
        "File a complaint with the cyber crime cell if funds were transferred."
      ],
      verification_steps: [
        "Search for the platform's SEBI registration number on sebi.gov.in.",
        "Verify the bank account details independently with the bank.",
        "Check SEBI's investor alerts for known fraudulent entities."
      ],
      disclaimer: "⚠ DEMO MODE — This is a deterministic sample analysis for demonstration purposes. Not investment or legal advice.",
      analysis_source: "demo"
    },
    Hindi: {
      risk_level: "CRITICAL",
      risk_score: 90,
      summary: "यह संदेश झूठा दावा करता है कि इसे SEBI की मंजूरी प्राप्त है, जबकि यह अवैध गारंटीकृत निश्चित रिटर्न की पेशकश कर रहा है और धन को व्यक्तिगत बैंक खाते में भेज रहा है।",
      red_flags: [
        { title: "झूठा विनियामक दावा", severity: "HIGH", evidence: "आधिकारिक SEBI-अनुमोदित ट्रेडिंग प्लेटफॉर्म", explanation: "SEBI गारंटीकृत निश्चित रिटर्न देने वाले प्लेटफॉर्म को मंजूरी नहीं देता है। यह एक कपटपूर्ण अधिकार दावा है।" },
        { title: "गारंटीकृत निश्चित रिटर्न", severity: "HIGH", evidence: "10% मासिक निश्चित रिटर्न", explanation: "SEBI नियम निवेश पर गारंटीकृत रिटर्न का वादा करने पर रोक लगाते हैं। 10% मासिक (120% वार्षिक) रिटर्न अवास्तविक हैं।" },
        { title: "व्यक्तिगत खाता स्थानांतरण", severity: "HIGH", evidence: "हमारे सुरक्षित नोडल अधिकारी खाते में धन हस्तांतरित करें (HDFC Acc: 123456789)", explanation: "वैध प्लेटफॉर्म पंजीकृत एस्क्रो या पूलिंग खातों का उपयोग करते हैं, न कि 'नोडल अधिकारी' खातों के रूप में लेबल किए गए व्यक्तिगत बैंक खातों का।" }
      ],
      claims: [
        { claim: "आधिकारिक SEBI-अनुमोदित प्लेटफॉर्म", assessment: "UNVERIFIED", reason: "कोई SEBI पंजीकरण संख्या प्रदान नहीं की गई। इसके बिना इस दावे की पुष्टि नहीं की जा सकती।" },
        { claim: "10% मासिक निश्चित रिटर्न", assessment: "QUESTIONABLE", reason: "कोई विनियमित वित्तीय साधन ऐसे रिटर्न की गारंटी नहीं दे सकता है। यह SEBI विज्ञापन दिशानिर्देशों का उल्लंघन है।" },
        { claim: "जोखिम-मुक्त निवेश यात्रा", assessment: "UNVERIFIED", reason: "सभी निवेशों में जोखिम होता है। अन्यथा दावा करना भ्रामक है और SEBI नियमों के तहत अवैध होने की संभावना है।" }
      ],
      recommended_actions: [
        "दिए गए खाते में कोई धनराशि स्थानांतरित न करें।",
        "sebi.gov.in पर SEBI पंजीकरण सत्यापित करें।",
        "SEBI के SCORES पोर्टल (scores.gov.in) पर इसकी रिपोर्ट करें।",
        "यदि धन स्थानांतरित कर दिया गया है तो साइबर क्राइम सेल में शिकायत दर्ज करें।"
      ],
      verification_steps: [
        "sebi.gov.in पर प्लेटफॉर्म का SEBI पंजीकरण नंबर खोजें।",
        "बैंक के साथ स्वतंत्र रूप से बैंक खाता विवरण सत्यापित करें।",
        "ज्ञात धोखाधड़ी संस्थाओं के लिए SEBI के निवेशक अलर्ट की जाँच करें।"
      ],
      disclaimer: "⚠ डेमो मोड — यह प्रदर्शन उद्देश्यों के लिए एक नियतात्मक नमूना विश्लेषण है। निवेश या कानूनी सलाह नहीं।",
      analysis_source: "demo"
    },
    Marathi: {
      risk_level: "CRITICAL",
      risk_score: 90,
      summary: "हा संदेश खोटा दावा करतो की त्याला SEBI ची मान्यता आहे, तर तो बेकायदेशीर हमखास निश्चित परतावा देत आहे आणि निधी वैयक्तिक बँक खात्यात वळवत आहे.",
      red_flags: [
        { title: "खोटा नियामक दावा", severity: "HIGH", evidence: "अधिकृत SEBI-मान्यताप्राप्त ट्रेडिंग प्लॅटफॉर्म", explanation: "SEBI हमखास निश्चित परतावा देणाऱ्या प्लॅटफॉर्मना मान्यता देत नाही. हा एक फसव्या प्राधिकरणाचा दावा आहे." },
        { title: "हमखास निश्चित परतावा", severity: "HIGH", evidence: "10% मासिक निश्चित परतावा", explanation: "SEBI चे नियम गुंतवणुकीवर हमखास परतावा देण्यास बंदी घालतात. 10% मासिक (120% वार्षिक) परतावा अवास्तव आहे." },
        { title: "वैयक्तिक खाते हस्तांतरण", severity: "HIGH", evidence: "आमच्या सुरक्षित नोडल अधिकारी खात्यात निधी हस्तांतरित करा (HDFC Acc: 123456789)", explanation: "कायदेशीर प्लॅटफॉर्म नोंदणीकृत एस्क्रो किंवा पूलिंग खाती वापरतात, 'नोडल अधिकारी' खाती म्हणून लेबल केलेली वैयक्तिक बँक खाती नाही." }
      ],
      claims: [
        { claim: "अधिकृत SEBI-मान्यताप्राप्त प्लॅटफॉर्म", assessment: "UNVERIFIED", reason: "कोणताही SEBI नोंदणी क्रमांक दिलेला नाही. त्याशिवाय या दाव्याची पडताळणी होऊ शकत नाही." },
        { claim: "10% मासिक निश्चित परतावा", assessment: "QUESTIONABLE", reason: "कोणतेही नियमन केलेले आर्थिक साधन अशा परताव्याची हमी देऊ शकत नाही. हे SEBI च्या जाहिरात मार्गदर्शक तत्त्वांचे उल्लंघन आहे." },
        { claim: "जोखीममुक्त गुंतवणूक प्रवास", assessment: "UNVERIFIED", reason: "सर्व गुंतवणुकीमध्ये जोखीम असते. अन्यथा दावा करणे दिशाभूल करणारे आहे आणि SEBI नियमांतर्गत बेकायदेशीर असण्याची शक्यता आहे." }
      ],
      recommended_actions: [
        "दिलेल्या खात्यात कोणताही निधी ट्रान्सफर करू नका.",
        "sebi.gov.in वर SEBI नोंदणी सत्यापित करा.",
        "SEBI च्या SCORES पोर्टलवर (scores.gov.in) याची तक्रार करा.",
        "जर निधी ट्रान्सफर केला असेल तर सायबर क्राईम सेलमध्ये तक्रार दाखल करा."
      ],
      verification_steps: [
        "sebi.gov.in वर प्लॅटफॉर्मचा SEBI नोंदणी क्रमांक शोधा.",
        "बँकेशी स्वतंत्रपणे बँक खात्याच्या तपशीलाची पडताळणी करा.",
        "ज्ञात फसव्या संस्थांसाठी SEBI चे गुंतवणूकदार अलर्ट तपासा."
      ],
      disclaimer: "⚠ डेमो मोड — हे प्रात्यक्षिक हेतूंसाठी एक निश्चित नमुना विश्लेषण आहे. गुंतवणूक किंवा कायदेशीर सल्ला नाही.",
      analysis_source: "demo"
    },
    Hinglish: {
      risk_level: "CRITICAL",
      risk_score: 90,
      summary: "Ye message jhootha claim karta hai ki ise SEBI ki approval mili hai, jabki ye illegal guaranteed fixed returns offer kar raha hai aur funds ko personal bank account mein direct kar raha hai.",
      red_flags: [
        { title: "False Regulatory Claim", severity: "HIGH", evidence: "official SEBI-approved trading platform", explanation: "SEBI aise platforms ko approve nahi karta jo guaranteed fixed returns offer karte hain. Ye ek fraud authority claim hai." },
        { title: "Guaranteed Fixed Returns", severity: "HIGH", evidence: "10% monthly fixed returns", explanation: "SEBI regulations investments par guaranteed returns promise karne ko prohibit karte hain. 10% monthly (120% annual) returns unrealistic hain." },
        { title: "Personal Account Transfer", severity: "HIGH", evidence: "Humare secure nodal officer account mein funds transfer karein (HDFC Acc: 123456789)", explanation: "Legitimate platforms registered escrow ya pooling accounts use karte hain, 'nodal officer' accounts ke naam par personal bank accounts nahi." }
      ],
      claims: [
        { claim: "Official SEBI-approved platform", assessment: "UNVERIFIED", reason: "Koi SEBI registration number provide nahi kiya gaya. Iske bina is claim ki verification nahi ho sakti." },
        { claim: "10% monthly fixed returns", assessment: "QUESTIONABLE", reason: "Koi regulated financial instrument aise returns ki guarantee nahi de sakta. Ye SEBI advertising guidelines ka violation hai." },
        { claim: "Risk-free investment journey", assessment: "UNVERIFIED", reason: "Sabhi investments mein risk hota hai. Aisa claim karna misleading hai aur SEBI regulations ke under illegal ho sakta hai." }
      ],
      recommended_actions: [
        "Diye gaye account mein koi funds transfer na karein.",
        "sebi.gov.in par SEBI registration verify karein.",
        "SEBI ke SCORES portal (scores.gov.in) par iski report karein.",
        "Agar funds transfer kar diye gaye hain toh cyber crime cell mein complaint file karein."
      ],
      verification_steps: [
        "sebi.gov.in par platform ka SEBI registration number search karein.",
        "Bank ke saath independently bank account details verify karein.",
        "Known fraudulent entities ke liye SEBI ke investor alerts check karein."
      ],
      disclaimer: "⚠ DEMO MODE — Ye demonstration ke liye ek deterministic sample analysis hai. Investment ya legal advice nahi.",
      analysis_source: "demo"
    }
  },
  3: {
    English: {
      risk_level: "CRITICAL",
      risk_score: 95,
      summary: "This message is a classic phishing attempt designed to steal banking credentials through a fake KYC urgency and a shortened URL.",
      red_flags: [
        { title: "Phishing URL", severity: "HIGH", evidence: "http://bit.ly/update-kyc-now", explanation: "Legitimate brokers and banks never use shortened URLs for KYC updates. This link likely leads to a credential-harvesting page." },
        { title: "False Urgency", severity: "HIGH", evidence: "Your account will be blocked in 24 hours", explanation: "Creating a 24-hour deadline pressures the victim into clicking without verification." },
        { title: "Contradictory Instructions", severity: "MEDIUM", evidence: "Never share your OTP with anyone", explanation: "Including this standard safety advice makes the scam appear legitimate while the link itself is designed to capture credentials." }
      ],
      claims: [
        { claim: "Trading account KYC is pending", assessment: "UNVERIFIED", reason: "Cannot be verified from this message alone. KYC status should be checked directly on the broker's official platform." },
        { claim: "Account will be blocked in 24 hours", assessment: "QUESTIONABLE", reason: "Legitimate platforms provide advance notice through multiple official channels, not via SMS with shortened links." }
      ],
      recommended_actions: [
        "Do not click the link under any circumstances.",
        "Contact your trading platform directly through their official app or website.",
        "Report the message as phishing to your mobile carrier.",
        "If you clicked the link, change your passwords immediately."
      ],
      verification_steps: [
        "Log into your trading account through the official app to check KYC status.",
        "Call the broker's official helpline to verify the message.",
        "Check your email for official KYC communications from your broker."
      ],
      disclaimer: "⚠ DEMO MODE — This is a deterministic sample analysis for demonstration purposes. Not investment or legal advice.",
      analysis_source: "demo"
    },
    Hindi: {
      risk_level: "CRITICAL",
      risk_score: 95,
      summary: "यह संदेश एक क्लासिक फ़िशिंग प्रयास है जिसे नकली KYC तात्कालिकता और एक छोटे URL के माध्यम से बैंकिंग क्रेडेंशियल चुराने के लिए डिज़ाइन किया गया है।",
      red_flags: [
        { title: "फ़िशिंग URL", severity: "HIGH", evidence: "http://bit.ly/update-kyc-now", explanation: "वैध ब्रोकर और बैंक कभी भी KYC अपडेट के लिए छोटे URL का उपयोग नहीं करते हैं। यह लिंक संभवतः एक क्रेडेंशियल-हार्वेस्टिंग पेज की ओर ले जाता है।" },
        { title: "झूठी तात्कालिकता", severity: "HIGH", evidence: "आपका खाता 24 घंटे में ब्लॉक कर दिया जाएगा", explanation: "24 घंटे की समय सीमा बनाना पीड़ित पर बिना सत्यापन के क्लिक करने का दबाव डालता है।" },
        { title: "विरोधाभासी निर्देश", severity: "MEDIUM", evidence: "अपना OTP कभी किसी के साथ साझा न करें", explanation: "इस मानक सुरक्षा सलाह को शामिल करने से घोटाला वैध प्रतीत होता है जबकि लिंक स्वयं क्रेडेंशियल्स कैप्चर करने के लिए डिज़ाइन किया गया है।" }
      ],
      claims: [
        { claim: "ट्रेडिंग अकाउंट KYC लंबित है", assessment: "UNVERIFIED", reason: "केवल इस संदेश से सत्यापित नहीं किया जा सकता। KYC स्थिति की जांच सीधे ब्रोकर के आधिकारिक प्लेटफॉर्म पर की जानी चाहिए।" },
        { claim: "खाता 24 घंटे में ब्लॉक कर दिया जाएगा", assessment: "QUESTIONABLE", reason: "वैध प्लेटफॉर्म कई आधिकारिक चैनलों के माध्यम से अग्रिम सूचना प्रदान करते हैं, न कि छोटे लिंक वाले SMS के माध्यम से।" }
      ],
      recommended_actions: [
        "किसी भी परिस्थिति में लिंक पर क्लिक न करें।",
        "अपने ट्रेडिंग प्लेटफॉर्म से सीधे उनके आधिकारिक ऐप या वेबसाइट के माध्यम से संपर्क करें।",
        "अपने मोबाइल वाहक को फ़िशिंग के रूप में संदेश की रिपोर्ट करें।",
        "यदि आपने लिंक पर क्लिक किया है, तो तुरंत अपने पासवर्ड बदलें।"
      ],
      verification_steps: [
        "KYC स्थिति की जांच करने के लिए आधिकारिक ऐप के माध्यम से अपने ट्रेडिंग खाते में लॉग इन करें।",
        "संदेश को सत्यापित करने के लिए ब्रोकर की आधिकारिक हेल्पलाइन पर कॉल करें।",
        "अपने ब्रोकर से आधिकारिक KYC संचार के लिए अपना ईमेल जांचें।"
      ],
      disclaimer: "⚠ डेमो मोड — यह प्रदर्शन उद्देश्यों के लिए एक नियतात्मक नमूना विश्लेषण है। निवेश या कानूनी सलाह नहीं।",
      analysis_source: "demo"
    },
    Marathi: {
      risk_level: "CRITICAL",
      risk_score: 95,
      summary: "हा संदेश एक क्लासिक फिशिंग प्रयत्न आहे जो बनावट KYC निकड आणि शॉर्ट URL द्वारे बँकिंग क्रेडेंशियल्स चोरण्यासाठी डिझाइन केला आहे.",
      red_flags: [
        { title: "फिशिंग URL", severity: "HIGH", evidence: "http://bit.ly/update-kyc-now", explanation: "कायदेशीर ब्रोकर आणि बँक कधीही KYC अपडेटसाठी शॉर्ट URL वापरत नाहीत. ही लिंक शक्यतो क्रेडेंशियल-हार्वेस्टिंग पेजवर घेऊन जाते." },
        { title: "खोटी निकड", severity: "HIGH", evidence: "तुमचे खाते 24 तासांत ब्लॉक केले जाईल", explanation: "24-तासांची अंतिम मुदत निर्माण केल्याने बळी पडलेल्यांवर पडताळणी न करता क्लिक करण्याचा दबाव येतो." },
        { title: "विरोधाभासी सूचना", severity: "MEDIUM", evidence: "तुमचा OTP कधीही कोणाशी शेअर करू नका", explanation: "हा मानक सुरक्षितता सल्ला समाविष्ट केल्याने घोटाळा कायदेशीर वाटतो तर लिंक स्वतः क्रेडेंशियल्स कॅप्चर करण्यासाठी डिझाइन केलेली आहे." }
      ],
      claims: [
        { claim: "ट्रेडिंग खाते KYC प्रलंबित आहे", assessment: "UNVERIFIED", reason: "केवळ या संदेशावरून पडताळणी करता येत नाही. KYC स्थिती थेट ब्रोकरच्या अधिकृत प्लॅटफॉर्मवर तपासली पाहिजे." },
        { claim: "खाते 24 तासांत ब्लॉक केले जाईल", assessment: "QUESTIONABLE", reason: "कायदेशीर प्लॅटफॉर्म अनेक अधिकृत चॅनेलद्वारे आगाऊ सूचना देतात, शॉर्ट लिंक असलेल्या SMS द्वारे नाही." }
      ],
      recommended_actions: [
        "कोणत्याही परिस्थितीत लिंकवर क्लिक करू नका.",
        "तुमच्या ट्रेडिंग प्लॅटफॉर्मशी त्यांच्या अधिकृत ॲप किंवा वेबसाइटद्वारे थेट संपर्क साधा.",
        "तुमच्या मोबाईल कॅरियरला फिशिंग म्हणून संदेशाची तक्रार करा.",
        "जर तुम्ही लिंकवर क्लिक केले असेल, तर तुमचे पासवर्ड त्वरित बदला."
      ],
      verification_steps: [
        "KYC स्थिती तपासण्यासाठी अधिकृत ॲपद्वारे तुमच्या ट्रेडिंग खात्यात लॉग इन करा.",
        "संदेशाची पडताळणी करण्यासाठी ब्रोकरच्या अधिकृत हेल्पलाइनवर कॉल करा.",
        "तुमच्या ब्रोकरकडून अधिकृत KYC संवादांसाठी तुमचा ईमेल तपासा."
      ],
      disclaimer: "⚠ डेमो मोड — हे प्रात्यक्षिक हेतूंसाठी एक निश्चित नमुना विश्लेषण आहे. गुंतवणूक किंवा कायदेशीर सल्ला नाही.",
      analysis_source: "demo"
    },
    Hinglish: {
      risk_level: "CRITICAL",
      risk_score: 95,
      summary: "Ye message ek classic phishing attempt hai jise fake KYC urgency aur ek short URL ke through banking credentials churane ke liye design kiya gaya hai.",
      red_flags: [
        { title: "Phishing URL", severity: "HIGH", evidence: "http://bit.ly/update-kyc-now", explanation: "Legitimate brokers aur banks kabhi bhi KYC updates ke liye short URLs use nahi karte. Ye link likely ek credential-harvesting page par le jata hai." },
        { title: "False Urgency", severity: "HIGH", evidence: "Aapka account 24 ghante mein block kar diya jayega", explanation: "24-hour deadline create karne se victim par bina verification ke click karne ka pressure banta hai." },
        { title: "Contradictory Instructions", severity: "MEDIUM", evidence: "Apna OTP kabhi kisi ke saath share na karein", explanation: "Is standard safety advice ko include karne se scam legitimate lagta hai jabki link khud credentials capture karne ke liye design kiya gaya hai." }
      ],
      claims: [
        { claim: "Trading account KYC pending hai", assessment: "UNVERIFIED", reason: "Sirf is message se verify nahi kiya ja sakta. KYC status direct broker ke official platform par check karna chahiye." },
        { claim: "Account 24 ghante mein block ho jayega", assessment: "QUESTIONABLE", reason: "Legitimate platforms multiple official channels ke through advance notice dete hain, short links wale SMS se nahi." }
      ],
      recommended_actions: [
        "Kisi bhi condition mein link par click na karein.",
        "Apne trading platform se direct unke official app ya website ke through contact karein.",
        "Apne mobile carrier ko is message ki phishing ke roop mein report karein.",
        "Agar aapne link par click kiya hai, toh turant apne passwords change karein."
      ],
      verification_steps: [
        "KYC status check karne ke liye official app ke through apne trading account mein log in karein.",
        "Message ko verify karne ke liye broker ki official helpline par call karein.",
        "Apne broker se official KYC communications ke liye apna email check karein."
      ],
      disclaimer: "⚠ DEMO MODE — Ye demonstration ke liye ek deterministic sample analysis hai. Investment ya legal advice nahi.",
      analysis_source: "demo"
    }
  },
  4: {
    English: {
      risk_level: "HIGH",
      risk_score: 85,
      summary: "This message uses unrealistic claims of wealth generation to sell likely fraudulent mentorship or automated trading bot access.",
      red_flags: [
        { title: "Unrealistic Returns", severity: "HIGH", evidence: "₹10,000 into ₹1 Crore in 6 months", explanation: "A 10,000x return in 6 months is statistically impossible through legitimate trading. This is a classic lure." },
        { title: "Secret Algorithm Claim", severity: "HIGH", evidence: "using my secret algorithm", explanation: "Vague claims of proprietary or secret methods without verifiable evidence are a hallmark of investment fraud." },
        { title: "Exclusivity Pressure", severity: "MEDIUM", evidence: "selecting 10 people to mentor personally", explanation: "Artificial exclusivity creates urgency and makes victims feel privileged, reducing critical evaluation." },
        { title: "No Knowledge Required", severity: "MEDIUM", evidence: "You don't need to know anything about the market", explanation: "Promising returns without any market knowledge is misleading and removes the investor's due diligence responsibility." }
      ],
      claims: [
        { claim: "₹10,000 into ₹1 Crore in 6 months", assessment: "UNVERIFIED", reason: "No audited performance records provided. Such returns would be unprecedented in any regulated market." },
        { claim: "Secret algorithm / bot trades for you", assessment: "UNVERIFIED", reason: "No verifiable proof of the algorithm's existence or performance. Legitimate algo-trading requires SEBI registration." }
      ],
      recommended_actions: [
        "Ignore the message entirely.",
        "Do not pay for VIP access or mentorship.",
        "Report the account on the social media platform.",
        "Check if the person is a SEBI-registered investment advisor."
      ],
      verification_steps: [
        "Ask for audited P&L statements verified by a chartered accountant.",
        "Search for the person's SEBI registration as an investment advisor.",
        "Check SEBI's investor alert list for known fraudulent entities."
      ],
      disclaimer: "⚠ DEMO MODE — This is a deterministic sample analysis for demonstration purposes. Not investment or legal advice.",
      analysis_source: "demo"
    },
    Hindi: {
      risk_level: "HIGH",
      risk_score: 85,
      summary: "यह संदेश धोखाधड़ी वाले मेंटरशिप या स्वचालित ट्रेडिंग बॉट एक्सेस को बेचने के लिए धन सृजन के अवास्तविक दावों का उपयोग करता है।",
      red_flags: [
        { title: "अवास्तविक रिटर्न", severity: "HIGH", evidence: "6 महीने में ₹10,000 को ₹1 करोड़ में बदल दिया", explanation: "वैध ट्रेडिंग के माध्यम से 6 महीने में 10,000 गुना रिटर्न सांख्यिकीय रूप से असंभव है। यह एक क्लासिक प्रलोभन है।" },
        { title: "गुप्त एल्गोरिथम दावा", severity: "HIGH", evidence: "मेरे गुप्त एल्गोरिथम का उपयोग करके", explanation: "सत्यापन योग्य प्रमाण के बिना मालिकाना या गुप्त तरीकों के अस्पष्ट दावे निवेश धोखाधड़ी की पहचान हैं।" },
        { title: "विशिष्टता का दबाव", severity: "MEDIUM", evidence: "व्यक्तिगत रूप से सलाह देने के लिए 10 लोगों का चयन करना", explanation: "कृत्रिम विशिष्टता तात्कालिकता पैदा करती है और पीड़ितों को विशेषाधिकार प्राप्त महसूस कराती है, जिससे महत्वपूर्ण मूल्यांकन कम हो जाता है।" },
        { title: "ज्ञान की आवश्यकता नहीं", severity: "MEDIUM", evidence: "आपको बाजार के बारे में कुछ भी जानने की जरूरत नहीं है", explanation: "बाजार के ज्ञान के बिना रिटर्न का वादा करना भ्रामक है और निवेशक की उचित परिश्रम जिम्मेदारी को हटा देता है।" }
      ],
      claims: [
        { claim: "6 महीने में ₹10,000 को ₹1 करोड़ में बदल दिया", assessment: "UNVERIFIED", reason: "कोई ऑडिटेड प्रदर्शन रिकॉर्ड प्रदान नहीं किया गया। ऐसे रिटर्न किसी भी विनियमित बाजार में अभूतपूर्व होंगे।" },
        { claim: "गुप्त एल्गोरिथम / बॉट आपके लिए ट्रेड करता है", assessment: "UNVERIFIED", reason: "एल्गोरिथम के अस्तित्व या प्रदर्शन का कोई सत्यापन योग्य प्रमाण नहीं है। वैध एल्गो-ट्रेडिंग के लिए SEBI पंजीकरण की आवश्यकता होती है।" }
      ],
      recommended_actions: [
        "संदेश को पूरी तरह से अनदेखा करें।",
        "VIP एक्सेस या मेंटरशिप के लिए भुगतान न करें।",
        "सोशल मीडिया प्लेटफॉर्म पर खाते की रिपोर्ट करें।",
        "जांचें कि क्या व्यक्ति SEBI-पंजीकृत निवेश सलाहकार है।"
      ],
      verification_steps: [
        "चार्टर्ड एकाउंटेंट द्वारा सत्यापित ऑडिट किए गए P&L विवरण मांगें।",
        "निवेश सलाहकार के रूप में व्यक्ति के SEBI पंजीकरण की खोज करें।",
        "ज्ञात धोखाधड़ी संस्थाओं के लिए SEBI की निवेशक अलर्ट सूची की जाँच करें।"
      ],
      disclaimer: "⚠ डेमो मोड — यह प्रदर्शन उद्देश्यों के लिए एक नियतात्मक नमूना विश्लेषण है। निवेश या कानूनी सलाह नहीं।",
      analysis_source: "demo"
    },
    Marathi: {
      risk_level: "HIGH",
      risk_score: 85,
      summary: "हा संदेश फसव्या मेंटरशिप किंवा स्वयंचलित ट्रेडिंग बॉट ऍक्सेस विकण्यासाठी संपत्ती निर्माण करण्याच्या अवास्तव दाव्यांचा वापर करतो.",
      red_flags: [
        { title: "अवास्तव परतावा", severity: "HIGH", evidence: "6 महिन्यांत ₹10,000 चे ₹1 कोटीत रूपांतर केले", explanation: "कायदेशीर ट्रेडिंगद्वारे 6 महिन्यांत 10,000x परतावा सांख्यिकीयदृष्ट्या अशक्य आहे. हे एक क्लासिक आमिष आहे." },
        { title: "गुप्त अल्गोरिदम दावा", severity: "HIGH", evidence: "माझा गुप्त अल्गोरिदम वापरून", explanation: "पडताळणी करण्यायोग्य पुराव्याशिवाय मालकी किंवा गुप्त पद्धतींचे अस्पष्ट दावे हे गुंतवणूक फसवणुकीचे लक्षण आहे." },
        { title: "अनन्यतेचा दबाव", severity: "MEDIUM", evidence: "वैयक्तिकरित्या मार्गदर्शन करण्यासाठी 10 लोकांची निवड करत आहे", explanation: "कृत्रिम अनन्यता निकड निर्माण करते आणि बळी पडलेल्यांना विशेषाधिकार प्राप्त झाल्यासारखे वाटते, ज्यामुळे गंभीर मूल्यमापन कमी होते." },
        { title: "ज्ञानाची आवश्यकता नाही", severity: "MEDIUM", evidence: "तुम्हाला मार्केटबद्दल काहीही माहिती असण्याची गरज नाही", explanation: "मार्केटच्या कोणत्याही ज्ञानाशिवाय परताव्याचे वचन देणे दिशाभूल करणारे आहे आणि गुंतवणूकदाराची योग्य काळजी घेण्याची जबाबदारी काढून टाकते." }
      ],
      claims: [
        { claim: "6 महिन्यांत ₹10,000 चे ₹1 कोटीत रूपांतर केले", assessment: "UNVERIFIED", reason: "कोणत्याही ऑडिट केलेल्या कामगिरीच्या नोंदी दिलेल्या नाहीत. असा परतावा कोणत्याही नियमन केलेल्या मार्केटमध्ये अभूतपूर्व असेल." },
        { claim: "गुप्त अल्गोरिदम / बॉट तुमच्यासाठी ट्रेड करतो", assessment: "UNVERIFIED", reason: "अल्गोरिदमच्या अस्तित्वाचा किंवा कामगिरीचा कोणताही पडताळणी करण्यायोग्य पुरावा नाही. कायदेशीर अल्गो-ट्रेडिंगसाठी SEBI नोंदणी आवश्यक आहे." }
      ],
      recommended_actions: [
        "संदेश पूर्णपणे दुर्लक्षित करा.",
        "VIP ऍक्सेस किंवा मेंटरशिपसाठी पैसे देऊ नका.",
        "सोशल मीडिया प्लॅटफॉर्मवर खात्याची तक्रार करा.",
        "ती व्यक्ती SEBI-नोंदणीकृत गुंतवणूक सल्लागार आहे का ते तपासा."
      ],
      verification_steps: [
        "चार्टर्ड अकाउंटंटने सत्यापित केलेली ऑडिट केलेली P&L स्टेटमेंट्स मागा.",
        "गुंतवणूक सल्लागार म्हणून त्या व्यक्तीची SEBI नोंदणी शोधा.",
        "ज्ञात फसव्या संस्थांसाठी SEBI ची गुंतवणूकदार अलर्ट यादी तपासा."
      ],
      disclaimer: "⚠ डेमो मोड — हे प्रात्यक्षिक हेतूंसाठी एक निश्चित नमुना विश्लेषण आहे. गुंतवणूक किंवा कायदेशीर सल्ला नाही.",
      analysis_source: "demo"
    },
    Hinglish: {
      risk_level: "HIGH",
      risk_score: 85,
      summary: "Ye message fraudulent mentorship ya automated trading bot access bechne ke liye wealth generation ke unrealistic claims ka use karta hai.",
      red_flags: [
        { title: "Unrealistic Returns", severity: "HIGH", evidence: "6 mahine mein ₹10,000 ko ₹1 Crore banaya", explanation: "Legitimate trading ke through 6 mahine mein 10,000x return statistically impossible hai. Ye ek classic lure hai." },
        { title: "Secret Algorithm Claim", severity: "HIGH", evidence: "mere secret algorithm ka use karke", explanation: "Bina verifiable proof ke proprietary ya secret methods ke vague claims investment fraud ki pehchaan hain." },
        { title: "Exclusivity Pressure", severity: "MEDIUM", evidence: "personally mentor karne ke liye 10 logon ko select kar raha hu", explanation: "Artificial exclusivity urgency create karti hai aur victims ko privileged feel karwati hai, jisse critical evaluation kam ho jata hai." },
        { title: "Knowledge Required Nahi", severity: "MEDIUM", evidence: "Aapko market ke baare mein kuch bhi janne ki zaroorat nahi hai", explanation: "Bina market knowledge ke returns promise karna misleading hai aur investor ki due diligence responsibility ko remove kar deta hai." }
      ],
      claims: [
        { claim: "6 mahine mein ₹10,000 ko ₹1 Crore banaya", assessment: "UNVERIFIED", reason: "Koi audited performance records provide nahi kiye gaye. Aise returns kisi bhi regulated market mein unprecedented honge." },
        { claim: "Secret algorithm / bot aapke liye trade karta hai", assessment: "UNVERIFIED", reason: "Algorithm ke existence ya performance ka koi verifiable proof nahi. Legitimate algo-trading ke liye SEBI registration required hai." }
      ],
      recommended_actions: [
        "Message ko puri tarah ignore karein.",
        "VIP access ya mentorship ke liye pay na karein.",
        "Social media platform par account ki report karein.",
        "Check karein ki kya person SEBI-registered investment advisor hai."
      ],
      verification_steps: [
        "Chartered accountant dwara verified audited P&L statements maangein.",
        "Investment advisor ke roop mein person ki SEBI registration search karein.",
        "Known fraudulent entities ke liye SEBI ki investor alert list check karein."
      ],
      disclaimer: "⚠ DEMO MODE — Ye demonstration ke liye ek deterministic sample analysis hai. Investment ya legal advice nahi.",
      analysis_source: "demo"
    }
  },
  5: {
    English: {
      risk_level: "LOW",
      risk_score: 8,
      summary: "This message appears to be standard, factual financial education content with appropriate risk disclosures about mutual fund investments via SIPs.",
      red_flags: [],
      claims: [
        { claim: "SIPs can build wealth over the long term through compounding", assessment: "SUPPORTED", reason: "This is a well-established financial concept supported by historical data and financial theory." },
        { claim: "Mutual fund investments are subject to market risks", assessment: "SUPPORTED", reason: "This is the standard mandatory SEBI disclaimer required on all mutual fund communications." }
      ],
      recommended_actions: [
        "Consult a SEBI-registered financial advisor for personalized advice.",
        "Read all scheme-related documents carefully before investing.",
        "Understand your own risk tolerance before choosing a fund."
      ],
      verification_steps: [
        "Verify the mutual fund scheme on AMFI's official website (amfiindia.com).",
        "Read the scheme information document (SID) and key information memorandum (KIM)."
      ],
      disclaimer: "⚠ DEMO MODE — This is a deterministic sample analysis for demonstration purposes. Not investment or legal advice.",
      analysis_source: "demo"
    },
    Hindi: {
      risk_level: "LOW",
      risk_score: 8,
      summary: "यह संदेश SIP के माध्यम से म्यूचुअल फंड निवेश के बारे में उचित जोखिम प्रकटीकरण के साथ मानक, तथ्यात्मक वित्तीय शिक्षा सामग्री प्रतीत होता है।",
      red_flags: [],
      claims: [
        { claim: "SIP कंपाउंडिंग के माध्यम से लंबी अवधि में धन का निर्माण कर सकते हैं", assessment: "SUPPORTED", reason: "यह ऐतिहासिक डेटा और वित्तीय सिद्धांत द्वारा समर्थित एक अच्छी तरह से स्थापित वित्तीय अवधारणा है।" },
        { claim: "म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन हैं", assessment: "SUPPORTED", reason: "यह सभी म्यूचुअल फंड संचारों पर आवश्यक मानक अनिवार्य SEBI अस्वीकरण है।" }
      ],
      recommended_actions: [
        "व्यक्तिगत सलाह के लिए SEBI-पंजीकृत वित्तीय सलाहकार से परामर्श करें।",
        "निवेश करने से पहले सभी योजना-संबंधित दस्तावेजों को ध्यान से पढ़ें।",
        "फंड चुनने से पहले अपनी जोखिम सहनशीलता को समझें।"
      ],
      verification_steps: [
        "AMFI की आधिकारिक वेबसाइट (amfiindia.com) पर म्यूचुअल फंड योजना को सत्यापित करें।",
        "योजना सूचना दस्तावेज (SID) और मुख्य सूचना ज्ञापन (KIM) पढ़ें।"
      ],
      disclaimer: "⚠ डेमो मोड — यह प्रदर्शन उद्देश्यों के लिए एक नियतात्मक नमूना विश्लेषण है। निवेश या कानूनी सलाह नहीं।",
      analysis_source: "demo"
    },
    Marathi: {
      risk_level: "LOW",
      risk_score: 8,
      summary: "हा संदेश SIP द्वारे म्युच्युअल फंड गुंतवणुकीबद्दल योग्य जोखीम प्रकटीकरणासह मानक, तथ्यात्मक आर्थिक शिक्षण सामग्री असल्याचे दिसते.",
      red_flags: [],
      claims: [
        { claim: "SIP चक्रवाढ व्याजाद्वारे दीर्घकालीन संपत्ती निर्माण करू शकतात", assessment: "SUPPORTED", reason: "ही ऐतिहासिक डेटा आणि आर्थिक सिद्धांताद्वारे समर्थित एक प्रस्थापित आर्थिक संकल्पना आहे." },
        { claim: "म्युच्युअल फंड गुंतवणूक बाजारातील जोखमींच्या अधीन आहे", assessment: "SUPPORTED", reason: "हा सर्व म्युच्युअल फंड संवादांवर आवश्यक असलेला मानक अनिवार्य SEBI अस्वीकरण आहे." }
      ],
      recommended_actions: [
        "वैयक्तिक सल्ल्यासाठी SEBI-नोंदणीकृत आर्थिक सल्लागाराचा सल्ला घ्या.",
        "गुंतवणूक करण्यापूर्वी योजनेशी संबंधित सर्व कागदपत्रे काळजीपूर्वक वाचा.",
        "फंड निवडण्यापूर्वी तुमची स्वतःची जोखीम सहनशीलता समजून घ्या."
      ],
      verification_steps: [
        "AMFI च्या अधिकृत वेबसाइटवर (amfiindia.com) म्युच्युअल फंड योजनेची पडताळणी करा.",
        "योजना माहिती दस्तऐवज (SID) आणि मुख्य माहिती ज्ञापन (KIM) वाचा."
      ],
      disclaimer: "⚠ डेमो मोड — हे प्रात्यक्षिक हेतूंसाठी एक निश्चित नमुना विश्लेषण आहे. गुंतवणूक किंवा कायदेशीर सल्ला नाही.",
      analysis_source: "demo"
    },
    Hinglish: {
      risk_level: "LOW",
      risk_score: 8,
      summary: "Ye message SIPs ke through mutual fund investments ke baare mein proper risk disclosures ke saath standard, factual financial education content lagta hai.",
      red_flags: [],
      claims: [
        { claim: "SIPs compounding ke through long term mein wealth build kar sakte hain", assessment: "SUPPORTED", reason: "Ye historical data aur financial theory dwara supported ek well-established financial concept hai." },
        { claim: "Mutual fund investments market risks ke subject hain", assessment: "SUPPORTED", reason: "Ye sabhi mutual fund communications par required standard mandatory SEBI disclaimer hai." }
      ],
      recommended_actions: [
        "Personalized advice ke liye ek SEBI-registered financial advisor se consult karein.",
        "Invest karne se pehle sabhi scheme-related documents dhyaan se padhein.",
        "Fund choose karne se pehle apni risk tolerance ko samjhein."
      ],
      verification_steps: [
        "AMFI ki official website (amfiindia.com) par mutual fund scheme verify karein.",
        "Scheme information document (SID) aur key information memorandum (KIM) padhein."
      ],
      disclaimer: "⚠ DEMO MODE — Ye demonstration ke liye ek deterministic sample analysis hai. Investment ya legal advice nahi.",
      analysis_source: "demo"
    }
  }
};

export function getDemoAnalysis(demoId: number, language: string): AnalysisResult | null {
  const cases = DEMO_CASES[demoId];
  if (!cases) return null;
  return cases[language] || cases["English"];
}
