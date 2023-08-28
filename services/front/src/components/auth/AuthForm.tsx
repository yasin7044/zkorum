import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React from "react";
import { ZodType } from "../../shared/types/zod";
import { handleOnAuthenticate } from "../../auth/auth";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface AuthFormProps {
  autoFocus: boolean;
  email: string;
  setEmail: (email: string) => void;
  isEmailValid: boolean;
  setIsEmailValid: (emailHelper: boolean) => void;
  emailHelper: string;
  setEmailHelper: (emailHelper: string) => void;
}

export function AuthForm({
  autoFocus,
  email,
  setEmail,
  isEmailValid,
  setIsEmailValid,
  emailHelper,
  setEmailHelper,
}: AuthFormProps) {
  const [isTrusted, setIsTrusted] = React.useState<boolean>(false);
  const [hasGivenConsent, setHasGivenConsent] = React.useState<boolean>(false);

  React.useEffect(() => {
    console.log("authform", email);
  }, []);

  function validateEmail(emailToValidate: string) {
    if (emailToValidate === "") {
      setIsEmailValid(false);
      setEmailHelper(" ");
      return;
    }
    const result = ZodType.email.safeParse(emailToValidate);
    if (!result.success) {
      const formatted = result.error.format();
      setIsEmailValid(false);
      setEmailHelper(formatted._errors[0]);
    } else {
      const result = ZodType.authorizedEmail(
        import.meta.env.VITE_AUTHORIZED_FQDNS
      ).safeParse(emailToValidate);
      if (!result.success) {
        setIsEmailValid(false);
        setEmailHelper(
          "Closed Alpha is limited to authorized email addresses - stay tuned for future releases!"
        );
      } else {
        setIsEmailValid(true);
        setEmailHelper(" ");
      }
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ mt: 1 }}>
        <TextField
          autoFocus={autoFocus}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          error={email !== "" && !isEmailValid}
          helperText={emailHelper} // must always be set to keep same height (see link at variable definition)
          value={email}
          onChange={(event: React.FocusEvent<HTMLInputElement>) => {
            if (event.target.value !== email) {
              setEmail(event.target.value);
              validateEmail(event.target.value);
            }
          }}
        />
        <Box>
          <FormControl
            error={!hasGivenConsent}
            component="fieldset"
            variant="standard"
          >
            <FormControlLabel
              control={
                <Checkbox
                  required
                  checked={hasGivenConsent}
                  onChange={() => setHasGivenConsent(!hasGivenConsent)}
                />
              }
              label={
                <Typography variant={"body2"}>
                  I understand that as an alpha version, this product may
                  contain accidental security flaws compromising privacy
                  guarantees
                </Typography>
              }
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl
            error={!isTrusted}
            component="fieldset"
            variant="standard"
          >
            <FormControlLabel
              control={
                <Checkbox
                  required
                  checked={isTrusted}
                  onChange={() => setIsTrusted(!isTrusted)}
                />
              }
              label={
                <Typography variant={"body2"}>
                  This is a private & trusted device - stay logged-in
                </Typography>
              }
            />
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleOnAuthenticate(email)}
            disabled={!isEmailValid || !isTrusted || !hasGivenConsent}
          >
            Register / Log in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}