/*
 * We are going to be using the useEffect hook!
 */
import React, { useEffect , useState} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import mongoose from "mongoose";

// Change this up to be your Twitter if you want.
const TWITTER_HANDLE = 'evayzh';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  // State
const [walletAddress, setWalletAddress] = useState(null);
const [inputValue, setInputValue] = useState('');

// MetaMask State
const [currentAccount, setCurrentAccount] = useState(""); 

const getAccountsButton = document.getElementById('getAccounts');

const getAccountsResult = document.getElementById('getAccountsResult');

// const saveTodb = async() => {
//   // TODO: add to database 
//   // add either inputValue or walletAddress, + currentTime 
//   // key [time-> to value]
//   // set +/- (check if unique) -> if you're already in the 
//   // database, don't move it 
//   // 

// }

const checkIfmWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have Metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        getAccountsResult.innerHTML = account || 'Not able to get accounts';
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
  }
}

/**
  * Implement your connectWallet method here
  */
  const connectmWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }; 

  useEffect(() => {
    checkIfmWalletIsConnected();
  }, [])



  /*
   * This function holds the logic for deciding if a Phantom Wallet is
   * connected or not
   */
  const checkIfWalletIsConnected = async () => {
  try {
    const { solana } = window;

    if (solana) {
      if (solana.isPhantom) {
        console.log('Phantom wallet found!');
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );
        getAccountsResult.innerHTML = solana || 'Not able to get account';
        /*
         * Set the user's publicKey in state to be used later!
         */
        setWalletAddress(response.publicKey.toString());
      }
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const onLoad = async () => {
    await checkIfWalletIsConnected();
  };
  window.addEventListener('load', onLoad);
  return () => window.removeEventListener('load', onLoad);
}, []);

useEffect(() => {
  if (walletAddress) {
    console.log('Fetching sign up list...');
    // Call Solana program here.
    // Set state
    // TODO 
  }
}, [walletAddress]);

/*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }

  };
  const onInputChange = (event) => {
  const { value } = event.target;
  setInputValue(value);
};

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   * // <img src="https://i.ibb.co/NxxDF3Q/j-TMco-ZRY-400x400.jpg" height ="60" width="60" />
   */
  const renderNotConnectedContainer = () => (
    <div className="connected-container">
    <p className="sub-text">
            Decentralised Tinder. </p>
    <p className = "body"> Join the waitlist here.</p>
    
    <div class="button-container">
    <button 
      className="cta-button  connect-wallet-button"
      onClick={connectWallet}
    >Connect Phantom Wallet
    </button></div>
    
    <div class="button-container">
    <button className="cta-button  connect-mwallet-button" onClick={connectmWallet}>
            Connect MetaMask Wallet
          </button>
    </div>
    </div>
  );

function URL() {
  location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
}



const renderConnectedContainer = () => (
  <div className="connected-container">
    {/* Go ahead and add this input and button to start */}
  <p className="body"> 
    Thanks for signing up!   
    <script>
    document.write(walletAddress);
    </script> You will hear from us soon.
    </p>
    <p className ="body">
          See what it's all about
    <a className ="body" href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'> here</a></p>
  </div>
  
);



  return (
    <div className="App">
      {/* This was solely added for some styling fanciness */}
			<div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">Galaxy ✨</p>
          
          
          
          {/* Add the condition to show this only if we don't have a wallet address */}
          {!walletAddress && !currentAccount && renderNotConnectedContainer()}
          
        {(walletAddress || currentAccount) && renderConnectedContainer()}
      
        </div>
        
      </div>
    </div>
  );
};

export default App;