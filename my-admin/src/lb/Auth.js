import useLogout from "hooks/useLogout";
import useLogin from "hooks/useLogin";
import pb from "lb/pocketbase";
import { useForm } from "react-hook-form";

export default function Auth() {
  const logout = useLogout;
  const { mutate: login, isLoading, isError } = useLogin();

  const { register, handleSubmit, reset } = useForm();

  const isLoggedIn = pb.authStore.isValid;

  async function onSubmit(data) {
    login({ email: data.email, password: data.password });
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



