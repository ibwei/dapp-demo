import Web3 from "web3";
import metaCoinArtifact from "./contracts/Migrations.json";
import helloArtifact from "./contracts/Hello.json";

console.log('metaCoinArtifact',metaCoinArtifact)

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = 5777
      const deployedNetwork = metaCoinArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        metaCoinArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
     console.log('acoount',accounts)

     console.log('options',this.meta.options)

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  refreshBalance: async function() {
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(this.account).call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

  sendCoin: async function(e) {
    
     const { web3 } = this;
      const name = document.getElementById('receiver').value
      console.log('name',name) 

    try {
      // get contract instance
      const networkId = 5777;
      const deployedNetwork = helloArtifact.networks[networkId];
      console.log(deployedNetwork)
      this.meta = new web3.eth.Contract(
        helloArtifact.abi,
        deployedNetwork.address,
      )
      console.log('this.meta',this.meta)
      const res = await this.meta.methods.say(name).call()
      console.log(res)
      alert(res)
      }catch(e){
        console.log(e)
        alert('error happend')
      }
    

  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );
  }

  App.start();
});
