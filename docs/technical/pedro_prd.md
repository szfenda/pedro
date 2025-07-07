# Pedro.pl - Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 2025-05-19  
**Author:** Marcin Czaplicki & Gemini 2.5

---

## General Assumptions

**Pedro** is a platform aggregating promotions, discounts, and coupons for a variety of services and goods. Its main goal is to connect users looking for deals with businesses seeking to attract new customers.

### 1.1 Value Proposition

#### For Users (Customers)
- Save money by accessing a wide range of discounts and promotions in one place
- Discover new places and services at attractive prices
- Easy purchase and management of coupons

#### For Businesses (Partners)
- An effective marketing channel for acquiring new customers
- Increasing brand visibility and promoting services/products, especially during low-traffic periods
- Measurable campaign results

#### For the Platform (pedro.pl)
- Revenue generation through commissions on coupon sales, fees for promoting offers, or subscription models for partners
- Building a loyal base of users and partners

### 1.2 Key Features (End-User View)

#### Browsing Offers
- **Homepage:** Displays popular, new, and recommended offers, often grouped thematically or by category. Promotional banners
- **Categories:** Clearly defined categories (e.g., Food, Beauty, Health, Entertainment, Sports, Tourism, Goods, Services, Auto). Ability to browse offers within a selected category
- **Search:** Search offers by keywords, company name, location
- **Filtering and Sorting:** Filter offers (e.g., by location/district, price, discount amount, availability today) and sort (e.g., popularity, price, date added, discount amount)
- **Map:** Visualize offers on a map, especially useful for local services (restaurants, beauty salons)

#### Offer Details
- **Description:** Detailed description of the service/product under promotion
- **Terms:** Clearly defined terms of the offer (coupon validity, reservation required, person limit, exclusions)
- **Prices:** Original price, discounted price, discount amount (percentage and value)
- **Partner Information:** Company name, address(es), opening hours, phone number, website link (if applicable), map location
- **Photos/Videos:** Visual presentation of the offer
- **Reviews and Ratings:** Section with reviews and ratings from other users who have used the offer. Ability to add your own review
- **Counter:** Information on the number of coupons sold or remaining time for the offer
- **Action Buttons:** "Buy" or "Get promo code" -- depending on the offer model (paid coupon vs. free promo code)

#### Coupon Purchase/Redemption Process
- Option selection (if the offer has variants)
- Add to cart (for paid coupons)
- Payment process (integration with local payment gateways)
- Purchase/receipt confirmation
- Access to coupon/code in the user profile and/or sent via email/SMS

#### User Account
- **Registration/Login:** Email/password, login via social networks (e.g., Google, Facebook)
- **My Coupons:** List of purchased/received coupons (active, used, expired). Ability to view coupon and code details
- **Favorites:** List of saved offers or partners
- **My Reviews:** History of added reviews
- **Profile Settings:** Edit personal data, password, notification preferences
- **Account Balance (optional):** Ability to top up the account and pay with internal funds

#### Location
- City selection for which offers are displayed (e.g., Gdańsk, Warszawa, Kraków, Poznań)

#### Notifications
- Email/Push about new offers in favorite categories, expiring coupons, etc.

#### Help/FAQ
- Section with answers to frequently asked questions

### 1.3 Key Features (Business/Partner View)

#### Partner Panel
- Dedicated web interface for companies
- Company Registration/Login: Company verification process
- Company Profile Management: Edit company data (name, description, addresses, phones, logo, photos)

#### Offer Creation and Management
- Offer creator (title, description, categories, terms, prices, discounts, validity period, coupon limit)
- Manage offer statuses (active, inactive, pending approval, ended)
- Ability to promote offers (higher position in the list, "recommended" label)

#### Coupon/Code Management
- Coupon verification system (e.g., entering code in the panel, scanning QR code)
- Overview of used and unused coupons

#### Statistics and Reports
- Data on offer views, number of coupons sold/downloaded, revenue, customer reviews

#### Communication
- Responding to customer reviews

