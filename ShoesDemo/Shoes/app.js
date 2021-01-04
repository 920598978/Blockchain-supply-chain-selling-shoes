console.log("卢本伟牛逼!")

let accounts = [];

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

console.log("isMetaMask：" + ethereum.isMetaMask)

$(".enableEthereumButton").click(function () {
    // alert("enableEthereumButton")
    // ethereum.request({ method: 'eth_requestAccounts' });
    getAccount()

}
)

async function getProdID(_index) {
    contract.methods.getProdId(_index).call({ from: accounts[0] }).then(
        function (result) {
            console.log("getProdID", result)
            $("#pitem" + _index).html(result.r_token);
            $("#tokenIndex" + _index).html(result.r_index);

        }
    );

}



async function getAllProdID(_index) {
    contract.methods.getAllProdId(_index).call({}).then(
        function (result) {
            console.log("getAllProdID", result)
            $("#pitem" + _index).html(result.r_token);
            $("#tokenIndex" + _index).html(result.r_index);
            $("#price" + _index).html(result.r_price);
        
        }
    );

}

// async function getmoney(_index) {
//     contract.methods.getprices(_index).call({}).then(
//         function (result) {
//             console.log(result)
//         }
//     );

// }


async function getbuyer(_index) {
    contract.methods.getProdId(_index).call({ from: accounts[0] }).then(
        function (result) {
            console.log("getkuaidi", result)
            $("#pitem" + _index).html(result.r_token);
            $("#tokenIndex" + _index).html(result.r_index);
        }
    );

}


async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    // showAccount.innerHTML = account;
    $(".showAccount").html(account);
    getUserBalance();
    ErcAddress();
    getAllBalance();
    buyer();
}


async function ErcAddress() {
    contract.methods.ErcAddress().call({ from: accounts[0] }).then(
        function (result) {
            console.log("ErcAddress==》", result)
            $(".ErcAddress").html(result)
        }
    )
}


function getUserBalance() {
    contract.methods.getUserBalance(accounts[0]).call({ from: accounts[0] }).then(
        function (result) {
            $('#box').children().remove();
            console.log('getUserBalance', result)
            $("#MyBalance").html(result)
            for (var i = 0; i < result; i++) {
                console.log(i + "========================")
                var el = $('<div>产品:<span id="pitem' + i + '">-- </span>--产品ID:<span id="tokenIndex' + i + '"></span>' + '|接收人Address:<input id="s_address' + i + '" value="" /><button id="Btn_send' + i + '"  onClick="sendBtn(' + i + ')">转账</button></div>');
                getProdID(i);
                $('#box').append(el);
            }

        }
    );
}


function getAllBalance() {
    contract.methods.getAllBalance().call({}).then(
        function (result) {
            $('#sand').children().remove();
            console.log('getAllBalance', result)
            $("#AllBalance").html(result)
            for (var o = 0; o < result; o++) {
                console.log(o + "@@@@@")
                getAllProdID(o);
                console.log(getAllProdID(o) + "@@@@@")
                var ol = $('<div>产品:<span id="pitem' + o + '">-- </span>--产品ID:<span id="tokenIndex' + o + '"></span>--价格:<span id="price' + o + '">-- </span> -- <button id="Btn_buy' + o + '"  onClick="buy(' + o + ')">购买</button></div>');
                $('#sand').append(ol);
            }

        }
    );
}

function buyer() {
    contract.methods.getUserBalance(accounts[0]).call({ from: accounts[0] }).then(
        function (result) {
            $('#buy').children().remove();
            console.log('kuaidi', result)
            $("#express").html(result)
            for (var s = 0; s < result; s++) {
                console.log(s + "@@@@@")
                getbuyer(s);
                console.log(getAllProdID(s) + "@@@@@")
                var bl = $('<div>产品:<span id="pitem' + s + '">-- </span>--产品ID:<span id="tokenIndex' + s + '">-- </span> -- <button id="Btn_accept' + s + '"  onClick="accept(' + s + ')">确认收货</button></div>');
                $('#buy').append(bl);
            }

        }
    );
}

function sendBtn(i) {
    _address = $('#s_address' + i).val();
    p_index = $('#tokenIndex' + i).html();
    alert('发送' + i + "给账户:" + _address + "商品ID为:" + p_index);
    // transferProd
    getErc721($(".ErcAddress").html());
    contractERC721.methods.transferFrom(accounts[0], _address, p_index).send({ from: accounts[0] }).then(
        function (result) {
            console.log("transferProd==>", result);
            if (result.status) {
                $(".txt_produce").html("添加成功")
                getUserBalance();
            } else {
                hide
                $(".txt_produce").html("添加失败")
            }
            // $("#load_ci_img").hide();
        }
    )

}

