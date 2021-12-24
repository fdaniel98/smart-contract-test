import web3 from "web3";
import HelloWorldJson from "../blockchain/build/contracts/HelloWorld.json";
const contractABI = HelloWorldJson.abi;
const address = "0x2460Ba66AD2cA020e36d062c79235E1d8D369c49";

const webEth = new web3("HTTP://127.0.0.1:7545");

const HelloWorldContract = new webEth.eth.Contract(contractABI, address);

const sayHelloWorld = async () => HelloWorldContract.methods.say().call();
const setData = async (from, data) => HelloWorldContract.methods.set(data).send({ from });
const getIndexWallet = (index) => webEth.eth.getAccounts().then((result) => result[index]);
export { setData, sayHelloWorld, getIndexWallet };
