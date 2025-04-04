function sendRequest() {
    const url = document.getElementById('urlInput').value;
    if (!url) {
        alert('Voer een geldige URL in.');
        return;
    }
    
    fetch('https://brilliant-baklava.netlify.app/proxy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageURL: url })
    })
    .then(response => response.text())
    .then(html => {
        const newWindow = window.open("about:blank", "_blank");
        if (newWindow) {
            newWindow.document.write(html);
            newWindow.document.close();
        } else {
            alert("Popup geblokkeerd! Sta pop-ups toe in je browser.");
        }
    })
    .catch(error => console.error('Fout bij het ophalen van de pagina:', error));
}