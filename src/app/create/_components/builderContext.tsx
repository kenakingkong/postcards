"use client";

import PostCardBuilder from "@/_lib/postcardBuilder";
import { createContext, useContext } from "react";

interface IBuilderContextProps {
  builder: PostCardBuilder;
}

const BuilderContext = createContext<IBuilderContextProps>({
  builder: new PostCardBuilder(),
});

export const useBuilderContext = () => {
  return useContext(BuilderContext);
};

export const useBuilder = () => {
  return useContext(BuilderContext).builder;
};

export const BuilderContextProvider: React.FC<{ children?: any }> = ({
  children,
}) => {
  const builder = new PostCardBuilder();
  builder.setTemplate("thanks-template-1")
  return (
    <BuilderContext.Provider value={{ builder }}>{children}</BuilderContext.Provider>
  );
};
