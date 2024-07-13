'use client'
import { CircleCheck, CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [fileName, setFileName] = useState('');

  let content;

  switch (currentStep) {
    case 0:
      content = (
        <>
          <p className="py-6">
            Upload your provided PDF Diploma below. We will calculate the hash of the PDF and retrieve the metadata through our smart contract. We'll use the URL provided in the metadata to obtain the current public key and verify the signature.
          </p>
          <input type="file" className="file-input file-input-bordered w-full max-w-xs"
            onChangeCapture={(event) => {
              setFileName(event.target.files[0].name)
              setCurrentStep(1);
            }} />
        </>
      )
      break;
    case 1:
      content = (
        <>
          <p className="py-6">
            Processing PDF
          </p>
          <span className="loading loading-spinner loading-lg"></span>
        </>
      )
      break;
    case 2:
      content = (
        <>
          <p className="py-6">
            Computing the SHA-256 hash of the provided PDF.
          </p>
          <span className="loading loading-spinner loading-lg"></span>
        </>
      )
      break;
    case 3:
      content = (
        <>
          <p className="py-6">
            Querying smart contract with 'getCertificate' function.
          </p>
          <span className="loading loading-spinner loading-lg"></span>
        </>
      )
      break;
    case 4:
      content = (
        <>
          <p className="py-6">
            Obtained metadata. Querying metadata provided URL.
          </p>
          <span className="loading loading-spinner loading-lg"></span>
        </>
      )
      break;
    case 5:
      content = (
        <>
          <p className="py-6">
            Obtained current public key from metadata URL.
          </p>
          <span className="loading loading-spinner loading-lg"></span>
        </>
      )
      break;
    case 6:
      content = (
        <>
          <p className="py-6">
            Authenticating certificate with publickey.
          </p>
          <span className="loading loading-spinner loading-lg"></span>
        </>
      )
      break;
    case 7:
      content = (
        <>
          <p className="py-6">
            Authenticated! The provided diploma is authentic.
          </p>
          <p className="flex items-center justify-center">
            <CircleCheck size={45} color={"#4BB543"} />
          </p>
          <button className="btn btn-neutral mt-8" onClick={() => setCurrentStep(0)}>Return to home</button>
        </>
      )
      break;
    case 8:
      content = (
        <>
          <p className="py-6">
            Authentication failed! The provided diploma is not authentic.
          </p >
          <p className="flex items-center justify-center">
            <CircleX size={45} color={"#cc0000"} />
          </p>
          <button className="btn btn-primary mt-8" onClick={() => setCurrentStep(0)} >Return to hom</button>
        </>
      )
      break;
  }

  useEffect(() => {
    switch (currentStep) {
      case 1:
      case 2:
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
        }, 1000);
        break;
      case 3:
      case 4:
      case 5:
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
        }, 1500);
        break;
      case 6:
        if (["real", "authentic"].some(names => fileName.toLocaleLowerCase().includes(names))) {
          setCurrentStep(7);
        } else {
          setCurrentStep(8);
        }
      //Check file name.
    }
  }, [currentStep])

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold"><span className="font-extrabold" style={{ color: "#56018D" }}>NYU</span> Diploma Verification</h1>
          {content}
        </div >
      </div>
    </div>
  );
}
