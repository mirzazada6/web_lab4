let data = {
  profilePic: "https://i.pinimg.com/originals/04/64/6b/04646bc6ef384e1c564b25df6ef17291.jpg",
  name: "",
  title: "",
  contact: [],
  education: [],
  skills: [],
  languages: [],
  profile: "",
  experience: [],
  references: []
};
const elements = {
  name: document.getElementById("name-input"),
  title: document.getElementById("title-input"),
  phone: document.getElementById("phone-input"),
  email: document.getElementById("email-input"),
  address: document.getElementById("address-input"),
  website: document.getElementById("website-input"),
  profile: document.getElementById("profile-input"),
  profilePic: document.getElementById("profile-pic"),
  contact: document.getElementById("contact"),
  education: document.getElementById("education"),
  skills: document.getElementById("skills"),
  languages: document.getElementById("languages"),
  experience: document.getElementById("experience"),
  references: document.getElementById("references")
};
const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s-]+$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  yearRange: /^\d{4}\s*-\s*\d{4}$/
};

function initResume() {
  const savedData = localStorage.getItem('resumeData');
  if (savedData) {
    data = JSON.parse(savedData);
  }
  elements.profilePic.src = data.profilePic;
  elements.name.value = data.name;
  elements.title.value = data.title;
  elements.phone.value = data.contact[0] || '';
  elements.email.value = data.contact[1] || '';
  elements.address.value = data.contact[2] || '';
  elements.website.value = data.contact[3] || '';
  elements.profile.value = data.profile;

  renderEducation();
  renderSkills();
  renderLanguages();
  renderExperience();
  renderReferences();

  setupValidation();
}

function renderEducation() {
  elements.education.innerHTML = data.education.map((e, index) => `
    <div class="education-item text-small">
      <div class="form-group">
        <input type="text" class="years" value="${e.years}" placeholder="Years (e.g., 2020-2024)" required>
        <span class="error-message"></span>
      </div>
      <div class="form-group">
        <input type="text" class="school" value="${e.school}" placeholder="School/University" required>
        <span class="error-message"></span>
      </div>
      <div class="form-group">
        <input type="text" class="degree" value="${e.degree}" placeholder="Degree" required>
        <span class="error-message"></span>
      </div>
      <div class="form-group">
        <input type="text" class="gpa" value="${e.gpa || ''}" placeholder="GPA (optional)">
        <span class="error-message"></span>
      </div>
      <button class="delete-btn" onclick="deleteEducation(${index})">Delete</button>
    </div>
  `).join('');
}

function renderSkills() {
  elements.skills.innerHTML = data.skills.map((s, index) => `
    <div class="skill-item">
      <input type="text" class="skill-input" value="${s}" required>
      <span class="error-message"></span>
      <button class="delete-btn" onclick="deleteSkill(${index})">Delete</button>
    </div>
  `).join('');
}

function renderLanguages() {
  elements.languages.innerHTML = data.languages.map((l, index) => `
    <div class="language-item text-small">
      <input type="text" class="language-input" value="${l}" required>
      <span class="error-message"></span>
      <button class="delete-btn" onclick="deleteLanguage(${index})">Delete</button>
    </div>
  `).join('');
}

function renderExperience() {
  elements.experience.innerHTML = data.experience.map((exp, index) => `
    <div class="experience-item text-small">
      <div class="form-group">
        <input type="text" class="company" value="${exp.company}" placeholder="Company" required>
        <span class="error-message"></span>
      </div>
      <div class="form-group">
        <input type="text" class="job-title" value="${exp.title}" placeholder="Job Title" required>
        <span class="error-message"></span>
      </div>
      <div class="responsibilities">
        ${exp.responsibilities.map((r, i) => `
          <div class="form-group responsibility">
            <input type="text" value="${r}" placeholder="Responsibility" required>
            <button class="delete-btn" onclick="deleteResponsibility(${index}, ${i})">Delete</button>
          </div>
        `).join('')}
      </div>
      <button onclick="addResponsibility(${index})">Add Responsibility</button>
      <button class="delete-btn" onclick="deleteExperience(${index})">Delete Experience</button>
    </div>
  `).join('');
}

