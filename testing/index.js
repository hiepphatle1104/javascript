const url =
	"https://vietnam-administrative-division-json-server-swart.vercel.app/province";
fetch(url)
	.then((response) => response.json())
	.then((data) => {
		const provinces = [...data];
		provinces.forEach((province) => {
			// const test = "('01',	'Thành phố Hà Nội',	8435,	3359.84),"
			let id = province.idProvince;
			let name = province.name;
			let string = "";
			let mien = "M02";
			const cities = ["01", "79", "48", "92", "31"];
			const mienBac = [
				"01",
				"26",
				"27",
				"30",
				"22",
				"31",
				"34",
				"35",
				"37",
				"02",
				"04",
				"06",
				"08",
				"10",
				"15",
				"19",
				"20",
				"24",
				"25",
				"11",
				"14",
				"17",
				"12",
				"33",
				"36",
			];
			const mienNam = [
				"70",
				"72",
				"77",
				"75",
				"74",
				"79",
				"80",
				"82",
				"83",
				"84",
				"86",
				"87",
				"89",
				"91",
				"92",
				"93",
				"94",
				"95",
				"96",
			];
			mienBac.forEach((city) => {
				if (id == city) mien = "M01";
			});

			mienNam.forEach((city) => {
				if (id == city) mien = "M03";
			});

			let population = "";
			let area = "";
			if (id == "01" || id == "79" || id == "48" || id == "92" || id == "31")
				name = name.slice(10);
			else name = name.slice(5);

			document.querySelectorAll(".city").forEach((city) => {
				const provinceName = city.querySelector(".name").textContent.trim();
				const provincePopulation = city
					.querySelector(".population")
					.textContent.trim();
				const provinceArea = city.querySelector(".area").textContent.trim();
				if (name == provinceName) {
					population = provincePopulation.replaceAll(".", "");
					area = provinceArea.replaceAll(".", "").replace(",", ".");
				}
			});

			string = `('${id}', '${name}', ${population}, ${area}, '${mien}'),`;

			console.log(string);
		});
	});