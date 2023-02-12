// selection
let dropdownToggles = Array.from(document.querySelectorAll(".dropdown-toggle"));
let menuBtn = document.getElementById("menuBtn");
let menuFire = Array.from(document.querySelectorAll(".fire"));

// rotate arrow when click!
dropdownToggles.forEach((dropdown) => {
	dropdown.onclick = () => {
		console.log(dropdown.getElementsByClassName("arrow"));
		if (dropdown.getAttribute("aria-expanded") === "true") {
			dropdown.getElementsByClassName("arrow")[0].style.transform =
				"rotate(180deg)";
		} else {
			dropdown.getElementsByClassName("arrow")[0].style.transform =
				"rotate(0deg)";
		}
	};
	setInterval(() => {
		if (dropdown.getAttribute("aria-expanded") === "true") {
			dropdown.getElementsByClassName("arrow")[0].style.transform =
				"rotate(180deg)";
		} else {
			dropdown.getElementsByClassName("arrow")[0].style.transform =
				"rotate(0deg)";
		}
	}, 100);
});

// menu handel
menuBtn.onclick = () => {
	if (menuBtn.getAttribute("aria-expanded") === "false") {
		menuBtn.innerHTML = '<img src="./images/icon-hamburger.svg" alt="">';
	} else {
		menuBtn.innerHTML = '<img src="./images/icon-close.svg" alt="">';
	}
};

// sw installing
if (navigator.serviceWorker) {
	navigator.serviceWorker
		.register("./sw.js")
		.then((reg) => {
			console.log("register", reg);
		})
		.catch((err) => {
			console.log(err);
		});
}
