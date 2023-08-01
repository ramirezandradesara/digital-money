
import React, { FC, PropsWithChildren, createContext, useState } from 'react'

export interface StepContextState {
    step: number,
    maxStep:number,
    setStep?: React.Dispatch<React.SetStateAction<number>>,
    setMaxStep?: React.Dispatch<React.SetStateAction<number>>,
    MIN_STEP:number
} 

const MIN_STEP=1
const MAX_STEP= MIN_STEP+1

export const StepContext = createContext<StepContextState>({
    step:MIN_STEP,
    MIN_STEP,
    maxStep: MAX_STEP
});

export const StepProvider: FC<PropsWithChildren> = ({ children }) => {
    const [step,setStep] = useState<number>(MIN_STEP);
    const [maxStep, setMaxStep] = useState(MAX_STEP);

    return <StepContext.Provider value={{step,setStep,MIN_STEP,maxStep,setMaxStep}}>{children}</StepContext.Provider>;
};

