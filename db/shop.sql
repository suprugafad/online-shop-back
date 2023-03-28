-- CREATE DATABASE shopdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = icu LOCALE = 'en_US.UTF-8' ICU_LOCALE = 'en-US';

-- ALTER DATABASE shopdb OWNER TO postgres;

-- BEGIN;

CREATE TYPE public.order_status AS ENUM (
    'pending',
    'confirmed',
    'shipped',
    'delivered',
    'cancelled'
);

ALTER TYPE public.order_status OWNER TO postgres;

CREATE TYPE public.payment_method AS ENUM (
    'cash',
    'credit_card',
    'paypal'
);

ALTER TYPE public.payment_method OWNER TO postgres;

CREATE TYPE public.payment_status AS ENUM (
    'pending',
    'paid',
    'cancelled'
);

ALTER TYPE public.payment_status OWNER TO postgres;

CREATE TYPE public.user_role AS ENUM (
    'admin',
    'customer',
    'guest'
);

ALTER TYPE public.user_role OWNER TO postgres;

CREATE TABLE public.address (
    id integer NOT NULL,
    country character varying(30) NOT NULL,
    city character varying(30) NOT NULL,
    street character varying(30) NOT NULL,
    house integer NOT NULL,
    apartment integer
);

ALTER TABLE public.address OWNER TO postgres;

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.address_id_seq OWNER TO postgres;

ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;

CREATE TABLE public.cart (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.cart OWNER TO postgres;

CREATE TABLE public.cart_item (
    id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    cart_id integer NOT NULL
);

ALTER TABLE public.cart_item OWNER TO postgres;

CREATE SEQUENCE public.cart_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.cart_item_id_seq OWNER TO postgres;

ALTER SEQUENCE public.cart_item_id_seq OWNED BY public.cart_item.id;

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.carts_id_seq OWNER TO postgres;

ALTER SEQUENCE public.carts_id_seq OWNED BY public.cart.id;

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(20)
);

ALTER TABLE public.category OWNER TO postgres;

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.categories_id_seq OWNER TO postgres;

ALTER SEQUENCE public.categories_id_seq OWNED BY public.category.id;

CREATE TABLE public."order" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    comment character varying(200),
    total_price money NOT NULL,
    status public.order_status NOT NULL,
    products jsonb
);

ALTER TABLE public."order" OWNER TO postgres;

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.orders_id_seq OWNER TO postgres;

ALTER SEQUENCE public.orders_id_seq OWNED BY public."order".id;

CREATE TABLE public.payment (
    id integer NOT NULL,
    user_id integer NOT NULL,
    order_id integer NOT NULL,
    transaction_id character varying(50) NOT NULL,
    amount money NOT NULL,
    transaction_date timestamp with time zone NOT NULL,
    method public.payment_method NOT NULL,
    status public.payment_status NOT NULL,
    created_at timestamp with time zone
);

ALTER TABLE public.payment OWNER TO postgres;

CREATE TABLE public.product (
    id integer NOT NULL,
    title character varying(30) NOT NULL,
    description character varying,
    price integer,
    image character varying,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);

ALTER TABLE public.product OWNER TO postgres;

CREATE TABLE public.product_category (
    product_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.product_category OWNER TO postgres;

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.products_id_seq OWNER TO postgres;

ALTER SEQUENCE public.products_id_seq OWNED BY public.product.id;

CREATE TABLE public.review (
    id integer NOT NULL,
    product_id integer NOT NULL,
    user_id integer NOT NULL,
    raiting integer NOT NULL,
    comment character varying(300),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);

ALTER TABLE public.review OWNER TO postgres;

CREATE SEQUENCE public.review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.review_id_seq OWNER TO postgres;

ALTER SEQUENCE public.review_id_seq OWNED BY public.review.id;

CREATE SEQUENCE public.transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.transaction_id_seq OWNER TO postgres;

ALTER SEQUENCE public.transaction_id_seq OWNED BY public.payment.id;

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    email character varying(30) NOT NULL,
    password character varying NOT NULL,
    role public.user_role,
    updated_at timestamp with time zone,
    created_at timestamp with time zone
);

ALTER TABLE public."user" OWNER TO postgres;

CREATE TABLE public.user_address (
    user_id integer NOT NULL,
    address_id integer NOT NULL
);

ALTER TABLE public.user_address OWNER TO postgres;

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.users_id_seq OWNER TO postgres;

ALTER SEQUENCE public.users_id_seq OWNED BY public."user".id;

ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);

ALTER TABLE ONLY public.cart_item ALTER COLUMN id SET DEFAULT nextval('public.cart_item_id_seq'::regclass);

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);

ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);

ALTER TABLE ONLY public.review ALTER COLUMN id SET DEFAULT nextval('public.review_id_seq'::regclass);

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.category
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.product
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_address
    ADD CONSTRAINT address_id FOREIGN KEY (address_id) REFERENCES public.address(id) NOT VALID;

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_id FOREIGN KEY (cart_id) REFERENCES public.cart(id) NOT VALID;

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES public.category(id) NOT VALID;

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT order_id FOREIGN KEY (order_id) REFERENCES public."order"(id) NOT VALID;

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.product(id) NOT VALID;

ALTER TABLE ONLY public.review
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.product(id) NOT VALID;

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.product(id) NOT VALID;

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(id) NOT VALID;

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(id) NOT VALID;

ALTER TABLE ONLY public.review
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(id) NOT VALID;

ALTER TABLE ONLY public.user_address
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public."user"(id) NOT VALID;

-- COMMIT;