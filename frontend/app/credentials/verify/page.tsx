"use client"

import { useMemo, useState } from "react"
import { contractAddresses } from "@/contractAddresses"
import { useContractRead, useContractWrite } from "wagmi"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import TextareaVerify from "./text-box"

const generateRandomAddressHash = () => {
  return "0x" + Math.floor(Math.random() * 1000000).toString(16)
}

const schema = z.object({
  name: z.string().nonempty(),
  over18: z.boolean(),
  hasNFT: z.boolean(),
})

export default function VerifyPage() {
  // const verifyResult: stirng = useContractRead()
  const [res, setRes] = useState("")

  const [proofRequest, setProofRequest] = useState("")
  const [proofRequestHash, setProofRequestHash] = useState<
    `0x${string}` | null
  >(null)
  const proofJson = useMemo(() => {
    const parsed = schema.safeParse(proofRequest)

    if (!parsed.success) {
      return null
    }

    return parsed.data
  }, [proofRequest])

  const {
    data,
    refetch,
    isLoading: isGeneratingProofReqest,
  } = useContractRead({
    address: contractAddresses.issueCredentials,
    enabled: !!proofJson,
    args: [proofJson!.name, proofJson!.over18, proofJson!.hasNFT],
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "bool",
            name: "over18",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "hasNFT",
            type: "bool",
          },
        ],
        name: "createProofRequest",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
    ],
    functionName: "createProofRequest",
  })

  const {
    data: resHash,
    refetch: verify,
    isLoading: isVerifying,
  } = useContractRead({
    address: contractAddresses.issueCredentials,
    enabled: !!proofRequestHash,
    args: [proofRequestHash!],
    abi: [
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "proofRequest",
            type: "bytes32",
          },
        ],
        name: "verifyProof",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "verifyProof",
  })

  return (
    <>
      <div className="flex flex-col min-w-[70%] w-fit align-center">
        <div className="mb-20">
          <div className="mb-10">
            <h3 className="font-bold text-xl">
              Please paste the proof request hash from the previous step
            </h3>
            <Textarea
              value={proofRequest}
              onChange={(e) => setProofRequest(e.target.value)}
              placeholder="Paste proof request JSON"
            />
          </div>
          <Button
            onClick={async () => {
              const delay = await new Promise((resolve) =>
                setTimeout(resolve, 3000)
              )

              const parsed = schema.safeParse(proofRequest)

              if (!parsed.success) {
                alert("Invalid proof request")
                return
              }

              await refetch()

              if (!data) {
                alert("Failed to generate proof request")
                return
              }
            }}
          >
            <span className="font-bold text-lg">Verify proof</span>
          </Button>
        </div>
        <p className="font-bold text-xl">Result (proof hash)</p>
        <pre className="p-2 bg-gray-900 text-white min-h-[40px]">{resHash}</pre>
      </div>
    </>
  )
}

function verifyProof() {
  console.log("pushed")
}
