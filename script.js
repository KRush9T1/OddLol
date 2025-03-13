document.addEventListener('DOMContentLoaded', () => {
  const numberInput = document.getElementById('numberInput');
  const checkButton = document.getElementById('checkButton');
  const errorDiv = document.getElementById('error');
  const loadingDiv = document.getElementById('loading');
  const resultDiv = document.getElementById('result');
  const resultNumber = document.getElementById('resultNumber');
  const resultState = document.getElementById('resultState');

  const checkNumber = async () => {
    const number = numberInput.value.trim();
    
    if (!number) {
      errorDiv.textContent = 'Please enter a number';
      return;
    }

    try {
      // Clear previous state
      errorDiv.textContent = '';
      resultDiv.classList.add('hidden');
      loadingDiv.classList.remove('hidden');
      checkButton.disabled = true;

      const response = await fetch(`https://is-odd-api.mewtru.com/v1/numbers/${number}`);
      
      if (!response.ok) {
        throw new Error('Failed to check number');
      }

      const data = await response.json();
      
      // Update result
      resultNumber.textContent = data.number;
      resultState.textContent = data.state.toUpperCase();
      resultDiv.className = `result ${data.odd ? 'odd' : 'even'}`;
      resultDiv.classList.remove('hidden');
    } catch (err) {
      errorDiv.textContent = 'Failed to check number. Please try again.';
    } finally {
      loadingDiv.classList.add('hidden');
      checkButton.disabled = false;
    }
  };

  // Event listeners
  checkButton.addEventListener('click', checkNumber);
  
  numberInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      checkNumber();
    }
  });

  // Focus input on load
  numberInput.focus();
});