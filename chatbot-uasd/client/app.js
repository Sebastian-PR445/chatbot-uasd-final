const API_URL = "/api/chat";
const chatForm = document.getElementById("chatForm");
const questionInput = document.getElementById("questionInput");
const chatMessages = document.getElementById("chatMessages");
const suggestionsContainer = document.getElementById("suggestions");

async function loadSuggestions() {
  try {
    const response = await fetch(`${API_URL}/suggestions`);
    const data = await response.json();

    suggestionsContainer.innerHTML = "";

    data.suggestions.forEach((question) => {
      const button = document.createElement("button");
      button.className = "suggestion-btn";
      button.textContent = question;
      button.addEventListener("click", () => sendQuestion(question));
      suggestionsContainer.appendChild(button);
    });
  } catch (error) {
    console.error("Error cargando sugerencias:", error);
  }
}

function addMessage(text, sender, loading = false) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = `bubble ${loading ? "loading" : ""}`;
  bubble.textContent = text;

  message.appendChild(bubble);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  return message;
}

async function sendQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addMessage(cleanQuestion, "user");
  questionInput.value = "";

  const loadingMessage = addMessage(
    "Buscando información en el Estatuto...",
    "bot",
    true
  );

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: cleanQuestion }),
    });

    const data = await response.json();

    loadingMessage.remove();

    if (!response.ok) {
      addMessage(data.error || "Ocurrió un error.", "bot");
      return;
    }

    addMessage(data.answer, "bot");
  } catch (error) {
    console.error("Error enviando pregunta:", error);
    loadingMessage.remove();
    addMessage("No se pudo conectar con el servidor.", "bot");
  }
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendQuestion(questionInput.value);
});

loadSuggestions();