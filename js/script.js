// selection
let dropdownToggles = Array.from(document.querySelectorAll(".dropdown-toggle"));

// rotate arrow when click!
dropdownToggles.forEach((dropdown) => {
	dropdown.onclick = () => {
		// console.log(dropdown.getAttribute("aria-expanded"));
		if (dropdown.getAttribute("aria-expanded") === "true") {
			dropdown.nextElementSibling.style.transform = "rotate(180deg)";
		} else {
			dropdown.nextElementSibling.style.transform = "rotate(0deg)";
		}
	};
	setInterval(() => {
		if (dropdown.getAttribute("aria-expanded") === "true") {
			dropdown.nextElementSibling.style.transform = "rotate(180deg)";
		} else {
			dropdown.nextElementSibling.style.transform = "rotate(0deg)";
		}
	}, 100);
});

// sw installing
if (navigator.serviceWorker) {
	navigator.serviceWorker
		.register("../sw.js")
		.then((reg) => {
			console.log("register", reg);
		})
		.catch((err) => {
			console.log(err);
		});
}
