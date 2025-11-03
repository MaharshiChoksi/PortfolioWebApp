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
    const sectionHeight = section.clientHeight;
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

const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countedOnce) {
      statValues.forEach(stat => animateCounter(stat));
      countedOnce = true;
    }
  });
}, observerOptions);

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Fade in animation on scroll
const fadeElements = document.querySelectorAll('.project-card, .portfolio-card, .stat-card, .skills-category');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in', 'visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

fadeElements.forEach(element => {
  element.classList.add('fade-in');
  fadeObserver.observe(element);
});

// Project details data
const projectsData = [
  {// Project 1
    title: "Stock Reversal Screener",
    description: "A dynamic trading tool designed to identify fake breakout for high-potential Futures and Options stocks. The screener applies automatic filters for fakeout signals and securities trading above monthly threshold, helping traders spot reliable breakout and retracement setups.",
    fullDescription: "With a standardized and user-friendly data format, the platform enables daily actionable insights and lets users customize filters for optimal decision-making. Built with Python and modern web frameworks, the tool leverages technical analysis and API integration for seamless trading workflows",
    technologies: ["Python", "Streamlit", "Database Management", "Technical Analysis", "API Integration"],
    features: [
      "Automated fakeout and breakout signal detection",
      "Filters for monthly movers to exclude low-volatility stocks",
      "Daily updated screener filters for personalized stock search",
      "Clean, modern UI designed for actionable insights",
      "Price-to-pip conversion system",
      "Data export functionality for further analysis"
    ]
  },
  {// Project 2
    title: "Stock Reversal TradingView Indicator",
    description: "A modular TradingView indicator built with Pine Script v6, providing real-time long/short signals, precise entry/exit points aligned with weekly cycle ends.",
    fullDescription: "The primary indicator automatically identifies and marks previous week's high and low levels on any chart, providing crucial support and resistance levels for trading decisions. The system features automated marking of weekly boundaries with color-coded zones, integration with multi-timeframe analysis to show weekly levels on lower timeframes. All indicators are optimized for performance and can be combined to create comprehensive trading systems.",
    technologies: ["TradingView charting engine", "PineScript V6", "Statistical Analysis"],
    features: [
      "Real-time long/short signals with entry and exit points",
      "Weekly OHLC-based trend and fakeout detection",
      "Customizable labels, colors, and technical overlays",
      "EMA filter and multiple confirmation options",
      "Integration with TradingView alerts and backtesting"
    ]
  },
  {// Project 3
    title: "Large Insider Transactions Searcher Bot",
    description: "An automated C# solution that scrapes large insider purchase transactions from Dataroma, cleans and aggregates the data, and applies custom filters to highlight significant whale transactions.",
    fullDescription: "The tool stores daily snapshots in organized text files and sends detailed real-time alerts to a Telegram channel via bot integration. Designed for seamless monitoring of influential securities trades, it enables timely insights directly on your preferred messaging platform.",
    technologies: ["C#(.NET)", "Telegram API", "Web Scrapping"],
    features: [
      "Web scraping insider transaction data",
      "Robust data cleaning, parsing, and aggregation using DataTable and LINQ",
      "Custom filtering to identify large 'whale' purchases with configurable thresholds",
      "Persistent storage of daily transaction reports in timestamped files",
      "Automated Telegram Bot integration for instant alert notifications",
      "Retry mechanism and error handling for reliable message delivery"
    ]
  },
  {// Project 4
    title: "Dynamic SIP Algo Trading Bot",
    description: "A sophisticated Python-based SIP (Systematic Investment Plan) algorithmic trading bot tailored for Indian equities and ETFs.",
    fullDescription: "It dynamically reads configuration from environment files including API keys, ticker symbols, and investment proportions. Every Monday post-market close, it fetches real-time and historical stock data from Yahoo Finance API, analyzes weekly performance, and executes proportional buy orders through broker APIs for tickers that closed lower in the past week. The bot ensures precise quantity allocation, calculates margin requirements, submits orders, and verifies execution success, with detailed step-by-step logging in a .log file for full transparency and auditability",
    technologies: ["Python", "API", "yfinance", "Real-time Analytics", "Automation", "Data Analysis"],
    features: [
      "Configurable environment-driven setup for API credentials, ticker selections, and investment proportions",
      "Weekly scheduled execution triggered at market close every Monday",
      "Real-time and historical data retrieval from Yahoo Finance API",
      "Dynamic order sizing based on predefined proportion of available capital",
      "Integration with broker APIs for margin calculations, order submission, and execution confirmation",
      "Comprehensive logging of processes, decisions, and order statuses for traceability",
      "Error handling to ensure robustness in live trading environments"
    ]
  },
  {// Project 5
    title: "Stock Valuation & Recommendation Engine",
    description: "A Python-driven analytical tool that filters Indian stocks by market capitalization categories—mega, large, and mid-cap—and evaluates their intrinsic value through comprehensive metrics. ",
    fullDescription: "The system calculates the fair stock value using the Peter Lynch Valuation (PLV) method, integrates analyst ratings, and compares current market prices to determine if a stock is overvalued, undervalued, or fairly valued. It compiles detailed data including financial ratios, valuation metrics, and recommendations, and exports structured results to Excel for further review.",
    technologies: ["Python", "Technical Analysis", "Fundamental Analysis", "Data Analysis"],
    features: [
      "Market cap segmentation",
      "Incorporates analyst ratings for holistic valuation context",
      "Computes Peter Lynch Value for intrinsic valuation measurement",
      "Identifies valuation status (overvalued, undervalued, fairly valued) based on calculated vs. market price",
      "Generates comprehensive financial and valuation ratios per stock"
    ]
  },
  {// Project 6
    title: "Forex Calculator Suite",
    description: "An all-in-one web platform providing essential calculators for Forex traders, including margin requirement, profit/loss, lot size, pip value, and pip size calculators.",
    fullDescription: "The site dynamically fetches live currency pair data from trusted third-party sources to enable accurate, real-time computations tailored to user's trade parameters. Designed to support traders at all levels, the interface simplifies complex Forex math, promotes smarter risk and position management, and enhances decision-making through clear, actionable outputs.",
    technologies: ["Python", "Technical Analysis", "API Integration", "Risk & Position Management"],
    features: [
      "Risk management calculations (margin, lot size)",
      "Profit and loss forecasting",
      "Computes Peter Lynch Value for intrinsic valuation measurement",
      "Pip value and pip size determination essential for pip-based instruments",
      "Dynamic updates based on live FX rates and leverage parameters"
    ]
  },
  {// Project 7
    title: "Quantitative Trading & Volatility Modeling Engine",
    description: "A high-performance C# system designed for fast execution of quantitative trading strategies across Forex, Cryptocurrency, Commodities, and Oil markets.",
    fullDescription: "It integrates advanced statistical volatility models (GARCH variants) with classical technical indicators (EMA, MACD) for robust trade signal generation and risk management. This engine retrieves market data from brokers API for precise calculation of potential returns, dynamically calculates conditional volatility forecasts for improved position sizing, and enforces disciplined risk limits. Furthermore this model will dynamically manage open position based on current gains/loss and closes position when risk thresholds are breached, ensuring optimal trade execution in fast-moving markets.",
    technologies: ["C#(.NET)", "Maths & Quantitative Finance", "Time Series Analysis", "GARCH Modeling", "Real-Time Data API"],
    features: [
      "Market series data retrieval and return calculation for accurate analytics",
      "Implementation of sophisticated volatility models: GARCH(1,1) (Forex), EGARCH (Crypto), GJR-GARCH (Commodities/Oil)",
      "Real-time conditional volatility calculation for refined lot-sizing decisions",
      "Integrated risk management protocols with base (1-2%) and overall portfolio (5-7%) risk constraints",
      "Continuous position monitoring for prompt trade adjustments and re-entry signals",
      "Modular design suitable for multi-asset class quantitative trading systems"
    ]
  }
];

