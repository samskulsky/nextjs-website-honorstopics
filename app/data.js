// data.js

export const quizMetadata = {
  title: "Discover Your Inner Personality",
  description:
    "Dive deeper into understanding yourself by answering these 25 questions. Your answers will reveal fascinating insights about your personality.",
};

export const questions = [
  {
    id: 1,
    text: "How do you handle stress?",
    options: [
      { text: "I avoid it at all costs.", score: 1 },
      { text: "I handle it head-on.", score: 3 },
      { text: "I take a moment to breathe and then decide.", score: 2 },
    ],
  },
  {
    id: 2,
    text: "Which activity sounds most appealing?",
    options: [
      { text: "Reading a book.", score: 1 },
      { text: "Going for a run.", score: 3 },
      { text: "Watching a movie.", score: 2 },
    ],
  },
  {
    id: 3,
    text: "How do you approach decision-making?",
    options: [
      { text: "I go with my gut feeling.", score: 3 },
      { text: "I weigh the pros and cons carefully.", score: 2 },
      { text: "I often ask for advice from others.", score: 1 },
    ],
  },
  {
    id: 4,
    text: "What's your favorite way to spend a weekend?",
    options: [
      { text: "Exploring a new city.", score: 3 },
      { text: "Relaxing at home with a good book.", score: 1 },
      { text: "Hanging out with friends and trying new activities.", score: 2 },
    ],
  },
  {
    id: 5,
    text: "How do you handle criticism?",
    options: [
      { text: "I take it personally and get upset.", score: 1 },
      { text: "I appreciate feedback and use it to improve.", score: 3 },
      { text: "I consider it, but it doesn't affect me much.", score: 2 },
    ],
  },
  {
    id: 6,
    text: "What type of movies do you enjoy the most?",
    options: [
      { text: "Action and adventure.", score: 3 },
      { text: "Drama and romance.", score: 1 },
      { text: "Comedy and lighthearted films.", score: 2 },
    ],
  },
  {
    id: 7,
    text: "How do you handle unexpected changes in your plans?",
    options: [
      { text: "I get frustrated and resist the change.", score: 1 },
      { text: "I adapt and find a new solution.", score: 3 },
      { text: "I take a moment to evaluate the situation.", score: 2 },
    ],
  },
  {
    id: 8,
    text: "What motivates you in your career or studies?",
    options: [
      { text: "Financial success and stability.", score: 1 },
      { text: "A sense of purpose and passion for the work.", score: 3 },
      { text: "Recognition and praise from others.", score: 2 },
    ],
  },
  {
    id: 9,
    text: "How do you handle conflicts in your relationships?",
    options: [
      {
        text: "I avoid confrontations and hope they resolve on their own.",
        score: 1,
      },
      {
        text: "I address the issues directly and try to find a solution.",
        score: 3,
      },
      {
        text: "I seek advice from friends or family before taking action.",
        score: 2,
      },
    ],
  },
  {
    id: 10,
    text: "What's your preferred mode of communication?",
    options: [
      { text: "Texting or messaging.", score: 2 },
      { text: "Face-to-face conversations.", score: 3 },
      { text: "Email or written communication.", score: 1 },
    ],
  },
  {
    id: 11,
    text: "How do you handle setbacks and failures?",
    options: [
      { text: "I see them as opportunities to learn and grow.", score: 3 },
      { text: "I feel discouraged and may give up easily.", score: 1 },
      { text: "I analyze what went wrong and try again.", score: 2 },
    ],
  },
  {
    id: 12,
    text: "What's your approach to making new friends?",
    options: [
      { text: "I'm open and outgoing, making friends easily.", score: 3 },
      { text: "I'm selective and take time to build trust.", score: 2 },
      { text: "I prefer to keep a small circle of close friends.", score: 1 },
    ],
  },
  {
    id: 13,
    text: "How do you spend your free time?",
    options: [
      { text: "Pursuing hobbies and interests.", score: 3 },
      { text: "Relaxing and recharging at home.", score: 1 },
      { text: "Socializing and going out with friends.", score: 2 },
    ],
  },
  {
    id: 14,
    text: "What's your approach to setting goals?",
    options: [
      { text: "I set ambitious, long-term goals.", score: 3 },
      { text: "I focus on short-term goals that are achievable.", score: 2 },
      { text: "I don't set specific goals; I go with the flow.", score: 1 },
    ],
  },
  {
    id: 15,
    text: "How do you handle a busy schedule?",
    options: [
      { text: "I thrive on being busy and productive.", score: 3 },
      {
        text: "I prioritize and organize my tasks to manage the workload.",
        score: 2,
      },
      { text: "I get overwhelmed and stressed out.", score: 1 },
    ],
  },
  {
    id: 16,
    text: "What's your attitude towards risk-taking?",
    options: [
      { text: "I prefer to play it safe and avoid risks.", score: 1 },
      {
        text: "I'm willing to take calculated risks for potential rewards.",
        score: 3,
      },
      { text: "I enjoy taking risks and seeking adventure.", score: 2 },
    ],
  },
  {
    id: 17,
    text: "How do you react to unexpected compliments?",
    options: [
      { text: "I feel awkward and don't know how to respond.", score: 1 },
      { text: "I graciously accept the compliment.", score: 3 },
      { text: "I downplay it and don't take it too seriously.", score: 2 },
    ],
  },
  {
    id: 18,
    text: "What's your approach to fitness and exercise?",
    options: [
      { text: "I have a regular exercise routine and stick to it.", score: 3 },
      { text: "I exercise occasionally when I feel like it.", score: 2 },
      { text: "I don't prioritize exercise in my life.", score: 1 },
    ],
  },
  {
    id: 19,
    text: "How do you handle time management?",
    options: [
      { text: "I struggle to manage my time effectively.", score: 1 },
      { text: "I use tools and strategies to stay organized.", score: 3 },
      {
        text: "I go with the flow and don't worry too much about schedules.",
        score: 2,
      },
    ],
  },
  {
    id: 20,
    text: "What's your approach to personal growth and self-improvement?",
    options: [
      { text: "I actively seek opportunities for self-improvement.", score: 3 },
      {
        text: "I believe in personal growth but don't actively pursue it.",
        score: 2,
      },
      {
        text: "I'm content with who I am and don't feel the need to change.",
        score: 1,
      },
    ],
  },
  {
    id: 21,
    text: "How do you respond to unexpected challenges?",
    options: [
      { text: "I get stressed and anxious.", score: 1 },
      { text: "I see them as opportunities to learn and grow.", score: 3 },
      { text: "I stay calm and find practical solutions.", score: 2 },
    ],
  },
  {
    id: 22,
    text: "What's your approach to technology and gadgets?",
    options: [
      { text: "I love trying out the latest tech gadgets.", score: 2 },
      {
        text: "I use technology when necessary but prefer a simpler lifestyle.",
        score: 1,
      },
      {
        text: "I'm comfortable with technology but don't obsess over it.",
        score: 3,
      },
    ],
  },
  {
    id: 23,
    text: "How do you handle social gatherings and parties?",
    options: [
      { text: "I enjoy socializing and attending events.", score: 3 },
      {
        text: "I attend occasionally but prefer smaller gatherings.",
        score: 2,
      },
      { text: "I avoid large gatherings and prefer solitude.", score: 1 },
    ],
  },
  {
    id: 24,
    text: "What's your approach to handling money and finances?",
    options: [
      { text: "I'm frugal and budget carefully.", score: 1 },
      {
        text: "I'm financially responsible and invest for the future.",
        score: 3,
      },
      {
        text: "I enjoy spending money and don't worry too much about saving.",
        score: 2,
      },
    ],
  },
  {
    id: 25,
    text: "How do you approach new challenges?",
    options: [
      { text: "I prefer staying in my comfort zone.", score: 1 },
      { text: "I jump right in without hesitation.", score: 3 },
      { text: "I plan and then decide if I should take it up.", score: 2 },
    ],
  },
];

export const getPersonality = (score) => {
  if (score <= 25) return "Calm & Reflective";
  if (score <= 50) return "Balanced & Adaptable";
  return "Bold & Adventurous";
};
