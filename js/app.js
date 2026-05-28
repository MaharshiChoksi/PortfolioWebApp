// Navigation
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Animated counters for statistics
const statValues = document.querySelectorAll('.stat-value');
let countedOnce = false;

const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countedOnce) {
      statValues.forEach(stat => animateCounter(stat));
      countedOnce = true;
    }
  });
}, {
  threshold: 0.5,
  rootMargin: '0px'
});

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Fade in animation on scroll
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in', 'visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

const registerFadeElements = (elements) => {
  elements.forEach(element => {
    element.classList.add('fade-in');
    fadeObserver.observe(element);
  });
};

// initial static elements (skills + stats cards)
registerFadeElements(document.querySelectorAll('.stat-card, .skills-category'));

// Project details data
const projects = [
  {
    id: 6,
    title: "Backtest.OS",
    status: "COMPLETED",
    statusClass: "completed-tag",
    hasExternalLink: true,
    externalLink: "https://backtestos.vercel.app/",
    externalLinkText: "Backtesting Engine",
    description: "It's a browser-based backtesting platform that lets you replay market data, simulate trades, and see exactly how your strategy would've performed. Think of it as a practice range for traders—load some historical price data, set up your trading rules, and watch how your trades would have played out over multi-timeframe.",
    tech: ["React", "Vite", "Zustand", "Tradingview Lightweight Charts", "Financial Metrics Dashboard"],
    metrics: [
      { label: "Asset Class", value: "Forex, Commodity, Oil, Crypto, Index"},
      { label: "Data Update Window", value: "User Friendly"},
      { label: "Supported Data", value: "CSV file, Parquet file, from MT5, MT4, Dukascopy or other sources..."}
    ]
  },
  {
    id: 5,
    title: "Forex Calculator Suite",
    status: "COMPLETED",
    statusClass: "completed-tag",
    hasExternalLink: true,
    externalLink: "https://forex-tools.streamlit.app/",
    externalLinkText: "Checkout Tools",
    description: "An all-in-one web platform providing essential calculators for Forex traders, including margin requirement, profit/loss, lot size, pip value, and pip size calculators. The site dynamically fetches live currency pair data from trusted third-party sources to enable accurate, real-time computations tailored to user's trade parameters.",
    tech: ["Python", "Technical Analysis", "API Integration", "Risk & Position Management", "Fundamental Analysis"],
    metrics: [
      { label: "Asset Class", value: "Forex, Commodity"},
      { label: "Data Update Window", value: "Real-Time"},
      { label: "Analysis Type", value: "Forecasting Risk/Profit/Position Size/values"}
    ]    
  },
  {
    id: 4,
    title: "Stock Valuation & Recommendation Engine",
    status: "COMPLETED",
    statusClass: "completed-tag",
    hasExternalLink: false,
    externalLink: "",
    externalLinkText: "",
    description: "A Python-driven analytical tool that filters Indian stocks by market capitalization categories—mega, large, and mid-cap—and evaluates their intrinsic value through comprehensive metrics. The system calculates the fair stock value using the Peter Lynch Valuation (PLV) method, integrates analyst ratings, and compares current market prices to determine if a stock is overvalued, undervalued, or fairly valued. It compiles detailed data including financial ratios, valuation metrics, and recommendations, and exports structured results to Excel for further review.",
    tech: ["Python", "Technical Analysis", "Fundamental Analysis", "Data Analysis"],
    metrics: [
      { label: "Market", value: "India"},
      { label: "Analysis Time window", value: "Daily"},
      { label: "Asset Class", value: "Mid → Mega Cap Equities"}
    ]
  },
  {
    id: 3,
    title: "Dynamic SIP Algo Trading Bot",
    status: "COMPLETED",
    statusClass: "completed-tag",
    hasExternalLink: false,
    externalLink: "",
    externalLinkText: "",
    description: "A sophisticated Python-based SIP (Systematic Investment Plan) algorithmic trading bot tailored for Indian equities and ETFs. Every Monday post-market close, it fetches real-time and historical stock data from Yahoo Finance API, analyzes weekly performance, and executes proportional buy orders through broker APIs for tickers that closed lower in the past week. The bot ensures precise quantity allocation, calculates margin requirements, submits orders, and verifies execution success, with detailed step-by-step logging in a .log file for full transparency and auditability.",
    tech: ["Python", "API", "yfinance", "Real-time Analytics", "Automation", "Data Analysis"],
    metrics: [
      { label: "Market", value: "India"},
      { label: "Analysis Time window", value: "Weekly"},
      { label: "Asset Class", value: "Equities & ETFs"}
    ]
  },
  {
    id: 2,
    title: "Large Insider Transactions Searcher Bot",
    status: "COMPLETED",
    statusClass: "completed-tag",
    hasExternalLink: false,
    externalLink: "",
    externalLinkText: "",
    description: "An automated C# solution that scrapes large insider purchase transactions from Dataroma, cleans and aggregates the data, and applies custom filters to highlight significant whale transactions. The tool stores daily snapshots in organized text files and sends detailed real-time alerts to a Telegram channel via bot integration.",
    tech: ["C#(.NET)", "Telegram API", "Web Scrapping"],
    metrics: [
      { label: "Market", value: "US Equities"},
      { label: "Source", value: '<a href="https://www.dataroma.com/m/ins/ins.php" target="_blank">Dataroma</a>' },
      { label: "Data Updates", value: "Daily" }
    ]
  },
  {
    id: 1,
    title: "Stock Reversal TradingView Indicator",
    status: "COMPLETED",
    statusClass: "completed-tag",
    hasExternalLink: true,
    externalLink: "https://www.tradingview.com/script/ianWN35l-Weekly-Fakeout-Signal-D-W-only/",
    externalLinkText: "Checkout Indicator",
    description: "A modular TradingView indicator built with Pine Script v6, providing real-time long/short signals, precise entry/exit points aligned with weekly cycle ends. Users can customize chart labels, colors, and add EMA-based technical confirmations for enhanced reliability. The indicator supports full user control over inputs, allowing adaptation to various trading strategies and increasing confidence in live trading decisions.",
    tech: ["TradingView", "PineScript V6", "Statistical Analysis"],
    metrics: [
      { label: "Indicators", value: "EMA's, Price" },
      { label: "Strategy Type", value: "Mean Reversion" },
      { label: "Assets", value: "NSE Futures & Options" }
    ]
  },
  {
    id: 0,
    title: "Stock Reversal Screener",
    status: "COMPLETED",
    statusClass: "completed-tag",
    hasExternalLink: true,
    externalLink: "https://fakeoutscreener.streamlit.app/",
    externalLinkText: "Checkout Screener",
    description:
      "A dynamic trading tool designed to identify fake breakout for high-potential Futures and Options stocks. The screener applies automatic filters for fakeout signals and securities trading above monthly threshold, helping traders spot reliable breakout and retracement setups.",
    tech: ["Python", "Database Management", "Price Action", "Technical Analysis", "Data Analysis"],
    metrics: [
      { label: "Indicators", value: "Price Action" },
      { label: "Strategy Type", value: "Mean Reversion" },
      { label: "Assets", value: "NSE Futures & Options" }
    ]
  }
];

