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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from 'react-router-dom';
import partyState from '../../Recoil/atoms/partyAtom';
import guestState from '../../Recoil/atoms/guestAtom';
import Api from '../../api/Api';
import EditDrinks from '../../components/editDrinks/EditDrinks';
import EditDessert from '../../components/editDessert/EditDessert';
import cocktailsState from '../../Recoil/atoms/cocktailsAtom';
import drinksState from '../../Recoil/atoms/drinksAtom';
import './guestEdit.css'
import party from "../../assets/images/dancingPizza.png"
import GuestEditDetails from '../guestEditDetails/GuestEditDetails';
import GuestEditPizza from '../guestEditPizza/GuestEditPizza';
import GuestEditDrinks from '../guestEditDrinks/GuestEditDrinks';
import GuestEditDesserts from '../guestEditDesserts/GuestEditDesserts';
import GuestFinished from '../guestFinished/GuestFinished';


export default function GuestEdit() {
    // const [partyObject, setPartyObject] = React.useState({date: new Date(), address:"", toppingOptions:["a","b","c"], toppingsSelected:[0]})
    const [activeStep, setActiveStep] = React.useState(0);
    const partyObject = useRecoilValue(partyState);
    const setGuestObject = useSetRecoilState(guestState);
    const guestObject = useRecoilValue(guestState);
    const [pizzasSelected, setPizzasSelected] = useState([]);

    const steps = ['Your details', 'Pizza', 'Drinks','Desert'];
    const components = [
        <GuestEditDetails />,
        <GuestEditPizza setPizzasSelected={setPizzasSelected} pizzasSelected={pizzasSelected} />,
        <GuestEditDrinks />,
    <GuestEditDesserts/>]
   
    const handleSaveGuest = async () => {
        try {
            const guest = await Api.post("/guest/", guestObject);
            console.log("guest response:", guest);
        } catch (e) {
            console.error(e.message);
        }
    }

    const handleNext = async () => {
        console.log("guestObj", guestObject);
        console.log("step", activeStep);

        if (activeStep === 0) {
            setGuestObject({ ...guestObject, owner: partyObject._id })
        }
        if (activeStep === 1) {
            setGuestObject({ ...guestObject, pizzasSelected })
        }
        if (activeStep === steps.length - 1) {
            handleSaveGuest()
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        // TODO: change the layout to mui or more responsive units

        <Box sx={{ width: '100%', marginTop: "150px" }}>
            <Box sx={{ margin: "0 auto" }}>
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
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 10, mb: 1 }}>
                            {/* All steps completed - you&apos;re finished */}
                            <div className='step-component'>
                                {/* <h2>Your party is ready!</h2>
                                <Link to="/party"> <Button >Back to homepage</Button> </Link>
                                <div>
                                    <img className="editParty-party-image" src={party} alt="pizza party" />
                                </div> */}
                                <GuestFinished/>
                            </div>
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {/* <Button onClick={handleReset}>Reset</Button> */}
                            {/* <Link to="/party"> <Button >Back to homepage</Button> </Link> */}
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 6, mb: 1, display: 'flex', justifyContent: 'center'}}>
                        <div className='step-component'>
                            {components[activeStep]}
                            </div>
                        </Typography>
                        <div className="editParty-buttons-div">
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