function renderReferences() {
  elements.references.innerHTML = data.references.map((ref, index) => `
    <div class="reference-item text-small">
      <div class="form-group">
        <input type="text" class="ref-name" value="${ref.name}" placeholder="Name" required>
        <span class="error-message"></span>
      </div>
      <div class="form-group">
        <input type="text" class="ref-position" value="${ref.position}" placeholder="Position" required>
        <span class="error-message"></span>
      </div>
      <div class="form-group">
        <input type="tel" class="ref-phone" value="${ref.phone}" placeholder="Phone" required>
        <span class="error-message"></span>
      </div>
      <div class="form-group">
        <input type="email" class="ref-email" value="${ref.email}" placeholder="Email" required>
        <span class="error-message"></span>
      </div>
      <button class="delete-btn" onclick="deleteReference(${index})">Delete</button>
    </div>
  `).join('');
}

function addEducation() {
  data.education.push({
    years: "",
    school: "",
    degree: "",
    gpa: ""
  });
  renderEducation();
}

function deleteEducation(index) {
  data.education.splice(index, 1);
  renderEducation();
}

function addSkill() {
  data.skills.push("");
  renderSkills();
}

function deleteSkill(index) {
  data.skills.splice(index, 1);
  renderSkills();
}

function addLanguage() {
  data.languages.push("");
  renderLanguages();
}

function deleteLanguage(index) {
  data.languages.splice(index, 1);
  renderLanguages();
}

function addExperience() {
  data.experience.push({
    company: "",
    title: "",
    responsibilities: []
  });
  renderExperience();
}

function deleteExperience(index) {
  data.experience.splice(index, 1);
  renderExperience();
}

function addResponsibility(expIndex) {
  data.experience[expIndex].responsibilities.push("");
  renderExperience();
}

function deleteResponsibility(expIndex, respIndex) {
  data.experience[expIndex].responsibilities.splice(respIndex, 1);
  renderExperience();
}

function addReference() {
  data.references.push({
    name: "",
    position: "",
    phone: "",
    email: ""
  });
  renderReferences();
}

function deleteReference(index) {
  data.references.splice(index, 1);
  renderReferences();
}


function toggleSection(header) {
  const dropdown = header.parentElement;
  dropdown.classList.toggle("open");
}

function saveData() {
  if (!validateForm()) {
    alert("Please fix all validation errors before saving.");
    return;
  }

  data.name = elements.name.value;
  data.title = elements.title.value;
  data.contact = [
    elements.phone.value,
    elements.email.value,
    elements.address.value,
    elements.website.value
  ];
  data.profile = elements.profile.value;

  data.education = Array.from(document.querySelectorAll('.education-item')).map(item => ({
    years: item.querySelector('.years').value,
    school: item.querySelector('.school').value,
    degree: item.querySelector('.degree').value,
    gpa: item.querySelector('.gpa').value
  }));

  data.skills = Array.from(document.querySelectorAll('.skill-input')).map(input => input.value);

  data.languages = Array.from(document.querySelectorAll('.language-input')).map(input => input.value);

  data.experience = Array.from(document.querySelectorAll('.experience-item')).map(item => ({
    company: item.querySelector('.company').value,
    title: item.querySelector('.job-title').value,
    responsibilities: Array.from(item.querySelectorAll('.responsibility input')).map(input => input.value)
  }));


  data.references = Array.from(document.querySelectorAll('.reference-item')).map(item => ({
    name: item.querySelector('.ref-name').value,
    position: item.querySelector('.ref-position').value,
    phone: item.querySelector('.ref-phone').value,
    email: item.querySelector('.ref-email').value
  }));

  localStorage.setItem('resumeData', JSON.stringify(data));
  alert("Resume saved successfully!");
}

function resetData() {
  if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
    localStorage.removeItem('resumeData');
    data = {
      profilePic: "https://i.pinimg.com/originals/04/64/6b/04646bc6ef384e1c564b25df6ef17291.jpg",
      name: "",
      title: "",
      contact: [],
      education: [],
      skills: [],
      languages: [],
      profile: "",
      experience: [],
      references: []
    };
    initResume();
  }
}

