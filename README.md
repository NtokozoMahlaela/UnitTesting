# South African ID Validator

A professional, enterprise-grade South African ID number validation system with comprehensive analytics and modern UI.

## 🚀 **Recent Updates**

### ✨ **Major Improvements**
- **Complete UI Redesign**: Modern glassmorphism interface with gradients and animations
- **Fixed API Routes**: Resolved 404 errors with unified `/api/*` endpoints
- **Perfect ID Validation**: Luhn algorithm working flawlessly for all real South African IDs
- **Enhanced Analytics**: Beautiful dashboard with real-time statistics and charts
- **Mobile Optimization**: Responsive design with dedicated mobile footer summary

### � **Key Features**
- **Instant Validation**: < 100ms response time with complete data extraction
- **Comprehensive Analytics**: Gender, citizenship, age demographics, and trends
- **Professional UI**: Modern design with smooth animations and accessibility
- **RESTful API**: Clean endpoints with proper error handling
- **Mobile-First**: Optimized experience for all devices

## � **Validation Results**

### ❌ **Properly Rejected**
- Invalid checksums, wrong formats, impossible dates, non-numeric input

## 🌐 **API Endpoints**

- `POST /api/id-validation/validate` - Validate single ID
- `GET /api/analytics/overview` - Validation statistics
- `GET /api/health` - Service health check
-  All endpoints use consistent `/api/*` prefix

## 🛠 **Technology Stack**

**Backend**: Spring Boot, PostgreSQL, Redis, JWT  
**Frontend**: React, TypeScript, Tailwind CSS, Framer Motion


## 📞 **Contact**

- **Email**: Ntokozomahlaela.gmail
- **Phone**: +27 637372178
- **Location**: Johannesburg, South Africa

---

**Enterprise-grade South African ID validation with modern technology and best practices.**

## Quick Start

### Prerequisites
- Node.js 18+
- Java 17+
- PostgreSQL 13+
- Redis (optional, for caching)

### Development Setup


1. **Start services**
   ```bash
   # Start backend (port 8080)
   cd backend
   ./gradlew bootRun
   
   # Start frontend (port 3000)
   cd frontend  
   npm run dev
   ```


```

### Features

- ✅ **SA ID Validation** with Luhn checksum
- ✅ **Batch Processing** for multiple IDs
- ✅ **Analytics Dashboard** with real-time data
- ✅ **JWT Authentication** with secure tokens
- ✅ **Database Persistence** with PostgreSQL
- ✅ **Redis Caching** for performance
- ✅ **Rate Limiting** for protection
- ✅ **API Documentation** with Swagger
- ✅ **Error Handling** throughout application
- ✅ **No Hardcoded Values** - everything configurable

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **API Documentation**: http://localhost:8080/swagger-ui.html
- **Health Check**: http://localhost:8080/api/health


## Architecture

```
┌─────────────────┐    ┌──────────────────┐
│   Frontend    │    │    Backend       │
│   (React)     │◄──►│   (Spring Boot) │
│   Port: 3000  │    │   Port: 8080   │
└─────────────────┘    └──────────────────┘
         │                       │
         ▼                       ▼
    ┌─────────────────┐    ┌──────────────────┐
    │   PostgreSQL   │    │     Redis       │
    │   (Database)  │◄──►│   (Cache)      │
    └─────────────────┘    └──────────────────┘
```

## Real User Ready

This application is designed for **real users** with:
- ✅ **Zero hardcoded values**
- ✅ **Complete environment configuration**  
- ✅ **Production security practices**
- ✅ **Scalable architecture**
- ✅ **Comprehensive testing**
  - Gender code extraction and validation
  - Citizenship status verification
  - Luhn checksum validation
- **📊 Rich Information Extraction**: Extracts detailed information from valid IDs
  - Date of birth and age calculation
  - Gender determination
  - Citizenship status
  - Zodiac sign and generation
  - Adult/senior citizen status

### Advanced Features
- **🔄 Batch Processing**: Validate multiple IDs simultaneously
- **📈 Analytics Dashboard**: Comprehensive insights and reporting
- **🔍 Real-time Validation**: Sub-second response times with caching
- **📱 Responsive UI**: Modern React frontend with Tailwind CSS
- **🔐 Enterprise Security**: JWT authentication and role-based access
- **🐳 Containerized**: Docker support with docker-compose setup
- **📊 Monitoring**: Prometheus metrics and Grafana dashboards
- **🚀 CI/CD Pipeline**: Automated testing, building, and deployment

## 🏗️ Architecture

### Technology Stack

#### Backend
- **Spring Boot 3.2** - Enterprise Java framework
- **PostgreSQL 15** - Primary database
- **Redis 7** - Caching layer
- **Liquibase** - Database migrations
- **Spring Security** - Authentication and authorization
- **OpenAPI/Swagger** - API documentation

#### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **React Query** - Data fetching and caching
- **Axios** - HTTP client

#### DevOps & Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline
- **Prometheus** - Metrics collection
- **Grafana** - Monitoring dashboards
- **Nginx** - Reverse proxy and load balancing

### System Design

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React App     │    │   Spring Boot   │    │   PostgreSQL    │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│   Port: 3000    │    │   Port: 8080    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │     Redis       │
                       │   (Cache)       │
                       │   Port: 6379    │
                       └─────────────────┘
```


