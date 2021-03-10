const input = document.querySelector('input[type="text"]');
const updateBtn = document.querySelector('i.fa-sync-alt');
const main = document.querySelector('main');
const date = document.querySelector('.date');
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const weatherMain = document.querySelector('.weatherMain');
const weatherDescription = document.querySelector('.weatherDescription');
const kanji = document.querySelector('.kanji');
const presentTemp = document.querySelector('.presentTemp');
const maxTemp = document.querySelector('.maxTemp');
const minTemp = document.querySelector('.minTemp');
const feelsLike = document.querySelector('.feelsLike');
const humidity = document.querySelector('.humidity');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
let allData = [];
const isoCountries = {
	AF: 'Afghanistan',
	AX: 'Aland Islands',
	AL: 'Albania',
	DZ: 'Algeria',
	AS: 'American Samoa',
	AD: 'Andorra',
	AO: 'Angola',
	AI: 'Anguilla',
	AQ: 'Antarctica',
	AG: 'Antigua And Barbuda',
	AR: 'Argentina',
	AM: 'Armenia',
	AW: 'Aruba',
	AU: 'Australia',
	AT: 'Austria',
	AZ: 'Azerbaijan',
	BS: 'Bahamas',
	BH: 'Bahrain',
	BD: 'Bangladesh',
	BB: 'Barbados',
	BY: 'Belarus',
	BE: 'Belgium',
	BZ: 'Belize',
	BJ: 'Benin',
	BM: 'Bermuda',
	BT: 'Bhutan',
	BO: 'Bolivia',
	BA: 'Bosnia And Herzegovina',
	BW: 'Botswana',
	BV: 'Bouvet Island',
	BR: 'Brazil',
	IO: 'British Indian Ocean Territory',
	BN: 'Brunei Darussalam',
	BG: 'Bulgaria',
	BF: 'Burkina Faso',
	BI: 'Burundi',
	KH: 'Cambodia',
	CM: 'Cameroon',
	CA: 'Canada',
	CV: 'Cape Verde',
	KY: 'Cayman Islands',
	CF: 'Central African Republic',
	TD: 'Chad',
	CL: 'Chile',
	CN: 'China',
	CX: 'Christmas Island',
	CC: 'Cocos (Keeling) Islands',
	CO: 'Colombia',
	KM: 'Comoros',
	CG: 'Congo',
	CD: 'Congo, Democratic Republic',
	CK: 'Cook Islands',
	CR: 'Costa Rica',
	CI: "Cote D'Ivoire",
	HR: 'Croatia',
	CU: 'Cuba',
	CY: 'Cyprus',
	CZ: 'Czech Republic',
	DK: 'Denmark',
	DJ: 'Djibouti',
	DM: 'Dominica',
	DO: 'Dominican Republic',
	EC: 'Ecuador',
	EG: 'Egypt',
	SV: 'El Salvador',
	GQ: 'Equatorial Guinea',
	ER: 'Eritrea',
	EE: 'Estonia',
	ET: 'Ethiopia',
	FK: 'Falkland Islands (Malvinas)',
	FO: 'Faroe Islands',
	FJ: 'Fiji',
	FI: 'Finland',
	FR: 'France',
	GF: 'French Guiana',
	PF: 'French Polynesia',
	TF: 'French Southern Territories',
	GA: 'Gabon',
	GM: 'Gambia',
	GE: 'Georgia',
	DE: 'Germany',
	GH: 'Ghana',
	GI: 'Gibraltar',
	GR: 'Greece',
	GL: 'Greenland',
	GD: 'Grenada',
	GP: 'Guadeloupe',
	GU: 'Guam',
	GT: 'Guatemala',
	GG: 'Guernsey',
	GN: 'Guinea',
	GW: 'Guinea-Bissau',
	GY: 'Guyana',
	HT: 'Haiti',
	HM: 'Heard Island & Mcdonald Islands',
	VA: 'Holy See (Vatican City State)',
	HN: 'Honduras',
	HK: 'Hong Kong',
	HU: 'Hungary',
	IS: 'Iceland',
	IN: 'India',
	ID: 'Indonesia',
	IR: 'Iran, Islamic Republic Of',
	IQ: 'Iraq',
	IE: 'Ireland',
	IM: 'Isle Of Man',
	IL: 'Israel',
	IT: 'Italy',
	JM: 'Jamaica',
	JP: 'Japan',
	JE: 'Jersey',
	JO: 'Jordan',
	KZ: 'Kazakhstan',
	KE: 'Kenya',
	KI: 'Kiribati',
	KR: 'Korea',
	KW: 'Kuwait',
	KG: 'Kyrgyzstan',
	LA: "Lao People's Democratic Republic",
	LV: 'Latvia',
	LB: 'Lebanon',
	LS: 'Lesotho',
	LR: 'Liberia',
	LY: 'Libyan Arab Jamahiriya',
	LI: 'Liechtenstein',
	LT: 'Lithuania',
	LU: 'Luxembourg',
	MO: 'Macao',
	MK: 'Macedonia',
	MG: 'Madagascar',
	MW: 'Malawi',
	MY: 'Malaysia',
	MV: 'Maldives',
	ML: 'Mali',
	MT: 'Malta',
	MH: 'Marshall Islands',
	MQ: 'Martinique',
	MR: 'Mauritania',
	MU: 'Mauritius',
	YT: 'Mayotte',
	MX: 'Mexico',
	FM: 'Micronesia, Federated States Of',
	MD: 'Moldova',
	MC: 'Monaco',
	MN: 'Mongolia',
	ME: 'Montenegro',
	MS: 'Montserrat',
	MA: 'Morocco',
	MZ: 'Mozambique',
	MM: 'Myanmar',
	NA: 'Namibia',
	NR: 'Nauru',
	NP: 'Nepal',
	NL: 'Netherlands',
	AN: 'Netherlands Antilles',
	NC: 'New Caledonia',
	NZ: 'New Zealand',
	NI: 'Nicaragua',
	NE: 'Niger',
	NG: 'Nigeria',
	NU: 'Niue',
	NF: 'Norfolk Island',
	MP: 'Northern Mariana Islands',
	NO: 'Norway',
	OM: 'Oman',
	PK: 'Pakistan',
	PW: 'Palau',
	PS: 'Palestinian Territory, Occupied',
	PA: 'Panama',
	PG: 'Papua New Guinea',
	PY: 'Paraguay',
	PE: 'Peru',
	PH: 'Philippines',
	PN: 'Pitcairn',
	PL: 'Poland',
	PT: 'Portugal',
	PR: 'Puerto Rico',
	QA: 'Qatar',
	RE: 'Reunion',
	RO: 'Romania',
	RU: 'Russian Federation',
	RW: 'Rwanda',
	BL: 'Saint Barthelemy',
	SH: 'Saint Helena',
	KN: 'Saint Kitts And Nevis',
	LC: 'Saint Lucia',
	MF: 'Saint Martin',
	PM: 'Saint Pierre And Miquelon',
	VC: 'Saint Vincent And Grenadines',
	WS: 'Samoa',
	SM: 'San Marino',
	ST: 'Sao Tome And Principe',
	SA: 'Saudi Arabia',
	SN: 'Senegal',
	RS: 'Serbia',
	SC: 'Seychelles',
	SL: 'Sierra Leone',
	SG: 'Singapore',
	SK: 'Slovakia',
	SI: 'Slovenia',
	SB: 'Solomon Islands',
	SO: 'Somalia',
	ZA: 'South Africa',
	GS: 'South Georgia And Sandwich Isl.',
	ES: 'Spain',
	LK: 'Sri Lanka',
	SD: 'Sudan',
	SR: 'Suriname',
	SJ: 'Svalbard And Jan Mayen',
	SZ: 'Swaziland',
	SE: 'Sweden',
	CH: 'Switzerland',
	SY: 'Syrian Arab Republic',
	TW: 'Taiwan',
	TJ: 'Tajikistan',
	TZ: 'Tanzania',
	TH: 'Thailand',
	TL: 'Timor-Leste',
	TG: 'Togo',
	TK: 'Tokelau',
	TO: 'Tonga',
	TT: 'Trinidad And Tobago',
	TN: 'Tunisia',
	TR: 'Turkey',
	TM: 'Turkmenistan',
	TC: 'Turks And Caicos Islands',
	TV: 'Tuvalu',
	UG: 'Uganda',
	UA: 'Ukraine',
	AE: 'United Arab Emirates',
	GB: 'United Kingdom',
	US: 'United States',
	UM: 'United States Outlying Islands',
	UY: 'Uruguay',
	UZ: 'Uzbekistan',
	VU: 'Vanuatu',
	VE: 'Venezuela',
	VN: 'Viet Nam',
	VG: 'Virgin Islands, British',
	VI: 'Virgin Islands, U.S.',
	WF: 'Wallis And Futuna',
	EH: 'Western Sahara',
	YE: 'Yemen',
	ZM: 'Zambia',
	ZW: 'Zimbabwe',
};

