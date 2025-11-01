import { useEffect, useState } from "react";
import trpcClient from "./trpc";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    try {
      const response = await trpcClient.createShortUrl.mutate({ url });
      setShortUrl(response);
      setCopied(false);
    } catch (err) {
      console.error("Error shortening URL:", err);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(`http://localhost:3000/${shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Optional: fetch a list of all URLs on mount
    const getAllUrls = async () => {
      try {
        const response = await trpcClient.getShortUrl.query("mnptd0");
        console.log(response);
      } catch (err) {
        console.error("Failed to fetch URLs:", err);
      }
    };
    getAllUrls();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
          smolURL
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Shorten your URLs quickly and easily
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="url"
            placeholder="Enter your URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition"
          >
            Shorten
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-2xl flex items-center justify-between">
            <a
              href={`/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-medium underline break-all"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="ml-2 p-2 rounded-full hover:bg-indigo-100 transition"
            >
              {copied ? (
                <CheckIcon className="w-5 h-5 text-green-500" />
              ) : (
                <ClipboardIcon className="w-5 h-5 text-indigo-600" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
