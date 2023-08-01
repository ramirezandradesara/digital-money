import React, { FC, useEffect, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IControlledTextInput } from "@/utils/types/interfaces.types";
import { useController, useFormContext } from "react-hook-form";

//Functional content used to generate a configurable text input
const ControlledTextInput: FC<IControlledTextInput> = ({
  type,
  name,
  label,
  placeholder,
  required,
  passwordAdornment,
}: IControlledTextInput) => {
  const { control } = useFormContext();

  const {
    field: { onChange, value, ref },
    formState: { errors },
  } = useController<Record<string, string>>({
    name: name,
    control,
  });

  const [show, setShow] = useState(true);

  /**
   * useEffect Method used to toggle visibility to the password input text
   */
  useEffect(() => {
    passwordAdornment && setShow(false);
  }, []);

  return (
    <Box mb={"15px"} width={"100%"}>
      <TextField
        color="secondary"
        type={type || (show ? "text" : "password")}
        onChange={onChange}
        value={value || ""}
        label={label || ""}
        placeholder={placeholder}
        inputRef={ref}
        fullWidth
        error={!!errors[name]}
        helperText={`${errors[name]?.message || ""}`}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white",
            borderRadius: "10px",
            fontSize: '16px',
            marginBottom: '12px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1);',
            '&:hover fieldset': {
              borderColor: 'secondary.main',
            },
          },
        }}
        required={required || false}
        InputProps={
          passwordAdornment
            ? {
              endAdornment: show ? (
                <IconButton onClick={() => setShow(false)}>
                  <VisibilityOff />
                </IconButton>
              ) : (
                <IconButton onClick={() => setShow(true)}>
                  <Visibility />
                </IconButton>
              ),
            }
            : {}
        }
      />
    </Box>
  );
};

export default ControlledTextInput;
