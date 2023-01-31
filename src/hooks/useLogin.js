// hooks
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
// config file
import { projectAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const login = (email, password) => {
		setIsPending(true);
		setError(null);

		// signin
		signInWithEmailAndPassword(projectAuth, email, password)
			.then((res) => {
				// dispatch Login action
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

	return { login, error, isPending };
};
