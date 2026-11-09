// Translations for the calculator: UI strings, category names, unit names and
// each language's own digits. The engine always works in ASCII; only what is
// rendered is localised, and pasted text is mapped back before use.

const I18N_LANGS = [{ code: "en", name: "English", digits: "0123456789" }, { code: "as", name: "অসমীয়া", digits: "০১২৩৪৫৬৭৮৯" }, { code: "bn", name: "বাংলা", digits: "০১২৩৪৫৬৭৮৯" }, { code: "gu", name: "ગુજરાતી", digits: "૦૧૨૩૪૫૬૭૮૯" }, { code: "hi", name: "हिन्दी", digits: "०१२३४५६७८९" }, { code: "kn", name: "ಕನ್ನಡ", digits: "೦೧೨೩೪೫೬೭೮೯" }, { code: "ks", name: "کٲشُر", digits: "۰۱۲۳۴۵۶۷۸۹" }, { code: "ml", name: "മലയാളം", digits: "൦൧൨൩൪൫൬൭൮൯" }, { code: "mr", name: "मराठी", digits: "०१२३४५६७८९" }, { code: "ne", name: "नेपाली", digits: "०१२३४५६७८९" }, { code: "or", name: "ଓଡ଼ିଆ", digits: "୦୧୨୩୪୫୬୭୮୯" }, { code: "pa", name: "ਪੰਜਾਬੀ", digits: "੦੧੨੩੪੫੬੭੮੯" }, { code: "sa", name: "संस्कृतम्", digits: "०१२३४५६७८९" }, { code: "ta", name: "தமிழ்", digits: "௦௧௨௩௪௫௬௭௮௯" }, { code: "te", name: "తెలుగు", digits: "౦౧౨౩౪౫౬౭౮౯" }];

