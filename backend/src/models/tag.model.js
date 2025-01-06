import mongoose from "mongoose";
const tagsSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});
/*  
  // For Computer Science
const csTags = new Tag({
  stream: 'Computer Science',
  tags: ["System Design",
  "App Development",
  "Binary Search Tree",
  "DSA",
  "Web Development",
  "DevOps",
  "Artificial Intelligence",
  "React",
  "Machine Learning",
  "Data Science",
  "Semester Exams",
  "Cloud Computing",
  "Full Stack",
  "Frontend ",
  "Backend ",
  "Networking",
  "Cybersecurity",
  "Blockchain",
  "Game Development"],
});
await csTags.save();

// For Electronics
const electronicsTags = new Tag({
  stream: 'Electrical, Electronics & Communication',
  tags: ["Embedded Systems", "Signal Processing", "VLSI Design", "Microcontrollers", "Communication Systems", "Power Electronics"],
});
await electronicsTags.save();

const mechTags = new Tag({
  stream: 'Mechanical Engineering',
  tags: [ "Thermodynamics", "Fluid Mechanics", "CAD/CAM", "Manufacturing Processes", "Mechatronics", "Automotive Engineering", "HVAC Systems"]
});
await mechTags.save();

const civilTags = new Tag({
  stream: 'Civil Engineering, Construction & Technology Management',
  tags: ["Structural Engineering", "Transportation Engineering", "Geotechnical Engineering", "Environmental Engineering", "Construction Management", "Surveying & Geomatics", "Concrete Technology", "Urban Planning"]

});
await civilTags.save();

const bioTags = new Tag({
  stream: 'Biotechnology',
  tags: ["Genetic Engineering", "Molecular Biology", "Biomedical Engineering", "Bioprocess Engineering", "Bioinformatics", "Immunotechnology", "Fermentation Technology", "Microbial Biotechnology", "Agricultural Biotechnology"]
});
await bioTags.save();

const envTags = new Tag({
  stream: 'Environmental Engineering',
  tags:["Water Treatment Technology", "Wastewater Management", "Air Pollution Control", "Renewable Energy Systems", "Sustainable Design", "Solid Waste Management", "Environmental Impact Assessment", "Green Building Technologies"]
});
await envTags.save();

const busTags = new Tag({
  stream: 'Business',
  tags:["Marketing Strategies", "Financial Analysis", "Business Analytics", "Entrepreneurship", "Human Resource Management", "Supply Chain Management", "Operations Research", "Business Law & Ethics"]
});
await busTags.save();

const Tag = mongoose.model('Tag', tagsSchema);
  */
