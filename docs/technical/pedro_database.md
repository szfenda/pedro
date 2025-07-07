# Pedro.pl - Database Documentation

Professional database documentation for the Pedro platform, covering tables, relationships, permissions, and implementation guidelines.

## Database Overview

This documentation includes:
- Description of each table
- Key columns and data types
- Relationships between tables
- Row Level Security (RLS) permissions
- Usage examples
- Development guidelines

---

## 1. Table: users

**Description:**  
Stores data for all platform users (customers, partners, admins).

**Key Columns:**
- `id` (uuid, PK): Unique user identifier
- `email` (varchar): Email address
- `password_hash` (varchar): Password hash
- `first_name`, `last_name` (varchar): First name, last name
- `created_at`, `updated_at`, `deleted_at` (timestamp): Creation, update, deletion dates

**Relationships:**
- 1:N with `user_roles`
- 1:N with `coupons`, `reviews`, `partner_reviews`, `favorites`, `notifications`, `audit_logs`, `activity_logs`
- 1:N with `partners` (as company owner)

**RLS Permissions:**
- User can view/edit only their own data
- Admin can view all users

---

## 2. Table: roles

**Description:**  
Dictionary of system roles (e.g., admin, partner, user).

**Key Columns:**
- `id` (int, PK): Role identifier
- `name` (varchar): Role name

**Relationships:**
- 1:N with `user_roles`

---

## 3. Table: user_roles

**Description:**  
Links users with roles (supports multiple roles per user).

**Key Columns:**
- `id` (int, PK): Record identifier
- `user_id` (uuid, FK → users.id): User reference
- `role_id` (int, FK → roles.id): Role reference

---

## 4. Table: partners

**Description:**  
Data for companies/partners offering promotions.

**Key Columns:**
- `id` (int, PK): Partner identifier
- `user_id` (uuid, FK → users.id): Owner reference
- `name`, `description`, `logo_url`: Company details
- `verified` (boolean): Whether company is verified
- `custom_fields` (jsonb): Additional data
- `created_at`, `updated_at`, `deleted_at`: Timestamps

**Relationships:**
- 1:N with `offers`, `partner_locations`, `partner_reviews`, `invoices`, `payments`

**RLS Permissions:**
- Partner can view/edit only their own companies
- Admin can view all partners

---

## 5. Table: partner_locations

**Description:**  
Addresses and locations of partner companies.

**Key Columns:**
- `id` (int, PK): Location identifier
- `partner_id` (int, FK → partners.id): Partner reference
- `city_id` (int, FK → cities.id): City reference
- `district_id` (int, FK → districts.id): District reference
- `address`, `lat`, `lng`: Location details
- `created_at`, `updated_at`, `deleted_at`: Timestamps

---

## 6. Table: offers

**Description:**  
Promotional offers available on the platform.

**Key Columns:**
- `id` (int, PK): Offer identifier
- `partner_id` (int, FK → partners.id): Partner reference
- `title`, `description`: Offer details
- `price_original`, `price_discounted`, `discount_percent`: Pricing
- `start_date`, `end_date`: Offer validity period
- `status_id` (int, FK → offer_statuses.id): Status reference
- `city_id` (int, FK → cities.id): City reference
- `address`, `lat`, `lng`: Location details
- `limit_coupons` (int): Coupon limit
- `custom_fields` (jsonb): Additional data
- `created_at`, `updated_at`, `deleted_at`: Timestamps

**Relationships:**
- 1:N with `offer_categories`, `offer_images`, `coupons`, `reviews`, `banners`
- N:1 with `partners`

**RLS Permissions:**
- Partner can view/edit only their own offers
- Admin can view all offers

---

## 7. Table: offer_categories

**Description:**  
Links offers with categories (multiple categories per offer).

**Key Columns:**
- `id` (int, PK): Record identifier
- `offer_id` (int, FK → offers.id): Offer reference
- `category_id` (int, FK → categories.id): Category reference

---

## 8. Table: categories

**Description:**  
Offer categories (e.g., Food, Beauty).

**Key Columns:**
- `id` (int, PK): Category identifier
- `name`, `slug`: Category details
- `parent_id` (int, FK → categories.id): For subcategories
- `created_at`, `updated_at`, `deleted_at`: Timestamps

---

## 9. Table: offer_images

**Description:**  
Images and multimedia for offers.

**Key Columns:**
- `id` (int, PK): Image identifier
- `offer_id` (int, FK → offers.id): Offer reference
- `image_url`: Image URL
- `is_main` (boolean): Whether main image
- `created_at`, `deleted_at`: Timestamps

---

## 10. Table: coupons

**Description:**  
Coupons purchased or downloaded by users.

