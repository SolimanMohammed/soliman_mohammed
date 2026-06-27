// =========================
// THEME TOGGLE
// =========================

const themeToggle = document.getElementById("themeToggle");
const icon = document.querySelector(".icon");

if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-mode");
    icon.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        icon.textContent = "☀️";
        localStorage.setItem("theme","light");

    }else{

        icon.textContent = "🌙";
        localStorage.setItem("theme","dark");

    }

});

// =========================
// SECTION ANIMATION
// =========================

const sections = document.querySelectorAll("section");

function revealSections(){

    sections.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;

        if(sectionTop < window.innerHeight * 0.8){

            section.classList.add("section-show");
            section.classList.add("section-active");

        }else{

            section.classList.remove("section-active");

        }

    });

}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

// =========================
// ACTIVE NAV LINK
// =========================

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});



const counters = document.querySelectorAll('.counter');

const startCounters = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let count = 0;

        const updateCounter = () => {

            const increment = target / 100;

            if(count < target){

                count += increment;

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(updateCounter);

            }else{

                counter.innerText = target;

            }

        };

        updateCounter();

    });

};

window.addEventListener("load", startCounters);

const btn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll',()=>{

    if(window.scrollY > 500)
        btn.classList.add('show');
    else
        btn.classList.remove('show');

});

btn.onclick = ()=>{

    window.scrollTo({
        top:0,
        behavior:'smooth'
    });

};


/* ==========================================
PROFESSIONAL LIGHTBOX
========================================== */

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

    /* Open */

    function showImage(index){

        currentIndex = index;

        lightbox.classList.add("show");

        lightboxImg.src = images[index].src;

        captionTitle.textContent =
            images[index].dataset.title || "";

        captionDesc.textContent =
            images[index].dataset.desc || "";

        zoomLevel = 1;
        lightboxImg.style.transform = "scale(1)";
    }

    /* Gallery Click */

    images.forEach((img,index)=>{

        img.addEventListener("click",()=>{

            showImage(index);

        });

    });

    /* Close */

    closeBtn.onclick = ()=>{

        lightbox.classList.remove("show");

    };

    /* Next */

    nextBtn.onclick = ()=>{

        currentIndex++;

        if(currentIndex >= images.length)
            currentIndex = 0;

        showImage(currentIndex);

    };

    /* Previous */

    prevBtn.onclick = ()=>{

        currentIndex--;

        if(currentIndex < 0)
            currentIndex = images.length - 1;

        showImage(currentIndex);

    };

    /* Keyboard */

    document.addEventListener("keydown",(e)=>{

        if(!lightbox.classList.contains("show"))
            return;

        if(e.key === "ArrowRight")
            nextBtn.click();

        if(e.key === "ArrowLeft")
            prevBtn.click();

        if(e.key === "Escape")
            closeBtn.click();

    });

    /* Zoom */

    zoomIn.onclick = ()=>{

        zoomLevel += .2;

        lightboxImg.style.transform =
            `scale(${zoomLevel})`;

    };

    zoomOut.onclick = ()=>{

        if(zoomLevel > .4){

            zoomLevel -= .2;

            lightboxImg.style.transform =
                `scale(${zoomLevel})`;

        }

    };

    /* Click Outside */

    lightbox.addEventListener("click",(e)=>{

        if(e.target === lightbox){

            lightbox.classList.remove("show");

        }

    });

});


/* ==========================================
   CONTENT & IMAGE PROTECTION
========================================== */

// منع كليك يمين على الموقع بالكامل
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

// منع سحب الصور
document.querySelectorAll("img").forEach(img => {

    img.setAttribute("draggable", "false");

    img.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });

});

// منع النسخ والقص والتحديد
document.addEventListener("copy", (e) => {
    e.preventDefault();
});

document.addEventListener("cut", (e) => {
    e.preventDefault();
});

document.addEventListener("selectstart", (e) => {
    e.preventDefault();
});

// منع بعض اختصارات لوحة المفاتيح
document.addEventListener("keydown", (e) => {

    // F12
    if (e.key === "F12") {
        e.preventDefault();
    }

    // Ctrl + U
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
    }

    // Ctrl + S
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
    }

    // Ctrl + Shift + I
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
    }

    // Ctrl + Shift + J
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
    }

    // Ctrl + Shift + C
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
    }

});

// محاولة اكتشاف فتح Developer Tools
let devtoolsOpen = false;

setInterval(() => {

    if (
        window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160
    ) {

        if (!devtoolsOpen) {

            devtoolsOpen = true;

            document.body.innerHTML = `
                <div style="
                    height:100vh;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    flex-direction:column;
                    background:#0f172a;
                    color:white;
                    font-family:Segoe UI;
                    text-align:center;
                ">
                    <h1>Access Restricted</h1>
                    <p>Developer tools are not allowed on this website.</p>
                </div>
            `;
        }

    } else {

        devtoolsOpen = false;

    }

}, 1000);

let typed;

function updateTyping(translations){

    if(typed){
        typed.destroy();
    }

    typed = new Typed(".typing",{

        strings:[
            translations.typing_1,
            translations.typing_2,
            translations.typing_3,
            translations.typing_4
        ],

        typeSpeed:70,
        backSpeed:40,
        backDelay:1500,
        loop:true

    });

}


window.addEventListener("scroll",()=>{

    const scrollTop =
    document.documentElement.scrollTop;

    const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    const progress =
    (scrollTop / scrollHeight) * 100;

    document.getElementById("progressBar")
    .style.width = progress + "%";

});

fetch(
"https://api.countapi.xyz/hit/dr-soliman-portfolio/visits"
)

.then(response => response.json())

.then(data => {

    document.getElementById("visitors").innerText =
    data.value;

});
