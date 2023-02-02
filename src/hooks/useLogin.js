// hooks
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
// config file
import { projectAuth, projectFirestore } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export const useLogin = () => {
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

				// update online status
				const userRef = doc(projectFirestore, "users", res.user.uid);

				updateDoc(userRef, {
					online: true,
				});
				//update state
				setIsPending(false);
				setError(null);
			})
			.catch((err) => {
				console.log(err.message);
				setError(err.message);
				setIsPending(false);
			});
	};

	return { login, error, isPending };
};