// Portfolio details data
const portfoliosData = {
  crypto: {
    name: "Crypto Portfolio",
    description: "Diversified cryptocurrency portfolio with focus on major assets and promising altcoins. The portfolio is rebalanced monthly to maintain target allocations and capture emerging opportunities in the crypto market.",
    value: "$50,000",
    performance: "+25.5%",
    assets: [
      { name: "Bitcoin (BTC)", allocation: 40, value: "$20,000", change: "+22.3%" },
      { name: "Ethereum (ETH)", allocation: 30, value: "$15,000", change: "+28.7%" },
      { name: "Altcoins", allocation: 30, value: "$15,000", change: "+26.4%" }
    ],
    strategy: "Long-term hold strategy with active rebalancing and tactical trading on breakouts. Focus on top-tier cryptocurrencies with strong fundamentals and emerging DeFi projects."
  },
  equity: {
    name: "Equity Portfolio",
    description: "Indian stock market investments focused on defense, railway, and banking sectors. Strategic allocation to benefit from government infrastructure spending and economic growth.",
    value: "₹15,00,000",
    performance: "+18.3%",
    assets: [
      { name: "Defense Stocks", allocation: 35, value: "₹5,25,000", change: "+24.1%" },
      { name: "Railway Stocks", allocation: 35, value: "₹5,25,000", change: "+16.8%" },
      { name: "Banking Stocks", allocation: 30, value: "₹4,50,000", change: "+14.2%" }
    ],
    strategy: "Sector rotation strategy focusing on government capex beneficiaries. Regular monitoring of policy changes and quarterly rebalancing based on sectoral performance."
  },
  options: {
    name: "Options Portfolio",
    description: "Options trading strategies across multiple market conditions and timeframes. Utilizing delta-neutral strategies and directional plays based on market analysis.",
    value: "$25,000",
    performance: "+32.7%",
    assets: [
      { name: "Call Options", allocation: 40, value: "$10,000", change: "+38.5%" },
      { name: "Put Options", allocation: 35, value: "$8,750", change: "+28.3%" },
      { name: "Spreads", allocation: 25, value: "$6,250", change: "+30.1%" }
    ],
    strategy: "Multi-strategy approach combining directional plays with delta-neutral strategies. Focus on daily expiry options with strict risk management and profit-taking discipline."
  }
};

