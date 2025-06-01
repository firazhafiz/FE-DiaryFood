import React, { useState } from "react";
import { FormFieldWithIcon } from "./FormFieldIcon";
import { Button } from "../atoms/Button";
import { motion } from "framer-motion";
import { Input } from "../atoms/Input";

interface RegisterFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
    <motion.form onSubmit={handleSubmit} className="flex flex-col gap-y-3 text-sm " transition={{ duration: 0.8 }}>
      <FormFieldWithIcon type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="placeholder:text-gray-500" />
      <FormFieldWithIcon type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="placeholder:text-gray-500" />
      <FormFieldWithIcon type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="placeholder:text-gray-500" />
      {/* <FormFieldWithIcon type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="placeholder:text-gray-500" /> */}
      <Button type="submit" fullWidth>
        Create Account
      </Button>
    </motion.form>
  );
};
