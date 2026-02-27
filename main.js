const BASE = import.meta.env.VITE_CAMPAIGN_BASE_URL;

window.showToast = function(message, type = 'success') {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-message");
    const toastIcon = document.getElementById("toast-icon");
    
    toastMsg.innerText = message;
    
    if (type === 'error') {
        toast.style.background = "#ef4444";
        toastIcon.innerHTML = "⚠️";
    } else {
        toast.style.background = "#334155";
        toastIcon.innerHTML = "✅";
    }

    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

window.generateLink = function() {
    const idInput = document.getElementById("userId");
    const id = idInput.value.trim();

    if (!id) {
        window.showToast("Please enter an ID first!", "error");
        idInput.focus();
        return;
    }

    const link = BASE + id;

    const resultWrapper = document.getElementById("result-wrapper");
    const resultDiv = document.getElementById("result");
    const copyBtn = document.getElementById("copyBtn");

    resultDiv.innerText = link;
    resultWrapper.style.display = "block";
    copyBtn.style.display = "flex";
    
    window.showToast("Link successfully generated!");
}

window.copyLink = function() {
    const text = document.getElementById("result").innerText;
    
    if (!navigator.clipboard) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            window.showToast("Copied to clipboard!");
        } catch (err) {
            window.showToast("Failed to copy", "error");
        }
        document.body.removeChild(textArea);
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        window.showToast("Copied to clipboard!");
    }).catch(err => {
        window.showToast("Failed to copy", "error");
    });
}

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener("DOMContentLoaded", () => {
    const userIdInput = document.getElementById("userId");
    if (userIdInput) {
        userIdInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                window.generateLink();
            }
        });
    }
});
