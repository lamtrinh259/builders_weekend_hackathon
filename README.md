# Builders' weekend Jun 2023 hackathon
# ====================================

## Project name: DCHero (DAO Credential Tooling dapp)

Project built and deployed on Astar testnet Shibuya. We aim to solve the problem of DAOs and their members having to deal with the complexity of managing credential formats, issuing credentials and also letting external parties verify the credentials issued by the issuing DAO.

### Deployed and verified contract (on Shibuya testnet):
#### https://blockscout.com/shibuya/address/0x0523473DA7DC648861573dAE800eDA1dC49A6B8a/contracts#address-tabs

Simple wireframe of the project: https://excalidraw.com/#room=5e26ba06bd4aef3075d7,tMZqdHsWb_vPTfWmtssWyw

Some testnet transactions on-chain:
- Create credential format: https://blockscout.com/shibuya/tx/0xa9a921c6a06c181094e00211f840ed56bcfa3db10d88e3b7b7b40ab7aad7acc6/internal-transactions
- Create credential: https://blockscout.com/shibuya/tx/0x35f734c9705172ee1422d80aa830af1fae975cc15262b84cd0b53e9ce9634f21

Frontend was built with: Next.js, Tailwind. WAGMI UI kit was used for some UI components related to Metamask and logging in.
Backend was built with: Solidity using Foundry.
To run the frontend locally after forking the repo:
- `cd frontend`
- `npm install`
- `npm run dev`
