// Experience Calculation
const startYear = 2004; // Adjust this based on your experience start year
const currentYear = new Date().getFullYear();
const totalExperience = currentYear - startYear - 2;
const airportExperience = totalExperience - 5; // Adjust based on your specific history

document.getElementById("experience").innerHTML = 
    `Hello! I'm a passionate management techy with ${totalExperience}+ years of experience in ICT, SAS, and ELV systems, including ${airportExperience}+ years leading large-scale airport projects from concept to completion. Proven expertise in managing complex systems, site operations, building automation, and energy management services. Experienced in leveraging AI technologies to enhance system efficiency, automate processes, and deliver advanced data analytics solutions.`;

document.getElementById("currentyear").innerHTML = `&copy; ${currentYear} Subin Vasanthan - Portfolio`;

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle("light-mode");
    const theme = document.body.classList.contains("light-mode") ? "light" : "dark";
    localStorage.setItem("theme", theme); // Save preference
}

// Apply saved theme on load
window.onload = function() {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    }
};
