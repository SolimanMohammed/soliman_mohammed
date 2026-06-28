/* ==================================================
   THEME TOGGLE SYSTEM
================================================== */

const themeToggle = document.getElementById("themeToggle");
const icon = document.querySelector(".icon");

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light-mode");
    icon.textContent = "☀️";

}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        icon.textContent = "☀️";
        localStorage.setItem("theme", "light");

    } else {

        icon.textContent = "🌙";
        localStorage.setItem("theme", "dark");

    }

});


/* ==================================================
   SECTION REVEAL ANIMATION
================================================== */

const sections = document.querySelectorAll("section");

function revealSections() {

    sections.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < window.innerHeight * 0.8) {

            section.classList.add("section-show");
            section.classList.add("section-active");

        } else {

            section.classList.remove("section-active");

        }

    });

}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);


/* ==================================================
   ACTIVE NAVIGATION LINKS
================================================== */

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* ==================================================
   STATISTICS COUNTER
================================================== */

const counters = document.querySelectorAll(".counter");

function startCounters() {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let count = 0;

        function updateCounter() {

            const increment = target / 100;

            if (count < target) {

                count += increment;

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        }

        updateCounter();

    });

}

window.addEventListener("load", startCounters);


/* ==================================================
   SCROLL TO TOP BUTTON
================================================== */

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ==================================================
   SCROLL PROGRESS BAR
================================================== */

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    document.getElementById("progressBar")
        .style.width = progress + "%";

});


/* ==================================================
   VISITOR COUNTER
================================================== */

fetch(
    "https://api.countapi.xyz/hit/dr-soliman-portfolio/visits"
)

.then(response => response.json())

.then(data => {

    document.getElementById("visitors").innerText =
        data.value;

})

.catch(error => console.log(error));


/* ==================================================
   TYPING ANIMATION
================================================== */

let typed;

function updateTyping(translations) {

    if (typed) {

        typed.destroy();

    }

    typed = new Typed(".typing", {

        strings: [

            translations.typing_1,
            translations.typing_2,
            translations.typing_3,
            translations.typing_4

        ],

        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 1500,
        loop: true

    });

}


/* ==================================================
   MOBILE MENU
================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.querySelector(".nav-links");

const overlay =
    document.querySelector(".menu-overlay");

menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("show");

});

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        overlay.classList.remove("show");

    });

});

overlay.addEventListener("click", () => {

    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    overlay.classList.remove("show");

});


/* ==================================================
   PROFESSIONAL GALLERY LIGHTBOX
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const images =
        document.querySelectorAll(".gallery-track img");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImg =
        document.querySelector(".lightbox-image");

    const closeBtn =
        document.querySelector(".close-lightbox");

    const nextBtn =
        document.querySelector(".next-lightbox");

    const prevBtn =
        document.querySelector(".prev-lightbox");

    const zoomIn =
        document.getElementById("zoomIn");

    const zoomOut =
        document.getElementById("zoomOut");

    const captionTitle =
        document.querySelector(".caption-title");

    const captionDesc =
        document.querySelector(".caption-desc");

    let currentIndex = 0;
    let zoomLevel = 1;

    function showImage(index) {

        currentIndex = index;

        lightbox.classList.add("show");

        lightboxImg.src = images[index].src;

        captionTitle.textContent =
            images[index].dataset.title || "";

        captionDesc.textContent =
            images[index].dataset.desc || "";

        zoomLevel = 1;

        lightboxImg.style.transform =
            "scale(1)";

    }

    images.forEach((img, index) => {

        img.addEventListener("click", () => {

            showImage(index);

        });

    });

    closeBtn.onclick = () =>
        lightbox.classList.remove("show");

    nextBtn.onclick = () => {

        currentIndex =
            (currentIndex + 1) % images.length;

        showImage(currentIndex);

    };

    prevBtn.onclick = () => {

        currentIndex =
            (currentIndex - 1 + images.length)
            % images.length;

        showImage(currentIndex);

    };

    zoomIn.onclick = () => {

        zoomLevel += .2;

        lightboxImg.style.transform =
            `scale(${zoomLevel})`;

    };

    zoomOut.onclick = () => {

        if (zoomLevel > .4) {

            zoomLevel -= .2;

            lightboxImg.style.transform =
                `scale(${zoomLevel})`;

        }

    };

    document.addEventListener("keydown", e => {

        if (!lightbox.classList.contains("show"))
            return;

        if (e.key === "ArrowRight")
            nextBtn.click();

        if (e.key === "ArrowLeft")
            prevBtn.click();

        if (e.key === "Escape")
            closeBtn.click();

    });

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            lightbox.classList.remove("show");

        }

    });

});


/* ==================================================
   CONTENT & IMAGE PROTECTION
================================================== */

document.addEventListener("contextmenu",
    e => e.preventDefault());

document.addEventListener("copy",
    e => e.preventDefault());

document.addEventListener("cut",
    e => e.preventDefault());

document.addEventListener("selectstart",
    e => e.preventDefault());

document.querySelectorAll("img").forEach(img => {

    img.setAttribute("draggable", "false");

    img.addEventListener("dragstart", e => {

        e.preventDefault();

    });

});

document.addEventListener("keydown", e => {

    if (
        e.key === "F12" ||
        (e.ctrlKey && e.key.toLowerCase() === "u") ||
        (e.ctrlKey && e.key.toLowerCase() === "s") ||
        (e.ctrlKey && e.shiftKey &&
            ["i", "j", "c"].includes(e.key.toLowerCase()))
    ) {

        e.preventDefault();

    }

});
