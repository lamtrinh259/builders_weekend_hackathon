import { Button } from "@/components/ui/button"
import TextareaVerify from "./text-box"
import { useContractRead } from "wagmi";

export default function VerifyPage() {
  // const verifyResult: stirng = useContractRead()
  return (
      <>
      <div className="flex flex-col min-w-[70%] w-fit align-center">
        <div className="mb-20">
          <div className="mb-10">
          <h3 className="font-bold text-xl">Please paste the proof request hash from the previous step</h3>
            <TextareaVerify/>
          </div>
          <Button>
            <span className="font-bold text-lg">Verify proof</span>
          </Button>
        </div>
        <p className="font-bold text-xl">Result (proof hash)</p>
        <pre className="p-2 bg-gray-900 text-white min-h-[40px]">
          {/* {verifyResult} */}
        </pre>
      </div>
      </>
  )
}

function verifyProof() {
  console.log("pushed");
}
