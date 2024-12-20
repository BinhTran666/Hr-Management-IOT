import { GoogleGenerativeAI } from "@google/generative-ai";

// Set your Gemini API Key
const API_KEY = "AIzaSyBwJ6U1MCJ6F7rfy8ZQ4xKZdRY5kPZXMpk";

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(API_KEY);

// Function to generate a response
export const chatbot = async (req, res) => {
  try {
    // Choose the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const { prompt } = req.body; // Extract combined prompt

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const geminiText = response.text();

    res.status(200).json({ text: geminiText });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to get response from Gemini." });
  }
};

// JSON data in string format
const jsonData = `
[
  {
    "email": "ashley.lee@test.com",
    "password": "password227",
    "name": "Ashley Lee",
    "gender": "Female",
    "role": "Quality Control"
  },
  {
    "email": "sarah.lee@test.com",
    "password": "password397",
    "name": "Sarah Lee",
    "gender": "Female",
    "role": "Designer"
  },
  {
    "email": "john.thomas@test.com",
    "password": "password385",
    "name": "John Thomas",
    "gender": "Male",
    "role": "Tester"
  },
  {
    "email": "jane.walker@example.com",
    "password": "password886",
    "name": "Jane Walker",
    "gender": "Female",
    "role": "Designer"
  },
  {
    "email": "ryan.king@demo.com",
    "password": "password865",
    "name": "Ryan King",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "michael.lewis@example.com",
    "password": "password693",
    "name": "Michael Lewis",
    "gender": "Male",
    "role": "Designer"
  },
  {
    "email": "isabella.lewis@example.com",
    "password": "password339",
    "name": "Isabella Lewis",
    "gender": "Female",
    "role": "Quality Control"
  },
  {
    "email": "john.martinez@test.com",
    "password": "password899",
    "name": "John Martinez",
    "gender": "Male",
    "role": "Intern"
  },
  {
    "email": "james.king@mail.com",
    "password": "password624",
    "name": "James King",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "isabella.anderson@mail.com",
    "password": "password502",
    "name": "Isabella Anderson",
    "gender": "Female",
    "role": "Tester"
  },
  {
    "email": "william.martinez@example.com",
    "password": "password284",
    "name": "William Martinez",
    "gender": "Male",
    "role": "Engineer"
  },
  {
    "email": "sarah.lewis@test.com",
    "password": "password669",
    "name": "Sarah Lewis",
    "gender": "Female",
    "role": "Tester"
  },
  {
    "email": "mia.white@demo.com",
    "password": "password998",
    "name": "Mia White",
    "gender": "Female",
    "role": "Quality Control"
  },
  {
    "email": "michael.young@mail.com",
    "password": "password110",
    "name": "Michael Young",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "john.martinez@test.com",
    "password": "password949",
    "name": "John Martinez",
    "gender": "Male",
    "role": "Designer"
  },
  {
    "email": "michael.wilson@demo.com",
    "password": "password942",
    "name": "Michael Wilson",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "ethan.harris@test.com",
    "password": "password215",
    "name": "Ethan Harris",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "sarah.lee@demo.com",
    "password": "password889",
    "name": "Sarah Lee",
    "gender": "Female",
    "role": "Fresher"
  },
  {
    "email": "sophia.brown@test.com",
    "password": "password681",
    "name": "Sophia Brown",
    "gender": "Female",
    "role": "Fresher"
  },
  {
    "email": "ethan.lewis@example.com",
    "password": "password601",
    "name": "Ethan Lewis",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "david.young@demo.com",
    "password": "password481",
    "name": "David Young",
    "gender": "Male",
    "role": "Designer"
  },
  {
    "email": "james.garcia@mail.com",
    "password": "password688",
    "name": "James Garcia",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "ryan.harris@example.com",
    "password": "password437",
    "name": "Ryan Harris",
    "gender": "Male",
    "role": "Engineer"
  },
  {
    "email": "ethan.harris@test.com",
    "password": "password366",
    "name": "Ethan Harris",
    "gender": "Male",
    "role": "Designer"
  },
  {
    "email": "abigail.harris@mail.com",
    "password": "password996",
    "name": "Abigail Harris",
    "gender": "Female",
    "role": "Engineer"
  },
  {
    "email": "sarah.thomas@test.com",
    "password": "password113",
    "name": "Sarah Thomas",
    "gender": "Female",
    "role": "Intern"
  },
  {
    "email": "william.martinez@example.com",
    "password": "password216",
    "name": "William Martinez",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "michael.smith@test.com",
    "password": "password438",
    "name": "Michael Smith",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "william.wilson@demo.com",
    "password": "password193",
    "name": "William Wilson",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "ethan.martinez@example.com",
    "password": "password487",
    "name": "Ethan Martinez",
    "gender": "Male",
    "role": "Engineer"
  },
  {
    "email": "olivia.martinez@example.com",
    "password": "password956",
    "name": "Olivia Martinez",
    "gender": "Female",
    "role": "Designer"
  },
  {
    "email": "michael.thomas@test.com",
    "password": "password882",
    "name": "Michael Thomas",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "ryan.anderson@test.com",
    "password": "password508",
    "name": "Ryan Anderson",
    "gender": "Male",
    "role": "Engineer"
  },
  {
    "email": "ryan.young@mail.com",
    "password": "password180",
    "name": "Ryan Young",
    "gender": "Male",
    "role": "Tester"
  },
  {
    "email": "james.young@test.com",
    "password": "password142",
    "name": "James Young",
    "gender": "Male",
    "role": "Intern"
  },
  {
    "email": "olivia.jackson@test.com",
    "password": "password390",
    "name": "Olivia Jackson",
    "gender": "Female",
    "role": "Designer"
  },
  {
    "email": "matthew.brown@demo.com",
    "password": "password222",
    "name": "Matthew Brown",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "olivia.thomas@example.com",
    "password": "password711",
    "name": "Olivia Thomas",
    "gender": "Female",
    "role": "Engineer"
  },
  {
    "email": "alexander.walker@test.com",
    "password": "password648",
    "name": "Alexander Walker",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "abigail.jones@example.com",
    "password": "password763",
    "name": "Abigail Jones",
    "gender": "Female",
    "role": "Tester"
  },
  {
    "email": "james.king@example.com",
    "password": "password533",
    "name": "James King",
    "gender": "Male",
    "role": "Intern"
  },
  {
    "email": "jane.young@mail.com",
    "password": "password781",
    "name": "Jane Young",
    "gender": "Female",
    "role": "Intern"
  },
  {
    "email": "kevin.brown@example.com",
    "password": "password577",
    "name": "Kevin Brown",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "jessica.thomas@example.com",
    "password": "password648",
    "name": "Jessica Thomas",
    "gender": "Female",
    "role": "Quality Control"
  },
  {
    "email": "ashley.jackson@demo.com",
    "password": "password916",
    "name": "Ashley Jackson",
    "gender": "Female",
    "role": "Quality Control"
  },
  {
    "email": "abigail.smith@example.com",
    "password": "password743",
    "name": "Abigail Smith",
    "gender": "Female",
    "role": "Tester"
  },
  {
    "email": "john.thomas@example.com",
    "password": "password569",
    "name": "John Thomas",
    "gender": "Male",
    "role": "Intern"
  },
  {
    "email": "james.brown@mail.com",
    "password": "password605",
    "name": "James Brown",
    "gender": "Male",
    "role": "Engineer"
  },
  {
    "email": "alexander.wilson@test.com",
    "password": "password955",
    "name": "Alexander Wilson",
    "gender": "Male",
    "role": "Designer"
  },
  {
    "email": "john.doe@demo.com",
    "password": "password360",
    "name": "John Doe",
    "gender": "Male",
    "role": "Designer"
  },
  {
    "email": "michael.walker@demo.com",
    "password": "password788",
    "name": "Michael Walker",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "william.smith@demo.com",
    "password": "password130",
    "name": "William Smith",
    "gender": "Male",
    "role": "Designer"
  },
  {
    "email": "john.jones@mail.com",
    "password": "password418",
    "name": "John Jones",
    "gender": "Male",
    "role": "Tester"
  },
  {
    "email": "jessica.martinez@test.com",
    "password": "password372",
    "name": "Jessica Martinez",
    "gender": "Female",
    "role": "Intern"
  },
  {
    "email": "mia.lewis@demo.com",
    "password": "password371",
    "name": "Mia Lewis",
    "gender": "Female",
    "role": "Designer"
  },
  {
    "email": "mia.harris@example.com",
    "password": "password488",
    "name": "Mia Harris",
    "gender": "Female",
    "role": "Tester"
  },
  {
    "email": "abigail.smith@demo.com",
    "password": "password568",
    "name": "Abigail Smith",
    "gender": "Female",
    "role": "Intern"
  },
  {
    "email": "david.harris@test.com",
    "password": "password839",
    "name": "David Harris",
    "gender": "Male",
    "role": "Intern"
  },
  {
    "email": "michael.lee@demo.com",
    "password": "password343",
    "name": "Michael Lee",
    "gender": "Male",
    "role": "Designer"
  },
  {
    "email": "jane.harris@mail.com",
    "password": "password999",
    "name": "Jane Harris",
    "gender": "Female",
    "role": "Tester"
  },
  {
    "email": "matthew.anderson@example.com",
    "password": "password975",
    "name": "Matthew Anderson",
    "gender": "Male",
    "role": "Tester"
  },
  {
    "email": "michael.doe@example.com",
    "password": "password782",
    "name": "Michael Doe",
    "gender": "Male",
    "role": "Engineer"
  },
  {
    "email": "abigail.jackson@example.com",
    "password": "password684",
    "name": "Abigail Jackson",
    "gender": "Female",
    "role": "Tester"
  },
  {
    "email": "alexander.king@test.com",
    "password": "password809",
    "name": "Alexander King",
    "gender": "Male",
    "role": "Intern"
  },
  {
    "email": "ryan.white@example.com",
    "password": "password721",
    "name": "Ryan White",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "john.lee@demo.com",
    "password": "password375",
    "name": "John Lee",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "jessica.king@mail.com",
    "password": "password813",
    "name": "Jessica King",
    "gender": "Female",
    "role": "Designer"
  },
  {
    "email": "alexander.smith@mail.com",
    "password": "password352",
    "name": "Alexander Smith",
    "gender": "Male",
    "role": "Tester"
  },
  {
    "email": "matthew.lee@demo.com",
    "password": "password146",
    "name": "Matthew Lee",
    "gender": "Male",
    "role": "Engineer"
  },
  {
    "email": "isabella.doe@test.com",
    "password": "password674",
    "name": "Isabella Doe",
    "gender": "Female",
    "role": "Quality Control"
  },
  {
    "email": "emily.lee@test.com",
    "password": "password661",
    "name": "Emily Lee",
    "gender": "Female",
    "role": "Fresher"
  },
  {
    "email": "mia.wilson@demo.com",
    "password": "password993",
    "name": "Mia Wilson",
    "gender": "Female",
    "role": "Fresher"
  },
  {
    "email": "william.walker@example.com",
    "password": "password890",
    "name": "William Walker",
    "gender": "Male",
    "role": "Designer"
  },
  {
    "email": "kevin.thomas@test.com",
    "password": "password572",
    "name": "Kevin Thomas",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "isabella.brown@example.com",
    "password": "password191",
    "name": "Isabella Brown",
    "gender": "Female",
    "role": "Quality Control"
  },
  {
    "email": "jane.young@example.com",
    "password": "password635",
    "name": "Jane Young",
    "gender": "Female",
    "role": "Quality Control"
  },
  {
    "email": "william.young@mail.com",
    "password": "password390",
    "name": "William Young",
    "gender": "Male",
    "role": "Designer"
  },
  {
    "email": "kevin.brown@demo.com",
    "password": "password257",
    "name": "Kevin Brown",
    "gender": "Male",
    "role": "Intern"
  },
  {
    "email": "michael.garcia@mail.com",
    "password": "password266",
    "name": "Michael Garcia",
    "gender": "Male",
    "role": "Engineer"
  },
  {
    "email": "alexander.harris@example.com",
    "password": "password428",
    "name": "Alexander Harris",
    "gender": "Male",
    "role": "Engineer"
  },
  {
    "email": "william.martinez@example.com",
    "password": "password732",
    "name": "William Martinez",
    "gender": "Male",
    "role": "Tester"
  },
  {
    "email": "ashley.garcia@example.com",
    "password": "password314",
    "name": "Ashley Garcia",
    "gender": "Female",
    "role": "Quality Control"
  },
  {
    "email": "sarah.lewis@mail.com",
    "password": "password437",
    "name": "Sarah Lewis",
    "gender": "Female",
    "role": "Quality Control"
  },
  {
    "email": "william.white@demo.com",
    "password": "password272",
    "name": "William White",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "ashley.jones@test.com",
    "password": "password170",
    "name": "Ashley Jones",
    "gender": "Female",
    "role": "Engineer"
  },
  {
    "email": "abigail.anderson@test.com",
    "password": "password728",
    "name": "Abigail Anderson",
    "gender": "Female",
    "role": "Fresher"
  },
  {
    "email": "olivia.brown@demo.com",
    "password": "password885",
    "name": "Olivia Brown",
    "gender": "Female",
    "role": "Tester"
  },
  {
    "email": "olivia.lee@test.com",
    "password": "password865",
    "name": "Olivia Lee",
    "gender": "Female",
    "role": "Intern"
  },
  {
    "email": "emily.martinez@example.com",
    "password": "password783",
    "name": "Emily Martinez",
    "gender": "Female",
    "role": "Designer"
  },
  {
    "email": "jane.white@mail.com",
    "password": "password579",
    "name": "Jane White",
    "gender": "Female",
    "role": "Tester"
  },
  {
    "email": "william.doe@example.com",
    "password": "password862",
    "name": "William Doe",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "isabella.king@demo.com",
    "password": "password914",
    "name": "Isabella King",
    "gender": "Female",
    "role": "Designer"
  },
  {
    "email": "ashley.jackson@test.com",
    "password": "password602",
    "name": "Ashley Jackson",
    "gender": "Female",
    "role": "Engineer"
  },
  {
    "email": "kevin.harris@mail.com",
    "password": "password201",
    "name": "Kevin Harris",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "alexander.jones@demo.com",
    "password": "password393",
    "name": "Alexander Jones",
    "gender": "Male",
    "role": "Fresher"
  },
  {
    "email": "michael.thomas@example.com",
    "password": "password752",
    "name": "Michael Thomas",
    "gender": "Male",
    "role": "Engineer"
  },
  {
    "email": "ethan.smith@example.com",
    "password": "password774",
    "name": "Ethan Smith",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "james.smith@example.com",
    "password": "password506",
    "name": "James Smith",
    "gender": "Male",
    "role": "Quality Control"
  },
  {
    "email": "alexander.martinez@demo.com",
    "password": "password678",
    "name": "Alexander Martinez",
    "gender": "Male",
    "role": "Tester"
  },
  {
    "email": "abigail.jackson@test.com",
    "password": "password579",
    "name": "Abigail Jackson",
    "gender": "Female",
    "role": "Engineer"
  }
]
`;

// const userPrompt = `Here is the user data: ${jsonData}. How many users? and how many female are there? List the  name of female`;
// chatWithGemini(userPrompt);
