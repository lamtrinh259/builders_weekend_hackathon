// After deploying the contract, copy the address and paste it in the .env file
// Then, in the frontend\contractAddresses.ts file, add it to the contractAddresses object

type Address = `0x${string}`

export const contractAddresses = {
  issueCredentials: process.env
    .NEXT_PUBLIC_ISSUE_CREDENTIALS_CONTRACT_ADDRESS as Address,
}
