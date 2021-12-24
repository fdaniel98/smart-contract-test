// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {

    string public data = "";

    function say() pure public returns (string memory) {
        return "Hello World !";
    }

    function set(string memory _data) public {
      data = _data;
    }
}
