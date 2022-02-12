import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditTimePlace from '../../components/editTimePlace/EditTimePlace';
import EditPizza from '../../components/editPizza/EditPizza';
import SendInvitation from '../../components/sendInvitation/SendInvitation';
import {Link} from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from "recoil";
import partyState from '../../Recoil/atoms/partyAtom';
import Api from '../../api/Api';
import EditDrinks from '../../components/editDrinks/EditDrinks';
import EditDessert from '../../components/editDessert/EditDessert';
import cocktailsState from '../../Recoil/atoms/cocktailsAtom';
import drinksState from '../../Recoil/atoms/drinksAtom';
import './editParty.css'
import party from "../../assets/images/dancingPizza.png"



export default function EditParty() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const partyObject = useRecoilValue(partyState);
    const setPartyObject = useSetRecoilState(partyState);
    const [selectedCocktails, setSelectedCocktails] = useState (partyObject.selectedCocktails)
    const [selectedDrinks, setSelectedDrinks] = useState (partyObject.selectedDrinks)
    const [dessertOption1, setDessertOption1] = useState(partyObject.selectedDesserts?partyObject.selectedDesserts[0]:"")
    const [dessertOption2, setDessertOption2] = useState(partyObject.selectedDesserts?partyObject.selectedDesserts[1]:"")
    const [dessertOption3, setDessertOption3] = useState(partyObject.selectedDesserts?partyObject.selectedDesserts[2]:"")

    const steps = ['When and where', 'Pizza', 'Drinks', 'Desert', 'Send invitations'];
    const components = [
        <EditTimePlace />,
        <EditPizza />,
        <EditDrinks selectedCocktails={selectedCocktails} 
        setSelectedCocktails={setSelectedCocktails}
         selectedDrinks={selectedDrinks} setSelectedDrinks={setSelectedDrinks}/>,
        <EditDessert dessertOption1={dessertOption1} dessertOption2={dessertOption2} dessertOption3={dessertOption3} setDessertOption1={setDessertOption1} setDessertOption2={setDessertOption2} setDessertOption3={setDessertOption3}/>,
        <SendInvitation />]



    const handleNext = async () => {
        console.log(partyObject);
        if (activeStep === 2) {
            setPartyObject({...partyObject, selectedDrinks, selectedCocktails})
        }
        if (activeStep === 3) {
            const selectedDesserts = [];
            if (dessertOption1) {selectedDesserts.push(dessertOption1)}
            if (dessertOption2) {selectedDesserts.push(dessertOption2)}
            if (dessertOption3) {selectedDesserts.push(dessertOption3)}
            setPartyObject({...partyObject, selectedDesserts})
        }
        try {
            await Api.put("/party/edit", partyObject);
        } catch (e) {
            console.error(e.message);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

   
    return (
        <Box sx={{ mt:5}}>
            <Box sx={{  width: '90%', margin: "0 auto" }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length? (
                    <React.Fragment>
                        <Typography sx={{ mt: 10, mb: 1 }}>
                            <div className='step-component'>
                                <h2>Your party is ready!</h2>
                                <Link to="/party"> <Button >Back to homepage</Button> </Link>
                                <div>
                                <img  className="editParty-party-image" src={party} alt="pizza party"/>
                                </div>
                            </div>
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 6, mb: 1}}>
                            {components[activeStep]}
                        </Typography>
                            <div className='editParty-buttons-div'>
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
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                            </div>
                    </React.Fragment>
                )}
            </Box>
        </Box>
    );
}




