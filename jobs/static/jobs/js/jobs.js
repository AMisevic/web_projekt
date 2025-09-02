document.addEventListener("DOMContentLoaded", () => {
    console.log("jobs.js is loaded!");

    function normalizeLocation(location) {
        if (!location) return "";
        return location.split(/[ ,]/)[0].toLowerCase();
    }

    function filterJobs() {
        const locationFilter = document.getElementById("location").value;
        const budgetFilter = document.getElementById("budget").value;
        const durationFilter = document.getElementById("job_duration").value;

        const jobs = document.querySelectorAll(".job-card");
        const noJobsMessage = document.getElementById("noJobsMessage");

        let visibleCount = 0;

        jobs.forEach(job => {
            const jobLocation = normalizeLocation(job.dataset.location);
            const filterLocation = normalizeLocation(locationFilter);

            const budget = parseFloat(job.dataset.budget);
            const duration = parseInt(job.dataset.duration, 10);

            const locationMatch = !filterLocation || jobLocation === filterLocation;

            let budgetMatch = true;
            if (budgetFilter === "low") budgetMatch = budget < 10;
            if (budgetFilter === "mid") budgetMatch = budget >= 10 && budget <= 20;
            if (budgetFilter === "high") budgetMatch = budget > 20;

            let durationMatch = true;
            if (durationFilter === "short") durationMatch = duration >= 1 && duration <= 2;
            if (durationFilter === "medium") durationMatch = duration >= 3 && duration <= 4;
            if (durationFilter === "long") durationMatch = duration >= 5 && duration <= 6;        

            if (locationMatch && budgetMatch && durationMatch) {
                job.style.display = "block";
                visibleCount++;
            } else {
                job.style.display = "none";
            }
        });

        if (noJobsMessage) {
            noJobsMessage.style.display = visibleCount === 0 ? "block" : "none";
        }
    }

    function resetFilters() {
        document.getElementById("location").value = "";
        document.getElementById("budget").value = "";
        document.getElementById("job_duration").value = "";

        const jobs = document.querySelectorAll(".job-card");
        jobs.forEach(job => job.style.display = "block");

        const noJobsMessage = document.getElementById("noJobsMessage");
        if (noJobsMessage) noJobsMessage.style.display = "none";
    }

    const filterBtn = document.getElementById("filterBtn");
    if (filterBtn) filterBtn.addEventListener("click", filterJobs);

    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) resetBtn.addEventListener("click", resetFilters);
});