//fetch data of Vancouver by default
fetch(
	`http://api.openweathermap.org/data/2.5/weather?q=vancouver&units=metric&appid=22fafb856d9955a1dbb7727e950adf36`
)
	.then((res) => {
		if (res.status !== 200) {
			console.log(`Error: ${res.status}`);
		}
		return res.json();
	})
	.then((data) => {
		allData = data;
		updateBg(allData);
		updateContent(allData);
		console.log(data);
	})
	.catch((err) => console.log(`Error: ${err}`));

//fetch data function
const fetchData = () => {
	fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=22fafb856d9955a1dbb7727e950adf36`
	)
		.then((res) => {
			if (res.status !== 200) {
				input.value = 'vancouver';
				fetchData();
				console.log(`Error: ${res.status}`);
			}
			return res.json();
		})
		.then((data) => {
			allData = data;
			updateBg(allData);
			updateContent(allData);
			input.value = '';
			console.log(data);
		})
		.catch((err) => console.log(`Error: ${err}`));
};

//country code convertor
function getCountryName(code) {
	if (isoCountries.hasOwnProperty(code)) {
		return isoCountries[code];
	} else {
		return code;
	}
}

const updateContent = (arr) => {
	//date
	const millisecondsTime = allData.dt * 1000;
	const dateObj = new Date(millisecondsTime);
	const shownDate = `${dateObj.toLocaleString('en-CA', {
		month: 'long',
	})} ${dateObj.toLocaleString('en-CA', {
		day: 'numeric',
	})}, ${dateObj.toLocaleString('en-CA', { weekday: 'long' })}`;
	date.textContent = shownDate;

	//city & country
	city.textContent = arr.name;
	const countryCode = arr.sys.country;
	country.textContent = getCountryName(countryCode);

	//weather
	weatherMain.textContent = arr.weather[0].main;
	weatherDescription.textContent = arr.weather[0].description;

	//tempreture
	presentTemp.textContent = Math.round(arr.main.temp);
	maxTemp.textContent = arr.main.temp_max.toFixed(1);
	minTemp.textContent = arr.main.temp_min.toFixed(1);

	//rest items
	feelsLike.textContent = arr.main.feels_like.toFixed(1);
	humidity.textContent = arr.main.humidity;
	const millisecondsSunrise = arr.sys.sunrise * 1000;
	const millisecondsSunset = arr.sys.sunset * 1000;
	const sunriseObj = new Date(millisecondsSunrise);
	const sunsetObj = new Date(millisecondsSunset);
	sunrise.textContent = `${sunriseObj.toLocaleString([], {
		hour: '2-digit',
		minute: '2-digit',
	})}`;
	sunset.textContent = `${sunsetObj.toLocaleString([], {
		hour: '2-digit',
		minute: '2-digit',
	})}`;
};

const updateBg = (arr) => {
	const icon = arr.weather[0].icon;
	if (icon === '01d' || icon === '01n') {
		document.documentElement.style.setProperty('--backgroundColor', '#FFCACA');
		document.documentElement.style.setProperty('--textColor', '#FFF');
		main.style.setProperty('background-image', 'url(./image/sunny.png)');
		main.style.setProperty('background-position', '60px 85px');
		kanji.textContent = '晴';
	} else if (icon === '02d' || icon === '02n') {
		document.documentElement.style.setProperty('--backgroundColor', '#FFCACA');
		document.documentElement.style.setProperty('--textColor', '#FFF');
		main.style.setProperty('background-image', 'url(./image/fewCloud.png)');
		main.style.setProperty('background-position', '20px 130px');
		kanji.textContent = '晴';
	} else if (icon === '03d' || icon === '03n') {
		document.documentElement.style.setProperty('--backgroundColor', '#07805D');
		document.documentElement.style.setProperty('--textColor', '#FFF');
		main.style.setProperty('background-image', 'url(./image/cloud.png)');
		main.style.setProperty('background-position', '-90px 60px');
		kanji.textContent = '曇';
	} else if (icon === '04d' || icon === '04n') {
		document.documentElement.style.setProperty('--backgroundColor', '#07805D');
		document.documentElement.style.setProperty('--textColor', '#FFF');
		main.style.setProperty('background-image', 'url(./image/brokenCloud.png)');
		main.style.setProperty('background-position', '-90px 60px');
		kanji.textContent = '曇';
	} else if (icon === '09d' || icon === '09n') {
		document.documentElement.style.setProperty('--backgroundColor', '#0D60F2');
		document.documentElement.style.setProperty('--textColor', '#FFF');
		main.style.setProperty('background-image', 'url(./image/showerRain.png)');
		main.style.setProperty('background-position', '-90px -30px');
		kanji.textContent = '雨';
	} else if (icon === '10d' || icon === '10n') {
		document.documentElement.style.setProperty('--backgroundColor', '#0D60F2');
		document.documentElement.style.setProperty('--textColor', '#FFF');
		main.style.setProperty('background-image', 'url(./image/rain.png)');
		main.style.setProperty('background-position', '-50px 100px');
		kanji.textContent = '雨';
	} else if (icon === '11d' || icon === '11n') {
		document.documentElement.style.setProperty('--backgroundColor', '#000000');
		document.documentElement.style.setProperty('--textColor', '#FFF');
		main.style.setProperty('background-image', 'url(./image/thunder.png)');
		main.style.setProperty('background-position', '-90px 10px');
		kanji.textContent = '雷';
	} else if (icon === '13d' || icon === '13n') {
		document.documentElement.style.setProperty('--backgroundColor', '#02DAFF');
		document.documentElement.style.setProperty('--textColor', '#FF7171');
		main.style.setProperty('background-image', 'url(./image/snow.png)');
		main.style.setProperty('background-position', '20px 145px');
		kanji.textContent = '雪';
	} else if (icon === '50d' || icon === '50n') {
		document.documentElement.style.setProperty('--backgroundColor', '#FFCACA');
		document.documentElement.style.setProperty('--textColor', '#FFF');
		main.style.setProperty('background-image', 'url(./image/mist.png)');
		main.style.setProperty('background-position', '10px 150px');
		kanji.textContent = '霧';
	}
};

// Hook up the event listeners
input.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		fetchData();
	}
});

updateBtn.addEventListener('click', fetchData);
