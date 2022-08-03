const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "a657ca56eemsh0eb2e007d9e51a4p1c7a3cjsnc0406c5cccb2",
		"X-RapidAPI-Host": "ip-geolocation-and-threat-detection.p.rapidapi.com",
	},
};

const fetchIpInfo = (ip) => {
	return fetch(
		`https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`,
		options
	)
		.then((res) => res.json())
		.catch((err) => console.error(err));
};

const $ = (selector) => document.querySelector(selector);

const form = $("#form");
const input = $("#input");
const submit = $("#submit");
const results = $("#results");
const dataClient = $("#dataClient");

form.addEventListener("submit", async (event) => {
	event.preventDefault();
	const { value } = input;
	if (!value) return;

	submit.setAttribute("disabled", "");
	submit.setAttribute("aria-busy", "true");

	const ipInfo = await fetchIpInfo(value);

	if (ipInfo) {
		results.innerHTML = JSON.stringify(ipInfo, null, 2);
	}

	submit.removeAttribute("disabled", "");
	submit.removeAttribute("aria-busy");
});

// Show IP Client as a example

fetch("https://ipinfo.io/json?token=ca07e0f13ded9e")
	.then((response) => response.json())
	.then(
		(data) =>
			(dataClient.innerHTML =
				"Por ejemplo tu IP: " + JSON.stringify(data.ip).replace(/"/g, ""))
	);

// show data IP Client JSON as results

fetch("https://ipinfo.io/json?token=ca07e0f13ded9e")
	.then((response) => response.json())
	.then((data) => (results.innerHTML = JSON.stringify(data, null, 2)));
