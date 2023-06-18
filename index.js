const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author");
const quoteBtn = document.querySelector("button");
const speak = document.querySelector(".speak");
const copy = document.querySelector(".clipboard");

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerHTML = "Generating..";
  fetch("https://api.quotable.io/random").then((res) =>
    res.json().then((result) => {
      quoteText.innerHTML = result.content;
      authorName.innerHTML = "- " + result.author;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerHTML = "Generate Quote";
    })
  );
}

quoteBtn.addEventListener("click", randomQuote);

speak.addEventListener('click', () =>{
  utterance = new SpeechSynthesisUtterance(`${quoteText.innerHTML} quote by ${authorName.innerHTML}`)
  speechSynthesis.speak(utterance);
})

copy.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = quoteText.innerHTML;

  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
});
