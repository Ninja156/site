// Function to make the POST request and extract the cipher
async function fetchCipher() {
  const url = 'https://api.hamsterkombat.io/clicker/config';
  const token = 'Bearer 1719162244024yZZw4ZgYqoANSZRFzvnLWvi8EuNgUAOF2nCEwi1WLrgFpfO0NFmFppQeGS4UBnDK6983501860';

  try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Accept': '*/*',
              'Accept-Language': 'en-US,en;q=0.9,fa-IR;q=0.8,fa;q=0.7,en-GB;q=0.6',
              'Authorization': token,
              'Connection': 'keep-alive',
              'Content-Length': '0',
              'Origin': 'https://hamsterkombat.io',
              'Referer': 'https://hamsterkombat.io/',
              'Sec-Fetch-Dest': 'empty',
              'Sec-Fetch-Mode': 'cors',
              'Sec-Fetch-Site': 'same-site',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
              'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"Windows"'
          }
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const cipher = data.dailyCipher.cipher;
      return cipher;
  } catch (error) {
      console.error('Error fetching cipher:', error);
      return null;
  }
}

// Function to decode the cipher
function cipherDecode(e) {
  const decoded = atob(e.slice(0, 3) + e.slice(4)); // Decode base64
  return decoded;
}

// Function to convert text to Morse code
function convertToMorseCode(text) {
  // Define Morse code mappings for letters and numbers
  const morseCodeMap = {
      'A': '.-',       'B': '-...',     'C': '-.-.',     'D': '-..',
      'E': '.',        'F': '..-.',     'G': '--.',      'H': '....',
      'I': '..',       'J': '.---',     'K': '-.-',      'L': '.-..',
      'M': '--',       'N': '-.',       'O': '---',      'P': '.--.',
      'Q': '--.-',     'R': '.-.',      'S': '...',      'T': '-',
      'U': '..-',      'V': '...-',     'W': '.--',      'X': '-..-',
      'Y': '-.--',     'Z': '--..',
      '0': '-----',    '1': '.----',    '2': '..---',    '3': '...--',
      '4': '....-',    '5': '.....',    '6': '-....',    '7': '--...',
      '8': '---..',    '9': '----.',
      ' ': '/' // Use slash to separate words (not traditional Morse but for display purposes)
  };

  // Convert text to uppercase for consistency
  text = text.toUpperCase();

  // Convert each character to Morse code
  const morseCodeArray = Array.from(text, char => morseCodeMap[char] || '');
  const morseCodeString = morseCodeArray.join(' ');

  return morseCodeString;
}

// Function to update the content of boxes on the webpage
function updateBoxes(decodedText) {
  const box1 = document.getElementById('box1');
  const box2 = document.getElementById('box2');
  const box3 = document.getElementById('box3');

  if (box1) {
      box1.textContent = decodedText; // Update box1 with decoded text
  }

  const morseCode = convertToMorseCode(decodedText); // Convert decoded text to Morse code

  if (box2) {
      box2.textContent = morseCode; // Update box2 with Morse code
  }

  if (box3) {
      box3.textContent = "طراحی شده با ❤️ توسط آرش سیفی"; // Update box3 with "by Arash"
  }
}

// Example usage on page load (you can adjust this as needed)
document.addEventListener('DOMContentLoaded', async function() {
  try {
      const encodedString = await fetchCipher();
      if (encodedString) {
          const decodedText = cipherDecode(encodedString);
          updateBoxes(decodedText);
      }
  } catch (error) {
      console.error('Error initializing:', error);
  }
});
