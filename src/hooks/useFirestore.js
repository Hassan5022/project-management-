// hooks
import { useEffect, useReducer, useState } from "react";
// config file
import { projectFirestore, Timestamp } from "../firebase/config";
import {
	collection,
	addDoc,
	updateDoc,
	doc,
	deleteDoc,
} from "firebase/firestore";

const initialState = {
	error: null,
	document: null,
	isPending: false,
	success: null,
};

const firestoreReducer = (state, action) => {
	switch (action.type) {
		case "IS_PENDING":
			return { error: null, document: null, success: null, isPending: true };
		case "ADDED_DOCUMENT":
			return {
				error: null,
				document: action.payload,
				success: true,
				isPending: false,
			};
		case "DELETED_DOCUMENT":
			return { error: null, document: null, success: true, isPending: false };
		case "UPDATE_DOCUMENT":
			return {
				error: null,
				document: action.payload,
				success: true,
				isPending: false,
			};
		case "ERROR":
			return {
				error: action.payload,
				document: null,
				success: false,
				isPending: false,
			};
		default:
			return state;
	}
};

export const useFirestore = (c) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState);
	const [isCancelled, setIsCancelled] = useState(false);

	const res = collection(projectFirestore, c);

	const dispatchIfNotCancelled = (action) => {
		if (!isCancelled) {
			dispatch(action);
		}
	};

	const createdAt = Timestamp.fromDate(new Date());

	// add a document
	const addDocument = async (doc) => {
		dispatch({ type: "IS_PENDING" });
		try {
			const addedDocument = await addDoc(res, { ...doc, createdAt });
			dispatchIfNotCancelled({
				type: "ADDED_DOCUMENT",
				payload: addedDocument,
			});
		} catch (error) {
			dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
		}
	};

	// update a document
	const updateDocument = async (id, updates) => {
		dispatch({ type: "IS_PENDING" });
		try {
			const updatedDocument = await updateDoc(
				doc(projectFirestore, c, id),
				updates
			);
			dispatchIfNotCancelled({
				type: "UPDATE_DOCUMENT",
				payload: updatedDocument,
			});
			return updatedDocument;
		} catch (error) {
			dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
			return null;
		}
	};

	// delete a document
	const deleteDocument = async (id) => {
		dispatch({ type: "IS_PENDING" });
		try {
			const ref = doc(projectFirestore, c, id);
			await deleteDoc(ref);
			dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
		} catch (error) {
			console.log(error);
			dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete" });
		}
	};

	// cleanup function
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { response, addDocument, updateDocument, deleteDocument };
};
