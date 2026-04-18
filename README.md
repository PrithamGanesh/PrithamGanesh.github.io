# Pritham Ganesh Portfolio

A modern personal portfolio built to present cybersecurity-focused, AI-powered project work with a clean and professional visual style.

## Overview

This repository contains the source for my portfolio website. The site is designed as a polished single-page experience that highlights:

- professional positioning and contact links
- featured cybersecurity and AI-leveraged projects
- technical strengths and tooling
- a modern responsive layout using HTML, CSS, and lightweight JavaScript

## Featured Projects

The portfolio currently showcases:

- **RiskEngine**: an AI-assisted security monitor with heuristic risk scoring, alert generation, and container-ready deployment
- **LiveSOC**: an AI-leveraged cyber threat dashboard for real-time alert ingestion, scoring, and monitoring workflows

## Stack

- HTML5
- CSS3
- JavaScript
- Font Awesome
- Google Fonts

## Project Structure

```text
.
|-- index.html
|-- README.md
|-- LICENSE
`-- assets/
    |-- css/
    |-- sass/
    `-- webfonts/
```

## Running Locally

Because this is a static site, no build step is required.

1. Clone the repository:

```bash
git clone https://github.com/PrithamGanesh/PrithamGanesh.github.io.git
```

2. Open the project folder:

```bash
cd PrithamGanesh.github.io
```

3. Launch `index.html` in your browser.

## Recent Enhancements (2026)

### SEO & Metadata
- **Open Graph tags**: Optimized for social media sharing (Facebook, Twitter, LinkedIn)
- **JSON-LD structured data**: Added Person schema and breadcrumb navigation for improved search engine understanding
- **Meta tags**: Added theme color, robots directives, and language metadata
- **Performance**: Added DNS prefetch and preconnect hints for Google Fonts and external services

### Accessibility Improvements
- **Focus indicators**: Added visible focus-visible outlines on all interactive elements (buttons, links, navigation)
- **Keyboard navigation**: Fully keyboard accessible; Tab through all elements smoothly
- **WCAG compliance**: Improved contrast and focus management for better accessibility

### Content & UX Enhancements
- **Project descriptions**: Expanded with problem statements, challenges, and learning outcomes
- **New CTAs**: Added "Download Resume" and "Schedule a Call" buttons
- **Responsive buttons**: Better scaling on tablet and mobile devices
- **Strong styling**: Highlighted key project points with visual emphasis

### Configuration Required

To fully activate all enhancements, update the following:

1. **Add your resume**:
   - Create or download your resume as a PDF
   - Place it in the portfolio root directory and name it `resume.pdf`
   - The "Download Resume" button will automatically work

2. **Configure Calendly**:
   - Replace `https://calendly.com/prithamganesh` in index.html with your actual Calendly URL
   - Search for `href="https://calendly.com/prithamganesh"` and update accordingly

3. **Add Open Graph image**:
   - Create a 1200x630px preview image of your portfolio (or a professional headshot)
   - Save it as `assets/og-image.png`
   - This image will be used when your portfolio is shared on social media

4. **Update Twitter/Social handles** (optional):
   - Add `twitter:creator` meta tag with your Twitter handle if available

## Customization

To adapt the site for your own use, update:

- `index.html` for content, links, and section copy
- `assets/css/main.css` for layout, colors, typography, and component styling
- `assets/css/noscript.css` for graceful no-JavaScript presentation

## Design Direction

This portfolio emphasizes:

- a modern dark interface with premium contrast
- responsive project cards and structured content sections
- professional project storytelling instead of a minimal landing page
- AI-powered and cybersecurity-oriented brand positioning

## Recommended Next Steps

### Immediate Priorities
1. **Add resume PDF** - Essential for the "Download Resume" button to work
2. **Update Calendly URL** - Set your actual scheduling link for the "Schedule a Call" button
3. **Create Open Graph image** - Improves social media sharing appearance (1200x630px recommended)

### Performance & Analytics
- **Set up analytics** - Consider Google Analytics 4 or privacy-focused alternatives (Plausible, Fathom)
- **Monitor page performance** - Use Google PageSpeed Insights or WebPageTest to track improvements
- **Add compression headers** - If hosting on GitHub Pages, consider adding a `Netlify` or `Vercel` deployment for advanced caching

### Content Enhancements
- **Add project demos** - Consider adding live demo links or GIFs showing RiskEngine and LiveSOC in action
- **Create case studies** - Expand project cards with brief "How I built this" narratives
- **Add certifications** - Include relevant cybersecurity certifications (OSINT, CEH, etc.) if applicable
- **Blog section** (optional) - Consider a simple blog for sharing cybersecurity insights and learnings

### Advanced Features (Future)
- **Dark/Light theme toggle** - Add a theme switcher for user preference
- **Project filtering** - Group projects by technology or domain (Backend, Security Tools, etc.)
- **Newsletter signup** - Consider adding an email signup form for interested viewers
- **View counter** - Add a simple visitor counter or engagement metrics (optional)

## Testing Checklist

- [ ] **Mobile responsiveness** - Test on iPhone, Android, tablet devices
- [ ] **Keyboard navigation** - Verify Tab key navigation works smoothly
- [ ] **Screen reader** - Test with NVDA or JAWS to ensure accessibility
- [ ] **Cross-browser** - Test on Chrome, Firefox, Safari, and Edge
- [ ] **Social sharing** - Verify Open Graph preview on LinkedIn, Twitter, Facebook
- [ ] **Page load time** - Ensure fast loading on 4G networks

## License

This project is available under the terms of the [LICENSE](LICENSE).
