import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setHasError(false);
    e.preventDefault();
    const request = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (request && request.ok) {
      router.query.callbackUrl
        ? router.push(router.query.callbackUrl as string)
        : router.push("/");
    } else {
      setHasError(true);
    }
  };

  return (
    <div>
      <h1>SignIn</h1>
      <div>
        email
        <input
          type={"email"}
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        senha
        <input
          type={"password"}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Entrar</button>
      {hasError && <div>Erro ao entrar</div>}
    </div>
  );
}

export default SignIn;
