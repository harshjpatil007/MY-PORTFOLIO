// Smooth scroll
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    });
});

// GitHub Projects Fetch
const username = "harshjpatil007"; // 🔴 REPLACE if needed
const projectsContainer = document.getElementById("projects-container");

fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(data => {
        projectsContainer.innerHTML = "";
        data.slice(0, 6).forEach(repo => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available"}</p>
                <a href="${repo.html_url}" target="_blank">View on GitHub</a>
            `;
            projectsContainer.appendChild(card);
        });
    })
    .catch(() => {
        projectsContainer.innerHTML = "<p>Failed to load projects</p>";
    });
