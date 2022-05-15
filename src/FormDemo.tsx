import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import { array, boolean, mixed, number, object, string } from "yup";
import { InvestmentDetails } from "./InvestmentDetails";

const FormDemo = () => {
  const initialValues: InvestmentDetails = {
    fullName: "",
    initialInvestment: 0,
    investmentRisk: [],
    commentAboutInvestmentRisk: "",
    dependents: 0,
    acceptedTermsAndConditions: false,
  };

  return (
    <Card>
      <CardContent>
        <Box marginBottom={2}>
          {" "}
          <Typography variant="h4">New Account</Typography>
        </Box>
        <Formik
          validationSchema={object({
            fullName: string().required().min(2).max(20),
            initialInvestment: number().required().min(100),
            investmentRisk: array(
              string().oneOf(["High", "Medium", "Low"])
            ).min(1),
            commentAboutInvestmentRisk: mixed().when("investmentRisk", {
              is: (investmentRisk: string[]) =>
                investmentRisk.find((ir) => ir === "High"),
              then: string().required().min(20).max(100),
              otherwise: string().min(20).max(100),
            }),
            dependents: number().required().min(0).max(5),
            acceptedTermsAndConditions: boolean().oneOf([true]),
          })}
          initialValues={initialValues}
          onSubmit={(values, formikHelpers) => {
            return new Promise<void>(res => {
                setTimeout(() => {
                  console.log(values);
                  console.log(formikHelpers);
                  res();
                }, 5000);
              })
          }}
        >
          {({ values, errors, isSubmitting, isValidating }) => (
            <Form>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="fullName" as={TextField} label="Full Name" />
                  <ErrorMessage name="fullName" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="initialInvestment"
                    type="number"
                    as={TextField}
                    label="Initial Investment"
                  />
                  <ErrorMessage name="initialInvestment" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                <FormGroup>
                  <MyCheckBox name="investmentRisk" label="High" value="High" />
                  <MyCheckBox
                    name="investmentRisk"
                    label="Medium"
                    value="Medium"
                  />
                  <MyCheckBox name="investmentRisk" label="Low" value="Low" />
                  <ErrorMessage name="investmentRisk" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                {" "}
                <FormGroup>
                  <Field
                    name="commentAboutInvestmentRisk"
                    as={TextField}
                    multiline
                    rows={4}
                  />
                  <ErrorMessage name="commentAboutInvestmentRisk" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                {" "}
                <FormGroup>
                  <Field name="dependents" as={TextField} select>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Field>
                  <ErrorMessage name="dependents" />
                </FormGroup>
              </Box>

              <Box marginBottom={2}>
                {" "}
                <FormGroup>
                  <MyCheckBox
                    name="acceptedTermsAndConditions"
                    label="Accept Terms and Conditions"
                  />
                  <ErrorMessage name="acceptedTermsAndConditions" />
                </FormGroup>
              </Box>
              <Button type="submit" disabled={isSubmitting || isValidating}>
                Submit
              </Button>
              <pre>{JSON.stringify(errors, null, 4)} </pre>
              <pre>{JSON.stringify(values, null, 4)} </pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default FormDemo;

export interface MyCheckboxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

export const MyCheckBox = (props: MyCheckboxProps) => {
  const [field] = useField({
    name: props.name,
    type: "checkbox",
    value: props.value,
  });
  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
};
/*
 investmentRisk: array(object({
                
}))
*/
