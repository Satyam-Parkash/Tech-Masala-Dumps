// Loads the available dumps and populates the skill selector
async function loadDumps() {
  // Fetch the dumps data from the JSON file
  const response = await fetch("dumps.json");
  const dumpsData = await response.json();

  // Get the skill selector dropdown
  const skillSelect = document.getElementById("skillSelect");
  // Reset dropdown options
  skillSelect.innerHTML = '<option value="">-- Select --</option>';

  // Populate the dropdown with available skills/domains
  Object.keys(dumpsData).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = dumpsData[key].label;
    skillSelect.appendChild(opt);
  });

  // Listen for changes in the skill selector
  skillSelect.addEventListener("change", () => {
    const skill = skillSelect.value;
    const dumpList = document.getElementById("dumpList");
    // Clear previous dump list
    dumpList.innerHTML = "";

    // If no skill is selected, show a prompt
    if (!skill) {
      dumpList.innerHTML = "<p>👉 Select a skill above to view available dumps.</p>";
      return;
    }

    // Get the files for the selected skill
    const files = dumpsData[skill].files;
    if (files.length > 0) {

  // Create a sticky container for heading and search box
  const stickyHeader = document.createElement("div");
  stickyHeader.className = "sticky-header";

  // Add heading for available dumps
  const heading = document.createElement("h2");
  heading.textContent = "Available Dumps";
  stickyHeader.appendChild(heading);

  // Add search box for filtering dumps
  const searchBox = document.createElement("div");
  searchBox.className = "search-box";
  searchBox.innerHTML = `<input type="text" id="searchInput" placeholder=" 🔍 Search exams, codes...">`;
  stickyHeader.appendChild(searchBox);

  // Add sticky header to dump list
  dumpList.appendChild(stickyHeader);

  // Container for dump items
  const listContainer = document.createElement("div");
  listContainer.id = "dumpsContainer";
  dumpList.appendChild(listContainer);


      // For each file, create a dump item with download button
      files.forEach(file => {
        const item = document.createElement("div"); // Container for each dump
        item.className = "dump-item";
        const name = document.createElement("span"); // File name
        name.textContent = file.name;

        // Download button for the file
        const downloadBtn = document.createElement("a");
        downloadBtn.href = file.path;
        downloadBtn.download = "";
        downloadBtn.innerHTML = "<button>Download</button>";

        item.appendChild(name);
        item.appendChild(downloadBtn);
        listContainer.appendChild(item);
      });

      // Add search logic to filter dumps as user types
      document.getElementById("searchInput").addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const items = document.querySelectorAll(".dump-item");

        items.forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(query) ? "" : "none";
        });
      });

    } else {
      // If no dumps are available for the selected skill
      dumpList.innerHTML = "<p>No dumps available for this category yet.</p>";
    }
  });
}

// Initialize the page by loading dumps
loadDumps();
