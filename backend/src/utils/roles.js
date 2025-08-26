// utils/roles.js

/**
 * Centralized definition of system Roles and Permissions.
 *
 * Use these constants instead of hardcoding numeric IDs or strings.
 * This improves readability, avoids "magic numbers/strings", and makes
 * the system easier to maintain.
 */

// --------------------
// Roles
// --------------------

/**
 * Roles available in the system.
 *
 * Each role is represented by a numeric ID that matches the value stored
 * in the database (rol_id).
 */
export const Roles = Object.freeze({
  SUPER_ADMIN: 1,
  ADMIN: 2,
  STAFF: 3,
});

// --------------------
// Permissions
// --------------------

/**
 * Permissions available in the system.
 *
 * Each permission is grouped by domain/module.
 * These strings must match the "name" field in the database.
 */
export const Permissions = Object.freeze({
  COMPANY: Object.freeze({
    CREATE: "company_create",
    READ: "company_read",
    UPDATE: "company_update",
    DELETE: "company_delete",
  }),
  USER: Object.freeze({
    CREATE: "user_create",
    CREATE_ADMIN: "user_create_admin",
    CREATE_STAFF: "user_create_staff",
    READ: "user_read",
    UPDATE: "user_update",
    DELETE: "user_delete",
  }),
  CUSTOMER: Object.freeze({
    CREATE: "customer_create",
    READ: "customer_read",
    UPDATE: "customer_update",
    DELETE: "customer_delete",
  }),
  ENTITY: Object.freeze({
    CREATE: "entity_create",
    READ: "entity_read",
    UPDATE: "entity_update",
    DELETE: "entity_delete",
  }),
  ENTITY_INSTANCE: Object.freeze({
    CREATE: "entity_instance_create",
    READ: "entity_instance_read",
    UPDATE: "entity_instance_update",
    DELETE: "entity_instance_delete",
  }),
  RESERVATION: Object.freeze({
    CREATE: "reservation_create",
    READ: "reservation_read",
    UPDATE: "reservation_update",
    DELETE: "reservation_delete",
  }),
});

