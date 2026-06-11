
let files = [
  "clGUST-launcher.html",
"clcode-editor.html"
];
function generateAllSections() {
  try {
    document.getElementById("lolbutton").remove();
  } catch (e) {}
  
 files.forEach((file) => {
    const lower = file.toLowerCase();
    if (lower.startsWith("cl")) {
      const aftercl = lower.substring(2);
      if (aftercl.length > 0) {
        const firstChar = aftercl[0].toUpperCase();
        if (filesByChar[firstChar]) {
          filesByChar[firstChar].push(file);
        }
      }
    }
  });

  const container = document.getElementById("sections-container");
  allChars.forEach((char) => {
    const section = document.createElement("div");
    section.className = "letter-section";
    section.id = `section-${char}`;

    const header = document.createElement("div");
    header.className = "letter-header";
    header.textContent = char;
    section.appendChild(header);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons-container";

    if (filesByChar[char].length > 0) {
      filesByChar[char].forEach((file) => {
        const btn = document.createElement("input");
        btn.type = "button";
        btn.value = file;
        btn.onclick = () => {
          function normalizeFileName(name) {
            if (name.includes(".") && name.lastIndexOf(".") > 0) return name;
            return name + ".html";
          }

          const normalized = normalizeFileName(file);
          const encoded = encodeURIComponent(normalized);

          fetch(
            `https://cdn.jsdelivr.net/gh/entraptadoeztech/The-Unity-proxy-game-stash@refs/heads/main/${encoded}?t=${Date.now()}`,
          )
            .then((response) => response.text())
            .then((text) => {
              const newWin = window.open("about:blank", "_blank");
              if (newWin) {
                newWin.document.open();
                newWin.document.write(text);
                newWin.document.close();
              }
            });
        };
        btn.style.width = "100%";
        btn.style.height = "100%";
        buttonsContainer.appendChild(btn);
      });
    } else {
      section.classList.add("empty");
      const emptyMsg = document.createElement("div");
      emptyMsg.className = "empty-message";
      emptyMsg.textContent = "No files";
      buttonsContainer.appendChild(emptyMsg);
    }

    section.appendChild(buttonsContainer);
    container.appendChild(section);
  });

  generateSidebar(allChars, filesByChar);
}

function generateSidebar(allChars, filesByChar) {
  const sidebar = document.getElementById("sidebar");

  allChars.forEach((char) => {
    const btn = document.createElement("button");
    btn.className = "sidebar-btn";
    btn.textContent = char;

    if (filesByChar[char].length === 0) {
      btn.classList.add("empty");
    } else {
      btn.onclick = () => {
        const section = document.getElementById(`section-${char}`);
        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      };
    }

    sidebar.appendChild(btn);
  });
}
generateAllSections();
