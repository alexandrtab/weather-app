import "./App.css";
import { useState, useEffect } from "react";
import { getWeather } from "./api/weatherApi";
import moment from "moment";

export const App = () => {
	const [data, setData] = useState(null);
	const [city, setCity] = useState("Washington");
	const [date, setDate] = useState("");
	const [emptyInputError, setEmptyInputError] = useState("");
	const [isLoading, setIsLoading] = useState("");
	const [error, setError] = useState("");
	const [weatherId, setWeatheriD] = useState("");

	const getActualWeather = async () => {
		if (city !== "") {
			setIsLoading(<h4>Loading...</h4>);
			const data = await getWeather({ city, setError });
			if (!!data) {
				setError("");
				setIsLoading("");
				setData(data);
				const date = moment(data.dt * 1000).format("LLL");
				setDate(date);
				setWeatheriD(data.weather[0]?.icon);
				setEmptyInputError("");
			} else {
				setIsLoading(false);
			}
		} else {
			setEmptyInputError(
				<h4 className="empty-input-error">Please, write your city</h4>
			);
		}
	};

	useEffect(() => {
		getActualWeather();
	}, []);

	const checkOnPressKey = (event) => {
	 if (event.key === "Enter") {
	    getActualWeather()
	 }
	};
	return (
		<div>
			{data && (
				<div className="container">
					<input
						type="text"
						placeholder="Write your city..."
						value={city}
						onChange={(e) => setCity(e.target.value)}
						onKeyPress={(e) => checkOnPressKey(e)}
					></input>
					<button
						className="btn-hover color-4"
						onClick={() => getActualWeather()}
					>
						Search
					</button>
					{emptyInputError}
					{error && (
						<div>
							<h1>City not found!</h1>
						</div>
					)}
					{isLoading}
					<div className="weather-container">
						<div className="weather-title">
							<h2 className="city-name">{data.name}</h2>
							<h4>{date}</h4>
						</div>
						<div className="weather-status">
							{" "}
							<img
								src={`http://openweathermap.org/img/wn/${weatherId}@2x.png`}
								alt={data?.weather[0]?.description}
							/>
							<h2 className="weather-description">
								{data?.weather[0]?.description}
							</h2>
						</div>
						<div className="temperature">
							<h1 className="temperature-number">
								{Math.floor(data.main.temp)}&deg;C
							</h1>
							<h5> Feels like: {Math.floor(data.main.feels_like)}&deg;C</h5>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
