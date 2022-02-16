import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";


export default function PaletteMetaForm({
    handleSavePalette,
    newPaletteName,
    handlePaletteNameChange,
    open,
    handleClose
}) {
    return (
        <div>
            <Dialog>
                <Picker />
            </Dialog>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Submit your new palette</DialogTitle>
                <ValidatorForm onSubmit={handleSavePalette}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a unique name for your new palette
                        </DialogContentText>

                        <TextValidator
                            label="Palette Name"
                            name="newPaletteName"
                            value={newPaletteName}
                            onChange={handlePaletteNameChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={[
                                "Enter palette name",
                                "Palette name already used",
                            ]}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" type="submit">
                            save palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div >
    );
}