RPC_URL_SHIBUYA=https://evm.shibuya.astar.network
WALLET_ADDRESS=0x7B79079271A010E28b73d1F88c84C6720E2EF903
DEPLOYED_CONTRACT_ADDRESS=0x33d9D78b2a0E758E0EABc76f96986a0D0d3aca5D
ETHERSCAN_API_KEY=I47KHNEFBN5FRGE2II87I2E3IUXNGM71FM
SUBSCAN_ASTAR_API_KEY=ab39fcccb3004b5babe49f42dd88f613

deploy_locally:
	forge script script/Contract.s.sol:ContractScript --rpc-url http://localhost:8545 --private-key $(PRIVATE_KEY) --broadcast

deploy_on_Shibuya:
	forge script script/Contract.s.sol:ContractScript --rpc-url $(RPC_URL_SHIBUYA) --private-key $(PRIVATE_KEY) --broadcast

verify_contract_on_Shibuya:
	forge verify-contract $(DEPLOYED_CONTRACT_ADDRESS) script/Contract.s.sol:ContractScript --verifier blockscout --verifier-url https://blockscout.com/shibuya --chain 81 --etherscan-api-key $(SUBSCAN_ASTAR_API_KEY)
