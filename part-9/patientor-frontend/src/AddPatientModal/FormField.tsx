import { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import {
  Select,
  FormControl,
  MenuItem,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";
import { Diagnosis, EntryType, Gender } from "../types";
import { InputLabel } from "@material-ui/core";
import Input from "@material-ui/core/Input";

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: (GenderOption | EntryTypeOption)[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max }: NumberProps) => {
  return (
    <div style={{ marginBottom: "1em" }}>
      <label>{label}</label>
      <br />
      <Field {...field} type="number" label={label} min={min} max={max} />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";

  const onChange = (data: string[]) => {
    setDiagnoses(data);
    setFieldTouched(field, true);
    setFieldValue(field, selectedDiagnoses);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: "30px" }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<Input />}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};

interface CustomSelectProps {
  label: string;
  id: string;
  value: string;
  options: Array<{ label: EntryType; value: EntryType; text: string }>;
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
}

export const CustomSelect = ({
  label,
  id,
  value,
  options,
  onChange,
}: CustomSelectProps) => {
  return (
    <Select id={id} labelId={label} value={value} onChange={onChange}>
      {options.map((option) => (
        <MenuItem key={option.text} value={option.value}>
          {option.value}
        </MenuItem>
      ))}
    </Select>
  );
};