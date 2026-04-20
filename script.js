// DOM Elements
const scene = document.getElementById('scene');
const buildingView = document.getElementById('building-view');
const buildingWrapper = document.getElementById('building-wrapper');
const detailPanel = document.getElementById('detail-panel');
const panelContent = document.getElementById('panel-content');
const backBtn = document.getElementById('back-btn');
const floorGroups = document.querySelectorAll('.floor-group');

// State
let currentSection = null;
let isTransitioning = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  bindFloorClicks();
  bindFloorHovers();
  bindBackButton();
  bindSwipeGesture();
});

// Bind floor clicks
function bindFloorClicks() {
  floorGroups.forEach(group => {
    group.addEventListener('click', () => {
      const section = group.dataset.section;
      openSection(section);
    });
  });
}

// Bind floor hover effects
function bindFloorHovers() {
  floorGroups.forEach(group => {
    group.addEventListener('mouseenter', () => {
      // Additional hover effects if needed
    });
    group.addEventListener('mouseleave', () => {
      // Additional hover effects if needed
    });
  });
}

// Open section
function openSection(section) {
  if (isTransitioning) return;
  isTransitioning = true;

  currentSection = section;
  const html = getSectionHTML(section);

  // Inject content
  panelContent.innerHTML = html;

  // Show panel
  detailPanel.classList.remove('hidden');
  detailPanel.style.display = 'block';

  // Trigger animations
  requestAnimationFrame(() => {
    buildingView.classList.add('exiting');
    requestAnimationFrame(() => {
      detailPanel.classList.add('visible');
    });
  });

  // Re-enable when transition completes
  setTimeout(() => {
    isTransitioning = false;
  }, 450);

  // Animate content children
  setTimeout(() => {
    const children = panelContent.querySelectorAll('*');
    children.forEach((child, index) => {
      child.style.setProperty('--delay', `${0.35 + index * 0.05}s`);
    });
  }, 350);
}

// Close panel
function closePanel() {
  if (isTransitioning) return;
  isTransitioning = true;

  detailPanel.classList.remove('visible');

  setTimeout(() => {
    detailPanel.classList.add('hidden');
    detailPanel.style.display = 'none';
    buildingView.classList.remove('exiting');
    currentSection = null;
    isTransitioning = false;
  }, 450);
}

// Bind back button
function bindBackButton() {
  backBtn.addEventListener('click', closePanel);
}

// Bind swipe gesture for mobile
function bindSwipeGesture() {
  let touchStartX = 0;
  let touchStartY = 0;

  detailPanel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  detailPanel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Swipe right to close (only if horizontal movement > vertical)
    if (deltaX > 80 && Math.abs(deltaX) > Math.abs(deltaY)) {
      closePanel();
    }
  });
}

// Content generation functions
function getSectionHTML(section) {
  const sections = {
    hero: heroHTML,
    about: aboutHTML,
    role: roleHTML,
    skills: skillsHTML,
    works: worksHTML,
    contact: contactHTML,
  };

  return sections[section] ? sections[section]() : '';
}

function heroHTML() {
  return `
    <div class="panel-floor-label">PH / HERO</div>

    <h1 class="hero-name">KEEOH<span class="hero-cursor">_</span></h1>

    <p class="hero-tagline">Product Manager • Systems Thinker • Builder</p>

    <div class="divider"></div>

    <div class="hero-stats">
      <div class="hero-stat">
        <span class="hero-stat-label">Location</span>
        <span class="hero-stat-value">Seoul, Korea</span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-label">Status</span>
        <span class="status-badge">
          <span class="status-dot"></span>
          Open to connect
        </span>
      </div>
      <div class="hero-stat">
        <span class="hero-stat-label">Role</span>
        <span class="hero-stat-value">Product Manager</span>
      </div>
    </div>

    <p class="text-body">
      I'm passionate about building products that solve real problems. I blend user empathy,
      strategic thinking, and technical curiosity to create meaningful solutions. Currently
      exploring the intersection of AI and product design.
    </p>
  `;
}

function aboutHTML() {
  return `
    <div class="panel-floor-label">05 / ABOUT</div>

    <h2 class="section-heading">Who I Am</h2>

    <div class="avatar-container">
      <div class="avatar">K</div>
      <div class="avatar-info">
        <h3>Keeoh</h3>
        <p>Product Manager based in Seoul</p>
      </div>
    </div>

    <p class="text-body">
      I'm a Product Manager with a passion for creating intuitive, user-centric products.
      My approach combines deep user research, data-driven decision making, and close collaboration
      with cross-functional teams to deliver impactful solutions.
    </p>

    <p class="text-body">
      When I'm not thinking about product strategy, you'll find me exploring design patterns,
      reading about systems thinking, or experimenting with new tools that might improve
      how we work.
    </p>

    <div class="quote-block">
      "The best products are discovered through iteration, not invented in isolation."
    </div>
  `;
}