const I18N = {
  en: {
    ui: {"calculator": "Calculator", "converter": "Converter", "history": "History", "clear": "Clear", "tapAgain": "Tap again", "close": "Close", "empty": "No calculations yet.", "copy": "Copy", "paste": "Paste", "language": "Language"},
    categories: {"Length": "Length", "Time": "Time", "Data": "Data", "Area": "Area", "Volume": "Volume", "Mass": "Mass", "Temperature": "Temperature"},
    units: {"cm": "cm", "m": "m", "km": "km", "mm": "mm", "hr": "hr", "sec": "sec", "min": "min", "bytes": "bytes", "bits": "bits", "kb": "KB", "mb": "MB", "gb": "GB", "sqm": "m²", "sqcm": "cm²", "l": "litres", "ml": "ml", "cum": "m³", "cucm": "cm³", "kg": "kg", "g": "g", "ton": "tons", "c": "°C", "f": "°F", "k": "K"},
  },
  as: {
    ui: {"calculator": "কেলকুলেটৰ", "converter": "কনভাৰ্টাৰ", "history": "ইতিহাস", "clear": "পৰিষ্কাৰ", "tapAgain": "আকৌ টিপক", "close": "বন্ধ কৰক", "empty": "এতিয়ালৈকে কোনো হিচাপ নাই।", "copy": "কপি", "paste": "পেষ্ট", "language": "ভাষা"},
    categories: {"Length": "দৈৰ্ঘ্য", "Time": "সময়", "Data": "তথ্য", "Area": "কালি", "Volume": "আয়তন", "Mass": "ভৰ", "Temperature": "তাপমাত্ৰা"},
    units: {"cm": "চেণ্টিমিটাৰ", "m": "মিটাৰ", "km": "কিলোমিটাৰ", "mm": "মিলিমিটাৰ", "hr": "ঘণ্টা", "sec": "ছেকেণ্ড", "min": "মিনিট", "bytes": "বাইট", "bits": "বিট", "kb": "কিলোবাইট", "mb": "মেগাবাইট", "gb": "গিগাবাইট", "sqm": "বৰ্গ মিটাৰ", "sqcm": "বৰ্গ চেণ্টিমিটাৰ", "l": "লিটাৰ", "ml": "মিলি লিটাৰ", "cum": "ঘন মিটাৰ", "cucm": "ঘন চেণ্টিমিটাৰ", "kg": "কিলোগ্ৰাম", "g": "গ্ৰাম", "ton": "টন", "c": "ডিগ্ৰী চেলছিয়াছ", "f": "ডিগ্ৰী ফাৰেনহাইট", "k": "কেলভিন"},
  },
  bn: {
    ui: {"calculator": "ক্যালকুলেটর", "converter": "কনভার্টার", "history": "ইতিহাস", "clear": "ক্লিয়ার", "tapAgain": "আবার ট্যাপ করুন", "close": "ক্লোজ", "empty": "এখনো কোনো হিসাব করা হয়নি।", "copy": "কপি", "paste": "পেস্ট", "language": "ভাষা"},
    categories: {"Length": "দৈর্ঘ্য", "Time": "সময়", "Data": "ডেটা", "Area": "ক্ষেত্রফল", "Volume": "আয়তন", "Mass": "ভর", "Temperature": "তাপমাত্রা"},
    units: {"cm": "সেন্টিমিটার", "m": "মিটার", "km": "কিলোমিটার", "mm": "মিলিমিটার", "hr": "ঘণ্টা", "sec": "সেকেন্ড", "min": "মিনিট", "bytes": "বাইট", "bits": "বিট", "kb": "কিলোবাইট", "mb": "মেগাবাইট", "gb": "গিগাবাইট", "sqm": "বর্গমিটার", "sqcm": "বর্গসেন্টিমিটার", "l": "লিটার", "ml": "মিলি লিটার", "cum": "ঘনমিটার", "cucm": "ঘনসেন্টিমিটার", "kg": "কিলোগ্রাম", "g": "গ্রাম", "ton": "টন", "c": "ডিগ্রি সেলসিয়াস", "f": "ডিগ্রি ফারেনহাইট", "k": "কেলভিন"},
  },
  gu: {
    ui: {"calculator": "કેલ્ક્યુલેટર", "converter": "કન્વર્ટર", "history": "ઇતિહાસ", "clear": "ક્લિયર", "tapAgain": "ફરીથી ટેપ કરો", "close": "બંધ કરો", "empty": "હજુ સુધી કોઈ ગણતરી નથી.", "copy": "કોપી", "paste": "પેસ્ટ", "language": "ભાષા"},
    categories: {"Length": "લંબાઈ", "Time": "સમય", "Data": "ડેટા", "Area": "ક્ષેત્રફળ", "Volume": "કદ", "Mass": "વજન", "Temperature": "તાપમાન"},
    units: {"cm": "સેન્ટીમીટર", "m": "મીટર", "km": "કિલોમીટર", "mm": "મિલીમીટર", "hr": "કલાક", "sec": "સેકન્ડ", "min": "મિનિટ", "bytes": "બાઇટ", "bits": "બિટ", "kb": "કિલોબાઇટ", "mb": "મેગાબાઇટ", "gb": "ગીગાબાઇટ", "sqm": "ચોરસ મીટર", "sqcm": "ચોરસ સેન્ટીમીટર", "l": "લિટર", "ml": "મિલીલિટર", "cum": "ઘન મીટર", "cucm": "ઘન સેન્ટીમીટર", "kg": "કિલોગ્રામ", "g": "ગ્રામ", "ton": "ટન", "c": "ડિગ્રી સેલ્સિયસ", "f": "ડિગ્રી ફેરનહીટ", "k": "કેલ્વિન"},
  },
  hi: {
    ui: {"calculator": "कैलकुलेटर", "converter": "कनवर्टर", "history": "इतिहास", "clear": "साफ़ करें", "tapAgain": "फिर से टैप करें", "close": "बंद करें", "empty": "अभी तक कोई गणना नहीं।", "copy": "कॉपी", "paste": "पेस्ट", "language": "भाषा"},
    categories: {"Length": "लंबाई", "Time": "समय", "Data": "डेटा", "Area": "क्षेत्रफल", "Volume": "आयतन", "Mass": "द्रव्यमान", "Temperature": "तापमान"},
    units: {"cm": "सेंटीमीटर", "m": "मीटर", "km": "किलोमीटर", "mm": "मिलीमीटर", "hr": "घंटा", "sec": "सेकंड", "min": "मिनट", "bytes": "बाइट", "bits": "बिट", "kb": "किलोबाइट", "mb": "मेगाबाइट", "gb": "गीगाबाइट", "sqm": "वर्ग मीटर", "sqcm": "वर्ग सेंटीमीटर", "l": "लीटर", "ml": "मिलीलीटर", "cum": "घन मीटर", "cucm": "घन सेंटीमीटर", "kg": "किलोग्राम", "g": "ग्राम", "ton": "टन", "c": "डिग्री सेल्सियस", "f": "डिग्री फारेनहाइट", "k": "केल्विन"},
  },
  kn: {
    ui: {"calculator": "ಕ್ಯಾಲ್ಕುಲೇಟರ್", "converter": "ಕನ್ವರ್ಟರ್", "history": "ಇತಿಹಾಸ", "clear": "ಕ್ಲಿಯರ್", "tapAgain": "ಮತ್ತೆ ಟ್ಯಾಪ್ ಮಾಡಿ", "close": "ಮುಚ್ಚಿ", "empty": "ಇನ್ನೂ ಯಾವುದೇ ಲೆಕ್ಕಾಚಾರಗಳಿಲ್ಲ.", "copy": "ಕಾಪಿ", "paste": "ಪೇಸ್ಟ್", "language": "ಭಾಷೆ"},
    categories: {"Length": "ಉದ್ದ", "Time": "ಸಮಯ", "Data": "ಡೇಟಾ", "Area": "ವಿಸ್ತೀರ್ಣ", "Volume": "ಗಾತ್ರ", "Mass": "ದ್ರವ್ಯರಾಶಿ", "Temperature": "ತಾಪಮಾನ"},
    units: {"cm": "ಸೆಂಟಿಮೀಟರ್", "m": "ಮೀಟರ್", "km": "ಕಿಲೋಮೀಟರ್", "mm": "ಮಿಲಿಮೀಟರ್", "hr": "ಗಂಟೆ", "sec": "ಸೆಕೆಂಡ್", "min": "ನಿಮಿಷ", "bytes": "ಬೈಟ್", "bits": "ಬಿಟ್", "kb": "ಕಿಲೋಬೈಟ್", "mb": "ಮೆಗಾಬೈಟ್", "gb": "ಗಿಗಾಬೈಟ್", "sqm": "ಚದರ ಮೀಟರ್", "sqcm": "ಚದರ ಸೆಂಟಿಮೀಟರ್", "l": "ಲೀಟರ್", "ml": "ಮಿಲಿಲೀಟರ್", "cum": "ಘನ ಮೀಟರ್", "cucm": "ಘನ ಸೆಂಟಿಮೀಟರ್", "kg": "ಕಿಲೋಗ್ರಾಂ", "g": "ಗ್ರಾಂ", "ton": "ಟನ್", "c": "ಡಿಗ್ರಿ ಸೆಲ್ಸಿಯಸ್", "f": "ಡಿಗ್ರಿ ಫ್ಯಾರನ್‌ಹೀಟ್", "k": "ಕೆಲ್ವಿನ್"},
  },
  ks: {
    ui: {"calculator": "کیلکولیٹر", "converter": "کنورٹر", "history": "تاریخ", "clear": "صاف", "tapAgain": "دوبارٕ ٹچ کریو", "close": "بند کریو", "empty": "وُنؠ چھِنہٕ کانٛہہ حساب کرنہٕ آمُت۔", "copy": "کاپی", "paste": "پیسٹ", "language": "زبان"},
    categories: {"Length": "زیچھر", "Time": "وقت", "Data": "ڈیٹا", "Area": "رقبہ", "Volume": "حجم", "Mass": "وزن", "Temperature": "درجہ حرارت"},
    units: {"cm": "سینٹی میٹر", "m": "میٹر", "km": "کلومیٹر", "mm": "ملی میٹر", "hr": "گھنٹہ", "sec": "سیکنڈ", "min": "منٹ", "bytes": "بائٹ", "bits": "بٹ", "kb": "کلو بائٹ", "mb": "میگا بائٹ", "gb": "گیگا بائٹ", "sqm": "مربع میٹر", "sqcm": "مربع سینٹی میٹر", "l": "لیٹر", "ml": "ملی لیٹر", "cum": "مکعب میٹر", "cucm": "مکعب سینٹی میٹر", "kg": "کلو گرام", "g": "گرام", "ton": "ٹن", "c": "ڈگری سیلسیس", "f": "ڈگری فارن ہائیٹ", "k": "کیلون"},
  },
  ml: {
    ui: {"calculator": "കാൽക്കുലേറ്റർ", "converter": "കൺവെർട്ടർ", "history": "ചരിത്രം", "clear": "ക്ലിയർ", "tapAgain": "വീണ്ടും ടാപ്പ് ചെയ്യുക", "close": "അടയ്ക്കുക", "empty": "ഇതുവരെ കണക്കുകൂട്ടലുകളൊന്നുമില്ല.", "copy": "കോപ്പി", "paste": "പേസ്റ്റ്", "language": "ഭാഷ"},
    categories: {"Length": "നീളം", "Time": "സമയം", "Data": "ഡാറ്റ", "Area": "വിസ്തീർണ്ണം", "Volume": "വ്യാപ്തം", "Mass": "പിണ്ഡം", "Temperature": "താപനില"},
    units: {"cm": "സെന്റീമീറ്റർ", "m": "മീറ്റർ", "km": "കിലോമീറ്റർ", "mm": "മില്ലിമീറ്റർ", "hr": "മണിക്കൂർ", "sec": "സെക്കൻഡ്", "min": "മിനിറ്റ്", "bytes": "ബൈറ്റ്", "bits": "ബിറ്റ്", "kb": "കിലോബൈറ്റ്", "mb": "മെഗാബൈറ്റ്", "gb": "ഗിഗാബൈറ്റ്", "sqm": "ചതുരശ്ര മീറ്റർ", "sqcm": "ചതുരശ്ര സെന്റീമീറ്റർ", "l": "ലിറ്റർ", "ml": "മില്ലിലിറ്റർ", "cum": "ഘനമീറ്റർ", "cucm": "ഘനസെന്റീമീറ്റർ", "kg": "കിലോഗ്രാം", "g": "ഗ്രാം", "ton": "ടൺ", "c": "ഡിഗ്രി സെൽഷ്യസ്", "f": "ഡിഗ്രി ഫാരൻഹീറ്റ്", "k": "കെൽവിൻ"},
  },
  mr: {
    ui: {"calculator": "कॅल्क्युलेटर", "converter": "कन्व्हर्टर", "history": "इतिहास", "clear": "क्लिअर", "tapAgain": "पुन्हा टॅप करा", "close": "बंद करा", "empty": "अद्याप कोणतीही आकडेमोड नाही.", "copy": "कॉपी", "paste": "पेस्ट", "language": "भाषा"},
    categories: {"Length": "लांबी", "Time": "वेळ", "Data": "डेटा", "Area": "क्षेत्रफळ", "Volume": "घनफळ", "Mass": "वस्तुमान", "Temperature": "तापमान"},
    units: {"cm": "सेंटीमीटर", "m": "मीटर", "km": "किलोमीटर", "mm": "मिलीमीटर", "hr": "तास", "sec": "सेकंद", "min": "मिनिट", "bytes": "बाइट", "bits": "बिट", "kb": "किलोबाइट", "mb": "मेगाबाइट", "gb": "गिगाबाइट", "sqm": "चौरस मीटर", "sqcm": "चौरस सेंटीमीटर", "l": "लिटर", "ml": "मिलीलीटर", "cum": "घन मीटर", "cucm": "घन सेंटीमीटर", "kg": "किलोग्रॅम", "g": "ग्रॅम", "ton": "टन", "c": "डिग्री सेल्सिअस", "f": "डिग्री फॅरेनहाइट", "k": "केल्विन"},
  },
  ne: {
    ui: {"calculator": "क्याल्कुलेटर", "converter": "कन्भर्टर", "history": "इतिहास", "clear": "क्लियर", "tapAgain": "फेरि ट्याप गर्नुहोस्", "close": "बन्द गर्नुहोस्", "empty": "अहिलेसम्म कुनै हिसाब गरिएको छैन।", "copy": "कपी", "paste": "पेस्ट", "language": "भाषा"},
    categories: {"Length": "लम्बाइ", "Time": "समय", "Data": "डाटा", "Area": "क्षेत्रफल", "Volume": "आयतन", "Mass": "पिण्ड", "Temperature": "तापक्रम"},
    units: {"cm": "सेन्टिमिटर", "m": "मिटर", "km": "किलोमिटर", "mm": "मिलिमिटर", "hr": "घण्टा", "sec": "सेकेन्ड", "min": "मिनेट", "bytes": "बाइट", "bits": "बिट", "kb": "किलोबाइट", "mb": "मेगाबाइट", "gb": "गिगाबाइट", "sqm": "वर्ग मिटर", "sqcm": "वर्ग सेन्टिमिटर", "l": "लिटर", "ml": "मिलिलिटर", "cum": "घन मिटर", "cucm": "घन सेन्टिमिटर", "kg": "किलोग्राम", "g": "ग्राम", "ton": "टन", "c": "डिग्री सेल्सियस", "f": "डिग्री फरेनहाइट", "k": "केल्भिन"},
  },
  or: {
    ui: {"calculator": "କ୍ୟାଲକୁଲେଟର", "converter": "କନଭର୍ଟର", "history": "ଇତିହାସ", "clear": "କ୍ଲିୟର", "tapAgain": "ପୁଣି ଟ୍ୟାପ୍ କରନ୍ତୁ", "close": "ବନ୍ଦ କରନ୍ତୁ", "empty": "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ହିସାବ ହୋଇନାହିଁ।", "copy": "କପି", "paste": "ପେଷ୍ଟ", "language": "ଭାଷା"},
    categories: {"Length": "ଲମ୍ବ", "Time": "ସମୟ", "Data": "ଡାଟା", "Area": "କ୍ଷେତ୍ରଫଳ", "Volume": "ଆୟତନ", "Mass": "ଭର", "Temperature": "ତାପମାତ୍ରା"},
    units: {"cm": "ସେଣ୍ଟିମିଟର", "m": "ମିଟର", "km": "କିଲୋମିଟର", "mm": "ମିଲିମିଟର", "hr": "ଘଣ୍ଟା", "sec": "ସେକେଣ୍ଡ", "min": "ମିନିଟ୍", "bytes": "ବାଇଟ୍", "bits": "ବିଟ୍", "kb": "କିଲୋବାଇଟ୍", "mb": "ମେଗାବାଇଟ୍", "gb": "ଗିଗାବାଇଟ୍", "sqm": "ବର୍ଗ ମିଟର", "sqcm": "ବର୍ଗ ସେଣ୍ଟିମିଟର", "l": "ଲିଟର", "ml": "ମିଲିଲିଟର", "cum": "ଘନ ମିଟର", "cucm": "ଘନ ସେଣ୍ଟିମିଟର", "kg": "କିଲୋଗ୍ରାମ", "g": "ଗ୍ରାମ୍", "ton": "ଟନ୍", "c": "ଡିଗ୍ରୀ ସେଲସିୟସ୍", "f": "ଡିଗ୍ରୀ ଫାରେନହାଇଟ୍", "k": "କେଲଭିନ୍"},
  },
  pa: {
    ui: {"calculator": "ਕੈਲਕੁਲੇਟਰ", "converter": "ਕਨਵਰਟਰ", "history": "ਇਤਿਹਾਸ", "clear": "ਸਾਫ਼ ਕਰੋ", "tapAgain": "ਦੁਬਾਰਾ ਟੈਪ ਕਰੋ", "close": "ਬੰਦ ਕਰੋ", "empty": "ਅਜੇ ਕੋਈ ਹਿਸਾਬ ਨਹੀਂ ਹੋਇਆ।", "copy": "ਕਾਪੀ", "paste": "ਪੇਸਟ", "language": "ਭਾਸ਼ਾ"},
    categories: {"Length": "ਲੰਬਾਈ", "Time": "ਸਮਾਂ", "Data": "ਡਾਟਾ", "Area": "ਖੇਤਰਫਲ", "Volume": "ਆਇਤਨ", "Mass": "ਭਾਰ", "Temperature": "ਤਾਪਮਾਨ"},
    units: {"cm": "ਸੈਂਟੀਮੀਟਰ", "m": "ਮੀਟਰ", "km": "ਕਿਲੋਮੀਟਰ", "mm": "ਮਿਲੀਮੀਟਰ", "hr": "ਘੰਟਾ", "sec": "ਸਕਿੰਟ", "min": "ਮਿੰਟ", "bytes": "ਬਾਈਟ", "bits": "ਬਿੱਟ", "kb": "ਕਿਲੋਬਾਈਟ", "mb": "ਮੈਗਾਬਾਈਟ", "gb": "ਗੀਗਾਬਾਈਟ", "sqm": "ਵਰਗ ਮੀਟਰ", "sqcm": "ਵਰਗ ਸੈਂਟੀਮੀਟਰ", "l": "ਲੀਟਰ", "ml": "ਮਿਲੀਲੀਟਰ", "cum": "ਘਣ ਮੀਟਰ", "cucm": "ਘਣ ਸੈਂਟੀਮੀਟਰ", "kg": "ਕਿਲੋਗ੍ਰਾਮ", "g": "ਗ੍ਰਾਮ", "ton": "ਟਨ", "c": "ਡਿਗਰੀ ਸੈਲਸੀਅਸ", "f": "ਡਿਗਰੀ ਫਾਰਨਹੀਟ", "k": "ਕੈਲਵਿਨ"},
  },
  sa: {
    ui: {"calculator": "गणकयन्त्रम्", "converter": "परिवर्तकम्", "history": "इतिहासः", "clear": "शोधय", "tapAgain": "पुनः स्पृश", "close": "पिदधातु", "empty": "अद्यापि गणना नास्ति।", "copy": "नकलम्", "paste": "लेपनम्", "language": "भाषा"},
    categories: {"Length": "दीर्घता", "Time": "समयः", "Data": "दत्तांशः", "Area": "क्षेत्रफलं", "Volume": "आयतनम्", "Mass": "द्रव्यमानम्", "Temperature": "तापमानम्"},
    units: {"cm": "सेन्टीमीटर्", "m": "मीटर्", "km": "किलोमीटर्", "mm": "मिलीमीटर्", "hr": "होरा", "sec": "सेकण्ड्", "min": "निमेषः", "bytes": "बाइट्", "bits": "बिट्", "kb": "किलोबाइट्", "mb": "मेगाबाइट्", "gb": "गीगाबाइट्", "sqm": "वर्गमीटर्", "sqcm": "वर्गसेन्टीमीटर्", "l": "लिटर", "ml": "मिलीलिटर", "cum": "घनमीटर्", "cucm": "घनसेन्टीमीटर्", "kg": "किलोग्राम्", "g": "ग्राम्", "ton": "टन्", "c": "डिग्री सेल्शियस्", "f": "डिग्री फेरेन्हीट्", "k": "केल्विनम्"},
  },
  ta: {
    ui: {"calculator": "கால்குலேட்டர்", "converter": "கன்வெர்ட்டர்", "history": "வரலாறு", "clear": "தெளிவுபடுத்து", "tapAgain": "மீண்டும் தட்டு", "close": "மூடு", "empty": "இன்னும் கணக்கீடுகள் இல்லை.", "copy": "காப்பி", "paste": "பேஸ்ட்", "language": "மொழி"},
    categories: {"Length": "நீளம்", "Time": "நேரம்", "Data": "தரவு", "Area": "பரப்பளவு", "Volume": "கனஅளவு", "Mass": "நிறை", "Temperature": "வெப்பநிலை"},
    units: {"cm": "சென்டிமீட்டர்", "m": "மீட்டர்", "km": "கிலோமீட்டர்", "mm": "மில்லிமீட்டர்", "hr": "மணி", "sec": "வினாடி", "min": "நிமிடம்", "bytes": "பைட்", "bits": "பிட்", "kb": "கிலோபைட்", "mb": "மெகாபைட்", "gb": "கிகாபைட்", "sqm": "சதுர மீட்டர்", "sqcm": "சதுர சென்டிமீட்டர்", "l": "லிட்டர்", "ml": "மில்லிலிட்டர்", "cum": "கன மீட்டர்", "cucm": "கன சென்டிமீட்டர்", "kg": "கிலோகிராம்", "g": "கிராம்", "ton": "டன்", "c": "டிகிரி செல்சியஸ்", "f": "டிகிரி ஃபாரன்ஹீட்", "k": "கெல்வின்"},
  },
  te: {
    ui: {"calculator": "క్యాలిక్యులేటర్", "converter": "కన్వర్టర్", "history": "చరిత్ర", "clear": "క్లియర్", "tapAgain": "మళ్లీ నొక్కండి", "close": "మూసివేయండి", "empty": "ఇంకా లెక్కలు లేవు.", "copy": "కాపీ", "paste": "పేస్ట్", "language": "భాష"},
    categories: {"Length": "పొడవు", "Time": "సమయం", "Data": "డేటా", "Area": "వైశాల్యం", "Volume": "ఘనపరిమాణం", "Mass": "ద్రవ్యరాశి", "Temperature": "ఉష్ణోగ్రత"},
    units: {"cm": "సెంటీమీటర్", "m": "మీటర్", "km": "కిలోమీటర్", "mm": "మిల్లీమీటర్", "hr": "గంట", "sec": "సెకను", "min": "నిమిషం", "bytes": "బైట్", "bits": "బిట్", "kb": "కిలోబైట్", "mb": "మెగాబైట్", "gb": "గిగాబైట్", "sqm": "చదరపు మీటర్", "sqcm": "చదరపు సెంటీమీటర్", "l": "లీటర్", "ml": "మిల్లీలీటర్", "cum": "ఘన మీటర్", "cucm": "ఘన సెంటీమీటర్", "kg": "కిలోగ్రాము", "g": "గ్రాము", "ton": "టన్ను", "c": "డిగ్రీ సెల్సియస్", "f": "డిగ్రీ ఫారెన్‌హీట్", "k": "కెల్విన్"},
  },
};

