
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

//--------------------//
//Allowance DApp would like to connect to your account
ethereum.enable();

/* Loading Test  */
function isWeb3Available() {
	return typeof window.web3 !== "undefined";
}

function isEthereumAvailable() {
	return typeof window.ethereum !== "undefined";
}

document.addEventListener("DOMContentLoaded", function () {
	var statusELement = document.querySelector("#status");
	console.log(isEthereumAvailable() ? "Ethereum is available" : "No ethereum");
	console.log(isWeb3Available() ? "Web3 is available" : "No web3");

	if (!isWeb3Available() || !isEthereumAvailable()) {
		statusELement.textContent = "Metamask is not loaded";
		const provider = window["ethereum"] || window.web3.currentProvider;

	} else {
		statusELement.textContent = "Metamask is loaded";
		console.log("page loaded");
	}
}); //ETHER TOKEN 
web3.eth.getAccounts(function (error, accounts) {
	if (error) {
		console.log(error);
	}
	$('#Account').val(accounts[0]);
	web3.eth.getBalance(accounts[0]).then(function (result) {
		console.log("Balance : ", web3.utils.fromWei(result, 'ether'));
		$('#BalanceEth').val(web3.utils.fromWei(result, 'ether'));
	});

});




$(document).ready(function () {
	console.log("ready!");

	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		// Provider of my choice
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	}
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	/* Get Node Info */
	web3.eth.getNodeInfo(function (error, result) {
		if (error) {
			console.log("error", error);
		}
		else {
			console.log("result", result);
			$('#NodeInfo').val(result);
		}

		startApp();
	})
});

//Interacting with the smart contract --- TestTokenContract ---
var abi = require('TokenJson') //Token Abi json pompé sur le web
var token = web3.eth.contract(abi).at(contractAddress)
var addr = web3.eth.accounts[0]

// Get the token NAME
token.name.call(function(err, name) { 
  if(err) { console.log(err) }
  if(name) { console.log('The token name is: ' + name);$('#tokenName').val(name); }
})
/** --- Balance of THIS token --- Todo: f() to apply to an another token
 * Check balance of this token for _owner(address)
 * this Token = token.name() return name
 * token.balanceOf(address _owner) return value
 */

var addr
function startApp(){
	var token = web3.eth.contract(abi).at(contractAddress);
	addr = web3.eth.accounts[0];
	window.token = token;

 // Get the token SYMBOL
	token.symbol.call({from: addr}, function(err, symbol) {
	//ABI expects string here,
	if(err) { console.log(err) }
	console.log('Token symbol: ' + symbol);
	$('#tokenSymbol').val(symbol);
  });

 // balanceOf  
  token.balanceOf.call(web3.eth.accounts[0], function(err, bal) {
	if (err) { console.error(err) }
	console.log('balance is ' + bal.toString(10));
	$('#balanceOf').val(bal);
  });
  
/** --- Allowance ---
 * Check Allowance of this token for _owner(address), spender(address);
 * Check how many token is possible to allow = set 00.00 token /(token.balanceOf(address_owner) - allowance in progress)
 * 
 * For setting : setAllowance
 * token.Allowance(web.eth.account[0], input address _spender);
 * 
 * This value changes when approve or transferFrom are called.
 * 
 * Think about DecreaseAllowance n' IncreaseAllowance
 */

 spender = //addresse input
token.allowance.call(web3.eth.accounts[0], spender,  function (err, allow){
	if(err) { console.log(err) }
	console.log('allowance for this' + allow.toString(10));
	$('#allowance').val(allow);
})

/** -- Approval ---
 * Check if address _spender is allowed to spend token of account[0] + define the event of approval
 * function approve(address _spender, uint256 _value) returns (bool success)
 *
 * token.approve(param1, uint256 _value) returns bool success;
 * param1 = address _spender
 * param2 = uint256 _value = 00.00 token (allowed before in allowance function)
 */
token.approve(spender, value, function(err, approval){
	if(err) {console.log(err)}
	console.log('boolean for this approval' + approval )
	$('#approval').val(approval);
})

}
