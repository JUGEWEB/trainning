const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize Web3 with BSC provider
const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'));

// Your contract ABI and address (example ERC20 token contract)
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];
const contractAddress = '0x123456789ABCDEF...'; // Replace with your contract address

// POST /swap endpoint
app.post('/swap', async (req, res) => {
  const { fromToken, toToken, amount, userWalletAddress } = req.body;

  // Example logic for token swap (replace with actual logic)
  try {
    // Connect to your token contract
    const tokenContract = new web3.eth.Contract(contractABI, contractAddress);

    // Example: Get token name
    const tokenName = await tokenContract.methods.name().call();

    // Simulated response for demonstration
    const swapResult = {
      success: true,
      message: `Swap ${amount} ${tokenName} from ${fromToken} to ${toToken} for ${userWalletAddress}`
    };

    res.status(200).send(swapResult);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ success: false, message: 'Swap failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
