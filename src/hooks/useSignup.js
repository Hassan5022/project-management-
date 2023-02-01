// hooks
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
// config file
import {
	projectAuth,
	projectFirestore,
	projectStorage,
} from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const useSignup = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const signup = (email, password, displayName, thumbnail) => {
		setError(null);
		setIsPending(true);

		// signup user
		createUserWithEmailAndPassword(projectAuth, email, password)
			.then((res) => {
				if (!res) {
					throw new Error("Could not complete signup");
				}

				// update user thumbnail
				const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
				const storageRef = ref(projectStorage, uploadPath);
				const uploadTask = uploadBytesResumable(storageRef, thumbnail);
				uploadTask.on(
					"state_changed",
					(snapshot) => {
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log("Upload is " + progress + "% done");
					},
					(error) => {
						console.log(error.message);
						setError(error.message);
						setIsPending(false);
					},
					() => {
						// Upload completed successfully, now we can get the download URL
						getDownloadURL(uploadTask.snapshot.ref)
							.then((downloadURL) => {
								// add display name to user
								updateProfile(res.user, { displayName, photoURL: downloadURL })
									.then(() => {
										// create a user document
										const userDocRef = doc(
											projectFirestore,
											"users",
											res.user.uid
										);
										setDoc(userDocRef, {
											online: true,
											displayName,
											photoURL: downloadURL,
										});
										// dispatch login user
										dispatch({ type: "LOGIN", payload: res.user });
										console.log(res.user);
										//update state
										setIsPending(false);
										setError(null);
									})
									.catch((error) => {
										console.log(error.message);
										setError(error.message);
										setIsPending(false);
									});
							})
							.catch((error) => {
								console.log(error.message);
								setError(error.message);
								setIsPending(false);
							});
					}
				);
			})
			.catch((err) => {
				console.log(err.message);
				setError(err.message);
				setIsPending(false);
			});
	};

	return { error, isPending, signup };
};
