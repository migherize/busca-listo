# Buscalisto - Product Comparison Platform

## Overview

Buscalisto is a healthcare product comparison platform that allows users to search, filter, and compare pharmaceutical products, vitamins, supplements, and personal care items. The application provides a comprehensive product search experience with category filtering, pagination, and detailed product information including pricing, availability, and prescription requirements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The application uses a modern React-based frontend with TypeScript, built on top of Vite for fast development and optimized builds. The UI is constructed using shadcn/ui components with Radix UI primitives, providing a consistent and accessible design system.

**Key Frontend Design Decisions:**
- **Component Architecture**: Modular component structure with clear separation of concerns between presentation and business logic
- **State Management**: React hooks and context for local state, with TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Type Safety**: Full TypeScript integration with shared schema definitions

**Component Structure:**
- Reusable UI components in `components/ui/` following shadcn/ui patterns
- Feature-specific components for product display, navigation, and user interactions
- Custom hooks for data fetching and state management

### Backend Architecture

The backend follows a REST API architecture built with Express.js and TypeScript, designed for scalability and maintainability.

**Key Backend Design Decisions:**
- **Storage Abstraction**: Interface-based storage layer allowing easy switching between in-memory and database implementations
- **Route Organization**: Centralized route registration with clear API structure
- **Development Integration**: Vite integration for seamless full-stack development experience
- **Error Handling**: Centralized error handling middleware for consistent API responses

**Current Implementation:**
- In-memory storage for development with extensible interface for database integration
- Express middleware for logging, JSON parsing, and error handling
- Development-optimized setup with hot reloading and source maps

### Data Layer

**Schema Design:**
- Zod schemas for runtime validation and type inference
- Product schema includes comprehensive metadata: pricing, availability, prescription requirements, supplier information
- Category enumeration for consistent product classification

**Data Storage Strategy:**
- Current: In-memory storage for rapid development and testing
- Designed for: Easy migration to PostgreSQL with Drizzle ORM
- Storage interface allows for seamless backend switching without frontend changes

### Development Workflow

**Build System:**
- Vite for frontend bundling with optimized development experience
- esbuild for backend compilation and bundling
- TypeScript compilation with strict type checking across the entire codebase

**Development Environment:**
- Integrated development server with HMR for both frontend and backend
- Shared TypeScript configuration and path aliases
- Development-specific tooling including error overlays and debugging support

## External Dependencies

### Database
- **Planned**: PostgreSQL with Neon Database for production data storage
- **Current**: In-memory storage for development
- **ORM**: Drizzle with migrations support for schema management

### UI and Styling
- **Component Library**: Radix UI primitives for accessibility and functionality
- **Design System**: shadcn/ui components for consistent UI patterns
- **Styling**: Tailwind CSS for utility-first styling approach
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build Tools**: Vite for frontend, esbuild for backend bundling
- **Type System**: TypeScript with strict configuration
- **Code Quality**: ESLint integration for code standards
- **Development Platform**: Replit-optimized configuration for cloud development

### Frontend Libraries
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: Wouter for lightweight client-side navigation
- **Forms**: React Hook Form with Zod validation resolvers
- **Date Handling**: date-fns for date manipulation and formatting

### Backend Infrastructure
- **Web Framework**: Express.js for HTTP server and middleware
- **Runtime**: Node.js with ES modules support
- **Session Management**: connect-pg-simple for PostgreSQL session storage (when database is connected)
- **Development**: tsx for TypeScript execution in development