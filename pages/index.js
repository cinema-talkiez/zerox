import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const storedValidToken = localStorage.getItem("tokenValid");

    if (storedValidToken === "valid") {
      router.replace("/index1"); // 🚀 Redirect if valid
    }
  }, [router]);

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h1>Hello Mama! Welcome to Cinema Talkiez</h1>
        <p>
          Cinema Talkiez is specially designed for middle-class movie lovers.
          This is affordable entertainment with a vast collection of movies
          without the financial burden.
        </p>
        <p>Our content is regularly added for watching/downloading.</p>

        <button onClick={() => router.push("/verification-success")} className="verifyButton">
          Verify Token
        </button>
        <button onClick={() => router.push("/share")} className="verifyButton">
          Share
        </button>

        <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
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
