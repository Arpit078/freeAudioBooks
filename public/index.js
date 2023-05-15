// Get references to the input element and the button
const input = document.getElementById('myInput');
const button = document.getElementById('myButton');
const heading = document.getElementById('heading')

// Add an event listener to the button
button.addEventListener('click', () => {
  // Retrieve the input value
  const bookName = input.value.replace('https://goldenaudiobook.com/', '').replace('/', '');
  console.log("pressed")
  window.location.href = `https://freeaudiobooks.onrender.com/q=${bookName}`;
  heading.innerText = "Wait while the book is downloaded. Refresh to download new book."
  button.style.display = "none"
  input.style.display = "none"
});
