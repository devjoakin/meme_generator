'use client'
import { IKImage, } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function Home() {
  return (
    <div>
      <IKImage 
        urlEndpoint={urlEndpoint} 
        path="Running-Away-Balloon.jpg" 
        alt="Alt text" 
        width={400}
        height={400}
        transformation={[
          { raw: "l-text,i-hello world,fs-50,l-end"}
        ]}
      />
    </div>
  );
}
