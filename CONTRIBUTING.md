# 🤝 Contributing to Rhode Island Fishing Guide

Thank you for your interest in contributing to the Rhode Island Fishing Guide! This document provides guidelines and information for contributors.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Issue Reporting](#issue-reporting)
- [Pull Request Process](#pull-request-process)
- [Development Standards](#development-standards)

---

## 🤝 Code of Conduct

This project follows a respectful and inclusive community standard. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Respect different viewpoints and experiences
- Accept responsibility for your actions
- Help create a welcoming environment

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Basic knowledge of React/Next.js (for code contributions)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/rhode-island-fishing-guide.git
   cd rhode-island-fishing-guide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📝 Contributing Guidelines

### Types of Contributions

We welcome several types of contributions:

#### 🐛 Bug Reports
- Use the GitHub issue template
- Include detailed reproduction steps
- Provide expected vs actual behavior
- Include screenshots if applicable

#### 💡 Feature Requests
- Describe the feature clearly
- Explain the use case and benefits
- Consider implementation complexity
- Check existing issues first

#### 🔧 Code Contributions
- Follow the coding standards below
- Write tests for new features
- Update documentation as needed
- Ensure all checks pass

#### 📚 Documentation
- Fix typos and improve clarity
- Add examples and tutorials
- Update API documentation
- Improve user guides

#### 🎨 UI/UX Improvements
- Enhance visual design
- Improve accessibility
- Optimize mobile experience
- Add animations and interactions

---

## 🐛 Issue Reporting

### Before Creating an Issue
1. Check existing issues to avoid duplicates
2. Ensure you're using the latest version
3. Try to reproduce the issue consistently

### Issue Template
```markdown
## Bug Report

**Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Version: [e.g., 22]

**Additional Context**
Any other relevant information.
```

---

## 🔄 Pull Request Process

### Before Submitting
1. **Fork and branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

3. **Test thoroughly**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

4. **Commit changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

### Pull Request Template
```markdown
## Pull Request

**Description**
Brief description of changes.

**Type of Change**
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] UI/UX improvement
- [ ] Performance optimization

**Testing**
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

**Screenshots**
If applicable, add screenshots.

**Additional Notes**
Any additional information for reviewers.
```

---

## 🛠️ Development Standards

### Code Style
- **TypeScript**: Use strict typing
- **ESLint**: Follow configured rules
- **Prettier**: Consistent formatting
- **Naming**: Use descriptive, camelCase names

### Component Guidelines
```typescript
// ✅ Good component structure
interface ComponentProps {
  title: string;
  onAction: () => void;
}

export default function Component({ title, onAction }: ComponentProps) {
  return (
    <div className="component-wrapper">
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

### File Organization
```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable components
│   ├── Layout/         # Layout components
│   ├── AI/             # AI-related components
│   └── ...
├── data/               # Static data files
├── services/           # Business logic
├── styles/             # CSS files
└── types/              # TypeScript interfaces
```

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design
- Maintain accessibility standards

### Data Management
- Keep data types in `/src/types/`
- Place business logic in `/src/services/`
- Use local storage for client-side data
- Follow the existing data patterns

---

## 🎣 Rhode Island Fishing Data

### Adding New Locations
1. Update `/src/data/rhodeIslandLocations.ts`
2. Follow the existing location structure
3. Include accurate coordinates and information
4. Add appropriate fish species

### Adding New Fish Species
1. Update `/src/data/rhodeIslandFishSpecies.ts`
2. Create SVG illustration in `/public/images/fish/`
3. Include accurate regulatory information
4. Map to appropriate locations

### AI Knowledge Updates
1. Update `/src/services/aiService.ts`
2. Add to the `expertKnowledge` object
3. Include Rhode Island-specific patterns
4. Test with various scenarios

---

## 🧪 Testing

### Running Tests
```bash
# Lint code
npm run lint

# Type checking
npm run type-check

# Build verification
npm run build

# Manual testing checklist
- [ ] Home page loads correctly
- [ ] All navigation works
- [ ] AI recommendations function
- [ ] Fish species display properly
- [ ] Journal functionality works
- [ ] Gear recommendations load
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
```

---

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

### Rhode Island Fishing Resources
- [RI DEM Marine Fisheries](https://dem.ri.gov/marine-fisheries)
- [NOAA Weather Service](https://www.weather.gov/box/)
- [USGS Water Data](https://waterdata.usgs.gov/ri/nwis)

---

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

---

## 📞 Contact

For questions about contributing:
- Create a GitHub issue
- Contact Kali Consulting LLC
- Email: support@kaliconsulting.com

---

**Thank you for contributing to Rhode Island Fishing Guide! 🎣**

*Built with ❤️ by Kali Consulting LLC*
