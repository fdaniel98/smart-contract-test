import { ethers } from "ethers";
import SimpleStorage from "../blockchain/build/contracts/SimpleStorage.json";
const contractABI = SimpleStorage.abi;
const address = "0x82e3d64E63930c6fDE77A622bcf4cC238c388f85";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const SimpleStorageContract = new ethers.Contract(address, contractABI, signer);

const fundMe = async (value, callback) => {
  const tx = await SimpleStorageContract.fundMe({
    value: ethers.utils.parseEther(value.toString()),
  });

  const txConfirm = await provider.getTransaction(tx.hash);
  callback(txConfirm);

  return tx.wait();
};

const withdraw = async (callback) => {
  const tx = await SimpleStorageContract.withdraw();
  const txConfirm = await provider.getTransaction(tx.hash);

  callback(txConfirm);

  return tx.wait();
};

const getTotal = async () => {
  const res = await SimpleStorageContract.getTotal();
  return ethers.utils.formatEther(res);
};

const getETHPrice = async () => {
  const res = await SimpleStorageContract.getUSDConversion();
  return res.toString();
};

export { fundMe, getTotal, getETHPrice, withdraw };
