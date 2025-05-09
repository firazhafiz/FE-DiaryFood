import React, { useState } from "react";
import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";

interface RegisterFormProps {
  onSubmit: (data: { name: string; email: string; password: string; confirmPassword: string }) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label="Name" name="name" required value={formData.name} onChange={handleChange} />
      <FormField label="Email" name="email" type="email" required value={formData.email} onChange={handleChange} />
      <FormField label="Password" name="password" type="password" required value={formData.password} onChange={handleChange} />
      <FormField label="Confirm Password" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} />
      <Button type="submit" fullWidth>
        Register
      </Button>
    </form>
  );
};