// Modal functionality
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');

// View Details buttons for projects
const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
viewDetailsButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const projectCard = e.target.closest('.project-card');
    const projectIndex = parseInt(projectCard.getAttribute('data-project'));
    const project = projectsData[projectIndex];

    let featuresHTML = '';
    if (project.features) {
      featuresHTML = `
        <h4 style="color: var(--color-accent-blue); margin-top: 24px; margin-bottom: 12px;">Key Features:</h4>
        <ul style="margin-left: 20px; color: rgba(255, 255, 255, 0.8);">
          ${project.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
        </ul>
      `;
    }

    let techHTML = '';
    if (project.technologies) {
      techHTML = `
        <div style="margin-top: 24px;">
          <h4 style="color: var(--color-accent-blue); margin-bottom: 12px;">Technologies:</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${project.technologies.map(tech => `
              <span style="padding: 6px 12px; background: rgba(139, 92, 246, 0.2); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 6px; font-size: 12px; color: var(--color-accent-purple);">${tech}</span>
            `).join('')}
          </div>
        </div>
      `;
    }

    modalBody.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      ${project.fullDescription ? `<p style="margin-top: 16px;">${project.fullDescription}</p>` : ''}
      ${featuresHTML}
      ${techHTML}
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Portfolio details buttons
const portfolioDetailsButtons = document.querySelectorAll('.portfolio-details-btn');
portfolioDetailsButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const portfolioType = e.target.getAttribute('data-portfolio');
    const portfolio = portfoliosData[portfolioType];

    const assetsHTML = portfolio.assets.map(asset => `
      <div style="display: flex; justify-content: space-between; padding: 12px; background: rgba(0, 0, 0, 0.2); border-radius: 8px; margin-bottom: 12px;">
        <div>
          <div style="font-weight: 600; margin-bottom: 4px;">${asset.name}</div>
          <div style="font-size: 14px; color: rgba(255, 255, 255, 0.6);">${asset.allocation}% allocation</div>
        </div>
        <div style="text-align: right;">
          <div style="font-weight: 600; margin-bottom: 4px;">${asset.value}</div>
          <div style="font-size: 14px; color: var(--color-success-green);">${asset.change}</div>
        </div>
      </div>
    `).join('');

    modalBody.innerHTML = `
      <h3>${portfolio.name}</h3>
      <div style="display: flex; justify-content: space-between; margin: 16px 0; padding: 16px; background: rgba(59, 130, 246, 0.1); border-radius: 12px;">
        <div>
          <div style="font-size: 14px; color: rgba(255, 255, 255, 0.6); margin-bottom: 4px;">Total Value</div>
          <div style="font-size: 24px; font-weight: 700; color: var(--color-accent-blue);">${portfolio.value}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 14px; color: rgba(255, 255, 255, 0.6); margin-bottom: 4px;">Performance</div>
          <div style="font-size: 24px; font-weight: 700; color: var(--color-success-green);">${portfolio.performance}</div>
        </div>
      </div>
      <p style="margin: 16px 0;">${portfolio.description}</p>
      <h4 style="color: var(--color-accent-blue); margin: 24px 0 12px 0;">Asset Allocation:</h4>
      ${assetsHTML}
      <h4 style="color: var(--color-accent-blue); margin: 24px 0 12px 0;">Investment Strategy:</h4>
      <p style="color: rgba(255, 255, 255, 0.8);">${portfolio.strategy}</p>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
const closeModal = () => {
  modal.classList.remove('active');
  document.body.style.overflow = '';
};

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

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