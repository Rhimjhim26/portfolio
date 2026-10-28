
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// Typing animation
const typing = document.getElementById("typing");
const words = [
    "Web Developer",
    "Python Learner",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const word = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typing.textContent = word.substring(0, charIndex);

    let delay = deleting ? 55 : 100;

    if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1300;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
    }

    setTimeout(typeEffect, delay);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typeEffect();
}

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });
}

// Contact form validation
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name.length < 2) {
        formStatus.textContent =
            "Please enter your name (at least 2 characters).";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        return;
    }

    if (message.length < 10) {
        formStatus.textContent =
            "Please write a message of at least 10 characters.";
        return;
    }

    // Open the visitor's email application with a prepared message.
    // This does not send or store messages on a server.
    const subject = encodeURIComponent(
        "Portfolio message from " + name
    );

    const body = encodeURIComponent(
        message + "\n\nFrom: " + name +
        "\nReply email: " + email
    );

    formStatus.textContent = "Opening your email application...";

    window.location.href =
        "mailto:rimjhimpandey544@gmail.com" +
        "?subject=" + subject + "&body=" + body;
});

// Back-to-top button
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
    topBtn.style.display = window.scrollY > 350 ? "block" : "none";
});

topBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Automatic copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();

const skillCards = document.querySelectorAll(".skill-card");

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

skillCards.forEach((card) => {
    skillObserver.observe(card);
});
