CREATE TABLE customers (
    customer_id UUID NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    mail TEXT NOT NULL,
    tss_id UUID PRIMARY KEY
);