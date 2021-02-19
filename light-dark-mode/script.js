const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

const toggleThemeMode = (toDark) => {
  const theme = toDark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  nav.style.backgroundColor = toDark ? "rgb(0 0 0 / 50%)" : "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = toDark ? "rgb(255 255 255 / 50%)" : "rgb(0 0 0 / 50%)";
  toggleIcon.children[0].textContent = toDark ? "Dark Mode" : "Light Mode";
  toggleIcon.children[1].classList.remove("fa-moon", "fa-sun");
  toggleIcon.children[1].classList.add(toDark ? "fa-moon" : "fa-sun");
  image1.src = `img/undraw_proud_coder_${theme}.svg`;
  image2.src = `img/undraw_feeling_proud_${theme}.svg`;
  image3.src = `img/undraw_conceptual_idea_${theme}.svg`;
  // Check checkbox when theme is dark; needed for page reload with dark mode
  // as users choice
  toggleSwitch.checked = toDark;
  // Save users theme choice in local storage
  localStorage.setItem("darkmode", toDark);
};

const switchTheme = ({target: {checked : toDark}}) => {
  // isDarkMode from the event is true, if input is checked
  toggleThemeMode(toDark);
};

toggleSwitch.addEventListener("change", switchTheme);

// Get users theme choice from local storage
const darkmode = localStorage.getItem("darkmode");
toggleThemeMode(darkmode);