const I18N_ASCII = "0123456789";

function i18nLang(code) {
  return I18N_LANGS.find((entry) => entry.code === code) || I18N_LANGS[0];
}

function i18nStrings(code) {
  return I18N[code] || I18N.en;
}

function i18nUi(code, key) {
  const strings = i18nStrings(code).ui;
  return strings[key] || I18N.en.ui[key] || key;
}

function i18nCategory(code, englishName) {
  const categories = i18nStrings(code).categories;
  return categories[englishName] || englishName;
}

function i18nUnit(code, unitKey) {
  const units = i18nStrings(code).units;
  return units[unitKey] || I18N.en.units[unitKey] || unitKey;
}

/** "cm → m" becomes e.g. "सेंटीमीटर → मीटर". */
function i18nConversionLabel(code, id) {
  const parts = String(id).split("_");
  if (parts.length !== 2) return id;
  return `${i18nUnit(code, parts[0])} \u2192 ${i18nUnit(code, parts[1])}`;
}

/** ASCII digits -> the language's own digits. */
function localiseDigits(text, code) {
  const digits = i18nLang(code).digits;
  if (!digits || digits === I18N_ASCII) return text;
  return String(text).replace(/[0-9]/g, (d) => digits[Number(d)]);
}

/** The language's own digits -> ASCII, so pasted text is parseable. */
function asciiDigits(text, code) {
  const digits = i18nLang(code).digits;
  if (!digits || digits === I18N_ASCII) return text;
  let out = String(text);
  for (let i = 0; i < 10; i += 1) {
    out = out.split(digits[i]).join(String(i));
  }
  return out;
}
