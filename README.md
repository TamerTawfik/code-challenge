# Skip Hire Booking Application

A modern, responsive web application for booking skip hire services built with React, TypeScript, and Vite. This application provides an intuitive multi-step booking process with real-time data integration and professional UI/UX design.

![Skip Hire App](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5+-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-teal.svg)

## 🚀 Features

### 📋 Multi-Step Booking Process

- **Progressive sidebar navigation** with animated progress indicators
- **Step-by-step workflow** guiding users through the booking process
- **Mobile-responsive design** with collapsible navigation
- **Visual feedback** for completed, current, and upcoming steps

### 🗂️ Skip Selection Interface

- **Real-time API integration** fetching skip data from WeWantWaste API
- **Interactive skip cards** with hover animations and selection states
- **Price calculation** with VAT breakdown and total pricing
- **Feature badges** showing road legality, heavy waste compatibility
- **Warning systems** for permit requirements
- **Responsive grid layout** adapting to different screen sizes

### 🎨 Advanced UI/UX

- **Loading states** with skeleton loaders matching actual content
- **Error handling** with user-friendly messages and retry functionality
- **Right-side confirmation drawer** with detailed skip information
- **Professional styling** using Tailwind CSS and shadcn/ui components
- **Accessibility features** with ARIA labels and semantic HTML

### 🔧 Technical Excellence

- **TypeScript throughout** with comprehensive type safety
- **Custom hooks** for API data management
- **Error boundaries** and robust error handling
- **Performance optimizations** with efficient rendering patterns
- **Clean code architecture** with separation of concerns

## 🏗️ Architecture & Approach

### 🎯 Component-Based Architecture

```
src/
├── components/           # Reusable UI components
│   ├── SkipCard.tsx     # Individual skip display card
│   ├── SkipSelection.tsx # Main skip selection interface
│   ├── SkipLoader.tsx   # Loading skeleton components
│   └── ErrorDisplay.tsx # Error handling component
├── hooks/               # Custom React hooks
│   └── useSkips.ts      # API integration hook
├── constants/           # Configuration and constants
│   └── index.ts         # Centralized app constants
└── App.tsx             # Main application shell
```

### 🔄 State Management Strategy

- **Local component state** for UI interactions
- **Custom hooks** for API data management
- **Props drilling** for simple parent-child communication
- **Context-ready architecture** for future scaling

### 🌐 API Integration Approach

- **RESTful API integration** with the WeWantWaste service
- **Error-first design** with comprehensive error handling
- **Loading state management** with skeleton UI
- **Data transformation** filtering and sorting API responses
- **Retry mechanisms** for failed requests

### 📱 Responsive Design Philosophy

- **Mobile-first approach** with progressive enhancement
- **Flexible grid systems** adapting to screen sizes
- **Touch-friendly interactions** with proper hit targets
- **Accessible design** following WCAG guidelines

## 🛠️ Technology Stack

### Core Technologies

- **React 19+** - Modern React with hooks and functional components
- **TypeScript 5+** - Full type safety and developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

### UI/UX Libraries

- **shadcn/ui** - High-quality, accessible component library
- **Lucide React** - Beautiful, customizable icons
- **Radix UI** - Headless UI primitives for accessibility

### Development Tools

- **ESLint** - Code linting and quality checks
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite HMR** - Hot module replacement for fast development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/TamerTawfik/code-challenge
cd code-challange

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup

The application uses the WeWantWaste API with default configuration:

- **API Base URL**: `https://app.wewantwaste.co.uk`
- **Default Location**: Lowestoft, NR32

Configuration can be modified in `src/constants/index.ts`.

## 📁 Code Organization

### 🔧 Custom Hooks

**`useSkips.ts`** - Comprehensive API integration hook

- Automatic data fetching with dependency tracking
- Loading state management
- Error handling with user-friendly messages
- Data processing (filtering, sorting)
- Retry functionality for error recovery

### 🎨 Component Design Patterns

**Composition over Inheritance**

- Small, focused components with single responsibilities
- Reusable utility functions extracted from components
- Props-based customization for flexibility

**Accessibility-First Design**

- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility

### 📊 State Management Patterns

**Local State for UI**

- Component-level state for interactions
- Computed values for dynamic styling
- Event handlers for user actions

**Custom Hooks for Data**

- Centralized API logic
- Reusable data fetching patterns
- Error and loading state management

## 🎯 Development Best Practices

### 📝 Code Quality

- **Comprehensive TypeScript** with strict type checking
- **JSDoc documentation** for all public APIs
- **Consistent naming conventions** throughout the codebase
- **Error-first design** with graceful failure handling

### ♿ Accessibility Standards

- WCAG 2.1 AA compliance
- Screen reader optimization
- Keyboard navigation support
- Color contrast requirements

### 🔄 Performance Considerations

- Lazy loading for route splitting
- Memoization for expensive computations
- Efficient re-rendering patterns
- Optimized bundle sizes

### Code Style Guidelines

- Use **functional components** with hooks
- Implement **proper error boundaries**
- Follow **accessibility best practices**
- Maintain **consistent file structure**
- Add **comprehensive documentation**

## 🙏 Acknowledgments

- **WeWantWaste API** for providing skip hire data
- **shadcn/ui** for the excellent component library
- **Tailwind CSS** for the utility-first CSS framework
- **React ecosystem** for the powerful development tools

---
