const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

const switchThemeMode = (theme) => {
  bgColor1 = theme === "light" ? 255 : 0;
  bgColor2 = theme === "light" ? 0 : 255;
  icon = theme === "light" ? "fa-sun" : "fa-moon";
  document.documentElement.setAttribute("data-theme", theme);
  nav.style.backgroundColor = `rgb(${bgColor1} ${bgColor1} ${bgColor1} / 50%)`;
  textBox.style.backgroundColor = `rgb(${bgColor2} ${bgColor2} ${bgColor2} / 50%)`;
  toggleIcon.children[0].textContent = `${
    theme.charAt(0).toUpperCase() + theme.slice(1)
  } Mode`;
  toggleIcon.children[1].classList.remove("fa-moon");
  toggleIcon.children[1].classList.remove("fa-sun");
  toggleIcon.children[1].classList.add(icon);
  image1.src = `img/undraw_proud_coder_${theme}.svg`;
  image2.src = `img/undraw_feeling_proud_${theme}.svg`;
  image3.src = `img/undraw_conceptual_idea_${theme}.svg`;
  // Check checkbox when theme is dark; needed for page reload with dark mode
  // as users choice
  toggleSwitch.checked = theme === "dark";
  // Save users theme choice in local storage
  localStorage.setItem("theme", theme);
};

const switchTheme = ({target: {checked : isDarkMode}}) => {
  // isDarkMode from the event is true, if input is checked
  if (isDarkMode) {
    switchThemeMode("dark");
  } else {
    switchThemeMode("light");
  }
};

toggleSwitch.addEventListener("change", switchTheme);

// Get users theme choice from local storage
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  switchThemeMode(currentTheme);
}
