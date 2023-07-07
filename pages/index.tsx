import React from "react";

type Props = {};

export default function index({}: Props) {
  const [images, setImages] = React.useState<string>();
  const [url, setUrl] = React.useState<string>("");
  const handleFetch = async () => {
    const query = "?url=" + url;
    fetch("/api/hello" + query).then((res) => {
      console.log(res);
      // buffer iamge
      res.arrayBuffer().then((buffer) => {
        // Convert the ArrayBuffer to a Uint8Array
        const uint8Array = new Uint8Array(buffer);

        // Create a binary string from the Uint8Array
        let binaryString = "";
        uint8Array.forEach((byte) => {
          binaryString += String.fromCharCode(byte);
        });

        // Convert the binary string to a Base64 string
        const base64String = btoa(binaryString);
        setImages("data:image/jpeg;base64," + base64String);
      });
    });
  };

  return (
    <div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={handleFetch}>Fetch</button>
      <img src={images} />
    </div>
  );
}