#### Settlements
- Overview of transaction and invoice history with the platform

### 1.4 Key Features (Platform Administrator View)

#### Dashboard
- Overview of key platform metrics (number of users, partners, active offers, sales, revenue)

#### User Management
- View, edit, block user accounts

#### Partner Management
- Verification and approval of new partners, management of their profiles and permissions

#### Offer Management
- Approve/reject new offers submitted by partners
- Edit offers
- Manage offer categories
- Manage promoted offers and banners on the homepage

#### Content Management
- Edit static pages (FAQ, terms), manage blog/news

#### Review Moderation
- View and moderate user reviews

#### Location Management
- Add/edit cities and regions supported by the platform

#### System Settings
- Configure payment gateways, email/SMS notification templates, platform parameters

#### Reports and Analytics
- Advanced reports on sales, category popularity, partner effectiveness, etc.

#### Technical Support
- Handle tickets from users and partners

### 1.5 Architecture and Technologies

#### Frontend
- Modern JavaScript framework (React, Vue, Angular) or server-side rendering with dynamic elements
- Responsive web design (RWD)

#### Backend
- Backend language and framework (e.g., PHP, Python, Java, Node.js)
- Relational database (e.g., PostgreSQL, MySQL) for structured data
- Possibly NoSQL for logs or less structured data
- Cache system (Redis, Memcached) for frequently queried data
- Search solution (Elasticsearch, Solr) for better performance

#### API
- REST API for communication between frontend and backend
- Potential mobile app support

#### Infrastructure
- Cloud hosting (AWS, GCP, Azure)
- CDN for static assets
- Email/SMS services integration
- Payment gateway integration
- Monitoring and logging tools

---

## 2. Product Requirements Document (PRD)

### 2.1 Introduction

#### Product Vision
To create a leading platform in the Polish regional market for offer leaflets and small businesses/services, aggregating the best local deals, discounts, and coupons, delivering value to both consumers seeking savings and local businesses aiming to reach new customers.

#### Product Goals
- Build an MVP (Minimum Viable Product) platform within 3 months
- Acquire 50 business partners in the first quarter after launch
- Reach 500 registered users in the first quarter after launch
- Ensure a high level of user satisfaction (NPS > 40)
- Create a scalable and easy-to-maintain architecture

#### Target Audience

**Consumers:**
- Residents of small, medium, and large cities
- Price-conscious, actively seeking promotions for services and local goods
- Aged 18-55, using the internet and smartphones

**Businesses (Partners):**
- Small and medium-sized enterprises (SMEs) in Poland
- Operating in service and retail sectors
- Interested in performance marketing and acquiring new customers

#### Key Success Metrics (KPIs)
- Number of active users (MAU/DAU)
- Number of active partners
- Number of published offers
- Number of coupons sold/downloaded
- Conversion rate (visits → coupon purchase/download)
- Revenue (total, average per partner/user)
- User and partner retention
- Satisfaction rating (NPS, app store ratings)

### 2.2 User Personas

#### Anna - Customer (Consumer)
- 30-year-old office worker
- Likes eating out and self-care but is price-conscious
- Actively looks for promotions for restaurants, beauty treatments, and fitness classes
- Uses mobile apps and websites to find deals
- Values ease of use and trustworthy reviews

#### Jan - Restaurant Owner (Partner)
- 45-year-old owner of a small restaurant
- Wants to increase customer numbers on weekdays and promote new dishes
- Has a limited marketing budget and seeks measurable promotion channels
- Needs a simple tool to create offers and track their effectiveness

#### Admin - Platform Administrator
- Responsible for the smooth operation of the platform
- Manages users, partners, and content
- Ensures offer quality and moderates reviews
- Monitors key metrics and reports results
- Needs an efficient admin panel with access to all key management functions

## 3. Features (User Stories / Functional Requirements)

### 3.1 Epic: Discovering Offers (Customer)

