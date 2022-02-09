import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditTimePlace from '../../components/editTimePlace/EditTimePlace';
import EditPizza from '../../components/editPizza/EditPizza';
import SendInvitation from '../../components/sendInvitation/SendInvitation';
import { useRecoilValue, useSetRecoilState } from "recoil";
import {Link} from 'react-router-dom';
import partyState from '../../Recoil/atoms/partyAtom';
import Api from '../../api/Api';
import EditDrinks from '../../components/editDrinks/EditDrinks';
import EditDessert from '../../components/editDessert/EditDessert';
import cocktailsState from '../../Recoil/atoms/cocktailsAtom';
import drinksState from '../../Recoil/atoms/drinksAtom';



export default function EditParty() {
    // const [partyObject, setPartyObject] = React.useState({date: new Date(), address:"", toppingOptions:["a","b","c"], toppingsSelected:[0]})
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const partyObject = useRecoilValue(partyState);
    const setPartyObject = useSetRecoilState(partyState);
    const drinksArray = useRecoilValue(drinksState);
    const setDrinksArray = useSetRecoilState(drinksState);
    const cocktailsArray = useRecoilValue(cocktailsState);
    const setCocktailsArray = useSetRecoilState(cocktailsArray);

    const steps = ['When and where', 'Pizza', 'Drinks', 'Desert', 'Send invitations'];
    const components = [
        <EditTimePlace />,
        <EditPizza />,
        <EditDrinks />,
        <EditDessert/>,
        <SendInvitation />]



    const isStepOptional = (step) => {
        // return step === 1;
        return false
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = async () => {
        if (activeStep === 2) {
            setPartyObject({...partyObject, selectedDrinks: drinksArray})
        }
        // if (activeStep === steps.length - 1) {
        try {
            await Api.put("/party/edit", partyObject);
        } catch (e) {
            console.error(e.message);
        }

        // TODO: MOVE THE API CALL TO API FILE => savePartyToDataBase(partyObject)
        // }
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        // TODO: change the layout to mui or more responsive units

        <Box sx={{ width: '100%', marginTop: "150px" }}>
            <Box sx={{  margin: "0 auto" }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {/* <Button onClick={handleReset}>Reset</Button> */}
                           <Link to="/party"> <Button >Back to homepage</Button> </Link>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            {/* Step {activeStep + 1}             <Signup/> */}
                            {components[activeStep]}

                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}


                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Box>
    );
}




