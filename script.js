// 1. SCROLL ANIMATION LOGIC
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = 1158; // Adjust to your image dimensions
canvas.height = 770;

const frameCount = 240;
const currentFrame = index => (
  `./frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const images = [];
const resumeData = {
    name: "Karunakaran M",
    role: "Mechanical Engineer",
    cgpa: "8.68",
    skills: ["Solidworks", "AutoCAD", "Caesar", "Python"],
    certifications: ["Dassault System Associate (Mechanical Design, Additive Manufacturing, Sustainability)", "NPTEL (Micro Machining, Automation)"],
    internships: "ISRO Mahendragiri (Engines and Testing), CGS Greensustain Energy (Energy Auditing)",
    projects: "Precision enhancement of EMD for machinery fault detection, Real-time monitoring for CNC"
};

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

const img = new Image();
img.src = currentFrame(1);
img.onload = () => {
  context.drawImage(img, 0, 0);
};

const updateImage = index => {
  if(images[index]) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[index], 0, 0);
  }
};

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

const html = document.documentElement;

// 2. CHATBOT LOGIC
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

/**
 * SYSTEM PROMPT:
 * You are a specialized assistant for Karunakaran M. 
 * You only answer questions based on the following Resume data:
 * - Education: National Engineering College (8.68 CGPA), Boo Vijesh School (84.8% & 88.6%).
 * - Skills: Solidworks, AutoCAD, Caesar, Python.
 * - Certifications: Dassault Associate (Mechanical Design, Additive Manufacturing, Sustainability), NPTEL.
 * - Internship: ISRO (Engines, Assembly, Testing), CGS GreenSustain (Energy Auditing).
 * - Projects: Machinery Fault Detection, CNC Monitoring System.
 * If asked something outside this scope, politely say you only provide information about Karunakaran's professional profile.
 */

async function getChatResponse(message) {
    // In a production app, you would fetch(YOUR_API_ENDPOINT) here.
    // Simulating a strict response based on resume:
    const msg = message.toLowerCase();
    if (msg.includes("skill")) return "Karunakaran is proficient in Solidworks, AutoCAD, Caesar, and Python[cite: 26, 27, 28, 29].";
    if (msg.includes("isro")) return "He interned at ISRO Mahendragiri, learning about engine principles, assembly, and testing[cite: 46, 47].";
    if (msg.includes("cgpa") || msg.includes("education")) return "He has an aggregate CGPA of 8.68 from National Engineering College[cite: 36].";
    if (msg.includes("project")) return "Key projects include: Precision Enhancement for Machinery Fault Detection and a Low-cost Monitoring System for CNC machines[cite: 40, 43].";
    
    return "I am strictly programmed to only answer questions regarding Karunakaran's resume details. Please ask about his skills, education, or experience.";
}

sendBtn.addEventListener('click', async () => {
    const text = userInput.value;
    if(!text) return;
    
    appendMessage(text, 'user-msg');
    userInput.value = '';
    
    const response = await getChatResponse(text);
    setTimeout(() => appendMessage(response, 'bot-msg'), 500);
});

function appendMessage(text, className) {
    const div = document.createElement('div');
    div.className = className;
    div.innerText = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}
