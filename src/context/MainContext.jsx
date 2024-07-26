import React, { createContext, useContext, useState, useEffect } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore"; 

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(""); // State variable for error messages

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setAuthenticated(true);
                setEmail(user.email);
                setUserId(user.uid);
                await initRecipes(user.uid);
            } else {
                setAuthenticated(false);
                setEmail("");
                setUserId("");
                setRecipes([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setAuthenticated(true);
            setUserId(user.uid);
            await initRecipes(user.uid);
            window.location.href = "/";
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            throw error.message;
        }
    };

    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setAuthenticated(true);
            setUserId(user.uid);
            await initRecipes(user.uid);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            throw error.message;
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setAuthenticated(false);
            setUserId("");
            setRecipes([]);
            window.location.href = "/login";
        } catch (error) {
            console.error(error);
            setError("Failed to sign out. Please try again."); // Set error message
        }
    };

    const initRecipes = async (userId) => {
        try {
            const fetchedRecipes = await getRecipes(userId);
            setRecipes(fetchedRecipes);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch recipes. Please try again."); // Set error message
        }
    };

    const addRecipe = async (recipe) => {
        try {
            if (!recipes.find(r => r.label === recipe.label)) {
                recipe.userId = userId;
                const docRef = await addDoc(collection(db, "recipes"), recipe);
                recipe.id = docRef.id;
                setRecipes(prevRecipes => [...prevRecipes, recipe]);
            }
        } catch (error) {
            console.error(error);
            setError("Failed to add recipe. Please try again."); // Set error message
        }
    };

    const removeRecipe = async (recipe) => {
        try {
            const recipeRef = doc(db, "recipes", recipe.id);
            await deleteDoc(recipeRef);
            setRecipes(prevRecipes => prevRecipes.filter(r => r.id !== recipe.id));
        } catch (error) {
            console.error(error);
            setError("Failed to remove recipe. Please try again."); // Set error message
        }
    };

    const containsRecipe = (recipe) => {
        return recipes.find(r => r.label === recipe.label);
    };

    const getRecipes = async (userId) => {
        try {
            if (!userId) return [];
            const q = query(collection(db, "recipes"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            const recipes = [];
            querySnapshot.forEach((doc) => {
                recipes.push({ ...doc.data(), id: doc.id });
            });
            return recipes;
        } catch (error) {
            console.error(error);
            setError("Failed to get recipes. Please try again."); // Set error message
            return [];
        }
    };

    const clearError = () => {
        setError("");
    };

    return (
        <UserContext.Provider
            value={{
                email,
                userId,
                authenticated,
                recipes,
                error,
                login,
                register,
                handleSignOut,
                addRecipe,
                removeRecipe,
                containsRecipe,
                clearError
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