**Key Columns:**
- `id` (int, PK): Coupon identifier
- `offer_id` (int, FK → offers.id): Offer reference
- `user_id` (uuid, FK → users.id): User reference
- `code` (varchar): Unique coupon code
- `status_id` (int, FK → coupon_statuses.id): Status reference
- `variant_id` (int, FK → coupon_variants.id): Variant reference
- `purchased_at`, `used_at`, `expires_at`: Timestamps
- `price_at_purchase`, `discount_percent_at_purchase`: Purchase-time pricing
- `offer_snapshot` (jsonb): Offer snapshot at purchase time
- `deleted_at`: Soft delete timestamp

**Relationships:**
- N:1 with `offers`, `users`
- 1:N with `payments`

**RLS Permissions:**
- User can view/edit only their own coupons
- Partner can view coupons for their offers
- Admin can view everything

---

## 11. Table: coupon_variants

**Description:**  
Coupon variants for a single offer.

**Key Columns:**
- `id` (int, PK): Variant identifier
- `offer_id` (int, FK → offers.id): Offer reference
- `name`, `description`, `price`, `discount_percent`: Variant details
- `created_at`, `updated_at`, `deleted_at`: Timestamps

---

## 12. Table: coupon_statuses

**Description:**  
Dictionary of coupon statuses (e.g., active, used, expired).

**Key Columns:**
- `id` (int, PK): Status identifier
- `name` (varchar): Status name

---

## 13. Table: reviews

**Description:**  
User reviews of offers.

**Key Columns:**
- `id` (int, PK): Review identifier
- `offer_id` (int, FK → offers.id): Offer reference
- `user_id` (uuid, FK → users.id): User reference
- `rating` (int), `comment` (text): Review content
- `status_id` (int, FK → review_statuses.id): Status reference
- `created_at`, `deleted_at`: Timestamps

**RLS Permissions:**
- User can view/edit only their own reviews
- Admin can view everything

---

## 14. Table: partner_reviews

**Description:**  
User reviews of partners.

**Key Columns:**
- `id` (int, PK): Review identifier
- `partner_id` (int, FK → partners.id): Partner reference
- `user_id` (uuid, FK → users.id): User reference
- `rating` (int), `comment` (text): Review content
- `status_id` (int, FK → review_statuses.id): Status reference
- `created_at`, `deleted_at`: Timestamps

---

## 15. Table: review_statuses

**Description:**  
Dictionary of review statuses (e.g., pending, approved, rejected).

**Key Columns:**
- `id` (int, PK): Status identifier
- `name` (varchar): Status name

---

## 16. Table: favorites

**Description:**  
User's favorite offers or partners.

**Key Columns:**
- `id` (int, PK): Favorite identifier
- `user_id` (uuid, FK → users.id): User reference
- `offer_id` (int, FK → offers.id, optional): Offer reference
- `partner_id` (int, FK → partners.id, optional): Partner reference
- `created_at`, `deleted_at`: Timestamps

**RLS Permissions:**
- User can view/edit only their own favorites
- Admin can view everything

---

## 17. Table: payments

**Description:**  
Payment history for users and partners.

**Key Columns:**
- `id` (int, PK): Payment identifier
- `user_id` (uuid, FK → users.id): User reference
- `coupon_id` (int, FK → coupons.id): Coupon reference
- `offer_id` (int, FK → offers.id): Offer reference
- `partner_id` (int, FK → partners.id): Partner reference
- `amount` (decimal), `status` (varchar): Payment details
- `payment_method`, `payment_provider`: Payment info
- `created_at`, `deleted_at`: Timestamps

**RLS Permissions:**
- User can view only their own payments
- Partner can view payments for their offers
- Admin can view everything

---

## 18. Table: invoices

**Description:**  
Invoices for partners.

**Key Columns:**
- `id` (int, PK): Invoice identifier
- `partner_id` (int, FK → partners.id): Partner reference
- `amount` (decimal): Invoice amount
- `period_start`, `period_end` (date): Billing period
- `status` (varchar): Invoice status
- `issued_at`, `deleted_at`: Timestamps

**RLS Permissions:**
- Partner can view only their own invoices
- Admin can view everything

---

## 19. Table: cities

**Description:**  
Cities supported by the platform.

**Key Columns:**
- `id` (int, PK): City identifier
- `name` (varchar): City name
- `created_at`, `updated_at`, `deleted_at`: Timestamps

---

## 20. Table: districts

**Description:**  
City districts.

**Key Columns:**
- `id` (int, PK): District identifier
- `city_id` (int, FK → cities.id): City reference
- `name` (varchar): District name
- `created_at`, `updated_at`, `deleted_at`: Timestamps

---

## 21. Table: settings

**Description:**  
System settings (e.g., commissions, parameters).

**Key Columns:**
- `id` (int, PK): Setting identifier
- `key` (varchar, unique): Setting key
- `value` (varchar): Setting value
- `created_at`, `updated_at`: Timestamps

---

## 22. Table: content_pages

