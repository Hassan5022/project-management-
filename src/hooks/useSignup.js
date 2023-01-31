// hooks
import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
// config file
import { projectAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = (email, password, displayName) => {
		setError(null);
		setIsPending(true);

		// signup user
		createUserWithEmailAndPassword(projectAuth, email, password)
			.then(res => {
				if (!res) {
					throw new Error("Could not complete signup");
				}

				// add display name to user
                updateProfile(res.user, {displayName})

				// dispatch login user
				dispatch({ type: "LOGIN", payload: res.user });

				//update state
				if (!isCancelled) {
					setIsPending(false);
					setError(null);
				}
			})
			.catch((err) => {
				if (!isCancelled) {
					console.log(err.message);
					setError(err.message);
					setIsPending(false);
				}
			});
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { error, isPending, signup };
};
