import React, { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import Link from "next/link";
import { motion } from "framer-motion";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
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
    <motion.form onSubmit={handleSubmit} className="flex flex-col gap-y-3" transition={{ duration: 0.8 }}>
      <h4 className="text-gray-500 text-center">or continue with email</h4>
      <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      <Link href="/forgot-password" className="text-sm text-right text-gray-500 hover:text-orange-600">
        Forgot Password?
      </Link>
      <Button type="submit" fullWidth>
        Log In
      </Button>
    </motion.form>
  );
};
