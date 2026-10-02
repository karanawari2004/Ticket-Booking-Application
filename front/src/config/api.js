const API =
	import.meta.env.VITE_API_URL ||
	(import.meta.env.DEV
		? "http://localhost:4001"
		: "https://ticket-backend3-0.onrender.com");

export default API;
