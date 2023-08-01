import {useContext, useEffect, useState} from 'react';
import { StepContext } from './StepContext';
type useStepObject ={
    step:number,
    nextStep: ()=>void,
    previousStep: ()=>void,
}

const useStep = (maxStepArg?:number):useStepObject  => {

    const {step,setStep,MIN_STEP,maxStep,setMaxStep} = useContext(StepContext);
  

    useEffect(
        ()=>{
            if(!setMaxStep) return;
            if(!setStep) return;
            if(maxStepArg) {
                setMaxStep(maxStepArg);
                setStep(MIN_STEP);
            }
        }
        ,[maxStepArg,setMaxStep,setStep]
    )

    const nextStep=()=>{
        if(!setStep) return;

      if(step === maxStep){
        /* if (step === maxStepArg){ */
            setStep(MIN_STEP);
        }
        else{
            setStep(prev=>prev+1);
        }
    }

    const previousStep=()=>{
        if(step === MIN_STEP) return;
        if(!setStep) return;
        setStep(prev=>prev-1);
    }

    return{
        step,
        nextStep,
        previousStep
    }
    
};

export default useStep;