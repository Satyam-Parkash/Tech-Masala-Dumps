async function loadDumps() {
  const response = await fetch("dumps.json");
  const dumpsData = await response.json();

  const skillSelect = document.getElementById("skillSelect");
  skillSelect.innerHTML = '<option value="">-- Select --</option>';

  Object.keys(dumpsData).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = dumpsData[key].label;
    skillSelect.appendChild(opt);
  });

  skillSelect.addEventListener("change", () => {
    const skill = skillSelect.value;
    const dumpList = document.getElementById("dumpList");
    dumpList.innerHTML = "";

    if (!skill) {
      dumpList.innerHTML = "<p>👉 Select a skill above to view available dumps.</p>";
      return;
    }

    const files = dumpsData[skill].files;
    if (files.length > 0) {
      const heading = document.createElement("h2");
      heading.textContent = "Available Dumps";
      dumpList.appendChild(heading);

      files.forEach(file => {
        const item = document.createElement("div");
        item.className = "dump-item";
        const name = document.createElement("span");
        name.textContent = file.name;

        const downloadBtn = document.createElement("a");
        downloadBtn.href = file.path;
        downloadBtn.download = "";
        downloadBtn.innerHTML = "<button>Download</button>";

        item.appendChild(name);
        item.appendChild(downloadBtn);
        dumpList.appendChild(item);
      });
    } else {
      dumpList.innerHTML = "<p>No dumps available for this category yet.</p>";
    }
  });
}

loadDumps();