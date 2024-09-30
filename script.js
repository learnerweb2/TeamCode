// Initialize Ace editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");

// File list functionality
const fileList = document.getElementById("file-list");
fileList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        // In a real app, you'd load the file content here
        editor.setValue(`Content of ${e.target.textContent}`);
    }
});

// Language selector functionality
const languageSelector = document.querySelector("select");
languageSelector.addEventListener("change", (e) => {
    editor.session.setMode(`ace/mode/${e.target.value.toLowerCase()}`);
});

// Run button functionality
const runButton = document.querySelector("button.bg-green-500");
runButton.addEventListener("click", () => {
    const code = editor.getValue();
    // In a real app, you'd send this to the backend for execution
    document.getElementById("console-output").textContent = `Running: ${code}`;
});

// AI assistant functionality
const aiInput = document.getElementById("ai-input");
const aiChat = document.getElementById("ai-chat");

aiInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        const question = e.target.value;
        aiChat.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
        e.target.value = "";

        // In a real app, you'd send this to the backend for AI processing
        const response = await fetch("/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });
        const data = await response.json();
        aiChat.innerHTML += `<p><strong>AI:</strong> ${data.answer}</p>`;
        aiChat.scrollTop = aiChat.scrollHeight;
    }
});