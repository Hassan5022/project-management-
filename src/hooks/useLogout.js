// hooks
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
// config file
import { projectAuth, projectFirestore } from "../firebase/config";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";

export const useLogout = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch, user } = useAuthContext();

	const logout = async () => {
		setIsPending(true);
		setError(null);

		try {
			// update online status
			const { uid } = user;
			const userRef = doc(projectFirestore, "users", uid);

			await updateDoc(userRef, {
				online: false,
			});

			// signout
			await signOut(projectAuth);

			// dispatch logout action
			await dispatch({ type: "LOGOUT" });

			//update state
			setIsPending(false);
			setError(null);
		} catch (err) {
			console.log(err);
			setError(err.message);
			setIsPending(false);
		}
	};

	return { logout, error, isPending };
};
