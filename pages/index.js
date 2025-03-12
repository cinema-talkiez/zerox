import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const [tokenValid, setTokenValid] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isValid = localStorage.getItem("tokenValid") === "true";
    if (isValid) {
      router.push("/index1"); // 🚀 Redirect if token is valid
    } else {
      setTokenValid(false);
    }
    setCheckingToken(false);
  }, [router]);

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h1>Hello Mama! Welcome to Cinema Talkiez</h1>
        <p>
          Cinema Talkiez is specially designed for middle-class movie lovers. This is affordable entertainment with a vast collection of movies
          without the financial burden.
        </p>
        <p>Our content is regularly added for watching/downloading.</p>

        {checkingToken ? (
          <p className="loading-text">Checking token...</p>
        ) : (
          !tokenValid && (
            <>
              <button onClick={() => router.push("/verification-success")} className="verifyButton">
                Verify Token
              </button>
              <button onClick={() => router.push("/share")} className="verifyButton">
                Share
              </button>
            </>
          )
        )}

        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
          }
          .loading-text {
            font-size: 18px;
            color: white;
          }
          button {
            padding: 12px 24px;
            font-size: 18px;
            border: none;
            cursor: pointer;
            border-radius: 8px;
            transition: 0.3s;
            margin: 10px;
            width: 200px;
          }
          .verifyButton {
            background-color: #ff5722;
            color: white;
          }
        `}</style>
      </div>
    </div>
  );
}
