# Community Wellbeing Hub - Web Prototype (Artefact)
Module: HCI and Web Development (505IT)  
Assignment Title: Designing and Prototyping a User-Centred Website Interface  
Scenario: Community Wellbeing Hub Website for Regional Local Authority  


## 1. Overview of the Prototype
This interactive web artefact has been designed and implemented in response to the Coventry University 505IT coursework brief. The hub serves local residents across diverse age groups, socio-economic backgrounds, and digital literacy proficiencies by providing accessible information, service discovery, calendar scheduling, interactive workshop registration, and support contact channels.

The implementation strictly adheres to:
- **Human-Computer Interaction (HCI) Principles:** Norman's fundamental design principles (visibility, feedback, affordance, mapping, constraints), Fitts's Law (enlarged touch and click targets), and Hick's Law (progressive disclosure and categorical filtering to minimize decision friction).
- **Web Content Accessibility Guidelines (WCAG 2.1 AA):** High-contrast color palette (>4.5:1 text contrast ratio), accessible keyboard navigation (`:focus-visible` styling and skip-to-content anchor), ARIA live regions and attributes, and responsive layout across smartphone, tablet, and desktop viewports.

---

## 2. Core Features Implemented
1. **Homepage & Mission Introduction:** Accessible hero banner, transparent opening hours, emergency mental health crisis hotline, and quick statistics.
2. **Interactive Service Directory:** Real-time search by keyword and responsive category filter pills (Mental Health, Physical Activity, Family Support, Senior Care, and Financial Advice).
3. **Events & Workshop Calendar:** Switchable view between an upcoming card list and an interactive monthly calendar grid for December 2026.
4. **Multi-Step Booking Wizard Modal:** A 3-step progressive registration flow with interactive input validation, review summary screen, and confirmed reservation reference generation (`CWH-XXXX`).
5. **Community News & Success Stories:** Narrative community spotlights detailing resident recovery, family cooking clubs, and sensory quiet room facilities.
6. **Support & Contact Channels:** Interactive contact enquiry form with instant feedback, physical address, direct helpline, opening hours, and an accessible FAQ accordion.
7. **Accessibility Toolbar:** Dynamic high-contrast toggle and interactive typography scaling controls (A- / Normal / A+).

---

## 3. Instructions for Running and Testing
No complex compilation or backend server setup is required. The prototype is built entirely with standards-compliant HTML5, CSS3, and modern vanilla JavaScript.

### How to Run:
1. **Direct Browser Launch:**
   - Double-click `index.html` or right-click `index.html` and select **Open with** (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).
2. **Local HTTP Server (Optional):**
   - Alternatively, open a terminal in this directory and run:
     ```bash
     python -m http.server 8000
     ```
   - Then navigate to `http://localhost:8000` in your web browser.

### Key Interactive Flows to Test:
- **Filtering Services:** Click any category pill under "Directory of Local Support Services" (e.g., *Mental Health* or *Senior Care*) or type "yoga" into the search bar.
- **Booking an Activity:** Click "Book Free Place" on any event or "Check Availability / Register" on any service card. Follow the modal wizard from Step 1 through Step 4.
- **Toggling Calendar View:** In the "What's On This Month" section, switch between "List of Upcoming Events" and "Monthly Calendar View".
- **Testing Accessibility Modes:** Click the "High Contrast" button in the top black header bar to toggle the high-contrast dark theme. Use the "A+" and "A-" buttons to scale font sizes dynamically.
- **Testing Responsiveness:** Resize your browser window below 768px to inspect the mobile layout and hamburger navigation drawer.
