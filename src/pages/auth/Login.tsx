import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import apiClient from "@/axios/axios";

type UserRole = "super_admin" | "admin" | "hierarchy_user";

type SendOtpPayload = {
  mobile: string;
  // role: UserRole;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState<UserRole>("super_admin");
  const [loading, setLoading] = useState(false);

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/dashboard";

  /* ----------------------------------
     Submit → Send OTP
  ----------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mobile || mobile.length !== 10) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please enter a valid 10-digit mobile number",
      });
      return;
    }

    const payload: SendOtpPayload = {
      mobile,
      // role,
    };

    try {
      setLoading(true);

      await apiClient.post("/auth/send-otp", payload);

      navigate("/otp-verification", {
        replace: true,
        state: {
          mobile,
          role,
          from,
        },
      });
    } catch {
      toast({
        variant: "destructive",
        title: "OTP Failed",
        description: "Unable to send OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Role Toggle */}
        {/* <div className="flex gap-2 rounded-lg bg-card p-1 shadow-md">
          {[
            { label: "Super Admin", value: "super_admin" },
            { label: "Admin", value: "admin" },
            { label: "User", value: "hierarchy_user" },
          ].map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRole(r.value as UserRole)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                role === r.value
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div> */}

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader className="items-center space-y-6 pb-6">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-primary shadow-lg">
              <img
                src={logo}
                alt="Target Peak"
                className="h-24 w-24 object-contain"
              />
            </div>

            <div className="space-y-2 text-center">
              <CardTitle className="text-4xl font-bold">Sign in</CardTitle>
              <CardDescription>
                Enter your mobile number to receive OTP
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mobile */}
              <div className="space-y-1.5">
                <Label>Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="h-10 pl-10"
                    type="number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="h-11 w-full gap-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
// 
export default Login;
