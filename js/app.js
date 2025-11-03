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
  {
    title: "BTC/ETH Weekly Breakout Bot",
    description: "Automated cTrader trading bot that detects week starts and executes breakout strategies on Bitcoin and Ethereum. Features fixed $500 per-trade risk management with intelligent lot sizing based on price differences converted to pips.",
    fullDescription: "This sophisticated trading bot is designed to capitalize on weekly breakout patterns in cryptocurrency markets. It automatically detects the start of each trading week and monitors Bitcoin (BTC) and Ethereum (ETH) for breakout opportunities above previous week's highs or below previous week's lows. The system implements robust risk management with a fixed $500 per-trade risk, calculating optimal lot sizes based on the distance between entry and stop-loss levels. The bot converts cryptocurrency price movements to pip equivalents for precise position sizing, ensuring consistent risk exposure across all trades regardless of market volatility.",
    technologies: ["C#", "cTrader API", "Technical Analysis", "Risk Management"],
    features: [
      "Automatic week start detection",
      "Breakout pattern recognition",
      "Fixed risk per trade ($500)",
      "Dynamic lot sizing algorithm",
      "Price-to-pip conversion system",
      "Multi-asset support (BTC, ETH)"
    ]
  },
  {
    title: "Z-Score Mean Reversion Strategy",
    description: "Sophisticated algorithmic trading system combining Z-score statistical analysis with EMA, MACD, and ATR indicators.",
    fullDescription: "A comprehensive mean reversion trading system that leverages statistical analysis combined with technical indicators to identify high-probability trading opportunities. The strategy uses Z-score calculations to determine when prices have deviated significantly from their mean, while EMA crossovers confirm trend direction, MACD provides momentum signals, and ATR informs position sizing and stop-loss placement. The system includes advanced position sizing algorithms that adjust based on market volatility and account equity, dynamic stop-loss calculations that adapt to changing market conditions, and swing level detection for optimal entry and exit points. This multi-layered approach ensures trades are only taken when multiple confirmation signals align, significantly improving the probability of success.",
    technologies: ["C#", "cTrader", "Statistical Analysis", "Multiple Indicators"],
    features: [
      "Z-score statistical analysis",
      "EMA/SMA crossover signals",
      "MACD momentum confirmation",
      "ATR-based position sizing",
      "Dynamic stop-loss system",
      "Swing level detection",
      "Multi-timeframe analysis"
    ]
  },
  {
    title: "Crypto Options Trading System",
    description: "Delta Exchange India focused options trading strategies for daily expiry contracts.",
    fullDescription: "An advanced options trading system specifically designed for the Delta Exchange India platform, focusing on daily expiry cryptocurrency options. The system implements multiple strategies including straddles (simultaneous long call and put positions), butterflies (limited risk spread strategies), and directional call/put positions. Each strategy is optimized for different market scenarios: trending markets favor directional positions, mean-reversion conditions utilize straddles, and range-bound markets benefit from butterfly spreads. The system includes sophisticated tax optimization considerations for Indian traders, automatic position sizing based on account equity, real-time Greeks calculations (Delta, Gamma, Theta, Vega), and expiry management to avoid assignment risks. The platform integrates seamlessly with Delta Exchange API for automated order execution and position monitoring.",
    technologies: ["Python", "Options Pricing", "Risk Management", "Delta Exchange API"],
    features: [
      "Multiple options strategies",
      "Straddle and butterfly spreads",
      "Directional call/put positions",
      "Tax optimization for Indian markets",
      "Real-time Greeks calculations",
      "Automatic position sizing",
      "Expiry management system"
    ]
  },
  {
    title: "Pine Script Technical Indicators",
    description: "Custom TradingView indicators built in Pine Script v6 for detecting previous week's high and low levels.",
    fullDescription: "A collection of professional-grade custom indicators developed in Pine Script v6 for the TradingView platform. The primary indicator automatically identifies and marks previous week's high and low levels on any chart, providing crucial support and resistance levels for trading decisions. The system features automated marking of weekly boundaries with color-coded zones, integration with multi-timeframe analysis to show weekly levels on lower timeframes, customizable alert system for price approaching key levels, and visual enhancements including shaded zones and labels. Additional indicators include swing high/low detection, trend strength measurement, and volume profile analysis. All indicators are optimized for performance and can be combined to create comprehensive trading systems.",
    technologies: ["Pine Script v6", "TradingView", "Technical Analysis", "Chart Patterns"],
    features: [
      "Previous week high/low detection",
      "Automated level marking",
      "Multi-timeframe integration",
      "Custom alert system",
      "Swing point detection",
      "Trend strength indicators",
      "Volume profile analysis"
    ]
  },
  {
    title: "Portfolio Risk Management Dashboard",
    description: "Real-time portfolio monitoring and risk management system with position sizing calculations.",
    fullDescription: "A comprehensive portfolio risk management dashboard built with Python and Streamlit, providing real-time monitoring and analysis of trading positions across multiple platforms and asset classes. The system calculates optimal position sizes based on account equity and risk tolerance, manages stop-loss levels with trailing functionality, sets profit targets using risk-reward ratios, and monitors overall portfolio exposure. Features include real-time P&L tracking, correlation analysis between positions, margin utilization monitoring, automated risk alerts via email/SMS, integration with multiple trading platforms (cTrader, Delta Exchange, etc.), historical performance analytics, and advanced reporting with exportable data. The dashboard provides a centralized view of all trading activities, enabling better risk management and decision-making.",
    technologies: ["Python", "Streamlit", "Database Integration", "Real-time Analytics"],
    features: [
      "Real-time P&L tracking",
      "Position sizing calculator",
      "Stop-loss management",
      "Profit target optimization",
      "Portfolio correlation analysis",
      "Risk exposure monitoring",
      "Automated alerts system",
      "Multi-platform integration"
    ]
  },
  {
    title: "Multi-Timeframe Analysis Tool",
    description: "Advanced analysis tool using 4-hour time windows to analyze volume patterns and price swings.",
    fullDescription: "An advanced technical analysis tool that performs comprehensive multi-timeframe analysis using 4-hour time windows as the primary analysis period. The system analyzes volume patterns to identify accumulation and distribution phases, detects price swings using rule-based methods for identifying swing highs and lows, and combines EMA/SMA crossovers for trend confirmation. The tool provides multi-timeframe confirmations by analyzing higher and lower timeframes simultaneously, generates high-probability trade setups when all timeframes align, and includes pattern recognition for chart patterns (triangles, channels, head and shoulders, etc.). Additional features include divergence detection between price and indicators, support/resistance level identification, and automated trade setup notifications. The system helps traders make more informed decisions by providing a complete picture of market structure across multiple timeframes.",
    technologies: ["Python", "Technical Analysis", "Volume Analysis", "Pattern Recognition"],
    features: [
      "4-hour time window analysis",
      "Volume pattern recognition",
      "Swing high/low detection",
      "EMA/SMA crossover signals",
      "Multi-timeframe confirmation",
      "Chart pattern detection",
      "Divergence analysis",
      "Automated setup notifications"
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

// Contact form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const btnText = contactForm.querySelector('.btn-text');
  const btnLoader = contactForm.querySelector('.btn-loader');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  
  // Show loading state
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';
  submitBtn.disabled = true;
  
  // Simulate form submission
  setTimeout(() => {
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    submitBtn.disabled = false;
    
    // Show success message in modal
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 32px;">
        <div style="width: 80px; height: 80px; background: rgba(16, 185, 129, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-success-green)" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 style="margin-bottom: 16px;">Message Sent Successfully!</h3>
        <p style="color: rgba(255, 255, 255, 0.7);">Thank you for reaching out. I'll get back to you as soon as possible.</p>
      </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    contactForm.reset();
  }, 2000);
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
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