CREATE TABLE public.users
(
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    vouchers_code character varying(100) COLLATE pg_catalog."default",
	CONSTRAINT users_pkey PRIMARY KEY (email)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;