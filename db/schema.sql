drop database if exists boa_system;

create database boa_system;

use boa_system;

-- STRONG ENTITIES --

create table companies(
    id int auto_increment primary key,
    nit varchar(100) not null,
    name varchar(200) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table roles(
    id int auto_increment primary key,
    title varchar(100) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table permissions(
    id int auto_increment primary key,
    name varchar(100) unique not null,
    display_name varchar(100) not null,
    description varchar(500) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table reservation_states(
    id int auto_increment primary key,
    title varchar(100) unique not null,
    description varchar(500) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- WEAK ENTITIES --

create table role_has_permissions(
    id int auto_increment primary key,
    role_id int,
    permission_id int,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

create table users(
    id int auto_increment primary key,
    role_id int ,
    name varchar(100) null,
    email varchar(100) unique not null,
    password varchar(200) not null,
    company_id int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

create table customers(
    id int auto_increment primary key,
    company_id int not null,
    name  varchar(100) not null,
    phone VARCHAR(20) not null,
    email varchar(200) not null,
    document varchar(100) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

create table entities(
    id int auto_increment primary key,
    company_id int not null,
    plural_name varchar(100) not null,
    single_name varchar(100) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

create table entity_instances(
    id int auto_increment primary key,
    entity_id int,
    name varchar(100) not null,
    description varchar(1000) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (entity_id) REFERENCES entities(id)
);

create table reservations(
    id int auto_increment primary key,
    user_id int not null,
    customer_id int not null,
    entity_instance_id int not null,
    reservation_state_id int not null,
    star_datetime datetime not null,
    end_datetime datetime null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (entity_instance_id) REFERENCES entity_instances(id),
    FOREIGN KEY (reservation_state_id) REFERENCES reservation_states(id)
);