// Dynamic project card render
const projectsGrid = document.getElementById('projectsGrid');

if (projectsGrid && Array.isArray(projects)) {
  const cardsHtml = projects.map((p) => {
    const techBadges = (p.tech || [])
      .map(t => `<span class="tech-badge">${t}</span>`)
      .join('');

      const metricsHtml = (p.metrics || [])
        .map(m => `
          <div class="metric">
            <span class="metric-label">${m.label}</span>
            <span class="metric-value">${m.value}</span>
          </div>
        `)
        .join('');

      const externalLinkHtml = p.hasExternalLink
        ? `
          <div class="about-tags url-link">
            <a href="${p.externalLink}" class="tag" target="_blank" rel="noopener noreferrer">
              ${p.externalLinkText}
            </a>
          </div>
        `
        : '';

      return `
        <div class="project-card" data-project="${p.id}">
          <div class="project-header">
            <h3 class="project-title">${p.title}</h3>
            <span class="${p.statusClass}">${p.status}</span>
          </div>

          ${externalLinkHtml}

          <div class="project-body">
            <p class="project-description">${p.description}</p>

            <div class="project-tech">
              ${techBadges}
            </div>

            <div class="project-metrics">
              ${metricsHtml}
            </div>
          </div>
        </div>
      `;
  }).join('');

  projectsGrid.innerHTML = cardsHtml;

  // hook new cards into fade-in
  registerFadeElements(projectsGrid.querySelectorAll('.project-card'));
}

// Contact 
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btnText = contactForm.querySelector('.btn-text');

  const formData = new FormData(contactForm);
  formData.append("access_key", "561ade40-5b8d-4af9-8a53-29b7a9b2a4c7");

  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";

  // Show loading state
  btnText.style.display = 'none';
  submitBtn.disabled = true;

  const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms));

  try {
    const response = await Promise.race([
        fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      }),
      timeout(5000)
    ]);

    const data = await response.json();

    if (response.ok) {
      alert("Success! Your message has been sent.");
      contactForm.reset();
    } else {
      alert("Error: " + data.message);
    }

  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});


// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