function buy(o) {
    console.log("buy");
    contract.methods.getprices(o).call({}).then(
        function (result) {
            console.log(result)
  
    let money = result
    contract.methods.buy(o+1).send({ from: accounts[0] , value:money}).then(
        function (result) {
        if (result.status) {
            alert("购买成功")
        } else {
            alert("购买失败")
        }
        console.log(result)
            // $("#load_ci_img").hide();
        })
    }
    );
}

function accept(s) {
    console.log("accept");
    contract.methods.accept(s+1).send({ from: accounts[0]}).then(
        function (result) {
        console.log(result)
        if (result.status) {
            alert("收货成功")
            $().hide();
        } else {
            alert("收货失败")
        }
            // $("#load_ci_img").hide();
        })
}

ethereum.on('accountsChanged', function (accounts) {
    console.log("accountsChanged");
    getAccount()
});

ethereum.on('chainChanged', (chainId) => {
    console.log("chainId", chainId);

});


let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
console.log("web3", web3)


var contractERC712Abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
            }
        ],
        "name": "awardItem",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "baseURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];


var contractERC721;

function getErc721(conAddress) {
    contractERC721 = new web3.eth.Contract(contractERC712Abi, conAddress);
    console.log('contractERC721==>', contractERC721);
}

// zzq.sol
var contractAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "AllItems",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ErcAddress",
		"outputs": [
			{
				"internalType": "contract zzq721",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "UserProdMap",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "accept",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "buy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Index",
				"type": "uint256"
			}
		],
		"name": "getAllProdId",
		"outputs": [
			{
				"internalType": "string",
				"name": "r_token",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "r_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "r_price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "tokenId",
				"type": "uint32"
			}
		],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Index",
				"type": "uint256"
			}
		],
		"name": "getProdId",
		"outputs": [
			{
				"internalType": "string",
				"name": "r_token",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "r_index",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Index",
				"type": "uint256"
			}
		],
		"name": "getprices",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "r_price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "produce",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "shouquan",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// 0xa02A64208d3D9A2ef85b2fDea276893f7FFe7817  本地
//0x7225e1eeDF4B2BEBcEb1F1E157BE3dC6189523EF rinkeby
var contract = new web3.eth.Contract(contractAbi, "0x50Cf45c6167BbbaD29D44F37A0339e9256FA0CfE");

console.log("contract", contract)





$("#Btn_getTotalSupply").click(function () {
    console.log("Btn_getTotalSupply");
    contract.methods.getTotalSupply().call({ from: accounts[0] }).then(
        function (result) {
            console.log(result)
            $(".txt_getTotalSupply").html(result)
        }
    );

}
)


$("#Btn_shouquan").click(function () {
    console.log("Btn_shouquan");
    contract.methods.shouquan().send({ from: accounts[0] })
}
)


$("#Btn_money").click(function () {
    console.log("看看有多少钱");
    contract.methods.getBalance().call({ from: accounts[0] }).then(
        function (result) {
            console.log(result)
            $(".txt_money").html(result)
        }
    );

}
)



$("#Btn_drawMoney").click(function () {
    console.log("给老子钱");
    let _getmoney = $("#getmoney").val();
    contract.methods.drawMoney(_getmoney).send({ from: accounts[0] }).then(
        function (result) {
            console.log(result)
        }
    );
    
}
)



// 

$("#Btn_getErc721").click(function () {
    console.log("Btn_getErc721");
    getErc721($(".ErcAddress").html())
}
)

$("#Btn_produce").click(function () {
    console.log("Btn_produce");
    $("#load_ci_img").show();
    // let resItemId = document.getElementById('getItem').value;
    let _txt = $("#name").val();
    let _prices = $("#price").val()
    // console.log($("#arraytxt").val().length)
    if (_txt.length < 3) {
        alert("长度不能小于3")
    } else {
        contract.methods.produce(_txt, _prices).send({ from: accounts[0]}).then(
            function (result) {
                console.log("result", result);
                if (result.status) {
                    alert("添加成功")
                    getAllBalance();
                } else {
                    alert("添加失败")
                }
                $("#load_ci_img").hide();
            }
        )

    }
}
)



// 1.getprice(id){
//     function(result){
        
//         contract.methods.buy(id).send( value:result ){

//         }
//     }
// } 
// ,
//              value: 0.02 * Math.pow(10, 18) 
