const sourceLanguage = document.getElementById('sourceLanguage');
const targetLanguage = document.getElementById('targetLanguage');
const sourceText = document.getElementById('sourceText');
const translatedText = document.getElementById('translatedText');
const translateButton = document.getElementById('translateButton');
const buttonText = document.getElementById('buttonText');
const charCount = document.getElementById('charCount');
const resultStatus = document.getElementById('resultStatus');
const copyButton = document.getElementById('copyButton');
const errorMessage = document.getElementById('errorMessage');

document.getElementById('year').textContent = new Date().getFullYear();

function updateCount() {
  charCount.textContent = `${sourceText.value.length} / 5000`;
}
sourceText.addEventListener('input', updateCount);

function showError(message) {
  errorMessage.textContent = message;
}
function clearError() {
  errorMessage.textContent = '';
}
function setResult(text, placeholder = false) {
  translatedText.textContent = text;
  translatedText.classList.toggle('placeholder', placeholder);
  copyButton.disabled = placeholder || !text;
}

document.getElementById('clearButton').addEventListener('click', () => {
  sourceText.value = '';
  updateCount();
  setResult('Your translation will appear here.', true);
  resultStatus.textContent = 'Ready to translate';
  clearError();
  sourceText.focus();
});

document.getElementById('swapButton').addEventListener('click', () => {
  const oldSource = sourceLanguage.value;
  sourceLanguage.value = targetLanguage.value;
  targetLanguage.value = oldSource;
  const oldInput = sourceText.value;
  sourceText.value = translatedText.classList.contains('placeholder') ? '' : translatedText.textContent;
  setResult(oldInput || 'Your translation will appear here.', !oldInput);
  updateCount();
  resultStatus.textContent = 'Languages swapped';
  clearError();
});

document.getElementById('pasteButton').addEventListener('click', async () => {
  clearError();
  try {
    if (!navigator.clipboard || !navigator.clipboard.readText) throw new Error('Clipboard access is not available in this browser.');
    const pasted = await navigator.clipboard.readText();
    const remaining = 5000 - sourceText.value.length;
    sourceText.value += pasted.slice(0, remaining);
    updateCount();
    sourceText.focus();
  } catch (error) {
    showError('Could not read the clipboard. Please paste using Ctrl+V (or your device paste menu).');
  }
});

copyButton.addEventListener('click', async () => {
  clearError();
  try {
    await navigator.clipboard.writeText(translatedText.textContent);
    resultStatus.textContent = 'Copied to clipboard';
    copyButton.textContent = 'Copied ✓';
    setTimeout(() => { copyButton.textContent = 'Copy result'; }, 1600);
  } catch (error) {
    showError('Copy was blocked by your browser. Select the translated text and copy it manually.');
  }
});

translateButton.addEventListener('click', translate);

sourceText.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') translate();
});

async function translate() {
  clearError();
  const text = sourceText.value.trim();
  if (!text) {
    showError('Please enter some text to translate.');
    sourceText.focus();
    return;
  }
  if (sourceLanguage.value === targetLanguage.value) {
    setResult(text);
    resultStatus.textContent = 'Same language selected';
    return;
  }

  translateButton.disabled = true;
  buttonText.textContent = 'Translating…';
  resultStatus.textContent = 'Contacting translation service…';
  setResult('Translating your text…', true);

  try {
    const langpair = `${sourceLanguage.value}|${targetLanguage.value}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(langpair)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('The translation service is temporarily unavailable.');
    const data = await response.json();

    if (data.responseStatus !== 200 || !data.responseData || !data.responseData.translatedText) {
      throw new Error(data.responseDetails || 'No translation was returned. Please try again.');
    }

    const output = decodeHtml(data.responseData.translatedText);
    setResult(output);
    resultStatus.textContent = 'Translation complete';
  } catch (error) {
    setResult('Your translation will appear here.', true);
    resultStatus.textContent = 'Translation failed';
    showError(`${error.message || 'Something went wrong.'} Check your internet connection and try again. The free service may also have usage limits.`);
  } finally {
    translateButton.disabled = false;
    buttonText.textContent = 'Translate text';
  }
}

function decodeHtml(value) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = value;
  return textarea.value;
}
