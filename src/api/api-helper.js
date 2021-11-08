import axios from "axios";
const baseUrl = `http://api.openweathermap.org/data/2.5/`;
export const instance = axios.create({
	baseURL: baseUrl,
});
