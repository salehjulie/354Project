import { useState } from "react";
import { useMutation } from "react-query";
import pb from "lb/pocketbase";

export default function useLogin() {
    async function login({ email, password }) {
        const authData = await pb
            .collection("users")
            .authwithPassword(email, password);
    }

    return useMutation(login);
}