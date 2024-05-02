async function initiateSwap() {
    const fromToken = document.getElementById('fromToken').value;
    const toToken = document.getElementById('toToken').value;
    const amount = document.getElementById('amount').value;
    const userWalletAddress = document.getElementById('userWallet').value;
  
    // Send swap request to backend
    const response = await fetch('/swap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fromToken, toToken, amount, userWalletAddress })
    });
  
    const data = await response.json();
    const statusElement = document.getElementById('status');
  
    if (data.success) {
      statusElement.innerHTML = `<p>${data.message}</p>`;
    } else {
      statusElement.innerHTML = `<p>Swap failed: ${data.message}</p>`;
    }
  }
  async function connectWallet() {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        if (accounts.length > 0) {
          const address = accounts[0];
          document.getElementById('status').innerHTML = `<p>Connected to wallet: ${address}</p>`;
          // Additional logic after successful connection
          // Example: Load user's token balances, enable swap functionality, etc.
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
        document.getElementById('status').innerHTML = `<p>Error connecting wallet: ${error.message}</p>`;
      }
    } else {
      document.getElementById('status').innerHTML = `<p>MetaMask extension not detected. Please install MetaMask to connect.</p>`;
    }
  }
  