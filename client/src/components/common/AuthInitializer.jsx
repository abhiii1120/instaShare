import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { refreshAccessToken } from "../../services/api/auth.api";
import {
  markAuthenticated,
  unmarkAuthenticated,
  setInitialized,
} from "../../store/slices/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  const bootstrapped = useRef(false);

  useEffect(() => {
    if (bootstrapped.current) {
      return;
    }

    bootstrapped.current = true;

    const bootstrapAuth = async () => {
      try {
        await refreshAccessToken();
        dispatch(markAuthenticated());
      } catch {
        dispatch(unmarkAuthenticated());
      } finally {
        dispatch(setInitialized());
      }
    };

    bootstrapAuth();
  }, [dispatch]);

  return children;
};

export default AuthInitializer;