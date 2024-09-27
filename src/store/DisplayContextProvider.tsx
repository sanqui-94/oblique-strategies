import { createContext, useContext, useState } from "react";

export type Strategy = {
  dilema: string;
  starred: boolean;
  seen: boolean;
  _id: string;
};

type DisplayContextType = {
  strategy: Strategy | null;
  loadingE: boolean;
  mongoError: any;
  setLoadingE: (value: boolean) => void;
  setMongoError: (err: any) => void;
  setStrategy: (strategy: Strategy) => void;
  toogleFavorite: (id: string, addToFav?: boolean) => void;
  markAsSeen: (id: string) => void;
  getAnotherStrategy: () => void;
  resetStrategies: () => void;
  getById: (id: string) => void;
};

export const DisplayContext = createContext<DisplayContextType | undefined>(
  undefined
);

export const DisplayContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [loadingE, setLoadingE] = useState<boolean>(true);
  const [mongoError, setMongoError] = useState<any>(null);

  const toogleFavorite = async (id: string, addToFav: boolean = true) => {
    try {
      let body: { id: string; fav?: boolean; unfav?: boolean } = { id };
      if (addToFav) {
        body.fav = true;
      } else {
        body.unfav = true;
      }

      const res = await fetch("/api/prototype", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const result = await res.json();

      if (res.ok) {
        console.log("Update success:", result);
      } else {
        console.error("Error updating:", result.error);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const markAsSeen = async (id: string) => {
    try {
      const res = await fetch("/api/prototype", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });

      const result = await res.json();

      if (res.ok) {
        console.log("Update success:", result);
      } else {
        console.error("Error updating:", result.error);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  const getAnotherStrategy = async () => {
    try {
      const res = await fetch("/api/prototype", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await res.json();
      setStrategy(result.data[0]);
    } catch (error: any) {
      console.error("Error while fetching:", error);
      setMongoError(error.message);
    } finally {
      setLoadingE(false);
    }
  };

  const getById = async (id: string) => {
    try {
      const res = await fetch(`api/prototype?id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) {
        console.log("success fetching one: ", res);
      } else {
        throw new Error("Failed to fetch data");
      }

      const result = await res.json();
      setStrategy(result.data);
    } catch (error: any) {
      console.error("Error while fetching:", error);
      setMongoError(error.message);
    }
  };

  const resetStrategies = async () => {
    try {
      const res = await fetch("/api/prototype", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      const result = await res.json();

      if (res.ok) {
        console.log("Reset success:", result);
      } else {
        console.error("Error reseting:", result.error);
      }
    } catch (error) {
      console.error("Error during reset:", error);
    }
  };

  return (
    <DisplayContext.Provider
      value={{
        strategy,
        loadingE,
        mongoError,
        setLoadingE,
        setMongoError,
        toogleFavorite,
        markAsSeen,
        getAnotherStrategy,
        setStrategy,
        resetStrategies,
        getById
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplayContext = () => {
  const context = useContext(DisplayContext);
  if (!context) {
    throw new Error(
      "useDisplayContext must be used within a DisplayContextProvider"
    );
  }

  return context;
};