- As a Customer, I want to browse offers on the homepage to quickly see the most interesting promotions
- As a Customer, I want to browse offers by clearly defined categories (e.g., Food, Beauty, Entertainment) to find the types of promotions I'm interested in
- As a Customer, I want to search for offers by keywords (name, service type, location) to quickly find a specific promotion
- As a Customer, I want to filter offers by location (city, district), price, discount amount, availability, to narrow results to the most relevant ones
- As a Customer, I want to sort offers by popularity, price (ascending/descending), date added, discount amount, to organize results according to my preferences
- As a Customer, I want to see offers on an interactive map to easily locate promotions near me
- As a Customer, I want to see offer details (detailed description, terms, prices, photos, partner info, map location) to make an informed decision
- As a Customer, I want to read reviews and ratings from other users about the offer/partner to learn about their experiences

### 3.2 Epic: Coupon Purchase and Management (Customer)

- As a Customer, I want to select an offer variant (if available) and add a paid coupon to my cart
- As a Customer, I want to go through a simple and secure online payment process to buy a coupon
- As a Customer, I want to receive a free promo code (if the offer is free) after clicking a button
- As a Customer, I want to receive purchase/receipt confirmation by email
- As a Customer, I want access to my active, used, and expired coupons/codes in my profile
- As a Customer, I want to easily view coupon details (including the code to show to the partner)

### 3.3 Epic: Customer Account

- As a Customer, I want to register using my email and password
- As a Customer, I want to log in to my account
- As a Customer, I want to reset a forgotten password
- As a Customer, I want to edit my profile data (name, email, password)
- As a Customer, I want to add offers/partners to my favorites list for easy access
- As a Customer, I want to add reviews and ratings to offers I have used
- As a Customer, I want to manage my email notification preferences

### 3.4 Epic: Partner Portal (Business)

- As a Partner, I want to register my company on the platform, providing necessary data and going through a verification process
- As a Partner, I want to log in to a dedicated partner panel
- As a Partner, I want to manage my company profile (name, description, logo, photos, contact details, locations)
- As a Partner, I want to create a new offer using an intuitive form (title, description, category, photos, terms, prices, discount, validity period, coupon limit)
- As a Partner, I want to manage my offers (activate, deactivate, edit, archive)
- As a Partner, I want to see the status of my offers (pending, active, ended, rejected)
- As a Partner, I want a simple way to verify coupons presented by customers (e.g., entering the code in the panel)
- As a Partner, I want access to basic statistics for my offers (number of views, coupons sold/downloaded, coupons used)
- As a Partner, I want to browse customer reviews about my offers
- As a Partner, I want access to settlement information with the platform

### 3.5 Epic: Admin Panel (Admin)

- As an Admin, I want access to a secure admin panel
- As an Admin, I want to see a dashboard with key platform metrics
- As an Admin, I want to manage user accounts (view, edit, block, delete)
- As an Admin, I want to manage partner accounts (verification, approval, edit, block)
- As an Admin, I want to view, approve, reject, and edit offers submitted by partners
- As an Admin, I want to manage offer categories (add, edit, delete)
- As an Admin, I want to manage site content (e.g., FAQ, terms)
- As an Admin, I want to moderate user reviews (approve, reject)
- As an Admin, I want to manage locations (add/edit cities/regions)
- As an Admin, I want to configure basic system settings (e.g., commissions, email settings)
- As an Admin, I want access to basic reports (sales, partner activity)

## 4. User Flows

### 4.1 Customer Flow: Finding and Purchasing a Dinner Coupon

1. Anna opens the pedro.pl website/app
2. She selects the "Food" category or types "restaurant" in the search bar
3. She filters offers by her district
4. She sorts results by popularity
5. She browses the list, paying attention to photos and discount amounts
6. She clicks on an interesting offer (-50% on main dishes at Restaurant X)
7. She reads the description, terms (e.g., valid Monday-Thursday), and reviews
8. She clicks "Buy Coupon"
9. If not logged in, she logs in or registers
10. She proceeds to the cart and selects a payment method
11. She completes the payment via the payment gateway
12. She returns to the platform with a confirmation
13. She receives an email with confirmation and the coupon
14. The coupon is also available in the "My Coupons" section of her profile
15. At the restaurant, she shows the coupon (code) on her phone or printout