**Description:**  
Static pages (FAQ, terms of service).

**Key Columns:**
- `id` (int, PK): Page identifier
- `slug` (varchar, unique): URL slug
- `title` (varchar): Page title
- `content` (text): Page content
- `created_at`, `updated_at`, `deleted_at`: Timestamps

---

## 23. Table: banners

**Description:**  
Promotional banners on the homepage.

**Key Columns:**
- `id` (int, PK): Banner identifier
- `offer_id` (int, FK → offers.id, optional): Offer reference
- `image_url`, `link_url`: Banner details
- `position` (int), `active` (boolean): Display settings
- `created_at`, `deleted_at`: Timestamps

---

## 24. Table: audit_logs

**Description:**  
Audit logs for database changes.

**Key Columns:**
- `id` (int, PK): Log identifier
- `user_id` (uuid, FK → users.id): User reference
- `table_name` (varchar), `record_id` (int): Target record
- `action` (varchar): Action type (insert, update, delete)
- `old_data`, `new_data` (jsonb): Data changes
- `created_at` (timestamp): Action timestamp

---

## 25. Table: activity_logs

**Description:**  
User activity logs.

**Key Columns:**
- `id` (int, PK): Log identifier
- `user_id` (uuid, FK → users.id): User reference
- `action` (varchar), `details` (text): Activity details
- `created_at` (timestamp): Activity timestamp

---

## 26. Table: notifications

**Description:**  
User notifications.

**Key Columns:**
- `id` (int, PK): Notification identifier
- `user_id` (uuid, FK → users.id): User reference
- `type` (varchar), `content` (text): Notification details
- `read` (boolean): Read status
- `created_at`, `deleted_at`: Timestamps

**RLS Permissions:**
- User can view only their own notifications
- Admin can view everything

---

## Development Guidelines

### Database Optimization
- **Indexes:** Add indexes on frequently filtered fields (e.g., `city_id`, `status_id`, `user_id`, `partner_id`)
- **Soft Delete:** Delete records by setting `deleted_at`, not physical deletion
- **RLS:** Regularly test security policies
- **Backup:** Set up automatic database backups
- **Monitoring:** Monitor performance and errors
- **Documentation:** Update this document with every database change

### Security Considerations
- All sensitive data should be encrypted at rest
- Use Row Level Security (RLS) for multi-tenant data isolation
- Implement proper authentication and authorization
- Regular security audits and penetration testing

### Performance Optimization
- Use appropriate data types for columns
- Implement database connection pooling
- Use caching for frequently accessed data
- Optimize queries with EXPLAIN ANALYZE
- Consider partitioning for large tables

### Backup and Recovery
- Daily automated backups
- Point-in-time recovery capability
- Regular backup restoration testing
- Off-site backup storage

### Monitoring and Alerting
- Database performance metrics
- Error rate monitoring
- Disk space and resource usage
- Query performance tracking

---

## Status Tables Reference

### Offer Statuses
- `pending`: Awaiting approval
- `active`: Live and available
- `inactive`: Temporarily disabled
- `expired`: Past end date
- `rejected`: Rejected by admin

### Coupon Statuses
- `active`: Available for use
- `used`: Already redeemed
- `expired`: Past expiration date
- `cancelled`: Cancelled by user or admin

### Review Statuses
- `pending`: Awaiting moderation
- `approved`: Visible to public
- `rejected`: Hidden from public
- `flagged`: Requires admin attention

---

## Common Query Examples

### Get Active Offers for a City
```sql
SELECT o.*, p.name as partner_name
FROM offers o
JOIN partners p ON o.partner_id = p.id
WHERE o.city_id = ? 
  AND o.status_id = (SELECT id FROM offer_statuses WHERE name = 'active')
  AND o.deleted_at IS NULL
  AND o.start_date <= NOW()
  AND o.end_date >= NOW()
ORDER BY o.created_at DESC;
```

### Get User's Active Coupons
```sql
SELECT c.*, o.title as offer_title, p.name as partner_name
FROM coupons c
JOIN offers o ON c.offer_id = o.id
JOIN partners p ON o.partner_id = p.id
WHERE c.user_id = ?
  AND c.status_id = (SELECT id FROM coupon_statuses WHERE name = 'active')
  AND c.deleted_at IS NULL
  AND c.expires_at > NOW()
ORDER BY c.expires_at ASC;
```

### Get Partner Statistics
```sql
SELECT 
  p.name,
  COUNT(DISTINCT o.id) as total_offers,
  COUNT(DISTINCT c.id) as total_coupons_sold,
  SUM(c.price_at_purchase) as total_revenue
FROM partners p
LEFT JOIN offers o ON p.id = o.partner_id
LEFT JOIN coupons c ON o.id = c.offer_id
WHERE p.id = ?
  AND p.deleted_at IS NULL
GROUP BY p.id, p.name;
```