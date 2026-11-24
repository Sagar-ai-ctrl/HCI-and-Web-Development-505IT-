/**
 * Community Wellbeing Hub - Core Application Logic
 * Implements accessible interactive components, search, multi-step booking wizard,
 * calendar toggling, and accessibility preferences.
 */

document.addEventListener("DOMContentLoaded", () => {
  initAccessibility();
  initNavigation();
  initServicesFilter();
  initEventsCalendar();
  initBookingWizard();
  initContactForm();
  initFaqAccordion();
});


  //  1. Accessibility Toolbar & Display Modes

function initAccessibility() {
  const contrastBtn = document.getElementById("toggle-contrast");
  const fontDecBtn = document.getElementById("font-decrease");
  const fontIncBtn = document.getElementById("font-increase");
  const fontResetBtn = document.getElementById("font-reset");

  let currentFontSizeLevel = 0; // 0 = normal, 1 = lg, 2 = xl

  if (contrastBtn) {
    contrastBtn.addEventListener("click", () => {
      document.body.classList.toggle("high-contrast");
      const isHighContrast = document.body.classList.contains("high-contrast");
      contrastBtn.setAttribute("aria-pressed", isHighContrast.toString());
      contrastBtn.textContent = isHighContrast ? "Contrast: On" : "High Contrast";
    });
  }

  function applyFontSize() {
    document.body.classList.remove("font-lg", "font-xl");
    if (currentFontSizeLevel === 1) {
      document.body.classList.add("font-lg");
    } else if (currentFontSizeLevel === 2) {
      document.body.classList.add("font-xl");
    }
  }

  if (fontIncBtn) {
    fontIncBtn.addEventListener("click", () => {
      if (currentFontSizeLevel < 2) {
        currentFontSizeLevel++;
        applyFontSize();
      }
    });
  }

  if (fontDecBtn) {
    fontDecBtn.addEventListener("click", () => {
      if (currentFontSizeLevel > 0) {
        currentFontSizeLevel--;
        applyFontSize();
      }
    });
  }

  if (fontResetBtn) {
    fontResetBtn.addEventListener("click", () => {
      currentFontSizeLevel = 0;
      applyFontSize();
    });
  }
}


  //  2. Responsive Navigation