### 4.2 Partner Flow: Adding a New Offer

1. Jan logs in to the pedro.pl Partner Panel
2. He goes to the "My Offers" section
3. He clicks "Add New Offer"
4. He fills out the form: title, category, description, terms, prices, coupon limit, validity period
5. He adds attractive food photos
6. He selects his restaurant's location
7. He clicks "Save and submit for approval"
8. The offer appears in the list with the status "Pending approval"

### 4.3 Admin Flow: Approving a Partner Offer

1. Admin logs in to the Admin Panel
2. Goes to the "Offers" → "Pending Approval" section
3. Sees Jan's offer "Weekend Feast -20%"
4. Clicks the offer to view details
5. Checks the correctness of the description, terms, prices, category, and photos
6. If everything is correct, clicks "Approve"
7. (Optional) Can mark the offer as "Recommended" on the homepage
8. The offer becomes visible to Customers
9. The offer status in the partner panel changes to "Active"
10. The partner may receive an email notification

## 5. Non-Functional Requirements

### 5.1 Performance
- Pages must load quickly (preferred time < 3s)
- System must handle 1,000 concurrent users in the MVP version

### 5.2 Scalability
- Architecture should allow easy horizontal scaling as the number of users and offers grows

### 5.3 Availability
- Platform should be available 99.5% of the time

### 5.4 Security
- Protection against common web attacks (XSS, CSRF, SQL Injection)
- Secure password storage (hashing, salt)
- Use of HTTPS
- GDPR compliance regarding personal data
- Payment transaction security (PCI DSS)

### 5.5 Usability
- User interface must be intuitive and easy to use for all user groups
- Design must be RWD (Responsive Web Design)

### 5.6 Localization/Language
- User interface in both PL and EN
- Support for local date, time, and currency formats

### 5.7 Maintenance
- Code should be clean, well-documented, and easy to modify
- Automated tests (unit, integration)
- Error monitoring and logging

## 6. Release Criteria

### 6.1 MVP (Minimum Viable Product)

**Core Features:**
- Basic browsing, searching, and filtering of offers
- Offer details
- Customer registration/login
- Paid coupon purchase process (one payment gateway) and free code receipt
- "My Coupons" section for Customers
- Basic Partner Panel (registration, profile management, offer creation/management)
- Basic Admin Panel (user, partner management, offer approval, category management)
- Responsive website (RWD)
- Basic email notifications (registration, coupon purchase, password reset)

### 6.2 Next Phases

**Phase 2 Features:**
- Reviews and ratings
- Favorite offers/partners
- Advanced filtering/sorting
- Offer map
- Coupon verification in the Partner Panel
- Statistics for Partners
- Notification system (e.g., about new offers)
- Social login
- Advanced reports for Admin

**Phase 3 Features:**
- Mobile app (iOS/Android)
- Loyalty program / Internal balance
- Advanced offer recommendation mechanisms
- Ability to purchase coupons as gifts

## 7. Open Issues / Future Considerations

- Detailed business model (commissions vs. fixed fees vs. mixed model)
- Marketing and user/partner acquisition strategy
- Need for a dedicated mobile app in the first phase
- Integration with partners' reservation systems (e.g., for restaurants, salons)
- Advanced offer recommendation mechanisms
- Ability to purchase coupons as gifts

---

## Technical Implementation Notes

### Database Schema Considerations
- Users (customers, partners, admins)
- Companies (partner businesses)
- Offers (promotions, coupons)
- Categories
- Locations (cities, districts)
- Transactions
- Reviews and ratings
- Coupons/codes

### API Endpoints Structure
- Authentication endpoints
- User management endpoints
- Offer browsing and search endpoints
- Partner management endpoints
- Admin panel endpoints
- Payment integration endpoints

### Security Considerations
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting
- HTTPS enforcement
- Data encryption at rest and in transit