import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_brands_category" AS ENUM('ai_assistant', 'search', 'writing', 'image_generation', 'video_generation', 'coding', 'presentation', 'education', 'productivity', 'agent');
  CREATE TYPE "public"."enum_creative_units_ecosystem" AS ENUM('china', 'global');
  CREATE TYPE "public"."enum_creative_units_platform" AS ENUM('douyin', 'xiaohongshu', 'bilibili', 'weibo', 'wechat', 'baidu', 'facebook', 'instagram', 'tiktok', 'youtube', 'google_search', 'reddit', 'x', 'app_store', 'landing_page', 'other');
  CREATE TYPE "public"."enum_creative_units_unit_type" AS ENUM('paid_ad', 'organic_post', 'brand_account_video', 'creator_collab', 'ugc_style_content', 'search_ad', 'landing_page', 'app_store_asset', 'email', 'website_hero');
  CREATE TYPE "public"."enum_creative_units_content_format" AS ENUM('image', 'carousel', 'short_video', 'long_video', 'text_post', 'search_text', 'landing_page', 'screenshot_set');
  CREATE TYPE "public"."enum_creative_units_hook_type" AS ENUM('pain_point', 'efficiency', 'curiosity', 'before_after', 'product_demo', 'social_proof', 'aspiration', 'comparison', 'tutorial', 'fomo');
  CREATE TYPE "public"."enum_creative_units_funnel_stage" AS ENUM('awareness', 'consideration', 'acquisition', 'activation', 'retention', 're_engagement');
  CREATE TYPE "public"."enum_creative_units_disguise_level" AS ENUM('low', 'medium', 'high');
  CREATE TYPE "public"."enum_creative_units_claim_intensity" AS ENUM('low', 'medium', 'high');
  CREATE TYPE "public"."enum_creative_units_source" AS ENUM('meta_ad_library', 'tiktok_creative_center', 'manual_capture', 'app_store', 'official_website', 'creator_post', 'archive', 'community');
  CREATE TYPE "public"."enum_creative_units_status" AS ENUM('pending', 'approved', 'archived');
  CREATE TYPE "public"."enum_creative_assets_asset_type" AS ENUM('image', 'video', 'screenshot');
  CREATE TYPE "public"."enum_creative_assets_aspect_ratio" AS ENUM('1:1', '9:16', '16:9', '4:5', '1.91:1');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "brands" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar NOT NULL,
  	"company_name" varchar,
  	"country_origin" varchar,
  	"category" "enum_brands_category",
  	"logo_id" integer,
  	"website_url" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creative_units_target_audience" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "creative_units_use_case" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "creative_units_native_style" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "creative_units_visual_style" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "creative_units_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "creative_units" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar,
  	"brand_id" integer NOT NULL,
  	"product_name" varchar,
  	"ecosystem" "enum_creative_units_ecosystem" NOT NULL,
  	"platform" "enum_creative_units_platform" NOT NULL,
  	"unit_type" "enum_creative_units_unit_type" NOT NULL,
  	"content_format" "enum_creative_units_content_format" NOT NULL,
  	"region" varchar,
  	"language" varchar,
  	"headline" varchar,
  	"body_copy" varchar,
  	"cta" varchar,
  	"hook_type" "enum_creative_units_hook_type",
  	"campaign_angle" varchar,
  	"funnel_stage" "enum_creative_units_funnel_stage",
  	"user_promise" varchar,
  	"disguise_level" "enum_creative_units_disguise_level",
  	"claim_intensity" "enum_creative_units_claim_intensity",
  	"source_url" varchar,
  	"landing_url" varchar,
  	"source" "enum_creative_units_source",
  	"status" "enum_creative_units_status" DEFAULT 'pending' NOT NULL,
  	"submitted_by" varchar,
  	"reviewer_note" varchar,
  	"date_seen" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creative_assets_on_screen_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "creative_assets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"creative_unit_id" integer NOT NULL,
  	"asset_type" "enum_creative_assets_asset_type" NOT NULL,
  	"file_id" integer NOT NULL,
  	"thumbnail_file_id" integer,
  	"aspect_ratio" "enum_creative_assets_aspect_ratio",
  	"duration_seconds" numeric,
  	"cover_frame_text" varchar,
  	"voiceover_summary" varchar,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "creative_analysis_why_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "creative_analysis_potential_weaknesses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar
  );
  
  CREATE TABLE "creative_analysis_reusable_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"insight" varchar
  );
  
  CREATE TABLE "creative_analysis" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"creative_unit_id" integer NOT NULL,
  	"competitive_notes" varchar,
  	"compliance_notes" varchar,
  	"confidence_score" numeric,
  	"analyst_note" varchar,
  	"ai_generated" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "collections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"cover_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "collection_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"collection_id" integer NOT NULL,
  	"creative_unit_id" integer NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"brands_id" integer,
  	"creative_units_id" integer,
  	"creative_assets_id" integer,
  	"creative_analysis_id" integer,
  	"collections_id" integer,
  	"collection_items_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands" ADD CONSTRAINT "brands_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "creative_units_target_audience" ADD CONSTRAINT "creative_units_target_audience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creative_units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creative_units_use_case" ADD CONSTRAINT "creative_units_use_case_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creative_units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creative_units_native_style" ADD CONSTRAINT "creative_units_native_style_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creative_units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creative_units_visual_style" ADD CONSTRAINT "creative_units_visual_style_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creative_units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creative_units_tags" ADD CONSTRAINT "creative_units_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creative_units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creative_units" ADD CONSTRAINT "creative_units_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "creative_assets_on_screen_text" ADD CONSTRAINT "creative_assets_on_screen_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creative_assets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creative_assets" ADD CONSTRAINT "creative_assets_creative_unit_id_creative_units_id_fk" FOREIGN KEY ("creative_unit_id") REFERENCES "public"."creative_units"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "creative_assets" ADD CONSTRAINT "creative_assets_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "creative_assets" ADD CONSTRAINT "creative_assets_thumbnail_file_id_media_id_fk" FOREIGN KEY ("thumbnail_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "creative_analysis_why_it_works" ADD CONSTRAINT "creative_analysis_why_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creative_analysis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creative_analysis_potential_weaknesses" ADD CONSTRAINT "creative_analysis_potential_weaknesses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creative_analysis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creative_analysis_reusable_insights" ADD CONSTRAINT "creative_analysis_reusable_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."creative_analysis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "creative_analysis" ADD CONSTRAINT "creative_analysis_creative_unit_id_creative_units_id_fk" FOREIGN KEY ("creative_unit_id") REFERENCES "public"."creative_units"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "collections" ADD CONSTRAINT "collections_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "collection_items" ADD CONSTRAINT "collection_items_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "collection_items" ADD CONSTRAINT "collection_items_creative_unit_id_creative_units_id_fk" FOREIGN KEY ("creative_unit_id") REFERENCES "public"."creative_units"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_brands_fk" FOREIGN KEY ("brands_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creative_units_fk" FOREIGN KEY ("creative_units_id") REFERENCES "public"."creative_units"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creative_assets_fk" FOREIGN KEY ("creative_assets_id") REFERENCES "public"."creative_assets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_creative_analysis_fk" FOREIGN KEY ("creative_analysis_id") REFERENCES "public"."creative_analysis"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_collections_fk" FOREIGN KEY ("collections_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_collection_items_fk" FOREIGN KEY ("collection_items_id") REFERENCES "public"."collection_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "brands_logo_idx" ON "brands" USING btree ("logo_id");
  CREATE INDEX "brands_updated_at_idx" ON "brands" USING btree ("updated_at");
  CREATE INDEX "brands_created_at_idx" ON "brands" USING btree ("created_at");
  CREATE INDEX "creative_units_target_audience_order_idx" ON "creative_units_target_audience" USING btree ("_order");
  CREATE INDEX "creative_units_target_audience_parent_id_idx" ON "creative_units_target_audience" USING btree ("_parent_id");
  CREATE INDEX "creative_units_use_case_order_idx" ON "creative_units_use_case" USING btree ("_order");
  CREATE INDEX "creative_units_use_case_parent_id_idx" ON "creative_units_use_case" USING btree ("_parent_id");
  CREATE INDEX "creative_units_native_style_order_idx" ON "creative_units_native_style" USING btree ("_order");
  CREATE INDEX "creative_units_native_style_parent_id_idx" ON "creative_units_native_style" USING btree ("_parent_id");
  CREATE INDEX "creative_units_visual_style_order_idx" ON "creative_units_visual_style" USING btree ("_order");
  CREATE INDEX "creative_units_visual_style_parent_id_idx" ON "creative_units_visual_style" USING btree ("_parent_id");
  CREATE INDEX "creative_units_tags_order_idx" ON "creative_units_tags" USING btree ("_order");
  CREATE INDEX "creative_units_tags_parent_id_idx" ON "creative_units_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "creative_units_slug_idx" ON "creative_units" USING btree ("slug");
  CREATE INDEX "creative_units_brand_idx" ON "creative_units" USING btree ("brand_id");
  CREATE INDEX "creative_units_updated_at_idx" ON "creative_units" USING btree ("updated_at");
  CREATE INDEX "creative_units_created_at_idx" ON "creative_units" USING btree ("created_at");
  CREATE INDEX "creative_assets_on_screen_text_order_idx" ON "creative_assets_on_screen_text" USING btree ("_order");
  CREATE INDEX "creative_assets_on_screen_text_parent_id_idx" ON "creative_assets_on_screen_text" USING btree ("_parent_id");
  CREATE INDEX "creative_assets_creative_unit_idx" ON "creative_assets" USING btree ("creative_unit_id");
  CREATE INDEX "creative_assets_file_idx" ON "creative_assets" USING btree ("file_id");
  CREATE INDEX "creative_assets_thumbnail_file_idx" ON "creative_assets" USING btree ("thumbnail_file_id");
  CREATE INDEX "creative_assets_updated_at_idx" ON "creative_assets" USING btree ("updated_at");
  CREATE INDEX "creative_assets_created_at_idx" ON "creative_assets" USING btree ("created_at");
  CREATE INDEX "creative_analysis_why_it_works_order_idx" ON "creative_analysis_why_it_works" USING btree ("_order");
  CREATE INDEX "creative_analysis_why_it_works_parent_id_idx" ON "creative_analysis_why_it_works" USING btree ("_parent_id");
  CREATE INDEX "creative_analysis_potential_weaknesses_order_idx" ON "creative_analysis_potential_weaknesses" USING btree ("_order");
  CREATE INDEX "creative_analysis_potential_weaknesses_parent_id_idx" ON "creative_analysis_potential_weaknesses" USING btree ("_parent_id");
  CREATE INDEX "creative_analysis_reusable_insights_order_idx" ON "creative_analysis_reusable_insights" USING btree ("_order");
  CREATE INDEX "creative_analysis_reusable_insights_parent_id_idx" ON "creative_analysis_reusable_insights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "creative_analysis_creative_unit_idx" ON "creative_analysis" USING btree ("creative_unit_id");
  CREATE INDEX "creative_analysis_updated_at_idx" ON "creative_analysis" USING btree ("updated_at");
  CREATE INDEX "creative_analysis_created_at_idx" ON "creative_analysis" USING btree ("created_at");
  CREATE UNIQUE INDEX "collections_slug_idx" ON "collections" USING btree ("slug");
  CREATE INDEX "collections_cover_image_idx" ON "collections" USING btree ("cover_image_id");
  CREATE INDEX "collections_updated_at_idx" ON "collections" USING btree ("updated_at");
  CREATE INDEX "collections_created_at_idx" ON "collections" USING btree ("created_at");
  CREATE INDEX "collection_items_collection_idx" ON "collection_items" USING btree ("collection_id");
  CREATE INDEX "collection_items_creative_unit_idx" ON "collection_items" USING btree ("creative_unit_id");
  CREATE INDEX "collection_items_updated_at_idx" ON "collection_items" USING btree ("updated_at");
  CREATE INDEX "collection_items_created_at_idx" ON "collection_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_brands_id_idx" ON "payload_locked_documents_rels" USING btree ("brands_id");
  CREATE INDEX "payload_locked_documents_rels_creative_units_id_idx" ON "payload_locked_documents_rels" USING btree ("creative_units_id");
  CREATE INDEX "payload_locked_documents_rels_creative_assets_id_idx" ON "payload_locked_documents_rels" USING btree ("creative_assets_id");
  CREATE INDEX "payload_locked_documents_rels_creative_analysis_id_idx" ON "payload_locked_documents_rels" USING btree ("creative_analysis_id");
  CREATE INDEX "payload_locked_documents_rels_collections_id_idx" ON "payload_locked_documents_rels" USING btree ("collections_id");
  CREATE INDEX "payload_locked_documents_rels_collection_items_id_idx" ON "payload_locked_documents_rels" USING btree ("collection_items_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "brands" CASCADE;
  DROP TABLE "creative_units_target_audience" CASCADE;
  DROP TABLE "creative_units_use_case" CASCADE;
  DROP TABLE "creative_units_native_style" CASCADE;
  DROP TABLE "creative_units_visual_style" CASCADE;
  DROP TABLE "creative_units_tags" CASCADE;
  DROP TABLE "creative_units" CASCADE;
  DROP TABLE "creative_assets_on_screen_text" CASCADE;
  DROP TABLE "creative_assets" CASCADE;
  DROP TABLE "creative_analysis_why_it_works" CASCADE;
  DROP TABLE "creative_analysis_potential_weaknesses" CASCADE;
  DROP TABLE "creative_analysis_reusable_insights" CASCADE;
  DROP TABLE "creative_analysis" CASCADE;
  DROP TABLE "collections" CASCADE;
  DROP TABLE "collection_items" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_brands_category";
  DROP TYPE "public"."enum_creative_units_ecosystem";
  DROP TYPE "public"."enum_creative_units_platform";
  DROP TYPE "public"."enum_creative_units_unit_type";
  DROP TYPE "public"."enum_creative_units_content_format";
  DROP TYPE "public"."enum_creative_units_hook_type";
  DROP TYPE "public"."enum_creative_units_funnel_stage";
  DROP TYPE "public"."enum_creative_units_disguise_level";
  DROP TYPE "public"."enum_creative_units_claim_intensity";
  DROP TYPE "public"."enum_creative_units_source";
  DROP TYPE "public"."enum_creative_units_status";
  DROP TYPE "public"."enum_creative_assets_asset_type";
  DROP TYPE "public"."enum_creative_assets_aspect_ratio";`)
}
