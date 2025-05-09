import React from "react";
import { Input } from "../atoms/Input";
import { Label } from "../atoms/Label";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ label, name, type = "text", required = false, error, value, onChange }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <Input id={name} name={name} type={type} value={value} onChange={onChange} error={error} />
    </div>
  );
};
