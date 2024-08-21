import React, { useState } from "react";
import HeaderReservas from "../components/HeaderReservas";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";



function Reservas() {
  const steps = ["Servicios", "Fecha y Hora", "Información", "Detalles"];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
  
    <>
      <HeaderReservas />
      <div className=" mt-6 max-w-screen-xl mx-auto">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps} >
                    <div style={{ color: index === activeStep ? 'burlywood' : 'white' , fontSize: '18px' }}>
                      {label}
                    </div>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto",  }} />
                <Button onClick={handleReset} sx={{border: '1px solid white', color:'black', background:'white', "&:hover": { background: "lightgray",}}}>Finalizar</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="primary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    color: "black",
                    border: "1px solid white",
                    marginRight: 1,
                    background: "white",
                    "&:hover": {
                      background: "lightgray",
                    },
                  }}
                >
                  Regresar
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ border: '1px solid white', color:'black', background:'white', "&:hover": { background: "lightgray",}}}>
                  {activeStep === steps.length - 1 ? "Siguiente" : "Siguiente"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </>
  );
}

export default Reservas;
