import React, { useState } from "react";
import { Button } from "../atoms/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { FormFieldWithIcon } from "./FormFieldIcon";

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
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-4"
      transition={{ duration: 0.8 }}
    >
      <FormFieldWithIcon
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <FormFieldWithIcon
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-gray-600 hover:text-[color:var(--custom-orange)] transition-colors"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        type="submit"
        fullWidth
        className="mt-2 bg-[color:var(--custom-orange)] hover:bg-[color:var(--custom-orange)]/90 text-white font-medium py-2.5 rounded-lg transition-colors"
      >
        Log In
      </Button>
    </motion.form>
  );
};
