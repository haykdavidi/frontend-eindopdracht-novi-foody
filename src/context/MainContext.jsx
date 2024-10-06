import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

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
                setError("");
            }
            setIsLoadingAuth(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            clearError();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setAuthenticated(true);
            setUserId(user.uid);
            await initRecipes(user.uid);
            navigate("/");
        } catch (error) {
            handleFirebaseError(error);
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password) => {
        try {
            setLoading(true);
            clearError();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setAuthenticated(true);
            setUserId(user.uid);
            await initRecipes(user.uid);
            navigate("/");
        } catch (error) {
            handleFirebaseError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFirebaseError = (error) => {
        switch (error.code) {
            case 'auth/email-already-in-use':
                setError("This email is already in use. Please use another one.");
                break;
            case 'auth/invalid-email':
                setError("The email address is not valid. Please enter a valid email.");
                break;
            case 'auth/weak-password':
                setError("The password is too weak. Please use a stronger password.");
                break;
            case 'auth/operation-not-allowed':
                setError("Registration is not enabled at the moment. Please contact support.");
                break;
            case 'auth/user-not-found':
                setError("No user found with this email address.");
                break;
            case 'auth/wrong-password':
                setError("Incorrect password. Please try again.");
                break;
            case 'auth/user-disabled':
                setError("This user account has been disabled.");
                break;
            case 'auth/invalid-credential':
                setError("Invalid credentials. Please check your email and password.");
                break;
            case 'auth/network-request-failed':
                setError("Network error occurred. Please check your internet connection.");
                break;
            default:
                setError("An unknown error occurred. Please try again later.");
                console.log(error.code)
                break;
        }
    };


    const handleSignOut = async () => {
        try {
            setLoading(true);
            await signOut(auth);
            setAuthenticated(false);
            setUserId("");
            setRecipes([]);
            navigate("/login");
        } catch (error) {
            setError("Failed to sign out. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const initRecipes = async (userId) => {
        if (!userId) return;
        try {
            setLoading(true);
            const fetchedRecipes = await getRecipes(userId);
            setRecipes(fetchedRecipes);
        } catch (error) {
            setError("Failed to fetch recipes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const addRecipe = async (recipe) => {
        try {
            setLoading(true);
            if (!recipes.find(r => r.label === recipe.label && r.source === recipe.source)) {
                recipe.userId = userId;
                const docRef = await addDoc(collection(db, "recipes"), recipe);
                recipe.id = docRef.id;
                setRecipes(prevRecipes => [...prevRecipes, recipe]);
            }
        } catch (error) {
            setError("Failed to add recipe. Please try again.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const removeRecipe = async (recipe) => {
        try {
            setLoading(true);
            const recipeRef = doc(db, "recipes", recipe.id);
            await deleteDoc(recipeRef);
            setRecipes(prevRecipes => prevRecipes.filter(r => r.id !== recipe.id));
        } catch (error) {
            setError("Failed to remove recipe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const containsRecipe = (recipe) => {
        return recipes.some(r => r.label === recipe.label && r.source === recipe.source);
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
            console.error("Error getting recipes:", error);
            setError("Failed to get recipes. Please try again.");
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
                isLoadingAuth,
                loading,
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
