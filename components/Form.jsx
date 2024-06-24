import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useState } from "react";

let data = [];

const countries = [
  "Algeria",
  "Bahrain",
  "Comoros",
  "Djibouti",
  "Egypt",
  "Iraq",
  "Jordan",
  "Kuwait",
  "Lebanon",
  "Libya",
  "Mauritania",
  "Morocco",
  "Oman",
  "Palestine",
  "Qatar",
  "Saudi Arabia",
  "Somalia",
  "Sudan",
  "Syria",
  "Tunisia",
  "United Arab Emirates",
  "Yemen",
];

const Form = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    country: "",
    amount: "",
    checked: false,
  });

  const isEligibleForLoan = (form) => {
    const isAgeValid = form.age >= 18 && form.age <= 60;
    const isAmountValid = form.amount >= 100 && form.amount <= 100000;
    const hasAgreedToTerms = form.checked;
    const isCountrySelected = form.country !== "";
    const isFirstNameValid = form.firstName.length > 3;
    const isLastNameValid = form.lastName.length > 3;

    return (
      isAgeValid &&
      isAmountValid &&
      hasAgreedToTerms &&
      isCountrySelected &&
      isFirstNameValid &&
      isLastNameValid
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCountryChange = (value) => {
    setForm({ ...form, country: value });
  };

  const handleCheckedChange = (value) => {
    setForm({ ...form, checked: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEligibleForLoan(form)) {
      data.push(form);
      setForm({ ...form });
    }
  };

  const handleFormReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      age: "",
      country: "",
      amount: "",
      checked: false,
    });
  };

  return (
    <div className="w-full h-full grid grid-cols-1 grid-rows-2 gap-10 p-8 justify-center lg:py-20 lg:grid-cols-2 lg:grid-rows-1 lg:gap-16">
      <Card className="w-full flex flex-col justify-center gap-3">
        <CardHeader>
          <CardTitle>Request a loan</CardTitle>
          <CardDescription>
            Fill out the form to request a loan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-7">
              <div className="flex flex-col gap-6 w-full sm:flex-row">
                <div className="field">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={handleInputChange}
                    required
                    minLength="4"
                    maxLength="8"
                    size="10"
                  />
                </div>
                <div className="field">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChange={handleInputChange}
                    required
                    minLength="4"
                    maxLength="8"
                    size="10"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full sm:flex-row">
                <div className="field">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter your age"
                    value={form.age}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <p className="text-[0.8rem] text-muted-foreground">
                    Ensure the age is within the range of 18 to 60.
                  </p>
                </div>
                <div className="field">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={form.country}
                    onValueChange={handleCountryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => {
                        return (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="field">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type={"number"}
                  placeholder="Enter the amount you need"
                  value={form.amount}
                  onChange={handleInputChange}
                  min="0"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                  Ensure the amount is within the range of $100 to $100,000.
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="terms"
                  checked={form.checked}
                  onCheckedChange={handleCheckedChange}
                />
                <label htmlFor="terms">Accept terms and conditions.</label>
              </div>
              <div className="flex items-center gap-3 w-full">
                <Button type="submit" onClick={handleSubmit} className="w-28">
                  Submit
                </Button>
                <Button
                  type="reset"
                  variant="outline"
                  onClick={() => {
                    handleFormReset();
                    data = [];
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="pt-5 overflow-y-auto w-full h-full scroll-smooth">
        <CardContent className="w-full h-fit flex flex-col items-center gap-3">
          {/* No Requests Yet */}
          {data.map((item, index) => {
            return (
              <Alert
                key={index}
                className="flex flex-col gap-1 animate-opacity"
              >
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Request Successful!</AlertTitle>
                <AlertDescription>
                  {item.firstName} {item.lastName} request {item.amount}$ has
                  been successfully processed.
                </AlertDescription>
              </Alert>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Form;
