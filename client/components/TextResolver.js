import { useEffect, useState } from "react";
import axios from "axios";

const TextResolver = ({ cid }) => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const main = async () => {
      try {
        const data = await axios.get(`https://nftstorage.link/ipfs/${cid}`);
        setBody(data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    main();
  }, []);

  if (loading) return <></>;

  return <>{body}</>;
};

export default TextResolver;
