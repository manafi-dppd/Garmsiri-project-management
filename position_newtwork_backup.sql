--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Ubuntu 14.18-1.pgdg22.04+1)
-- Dumped by pg_dump version 14.18 (Ubuntu 14.18-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: position_newtwork; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.position_newtwork (
    id integer NOT NULL,
    fidposition integer,
    fidnetwork integer
);


ALTER TABLE public.position_newtwork OWNER TO postgres;

--
-- Name: position_newtwork_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.position_newtwork_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.position_newtwork_id_seq OWNER TO postgres;

--
-- Name: position_newtwork_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.position_newtwork_id_seq OWNED BY public.position_newtwork.id;


--
-- Name: position_newtwork id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.position_newtwork ALTER COLUMN id SET DEFAULT nextval('public.position_newtwork_id_seq'::regclass);


--
-- Data for Name: position_newtwork; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.position_newtwork (id, fidposition, fidnetwork) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	6
7	1	7
8	1	8
9	2	1
10	2	2
11	2	3
12	2	4
13	2	5
14	2	6
15	2	7
16	2	8
17	3	1
18	3	2
19	3	3
20	3	4
21	3	5
22	3	6
23	3	7
24	3	8
25	4	1
26	4	2
27	4	3
28	4	4
29	4	5
30	4	6
31	4	7
32	4	8
33	5	1
34	5	2
35	5	3
36	5	4
37	5	5
38	5	6
39	5	7
40	5	8
41	6	1
42	6	2
43	6	3
44	6	4
45	6	5
46	6	6
47	6	7
48	6	8
49	8	1
50	8	2
51	8	3
52	8	4
53	8	5
54	8	6
55	8	7
56	8	8
57	9	1
58	9	2
59	9	3
60	9	4
61	10	5
62	10	6
63	10	7
64	10	8
65	11	1
66	11	2
67	11	3
68	11	4
69	12	5
70	12	6
71	12	7
72	12	8
73	13	1
74	13	2
75	13	3
76	13	4
77	13	5
78	13	6
79	13	7
80	13	8
81	14	1
82	14	2
83	14	3
84	14	4
85	14	5
86	14	6
87	14	7
88	14	8
89	15	1
90	15	2
91	15	3
92	15	4
93	15	5
94	15	6
95	15	7
96	15	8
97	16	1
98	16	2
99	16	3
100	16	4
101	16	5
102	16	6
103	16	7
104	16	8
105	17	1
106	17	2
107	17	3
108	17	4
109	17	5
110	17	6
111	17	7
112	17	8
113	18	1
114	18	2
115	18	3
116	18	4
117	18	5
118	18	6
119	18	7
120	18	8
121	20	1
122	20	2
123	20	3
124	20	4
125	20	5
126	20	6
127	20	7
128	20	8
129	21	1
130	22	2
131	23	3
132	24	4
133	25	5
134	26	6
135	27	7
136	28	8
\.


--
-- Name: position_newtwork_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.position_newtwork_id_seq', 136, true);


--
-- Name: position_newtwork position_newtwork_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.position_newtwork
    ADD CONSTRAINT position_newtwork_pkey PRIMARY KEY (id);


--
-- Name: position_newtwork position_newtwork_fidposition_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.position_newtwork
    ADD CONSTRAINT position_newtwork_fidposition_fkey FOREIGN KEY (fidposition) REFERENCES public."position"(id);


--
-- PostgreSQL database dump complete
--

