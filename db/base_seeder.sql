use boa_system;

-- SEED ROLES --
insert into roles (title) values ('Super Administrator'), ('Admin'), ('Staff');

-- SEED RESERVATION STATES --
insert into reservation_states (title, description) values
('Pending', 'Reservation has been created but not yet confirmed'),
('Confirmed', 'Reservation has been accepted and is scheduled'),
('Cancelled', 'Reservation was cancelled by user or staff'),
('In Progress', 'Reservation is currently active'),
('Completed', 'Reservation has finished successfully'),
('No Show', 'Customer did not show up for the reservation');

/********************************************
    SEEDING PERMISSIONS
*********************************************/

-- COMPANY PERMISSIONS --
insert into permissions (name, display_name, description) values
('company_create', 'Create Company', 'Allows creating new companies'),
('company_read', 'View Companies', 'Allows viewing company details'),
('company_update', 'Update Company', 'Allows editing existing companies'),
('company_delete', 'Delete Company', 'Allows removing companies');

-- USER PERMISSIONS --
insert into permissions (name, display_name, description) values
('user_create', 'Create Users', 'Allows creating users'),
('user_create_admin', 'Create Users (Admin Role)', 'Allows creating users with Admin role only'),
('user_create_staff', 'Create Users (Staff Role)', 'Allows creating users with Staff role only'),
('user_read', 'View Users', 'Allows viewing user details'),
('user_update', 'Update User', 'Allows editing user information'),
('user_delete', 'Delete User', 'Allows removing users');

-- CUSTOMER PERMISSIONS --
insert into permissions (name, display_name, description) values
('customer_create', 'Create Customer', 'Allows adding new customers'),
('customer_read', 'View Customers', 'Allows viewing customer records'),
('customer_update', 'Update Customer', 'Allows modifying customer information'),
('customer_delete', 'Delete Customer', 'Allows deleting customer records');

-- ENTITY PERMISSIONS --
insert into permissions (name, display_name, description) values
('entity_create', 'Create Entity', 'Allows defining a new entity'),
('entity_read', 'View Entities', 'Allows viewing entity definitions'),
('entity_update', 'Update Entity', 'Allows editing entities'),
('entity_delete', 'Delete Entity', 'Allows deleting entities'),

('entity_instance_create', 'Create Entity Instance', 'Allows creating instances of entities'),
('entity_instance_read', 'View Entity Instances', 'Allows viewing entity instances'),
('entity_instance_update', 'Update Entity Instance', 'Allows editing entity instances'),
('entity_instance_delete', 'Delete Entity Instance', 'Allows deleting entity instances');

-- RESERVATION PERMISSIONS --
insert into permissions (name, display_name, description) values
('reservation_create', 'Create Reservation', 'Allows creating new reservations'),
('reservation_read', 'View Reservations', 'Allows viewing reservation details'),
('reservation_update', 'Update Reservation', 'Allows modifying reservation details'),
('reservation_delete', 'Delete Reservation', 'Allows permanent removal of reservations');

/*********************************************
    ASSIGNING PERMISSIONS to ROLES
**********************************************/

-- SUPER ADMINISTRATOR: has all the permissions
insert into role_has_permissions (role_id, permission_id)
select 1, id from permissions;

-- ADMIN: Limited permissions (Can't create admin just staff users)
insert into role_has_permissions (role_id, permission_id)
select 2, id from permissions
where name in (
    'company_update', 'company_read',
    'user_create_staff', 'user_read', 'user_update',
    'customer_create', 'customer_read', 'customer_update', 'customer_delete',
    'entity_create', 'entity_read', 'entity_update', 'entity_delete',
    'entity_instance_create', 'entity_instance_read', 'entity_instance_update', 'entity_instance_delete',
    'reservation_create', 'reservation_read', 'reservation_update'
);

-- STAFF
insert into role_has_permissions (role_id, permission_id)
select 3, id from permissions
where name in (
    'customer_create', 'customer_read', 'customer_update',
    'entity_instance_read',
    'reservation_create', 'reservation_read', 'reservation_update'
);

insert into companies (nit, name) values ('123456789-10', 'Boa System');