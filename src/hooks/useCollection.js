// hooks
import { useEffect, useRef, useState } from "react";
// config file
import { projectFirestore } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (c, _query, _orderBy) => {
	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);

	// to prevent infinite loop
	const query = useRef(_query).current;
	const orderBy = useRef(_orderBy).current;

	useEffect(() => {
		let response = collection(projectFirestore, c);

		if (query) response = response.where(...query);
		if (orderBy) response = response.orderBy(...orderBy);

		const unsubscribe = onSnapshot(response,
			(snapshot) => {
				let results = [];
				snapshot.docs.forEach(doc => {
					results.push({ ...doc.data(), id: doc.id });
				});

				// update states
				setDocuments(results);
				setError(null);
			},
			(error) => {
				console.log(error);
				setError("Could not fetch the data");
			}
		);

		// unsubscribe on unmount
		return () => unsubscribe();
	}, [c, query, orderBy]);

	return { error, documents };
};
