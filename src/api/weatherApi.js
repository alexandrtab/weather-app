import { instance } from "./api-helper";
export const getWeather = async ({ city,setError }) => {
	try { 
		const response = await instance.get(
			`weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
		);
		return response.data;
	} catch (error) {
		setError(error)
	}
};
