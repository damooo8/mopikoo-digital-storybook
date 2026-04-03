import kikoCover from "@/assets/story-kiko-cover.jpg";
import lunaCover from "@/assets/story-luna-cover.jpg";
import timmyCover from "@/assets/story-timmy-cover.jpg";

export interface StoryPage {
  text: string;
  illustrationPrompt: string;
}

export interface Story {
  id: string;
  title: string;
  cover: string;
  category: string;
  ageRange: string;
  description: string;
  author: string;
  pages: StoryPage[];
  readTime: string;
  moral: string;
}

export const stories: Story[] = [
  {
    id: "kiko-brave-cat",
    title: "Kiko the Brave Little Cat",
    cover: kikoCover,
    category: "Adventure",
    ageRange: "3-5",
    description: "A tiny kitten discovers that bravery comes in all sizes.",
    author: "Mopikoo Stories",
    readTime: "5 min",
    moral: "Courage",
    pages: [
      {
        text: "In a cozy little town, there lived a tiny orange kitten named Kiko. Kiko had the softest fur and the biggest eyes you've ever seen!",
        illustrationPrompt: "Tiny orange kitten in a cozy town",
      },
      {
        text: "But Kiko was afraid of everything — the wind, the rain, even his own shadow! \"I'm too small to be brave,\" Kiko would say.",
        illustrationPrompt: "Scared kitten hiding under a blanket",
      },
      {
        text: "One sunny morning, Kiko heard a tiny cry. A little bird had fallen from its nest! \"Help! Help!\" peeped the bird.",
        illustrationPrompt: "Baby bird on the ground near a tree",
      },
      {
        text: "Kiko's heart beat fast. He was scared, but the bird needed help. \"I have to try,\" Kiko whispered to himself.",
        illustrationPrompt: "Kitten looking up at a tall tree nervously",
      },
      {
        text: "Step by step, Kiko climbed the tree. His little paws trembled, but he didn't stop. Higher and higher he went!",
        illustrationPrompt: "Kitten climbing a tree bravely",
      },
      {
        text: "Kiko gently picked up the bird and placed it back in the nest. \"Thank you, brave Kiko!\" chirped the mama bird.",
        illustrationPrompt: "Kitten placing bird in nest, mama bird smiling",
      },
      {
        text: "That night, all the animals cheered for Kiko. He learned that being brave doesn't mean you're not scared — it means you help others even when you are!",
        illustrationPrompt: "Animals celebrating Kiko with a red cape",
      },
    ],
  },
  {
    id: "luna-magic-forest",
    title: "Luna and the Magic Forest",
    cover: lunaCover,
    category: "Adventure",
    ageRange: "6-8",
    description: "A curious girl discovers a forest where everything is alive with magic.",
    author: "Mopikoo Stories",
    readTime: "7 min",
    moral: "Curiosity",
    pages: [
      {
        text: "Luna loved to explore. Every day after school, she would wander to the edge of the old forest near her house.",
        illustrationPrompt: "Girl with curly hair looking at a mysterious forest",
      },
      {
        text: "One day, she noticed something new — a path of glowing flowers leading deep into the trees. \"I wonder where they go!\" Luna said excitedly.",
        illustrationPrompt: "Glowing flower path in a magical forest",
      },
      {
        text: "As she followed the path, the trees began to whisper. \"Welcome, Luna!\" they rustled. The flowers giggled and danced around her feet.",
        illustrationPrompt: "Trees with friendly faces, dancing flowers",
      },
      {
        text: "A friendly fox with silver fur appeared. \"I'm Starlight,\" she said. \"This forest has been waiting for someone curious like you!\"",
        illustrationPrompt: "Silver fox with sparkles talking to Luna",
      },
      {
        text: "Starlight showed Luna a crystal-clear pond that reflected the stars, even in daytime! \"This is the Wishing Pond,\" Starlight explained.",
        illustrationPrompt: "Magical pond reflecting stars during daytime",
      },
      {
        text: "\"What do you wish for, Luna?\" asked Starlight. Luna thought carefully. \"I wish everyone could see how magical the world really is!\"",
        illustrationPrompt: "Luna thinking by the magical pond",
      },
      {
        text: "The pond glowed bright, and suddenly the magic spread beyond the forest. Flowers bloomed everywhere, and everyone could see the wonder all around them.",
        illustrationPrompt: "Magic spreading from forest to the whole town",
      },
      {
        text: "Luna smiled. She learned that the world is full of magic — you just have to be curious enough to find it!",
        illustrationPrompt: "Luna surrounded by magical creatures, smiling",
      },
    ],
  },
  {
    id: "timmy-learns-to-share",
    title: "Timmy Learns to Share",
    cover: timmyCover,
    category: "Moral Stories",
    ageRange: "3-5",
    description: "Timmy discovers that sharing makes everything more fun!",
    author: "Mopikoo Stories",
    readTime: "5 min",
    moral: "Kindness",
    pages: [
      {
        text: "Timmy had the biggest toy collection in the whole neighborhood. He had cars, blocks, robots, and teddy bears — so many toys!",
        illustrationPrompt: "Boy surrounded by mountains of toys",
      },
      {
        text: "But Timmy never let anyone play with his toys. \"These are MINE!\" he would say, holding them tight.",
        illustrationPrompt: "Boy hugging toys protectively, other kids looking sad",
      },
      {
        text: "One day, the other kids were playing together in the park, laughing and having fun. Timmy watched from behind a tree, feeling lonely.",
        illustrationPrompt: "Lonely boy watching other kids play in park",
      },
      {
        text: "\"Why don't you come play with us?\" asked Mia, a kind girl with pigtails. \"But I don't have any toys here,\" Timmy said sadly.",
        illustrationPrompt: "Kind girl inviting lonely boy to play",
      },
      {
        text: "\"That's okay! We share everything!\" Mia said with a big smile. She handed Timmy a ball, and they started playing together.",
        illustrationPrompt: "Kids sharing a ball and playing together",
      },
      {
        text: "Timmy had so much fun! He laughed harder than he ever had playing alone. The next day, Timmy brought his toys to the park.",
        illustrationPrompt: "Happy boy bringing wagon of toys to park",
      },
      {
        text: "\"Would you like to play with my toys?\" Timmy asked everyone. The children cheered! Playing together was ten times more fun!",
        illustrationPrompt: "All kids playing together with shared toys",
      },
      {
        text: "Timmy learned that the best things in life are even better when you share them with friends!",
        illustrationPrompt: "Group of happy kids hugging, toys scattered around",
      },
    ],
  },
];

export const categories = [
  { name: "Bedtime Stories", icon: "🌙", color: "kid-purple" },
  { name: "Moral Stories", icon: "💖", color: "accent" },
  { name: "Adventure", icon: "🗺️", color: "kid-orange" },
  { name: "Islamic Stories", icon: "🕌", color: "kid-green" },
];
