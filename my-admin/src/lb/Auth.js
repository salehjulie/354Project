import useLogout from "hooks/useLogout";
import pb from "lb/pocketbase";
import { reset } from "nodemon";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Auth() {
  const logout = useLogout;
  const [isLoading, setLoading] = useState(false);
  const [dummy, setDummy] = useState(0);
  const { register, handleSubmit } = useForm();

  const isLoggedIn = pb.authStore.isValid;

  async function login(data) {
    setLoading(true);
    try {
      const authData = await pb
        .collection("users")
        .authwithPassword(data.email, data.password);
    } catch (e) {
      alert(e);
    }
    setLoading(false);
    reset();
  }

  if (isLoggedIn)
    return (
      <>
        <h1>Logged In: {pb.authStore.model.email}</h1>
        <button onClick={logout}>Log out</button>
      </>
    )
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <h1>Logged In: {pb.authStore.isValid.toString()}</h1>
      <form onSubmit={handleSubmit(login)}>
        <input type="text" placeholder="email" {...register("email")} />
        <input
          type="password"
          {...register("password")}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Login"}
        </button>
      </form>
    </>
  );
}



