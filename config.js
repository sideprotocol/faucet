
import { stringToPath } from '@cosmjs/crypto'
import fs from 'fs'
import { ethers } from 'ethers'

const HOME = ".faucet";
const mnemonic_path= `${HOME}/mnemonic.txt`
if (!fs.existsSync(mnemonic_path)) {
    fs.mkdirSync(HOME, { recursive: true })
    fs.writeFileSync(mnemonic_path, ethers.Wallet.createRandom().mnemonic.phrase)
}

const mnemonic = fs.readFileSync(mnemonic_path, 'utf8')
console.log("======================== faucet mnemonic =========================")
console.log(mnemonic)
console.log("==================================================================")

export default {
    port: 8088, // http port 
    db: {
        path: `${HOME}/history.db` // save request states 
    },
    project: {
        name: "Demo of Side Exchange",
        logo: "https://side.one/favicon.ico",
        deployer: `<a href="https://demo.side.exchange">Side Exchange</a>`
    },
    blockchains: [
	
        {
            name: "SIDE Testnet",
            endpoint: {
                // make sure that CORS is enabled in rpc section in config.toml
                // cors_allowed_origins = ["*"]
                rpc_endpoint: "https://testnet-rpc.side.one",
            },
            sender: {
                mnemonic,
		        option: {
                    hdPaths: [stringToPath("m/44'/118'/0'/0/0")],
                    prefix: "side"
                }
            },
            tx: {
                amount: [{
                    denom: "uside",
                    amount: "100000000"
                }],
                fee: {
                    amount: [
                        {
                            amount: "5000",
                            denom: "uside"
                        }
                    ],
                    gas: "200000"
                },
            },
            limit: {
                // how many times each wallet address is allowed in a window(24h)
                address: 1,
                // how many times each ip is allowed in a window(24h),
                // if you use proxy, double check if the req.ip is return client's ip.
                ip: 5
            }
        },
        {
            name: "SIDE devnet",
            endpoint: {
                // make sure that CORS is enabled in rpc section in config.toml
                // cors_allowed_origins = ["*"]
		    rpc_endpoint: "https://devnet-rpc.side.one",
            },
            sender: {
                mnemonic,
                option: {
                    hdPaths: [stringToPath("m/44'/118'/0'/0/0")],
                    prefix: "side"
                }
            },
            tx: {
                amount: [{
                    denom: "uside",
                    amount: "1000000000"
                //},{
                //    denom: "uusdt",
                //    amount: "1000000000"
		//},{
                //    denom: "uusdc",
                //    amount: "1000000000"
		}],
                fee: {
                    amount: [
                        {
                            amount: "5000",
                            denom: "uside"
                        }
                    ],
                    gas: "200000"
                },
            },
            limit: {
                // how many times each wallet address is allowed in a window(24h)
                address: 10, 
                // how many times each ip is allowed in a window(24h),
                // if you use proxy, double check if the req.ip is return client's ip.
                ip: 10
            }
        },

    ]   
}