function validateForm() {
  let isValid = true;

  const requiredFields = [
    elements.name, 
    elements.title, 
    elements.phone, 
    elements.email, 
    elements.address, 
    elements.website, 
    elements.profile
  ];

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      showError(field, "This field is required");
      isValid = false;
    } else if (field.type === 'email' && !validationPatterns.email.test(field.value)) {
      showError(field, "Please enter a valid email address");
      isValid = false;
    } else if (field.type === 'tel' && !validationPatterns.phone.test(field.value)) {
      showError(field, "Please enter a valid phone number");
      isValid = false;
    } else if (field.type === 'url' && !validationPatterns.url.test(field.value)) {
      showError(field, "Please enter a valid website URL");
      isValid = false;
    } else {
      clearError(field);
    }
  });
  document.querySelectorAll('.education-item').forEach((item, index) => {
    const years = item.querySelector('.years');
    const school = item.querySelector('.school');
    const degree = item.querySelector('.degree');

    if (!years.value.trim()) {
      showError(years, "Years are required");
      isValid = false;
    } else if (!validationPatterns.yearRange.test(years.value)) {
      showError(years, "Format: YYYY-YYYY");
      isValid = false;
    } else {
      clearError(years);
    }

    if (!school.value.trim()) {
      showError(school, "School is required");
      isValid = false;
    } else {
      clearError(school);
    }

    if (!degree.value.trim()) {
      showError(degree, "Degree is required");
      isValid = false;
    } else {
      clearError(degree);
    }
  });

  document.querySelectorAll('.skill-input').forEach(skill => {
    if (!skill.value.trim()) {
      showError(skill, "Skill cannot be empty");
      isValid = false;
    } else {
      clearError(skill);
    }
  });

  document.querySelectorAll('.language-input').forEach(lang => {
    if (!lang.value.trim()) {
      showError(lang, "Language cannot be empty");
      isValid = false;
    } else {
      clearError(lang);
    }
  });
  document.querySelectorAll('.experience-item').forEach(exp => {
    const company = exp.querySelector('.company');
    const title = exp.querySelector('.job-title');

    if (!company.value.trim()) {
      showError(company, "Company is required");
      isValid = false;
    } else {
      clearError(company);
    }

    if (!title.value.trim()) {
      showError(title, "Job title is required");
      isValid = false;
    } else {
      clearError(title);
    }
    exp.querySelectorAll('.responsibility input').forEach(resp => {
      if (!resp.value.trim()) {
        showError(resp, "Responsibility cannot be empty");
        isValid = false;
      } else {
        clearError(resp);
      }
    });
  });

  document.querySelectorAll('.reference-item').forEach(ref => {
    const name = ref.querySelector('.ref-name');
    const position = ref.querySelector('.ref-position');
    const phone = ref.querySelector('.ref-phone');
    const email = ref.querySelector('.ref-email');

    if (!name.value.trim()) {
      showError(name, "Name is required");
      isValid = false;
    } else {
      clearError(name);
    }

    if (!position.value.trim()) {
      showError(position, "Position is required");
      isValid = false;
    } else {
      clearError(position);
    }

    if (!phone.value.trim()) {
      showError(phone, "Phone is required");
      isValid = false;
    } else if (!validationPatterns.phone.test(phone.value)) {
      showError(phone, "Please enter a valid phone number");
      isValid = false;
    } else {
      clearError(phone);
    }

    if (!email.value.trim()) {
      showError(email, "Email is required");
      isValid = false;
    } else if (!validationPatterns.email.test(email.value)) {
      showError(email, "Please enter a valid email address");
      isValid = false;
    } else {
      clearError(email);
    }
  });

  return isValid;
}

function showError(field, message) {
  const errorElement = field.nextElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.textContent = message;
    field.classList.add('invalid');
  }
}
function clearError(field) {
  const errorElement = field.nextElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.textContent = '';
    field.classList.remove('invalid');
  }
}

function setupValidation() {
  elements.email.addEventListener('input', () => {
    if (!validationPatterns.email.test(elements.email.value)) {
      showError(elements.email, "Please enter a valid email address");
    } else {
      clearError(elements.email);
    }
  });

  elements.phone.addEventListener('input', () => {
    if (!validationPatterns.phone.test(elements.phone.value)) {
      showError(elements.phone, "Please enter a valid phone number");
    } else {
      clearError(elements.phone);
    }
  });

  elements.website.addEventListener('input', () => {
    if (!validationPatterns.url.test(elements.website.value)) {
      showError(elements.website, "Please enter a valid website URL");
    } else {
      clearError(elements.website);
    }
  });
  document.addEventListener('input', (e) => {
    if (e.target.classList.contains('years')) {
      if (!validationPatterns.yearRange.test(e.target.value)) {
        showError(e.target, "Format: YYYY-YYYY");
      } else {
        clearError(e.target);
      }
    }
  });
}

window.onload = initResume;