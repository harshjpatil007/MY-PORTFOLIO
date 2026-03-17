// ===============================
// Smooth Scroll Navigation
// ===============================
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ===============================
// GitHub Projects Fetch
// ===============================
const username = "harshjpatil007";
const projectsContainer = document.getElementById("projects-container");

// Show loading state
projectsContainer.innerHTML = "<p>Loading projects...</p>";

async function fetchGitHubProjects() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        if (!response.ok) {
            throw new Error("GitHub API error");
        }

        const repos = await response.json();

        // Sort by latest updated
        const sortedRepos = repos
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 6);

        // Clear container
        projectsContainer.innerHTML = "";

        if (sortedRepos.length === 0) {
            projectsContainer.innerHTML = "<p>No projects found.</p>";
            return;
        }

        sortedRepos.forEach(repo => {
            const card = document.createElement("div");
            card.classList.add("project-card");

            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description ? repo.description : "No description provided."}</p>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                        🔗 View Code
                    </a>
                </div>
            `;

            projectsContainer.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        projectsContainer.innerHTML = `
            <p class="error">
                ⚠️ Unable to load projects. Please try again later.
            </p>
        `;
    }
}

// Call function
fetchGitHubProjects();
