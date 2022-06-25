const {REACT_APP_SOLANA_RPC_NODE_URL} = process.env

const config = {
    endpoint: REACT_APP_SOLANA_RPC_NODE_URL || "https://api.devnet.solana.com",
    programId: "HtZAJbfvjxWGgMSQh9Aht28sPNX1EC5jsGoeoq9DDqkA",
    groupName: "csdemo",
    admin: "DrPpPs73Bt8sh6Fbfb7v5hJUdJqER25AU2qjtgdqvwVk"
}

export default config;