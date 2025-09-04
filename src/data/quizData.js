// src/data/quizData.js

const quizQuestions = {
  easy: [
    {
      _id: '1',
      question: "বাংলাদেশের রাজধানীর নাম কি?",
      answerOptions: [
        { text: "চট্টগ্রাম", isCorrect: false },
        { text: "ঢাকা", isCorrect: true, rationale: "ঢাকা বাংলাদেশের রাজধানী।" },
        { text: "রাজশাহী", isCorrect: false },
        { text: "খুলনা", isCorrect: false }
      ]
    },
    {
      _id: '2',
      question: "সূর্য কোন দিকে ওঠে?",
      answerOptions: [
        { text: "পশ্চিমে", isCorrect: false },
        { text: "দক্ষিণে", isCorrect: false },
        { text: "পূর্বে", isCorrect: true, rationale: "সূর্য পূর্ব দিকে ওঠে।" },
        { text: "উত্তরে", isCorrect: false }
      ]
    }
  ],
  medium: [
    {
      _id: '3',
      question: "বাংলাদেশের জাতীয় সংগীত কে লিখেছেন?",
      answerOptions: [
        { text: "কাজী নজরুল ইসলাম", isCorrect: false },
        { text: "রবীন্দ্রনাথ ঠাকুর", isCorrect: true, rationale: "রবীন্দ্রনাথ ঠাকুর 'আমার সোনার বাংলা' লিখেছেন, যা বাংলাদেশের জাতীয় সংগীত।" },
        { text: "জসীম উদ্দীন", isCorrect: false },
        { text: "জহির রায়হান", isCorrect: false }
      ]
    },
    {
      _id: '4',
      question: "কোন ফল খেলে শরীরে রোগ প্রতিরোধ ক্ষমতা বাড়ে?",
      answerOptions: [
        { text: "পেয়ারা", isCorrect: false },
        { text: "কলা", isCorrect: false },
        { text: "আনারস", isCorrect: false },
        { text: "কমলা লেবু", isCorrect: true, rationale: "কমলা লেবুতে প্রচুর পরিমাণে ভিটামিন সি থাকে, যা রোগ প্রতিরোধ ক্ষমতা বাড়াতে সাহায্য করে।" }
      ]
    }
  ],
  hard: [
    {
      _id: '5',
      question: "বাংলাদেশের কোন জেলায় লাল মাটি পাওয়া যায়?",
      answerOptions: [
        { text: "সিলেট", isCorrect: false },
        { text: "ঢাকা", isCorrect: false },
        { text: "কক্সবাজার", isCorrect: false },
        { text: "কুমিল্লা", isCorrect: true, rationale: "কুমিল্লা জেলায় লাল মাটি পাওয়া যায়।" }
      ]
    },
    {
      _id: '6',
      question: "বঙ্গবন্ধু শেখ মুজিবুর রহমান কবে 'বঙ্গবন্ধু' উপাধি পান?",
      answerOptions: [
        { text: "১৯৬৮", isCorrect: false },
        { text: "১৯৬৯", isCorrect: true, rationale: "১৯৬৯ সালের ২৩শে ফেব্রুয়ারি রেসকোর্স ময়দানে শেখ মুজিবুর রহমানকে 'বঙ্গবন্ধু' উপাধি দেওয়া হয়।" },
        { text: "১৯৭১", isCorrect: false },
        { text: "১৯৭২", isCorrect: false }
      ]
    }
  ]
};

export const fetchQuizQuestions = (difficulty) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(quizQuestions[difficulty] || []);
    }, 500); // Simulate a network delay
  });
};