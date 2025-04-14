'use client';
import { IKImage, IKUpload, ImageKitProvider } from 'imagekitio-next';
import { useState } from 'react';

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (err) {
    const error = err as Error;
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function Home() {
  const [filePath, setFilePath] = useState('');
  return (
    <div>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        {filePath && (
          <IKImage
            path={filePath}
            alt='Alt text'
            width={400}
            height={400}
            transformation={[{ raw: 'l-text,i-hello world,fs-50,l-end' }]}
          />
        )}
        <div>
          <h2>File upload</h2>
          <IKUpload
            fileName='test-upload.png'
            onError={() => {
              console.log('Error');
            }}
            onSuccess={(res) => {
              setFilePath(res.filePath);
            }}
          />
        </div>
      </ImageKitProvider>
    </div>
  );
}
