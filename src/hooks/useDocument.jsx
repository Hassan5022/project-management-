import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, id) => {

    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        
        let response = doc(projectFirestore, collection, id);
        const unsubscribe = onSnapshot(response,
            (snapshot) => {
                if (snapshot.data()) {
                    // update states
                    setDocument({ ...snapshot.data(), id: snapshot.id});
                    setError(null);
                } else {
                    setError("No such document exist!")
                }
			},
			(error) => {
				console.log(error.message);
				setError("Could not fetch the data");
			}
		);

		// unsubscribe on unmount
		return () => unsubscribe();

    }, [collection, id])

    return {document, error}

}