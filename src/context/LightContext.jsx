import { createContext, useCallback, useContext, useState } from "react";

const LightContext = createContext(null);

export function LightProvider({ children }) {
  const [lit, setLit] = useState(false);
  const light = useCallback(() => setLit(true), []);

  return (
    <LightContext.Provider value={{ lit, light }}>
      {children}
    </LightContext.Provider>
  );
}

export function useLight() {
  const context = useContext(LightContext);

  if (context === null) {
    throw new Error("useLight must be used within a LightProvider");
  }

  return context;
}