function initNavigation() {
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", isOpen.toString());
    });
  }

  // Smooth active highlight on click
  const links = document.querySelectorAll(".nav-links a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}


  //  3. Service Directory Search & Filtering
  
const servicesData = [
  {
    id: 1,
    title: "NHS Talking Therapies & Counselling",
    category: "mental",
    categoryLabel: "Mental Health",
    badgeClass: "badge-mental",
    desc: "Free one-to-one psychological support and guided cognitive behavioural sessions for anxiety, stress, and mild-to-moderate depression.",
    type: "Appointment required",
    location: "Hub Suite 3 & Online",
    time: "Mon - Fri, 9:00am - 5:00pm",
    age: "Adults (18+)"
  },
  {
    id: 2,
    title: "Gentle Chair Yoga & Mobility Group",
    category: "physical",
    categoryLabel: "Physical Activity",
    badgeClass: "badge-physical",
    desc: "Low-impact seated and supported exercises designed to maintain joint flexibility, balance, and gentle cardiovascular health.",
    type: "Drop-in welcome",
    location: "Main Community Hall",
    time: "Tuesdays & Thursdays, 10:30am",
    age: "Older Adults & All Abilities"
  },
  {
    id: 3,
    title: "Parent & Toddler Play & Learn",
    category: "family",
    categoryLabel: "Family Support",
    badgeClass: "badge-family",
    desc: "A warm and social space for infants and parents to connect, develop social motor skills, and speak to visiting health visitors.",
    type: "Free drop-in",
    location: "Family Activity Lounge",
    time: "Wednesdays, 9:30am - 11:30am",
    age: "Parents with children 0-4"
  },
  {
    id: 4,
    title: "Men's Wellbeing Walk & Talk",
    category: "mental",
    categoryLabel: "Mental Health",
    badgeClass: "badge-mental",
    desc: "A relaxed, informal walking group through local parks providing men a safe environment to chat openly about mental health without pressure.",
    type: "No booking needed",
    location: "Hub Entrance & War Memorial Park",
    time: "Saturdays, 10:00am",
    age: "Men of all ages (16+)"
  },
  {
    id: 5,
    title: "Senior Tea, Chat & Reminiscence Social",
    category: "senior",
    categoryLabel: "Senior Care",
    badgeClass: "badge-senior",
    desc: "Combating loneliness with tea, biscuits, light board games, and supportive conversation led by trained community volunteers.",
    type: "Drop-in welcome",
    location: "Community Cafe Corner",
    time: "Mondays & Fridays, 1:30pm - 3:30pm",
    age: "Seniors (60+)"
  },
  {
    id: 6,
    title: "Citizen Debt & Household Energy Advice",
    category: "financial",
    categoryLabel: "Financial Advice",
    badgeClass: "badge-financial",
    desc: "Independent, confidential assistance with council tax, warm home discount applications, energy budgeting, and benefit checks.",
    type: "Pre-booked slots",
    location: "Advice Room 2",
    time: "Thursdays, 10:00am - 4:00pm",
    age: "All Local Residents"
  },
  {
    id: 7,
    title: "Youth Digital Café & Homework Sanctuary",
    category: "family",
    categoryLabel: "Family Support",
    badgeClass: "badge-family",
    desc: "Quiet study desks, high-speed WiFi, free printing, and volunteer mentors offering study support for secondary school pupils.",
    type: "Drop-in",
    location: "Digital Learning Lab",
    time: "Mon - Thu, 3:30pm - 6:00pm",
    age: "Youth (11-18)"
  },
  {
    id: 8,
    title: "Beginners Digital Skills & Smartphone Help",
    category: "senior",
    categoryLabel: "Senior Care",
    badgeClass: "badge-senior",
    desc: "Patient, step-by-step guidance on using smartphones, NHS app logins, booking doctor appointments, and staying in touch with family.",
    type: "Free weekly workshop",
    location: "Digital Learning Lab",
    time: "Wednesdays, 2:00pm - 3:30pm",
    age: "Beginners & Older Adults"
  }
];

function initServicesFilter() {
  const container = document.getElementById("services-grid-container");
  const searchInput = document.getElementById("service-search-input");
  const filterPills = document.querySelectorAll(".category-pills .filter-pill");

  let activeCategory = "all";
  let activeSearch = "";

  function renderServices() {
    if (!container) return;

    const filtered = servicesData.filter(item => {
      const matchesCat = activeCategory === "all" || item.category === activeCategory;
      const matchesText = item.title.toLowerCase().includes(activeSearch) ||
                          item.desc.toLowerCase().includes(activeSearch) ||
                          item.categoryLabel.toLowerCase().includes(activeSearch);
      return matchesCat && matchesText;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #ffffff; border-radius: 8px; border: 1px dashed #cbd5e1;">
          <p style="font-size: 1.1rem; color: #64748b; margin-bottom: 8px;">No matching services found.</p>
          <p style="font-size: 0.9rem; color: #94a3b8;">Try clearing your search keyword or switching category tabs.</p>
          <button class="btn btn-secondary btn-sm" style="margin-top: 14px;" onclick="resetServiceFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <article class="service-card" aria-label="${item.title}">
        <div class="service-header">
          <span class="badge ${item.badgeClass}">${item.categoryLabel}</span>
          <span class="badge badge-free">Free</span>
        </div>
        <h3 class="service-title">${item.title}</h3>
        <p class="service-desc">${item.desc}</p>
        <div class="service-meta">
          <div class="service-meta-item">
            <strong>Delivery:</strong> ${item.type}
          </div>
          <div class="service-meta-item">
            <strong>Where:</strong> ${item.location}
          </div>
          <div class="service-meta-item">
            <strong>When:</strong> ${item.time}
          </div>
          <div class="service-meta-item">
            <strong>Target:</strong> ${item.age}
          </div>
        </div>
        <button class="btn btn-secondary btn-block" onclick="openBookingForService('${item.title}')">
          Check Availability / Register
        </button>
      </article>
    `).join("");
  }

  window.resetServiceFilters = function() {
    activeCategory = "all";
    activeSearch = "";
    if (searchInput) searchInput.value = "";
    filterPills.forEach(pill => {
      pill.classList.toggle("active", pill.dataset.category === "all");
    });
    renderServices();
  };

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.dataset.category;
      renderServices();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearch = e.target.value.trim().toLowerCase();
      renderServices();
    });
  }

  renderServices();
}


  //  4. Events & Calendar View
   
const eventsData = [
  {
    id: 101,
    title: "Managing Stress & Anxiety Workshop",
    dateText: "Thursday, 12th December 2026",
    calDay: 12,
    time: "1:00pm - 2:30pm",
    venue: "Hub Workshop Room A",
    spotsLeft: 6,
    category: "Mental Health",
    desc: "An evidence-based psychoeducational session with NHS practitioners introducing grounding techniques and sleep hygiene."
  },
  {
    id: 102,
    title: "Gentle Community Tai Chi & Balance",
    dateText: "Saturday, 14th December 2026",
    calDay: 14,
    time: "10:30am - 11:30am",
    venue: "Main Community Hall",
    spotsLeft: 8,
    category: "Physical Activity",
    desc: "Slow, calming movement focused on strengthening core balance, reducing falls risk, and promoting joint comfort."
  },
  {
    id: 103,
    title: "Winter Energy Bills & Money Saving Clinic",
    dateText: "Monday, 16th December 2026",
    calDay: 16,
    time: "11:00am - 1:00pm",
    venue: "Conference Room 1",
    spotsLeft: 12,
    category: "Financial Support",
    desc: "Practical guidance from trained money advisers on government fuel grants, budget planning, and debt negotiation."
  },
  {
    id: 104,
    title: "Creative Arts for Wellbeing: Watercolour & Clay",
    dateText: "Wednesday, 18th December 2026",
    calDay: 18,
    time: "2:00pm - 4:00pm",
    venue: "Art & Wellbeing Studio",
    spotsLeft: 4,
    category: "Social Wellbeing",
    desc: "Mindful creative expression session. No prior artistic experience needed. All materials are supplied free of charge."
  },
  {
    id: 105,
    title: "Older Adults Smartphone & Internet Workshop",
    dateText: "Friday, 20th December 2026",
    calDay: 20,
    time: "10:00am - 11:30am",
    venue: "Digital Learning Lab",
    spotsLeft: 5,
    category: "Digital Skills",
    desc: "Hands-on, friendly assistance for setting up tablets, preventing online scam calls, and video calling family members."
  }
];

function initEventsCalendar() {
  const eventsListContainer = document.getElementById("events-cards-container");
  const calendarTableView = document.getElementById("calendar-table-view");
  const btnListView = document.getElementById("view-btn-list");
  const btnCalView = document.getElementById("view-btn-cal");

  function renderEventCards() {
    if (!eventsListContainer) return;
    eventsListContainer.innerHTML = eventsData.map(evt => `
      <article class="event-card">
        <div class="event-date-ribbon">
          <span>${evt.dateText}</span>
          <span style="font-size: 0.8rem; background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 3px;">${evt.category}</span>
        </div>
        <div class="event-card-body">
          <h3>${evt.title}</h3>
          <div class="event-details">
            <div><strong>Time:</strong> ${evt.time}</div>
            <div><strong>Venue:</strong> ${evt.venue}</div>
          </div>
          <p class="event-desc">${evt.desc}</p>
          <div class="event-footer">
            <span class="spots-badge">${evt.spotsLeft} places remaining</span>
            <button class="btn btn-primary btn-sm" onclick="startBookingFlow('${evt.title}', '${evt.dateText}')">
              Book Free Place
            </button>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderCalendarTable() {
    if (!calendarTableView) return;
    // Generate December 2026 calendar (Starts on Tuesday Dec 1st)
    let rowsHtml = "";
    let day = 1;
    // Dec 1 2026 is Tuesday (Col index 2, assuming Sun=0, Mon=1, Tue=2)
    for (let row = 0; row < 5; row++) {
      rowsHtml += "<tr>";
      for (let col = 0; col < 7; col++) {
        const cellIndex = row * 7 + col;
        // Start day at Tuesday (cellIndex 2)
        if (cellIndex < 2 || day > 31) {
          rowsHtml += "<td style='background:#f8fafc;'></td>";
        } else {
          const matchingEvents = eventsData.filter(e => e.calDay === day);
          let eventPills = "";
          matchingEvents.forEach(e => {
            eventPills += `<div class="cal-event-pill" title="${e.title}" onclick="startBookingFlow('${e.title}', '${e.dateText}')">${e.title}</div>`;
          });
          rowsHtml += `
            <td>
              <div class="cal-day-num">${day}</div>
              ${eventPills}
            </td>
          `;
          day++;
        }
      }
      rowsHtml += "</tr>";
    }

    calendarTableView.innerHTML = `
      <table class="calendar-table" aria-label="Community Events Calendar for December 2026">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  }

  if (btnListView && btnCalView) {
    btnListView.addEventListener("click", () => {
      btnListView.classList.add("active");
      btnCalView.classList.remove("active");
      eventsListContainer.style.display = "grid";
      calendarTableView.style.display = "none";
    });

    btnCalView.addEventListener("click", () => {
      btnCalView.classList.add("active");
      btnListView.classList.remove("active");
      eventsListContainer.style.display = "none";
      calendarTableView.style.display = "block";
    });
  }

  renderEventCards();
  renderCalendarTable();
}


  //  5. Multi-Step Wizard Booking System
  
let wizardState = {
  step: 1,
  selectedServiceOrEvent: "Managing Stress & Anxiety Workshop",
  selectedDate: "Thursday, 12th December 2026",
  name: "",
  email: "",
  phone: "",
  ageGroup: "25-44",
  needs: "",
  emergencyContact: "",
  bookingRef: ""
};

function initBookingWizard() {
  const modal = document.getElementById("booking-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const cancelBtn = document.getElementById("wizard-cancel-btn");

  const nextStep1 = document.getElementById("step1-next-btn");
  const backStep2 = document.getElementById("step2-back-btn");
  const nextStep2 = document.getElementById("step2-next-btn");
  const backStep3 = document.getElementById("step3-back-btn");
  const confirmBookingBtn = document.getElementById("step3-confirm-btn");
  const closeSuccessBtn = document.getElementById("success-close-btn");

  window.openBookingForService = function(serviceTitle) {
    wizardState.selectedServiceOrEvent = serviceTitle;
    wizardState.selectedDate = "Next available appointment session";
    openModal();
  };

  window.startBookingFlow = function(eventTitle, eventDate) {
    wizardState.selectedServiceOrEvent = eventTitle;
    wizardState.selectedDate = eventDate;
    openModal();
  };

  function openModal() {
    wizardState.step = 1;
    updateWizardUI();
    if (modal) {
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // lock background scroll
      // Focus on first input
      setTimeout(() => {
        const firstInput = document.getElementById("book-name");
        if (firstInput) firstInput.focus();
      }, 100);
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener("click", closeModal);

  // Close on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Step 1 Validation & Next
  if (nextStep1) {
    nextStep1.addEventListener("click", () => {
      const nameInput = document.getElementById("book-name");
      const emailInput = document.getElementById("book-email");
      const phoneInput = document.getElementById("book-phone");
      const errName = document.getElementById("err-name");
      const errEmail = document.getElementById("err-email");

      let valid = true;

      if (!nameInput.value.trim()) {
        nameInput.classList.add("error");
        errName.classList.add("visible");
        valid = false;
      } else {
        nameInput.classList.remove("error");
        errName.classList.remove("visible");
      }

      if (!emailInput.value.trim() || !emailInput.value.includes("@")) {
        emailInput.classList.add("error");
        errEmail.classList.add("visible");
        valid = false;
      } else {
        emailInput.classList.remove("error");
        errEmail.classList.remove("visible");
      }

      if (valid) {
        wizardState.name = nameInput.value.trim();
        wizardState.email = emailInput.value.trim();
        wizardState.phone = phoneInput.value.trim() || "Not provided";
        wizardState.ageGroup = document.getElementById("book-age").value;
        wizardState.needs = document.getElementById("book-needs").value.trim() || "None specified";
        wizardState.step = 2;
        updateWizardUI();
      }
    });
  }

  // Step 2 Navigation
  if (backStep2) {
    backStep2.addEventListener("click", () => {
      wizardState.step = 1;
      updateWizardUI();
    });
  }

  if (nextStep2) {
    nextStep2.addEventListener("click", () => {
      const activitySelect = document.getElementById("book-activity-select");
      if (activitySelect) {
        wizardState.selectedServiceOrEvent = activitySelect.value;
      }
      wizardState.step = 3;
      updateWizardUI();
    });
  }

  // Step 3 Navigation
  if (backStep3) {
    backStep3.addEventListener("click", () => {
      wizardState.step = 2;
      updateWizardUI();
    });
  }

  // Confirm Booking
  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", () => {
      const termsCheck = document.getElementById("book-terms");
      const errTerms = document.getElementById("err-terms");
      if (!termsCheck.checked) {
        errTerms.classList.add("visible");
        return;
      }
      errTerms.classList.remove("visible");

      // Generate random human-readable reference code
      const randNum = Math.floor(1000 + Math.random() * 9000);
      wizardState.bookingRef = "CWH-" + randNum;

      wizardState.step = 4;
      updateWizardUI();
    });
  }

  function updateWizardUI() {
    // Step Nodes
    for (let i = 1; i <= 3; i++) {
      const node = document.getElementById(`node-step-${i}`);
      if (node) {
        node.classList.remove("active", "completed");
        if (wizardState.step === i) {
          node.classList.add("active");
        } else if (wizardState.step > i) {
          node.classList.add("completed");
        }
      }
    }

    // Step Panels
    for (let i = 1; i <= 4; i++) {
      const panel = document.getElementById(`wizard-step-${i}`);
      if (panel) {
        panel.classList.toggle("active", wizardState.step === i);
      }
    }

    // Update Activity Dropdown in Step 2
    const activitySelect = document.getElementById("book-activity-select");
    if (activitySelect && wizardState.selectedServiceOrEvent) {
      activitySelect.value = wizardState.selectedServiceOrEvent;
    }

    // Update Summary in Step 3
    if (wizardState.step === 3) {
      document.getElementById("sum-name").textContent = wizardState.name;
      document.getElementById("sum-email").textContent = wizardState.email;
      document.getElementById("sum-phone").textContent = wizardState.phone;
      document.getElementById("sum-activity").textContent = wizardState.selectedServiceOrEvent;
      document.getElementById("sum-date").textContent = wizardState.selectedDate;
      document.getElementById("sum-needs").textContent = wizardState.needs;
    }

    // Update Step 4 Confirmation
    if (wizardState.step === 4) {
      document.getElementById("ref-code-display").textContent = wizardState.bookingRef;
      document.getElementById("conf-user-name").textContent = wizardState.name;
      document.getElementById("conf-activity").textContent = wizardState.selectedServiceOrEvent;
      document.getElementById("conf-email").textContent = wizardState.email;
    }
  }
}


  //  6. Contact Form Validation & Submission
  
function initContactForm() {
  const form = document.getElementById("support-contact-form");
  const alertBox = document.getElementById("contact-alert-msg");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("c-name").value.trim();
      const email = document.getElementById("c-email").value.trim();
      const msg = document.getElementById("c-msg").value.trim();

      if (!name || !email || !msg) {
        alert("Please fill in all required fields.");
        return;
      }

      form.reset();
      if (alertBox) {
        alertBox.style.display = "block";
        alertBox.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          alertBox.style.display = "none";
        }, 6000);
      }
    });
  }
}


  //  7. FAQ Accordion Component
   
function initFaqAccordion() {
  const headers = document.querySelectorAll(".accordion-header");
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains("active");
      
      // Close all others for tidy accordion
      document.querySelectorAll(".accordion-item").forEach(i => {
        i.classList.remove("active");
        const btn = i.querySelector(".accordion-header");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("active");
        header.setAttribute("aria-expanded", "true");
      }
    });
  });
}
