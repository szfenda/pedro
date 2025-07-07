CREATE TABLE "users" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password_hash" varchar,
  "first_name" varchar,
  "last_name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "roles" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar UNIQUE NOT NULL
);

CREATE TABLE "user_roles" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "user_id" uuid,
  "role_id" int
);

CREATE TABLE "partners" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "user_id" uuid,
  "name" varchar,
  "description" text,
  "logo_url" varchar,
  "verified" boolean,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp,
  "custom_fields" jsonb
);

CREATE TABLE "partner_locations" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "partner_id" int,
  "city_id" int,
  "district_id" int,
  "address" varchar,
  "lat" decimal,
  "lng" decimal,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "categories" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar,
  "slug" varchar,
  "parent_id" int,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "offers" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "partner_id" int,
  "title" varchar,
  "description" text,
  "price_original" decimal,
  "price_discounted" decimal,
  "discount_percent" decimal,
  "start_date" date,
  "end_date" date,
  "status_id" int,
  "city_id" int,
  "address" varchar,
  "lat" decimal,
  "lng" decimal,
  "created_at" timestamp,
  "updated_at" timestamp,
  "limit_coupons" int,
  "deleted_at" timestamp,
  "custom_fields" jsonb
);

CREATE TABLE "offer_statuses" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar
);

CREATE TABLE "offer_categories" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "offer_id" int,
  "category_id" int
);

CREATE TABLE "offer_images" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "offer_id" int,
  "image_url" varchar,
  "is_main" boolean,
  "created_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "coupons" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "offer_id" int,
  "user_id" uuid,
  "code" varchar UNIQUE NOT NULL,
  "status_id" int,
  "variant_id" int,
  "purchased_at" timestamp,
  "used_at" timestamp,
  "expires_at" timestamp,
  "price_at_purchase" decimal,
  "discount_percent_at_purchase" decimal,
  "offer_snapshot" jsonb,
  "deleted_at" timestamp
);

CREATE TABLE "coupon_statuses" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar
);

CREATE TABLE "coupon_variants" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "offer_id" int,
  "name" varchar,
  "description" varchar,
  "price" decimal,
  "discount_percent" decimal,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "reviews" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "offer_id" int,
  "user_id" uuid,
  "rating" int,
  "comment" text,
  "status_id" int,
  "created_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "partner_reviews" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "partner_id" int,
  "user_id" uuid,
  "rating" int,
  "comment" text,
  "status_id" int,
  "created_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "review_statuses" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar
);

CREATE TABLE "favorites" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "user_id" uuid,
  "offer_id" int,
  "partner_id" int,
  "created_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "payments" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "user_id" uuid,
  "coupon_id" int,
  "offer_id" int,
  "partner_id" int,
  "amount" decimal,
  "status" varchar,
  "payment_method" varchar,
  "payment_provider" varchar,
  "created_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "invoices" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "partner_id" int,
  "amount" decimal,
  "period_start" date,
  "period_end" date,
  "status" varchar,
  "issued_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "cities" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "districts" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "city_id" int,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "settings" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "key" varchar UNIQUE NOT NULL,
  "value" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "content_pages" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "slug" varchar UNIQUE NOT NULL,
  "title" varchar,
  "content" text,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "banners" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "offer_id" int,
  "image_url" varchar,
  "link_url" varchar,
  "position" int,
  "active" boolean,
  "created_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "audit_logs" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "user_id" uuid,
  "table_name" varchar,
  "record_id" int,
  "action" varchar,
  "old_data" jsonb,
  "new_data" jsonb,
  "created_at" timestamp
);

CREATE TABLE "activity_logs" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "user_id" uuid,
  "action" varchar,
  "details" text,
  "created_at" timestamp
);

CREATE TABLE "notifications" (
  "id" int UNIQUE PRIMARY KEY NOT NULL,
  "user_id" uuid,
  "type" varchar,
  "content" text,
  "read" boolean,
  "created_at" timestamp,
  "deleted_at" timestamp
);

ALTER TABLE "user_roles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_roles" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "partners" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "partner_locations" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");

ALTER TABLE "partner_locations" ADD FOREIGN KEY ("city_id") REFERENCES "cities" ("id");

ALTER TABLE "partner_locations" ADD FOREIGN KEY ("district_id") REFERENCES "districts" ("id");

ALTER TABLE "categories" ADD FOREIGN KEY ("parent_id") REFERENCES "categories" ("id");

ALTER TABLE "offers" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");

ALTER TABLE "offers" ADD FOREIGN KEY ("status_id") REFERENCES "offer_statuses" ("id");

ALTER TABLE "offers" ADD FOREIGN KEY ("city_id") REFERENCES "cities" ("id");

ALTER TABLE "offer_categories" ADD FOREIGN KEY ("offer_id") REFERENCES "offers" ("id");

ALTER TABLE "offer_categories" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "offer_images" ADD FOREIGN KEY ("offer_id") REFERENCES "offers" ("id");

ALTER TABLE "coupons" ADD FOREIGN KEY ("offer_id") REFERENCES "offers" ("id");

ALTER TABLE "coupons" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "coupons" ADD FOREIGN KEY ("status_id") REFERENCES "coupon_statuses" ("id");

ALTER TABLE "coupons" ADD FOREIGN KEY ("variant_id") REFERENCES "coupon_variants" ("id");

ALTER TABLE "coupon_variants" ADD FOREIGN KEY ("offer_id") REFERENCES "offers" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("offer_id") REFERENCES "offers" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("status_id") REFERENCES "review_statuses" ("id");

ALTER TABLE "partner_reviews" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");

ALTER TABLE "partner_reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "partner_reviews" ADD FOREIGN KEY ("status_id") REFERENCES "review_statuses" ("id");

ALTER TABLE "favorites" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "favorites" ADD FOREIGN KEY ("offer_id") REFERENCES "offers" ("id");

ALTER TABLE "favorites" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");

ALTER TABLE "payments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "payments" ADD FOREIGN KEY ("coupon_id") REFERENCES "coupons" ("id");

ALTER TABLE "payments" ADD FOREIGN KEY ("offer_id") REFERENCES "offers" ("id");

ALTER TABLE "payments" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");

ALTER TABLE "invoices" ADD FOREIGN KEY ("partner_id") REFERENCES "partners" ("id");

ALTER TABLE "districts" ADD FOREIGN KEY ("city_id") REFERENCES "cities" ("id");

ALTER TABLE "banners" ADD FOREIGN KEY ("offer_id") REFERENCES "offers" ("id");

ALTER TABLE "audit_logs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "activity_logs" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "invoices" ADD FOREIGN KEY ("partner_id") REFERENCES "invoices" ("id");