function roleHTML() {
  return `
    <div class="panel-floor-label">04 / ROLE</div>

    <h2 class="section-heading">What I Do</h2>

    <p class="text-body">
      As a Product Manager, I own the complete product lifecycle from discovery through
      delivery and iteration. I work across engineering, design, and business to align on
      outcomes and create products that users love.
    </p>

    <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 600; margin: 32px 0 16px 0;">Key Responsibilities</h3>

    <div class="cards-grid">
      <div class="card">
        <div class="card-icon">🔍</div>
        <div class="card-title">Discovery</div>
        <div class="card-desc">User research, market analysis, problem validation</div>
      </div>
      <div class="card">
        <div class="card-icon">🗺</div>
        <div class="card-title">Strategy</div>
        <div class="card-desc">Roadmap planning, OKR alignment, prioritization</div>
      </div>
      <div class="card">
        <div class="card-icon">⚙️</div>
        <div class="card-title">Execution</div>
        <div class="card-desc">Agile sprints, spec writing, team coordination</div>
      </div>
      <div class="card">
        <div class="card-icon">📊</div>
        <div class="card-title">Analytics</div>
        <div class="card-desc">Metrics definition, A/B testing, data analysis</div>
      </div>
    </div>
  `;
}

function skillsHTML() {
  return `
    <div class="panel-floor-label">03 / SKILLS</div>

    <h2 class="section-heading">Tech & Tools</h2>

    <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; margin: 24px 0 12px 0; color: #9ca3af;">PM & Product Tools</h3>
    <div class="tags-container">
      <span class="tag">Notion</span>
      <span class="tag">Linear</span>
      <span class="tag">Jira</span>
      <span class="tag">Confluence</span>
      <span class="tag">Figma</span>
      <span class="tag">Miro</span>
    </div>

    <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; margin: 24px 0 12px 0; color: #9ca3af;">Analytics & Data</h3>
    <div class="tags-container">
      <span class="tag">Mixpanel</span>
      <span class="tag">Amplitude</span>
      <span class="tag">Google Analytics</span>
      <span class="tag">SQL</span>
      <span class="tag">Looker</span>
    </div>

    <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; margin: 24px 0 12px 0; color: #9ca3af;">Tech Familiarity</h3>
    <div class="tags-container">
      <span class="tag secondary">HTML/CSS</span>
      <span class="tag secondary">JavaScript</span>
      <span class="tag secondary">Python</span>
      <span class="tag secondary">REST APIs</span>
      <span class="tag secondary">Git</span>
    </div>

    <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; margin: 24px 0 12px 0; color: #9ca3af;">Frameworks & Methods</h3>
    <div class="tags-container">
      <span class="tag">Agile/Scrum</span>
      <span class="tag">OKRs</span>
      <span class="tag">Design Thinking</span>
      <span class="tag">Jobs-to-be-Done</span>
      <span class="tag">Lean Startup</span>
    </div>
  `;
}

function worksHTML() {
  return `
    <div class="panel-floor-label">02 / WORKS</div>

    <h2 class="section-heading">Experience</h2>

    <div class="timeline">
      <div class="timeline-item active">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-card-meta">
            <span class="timeline-card-company">Current Role</span>
            <span class="timeline-card-period">2023 – Present</span>
          </div>
          <h3>Product Manager</h3>
          <p>Leading cross-functional product initiatives and driving user-centric development strategies.</p>
          <ul>
            <li>Shipped feature resulting in 35% improvement in user engagement</li>
            <li>Managed roadmap for 3 concurrent projects with 8+ team members</li>
            <li>Defined and tracked OKRs achieving 120% of targets</li>
          </ul>
          <div class="tags-container">
            <span class="tag">B2B SaaS</span>
            <span class="tag">Growth</span>
            <span class="tag">Analytics</span>
          </div>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-card-meta">
            <span class="timeline-card-company">Previous</span>
            <span class="timeline-card-period">2021 – 2023</span>
          </div>
          <h3>Associate Product Manager</h3>
          <p>Supported product strategy and managed features from ideation to launch.</p>
          <ul>
            <li>Conducted 50+ user interviews and synthesized research findings</li>
            <li>Launched 5 major features that increased retention by 28%</li>
            <li>Mentored 2 junior PMs on discovery and validation processes</li>
          </ul>
          <div class="tags-container">
            <span class="tag">Mobile App</span>
            <span class="tag">User Research</span>
          </div>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <div class="timeline-card-meta">
            <span class="timeline-card-company">Side Project</span>
            <span class="timeline-card-period">2020</span>
          </div>
          <h3>Product Lead</h3>
          <p>Built and shipped a productivity tool for distributed teams. Went from idea to 100 users in 3 months.</p>
          <div class="tags-container">
            <span class="tag">0→1</span>
            <span class="tag">Bootstrapped</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function contactHTML() {
  return `
    <div class="panel-floor-label">G / CONTACT</div>

    <h2 class="section-heading">Let's Connect</h2>

    <a href="mailto:keeoh@example.com" class="email-button">
      <span class="email-icon">✉</span>
      keeoh@example.com
    </a>

    <div class="social-links">
      <a href="https://linkedin.com" target="_blank" rel="noopener" class="social-link">
        <div class="social-icon">in</div>
        <span>LinkedIn</span>
      </a>
      <a href="https://github.com" target="_blank" rel="noopener" class="social-link">
        <div class="social-icon">gh</div>
        <span>GitHub</span>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener" class="social-link">
        <div class="social-icon">tw</div>
        <span>Twitter</span>
      </a>
    </div>

    <div class="availability">
      <span class="availability-dot"></span>
      <span>Available for conversations and collaborations</span>
    </div>

    <p class="text-secondary" style="margin-bottom: 0;">
      I'm always interested in learning about interesting problems and connecting with people building things.
      Feel free to reach out—whether it's about product strategy, design, or just to chat about ideas.
    </p>

    <div style="margin-top: 40px; padding-top: 40px; border-top: 1px solid #e5e7eb;">
      <p class="contact-footer">KEEOH • Seoul • 2025</p>
    </div>
  `;
}
