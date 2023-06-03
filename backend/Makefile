RPC_URL_SHIBUYA=https://evm.shibuya.astar.network

deploy_locally:
	forge script script/Contract.s.sol:ContractScript --rpc-url http://localhost:8545 --private-key $TEST_ACCOUNT_PRIVATE_KEY --broadcast

deploy_on_Shibuya:
	forge script script/Contract.s.sol:ContractScript --rpc-url $RPC_URL --private-key $TEST_ACCOUNT_PRIVATE_KEY --broadcast
