initThemeSwitcher()

function initThemeSwitcher() {
    const themeHrefs = {
        light: "style/theme/day-variables.css",
        dark: "style/theme/night-variables.css",
      },
      head = document.getElementsByTagName("head")[0],
      changeThemeButton = document.getElementById("change-theme-button");

    let theme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";

    changeThemeButton.addEventListener("click", () => {
      changeTheme(theme);
    });

    /**
     * @param {'light' | 'dark'} currentTheme
     */
    function changeTheme(currentTheme) {
      removeLinks();
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = themeHrefs[newTheme];
      head.appendChild(link);
      setButtonText(theme);
      theme = newTheme;
    }

    /**
     * @param {'light' | 'dark'} currentTheme
     */
    function setButtonText(currentTheme) {
      changeThemeButton.textContent = `${currentTheme} theme`;
    }

    function removeLinks() {
      for (let link of head.getElementsByTagName("link")) {
        for (const key in themeHrefs) {
          if (link.href.includes(themeHrefs[key])) {
              link.remove()
          }
        }
      }
    }

    changeTheme(theme);
    setButtonText(theme === "dark" ? "light" : "dark");
}