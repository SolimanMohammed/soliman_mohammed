const langBtn = document.getElementById("langToggle");

let currentLang = localStorage.getItem("lang") || "en";

async function loadLanguage(lang){

    try{

        const response = await fetch(`languages/${lang}.json`);

        const translations = await response.json();
        updateTyping(translations);

        document.querySelectorAll("[data-lang]").forEach(element => {

            const key = element.getAttribute("data-lang");

            if(translations[key]){
                element.innerHTML = translations[key];
            }

        });

        // Change page language
        document.documentElement.lang = lang;

        // Change page direction
        document.documentElement.dir =
            lang === "ar" ? "rtl" : "ltr";

        // Change button text
        langBtn.textContent =
            lang === "ar" ? "EN" : "AR";

        // Save language
        localStorage.setItem("lang", lang);

        // Update current language
        currentLang = lang;

    }catch(error){

        console.error("Language loading error:", error);

    }

}

// Load saved language when page opens
document.addEventListener("DOMContentLoaded", () => {
    loadLanguage(currentLang);
});

// Toggle language button
langBtn.addEventListener("click", () => {

    currentLang =
        currentLang === "en"
        ? "ar"
        : "en";

    loadLanguage(currentLang);

});