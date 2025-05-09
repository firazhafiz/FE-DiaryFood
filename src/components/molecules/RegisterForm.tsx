import React, { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { motion } from "framer-motion";

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
    <motion.form onSubmit={handleSubmit} className="flex flex-col gap-y-3"  transition={{ duration: 0.8}}>
      <h4 className="text-gray-500 text-center">or continue with email</h4>
      <Input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
      <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
      <Button type="submit" fullWidth>
        Create Account
      </Button>
    </motion.form>
  );
};
