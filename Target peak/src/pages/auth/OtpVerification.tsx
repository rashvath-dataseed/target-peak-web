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
import { KeyRound, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import { verifyOtp } from "@/Auth/api";

import { useAuth } from "@/hooks/useAuth";

type UserRole = "super_admin" | "admin" | "hierarchy_user";

type VerifyOtpPayload = {
  mobile: string;
  otp: string;
};

const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Role mapping function
  const mapRoleToUserRole = (roleName: string): UserRole => {
    switch (roleName.toLowerCase()) {
      case "super admin":
        return "super_admin";
      case "admin":
        return "admin";
      case "hierarchy user":
        return "hierarchy_user";
      default:
        return "hierarchy_user";
    }
  };

  // Get redirect path based on role
  const getRedirectPath = (role: UserRole): string => {
    switch (role) {
      case "super_admin":
        return "/dashboard";
      case "admin":
        return "/dashboard";
      case "hierarchy_user":
        return "/dashboard";
      default:
        return "/dashboard";
    }
  };


  const { mobile, role, from } = (location.state || {}) as {
    mobile: string;
    role: UserRole;
    from: { pathname: string };
  };

  // Safety check
  if (!mobile) {
    navigate("/login", { replace: true });
    return null;
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtp({
        mobile,
        otp,
      });

      const { accessToken, refreshToken, profiles } = res.data.data;

      // Store tokens
      localStorage.setItem("target_peak_token", accessToken);
      localStorage.setItem("target_peak_refresh_token", refreshToken);

      // Get active profile
      const activeProfile = profiles?.[0];
      if (!activeProfile) {
        throw new Error("No profile found");
      }

      // Map role and create user object
      const userRole = mapRoleToUserRole(activeProfile.role?.name || "");
      const user = {
        id: activeProfile.id.toString(),
        name: `${activeProfile.firstName} ${activeProfile.middleName || ""} ${activeProfile.lastName || ""}`.trim(),
        email: "", // Email not provided in profile
        mobile: mobile,
        role: userRole,
        status: "active" as const,
        avatar: activeProfile.profilePic || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Store user profile
      localStorage.setItem("target_peak_profile", JSON.stringify(user));

      // Update auth state directly (since OTP verification doesn't use login API)
      setAuthenticatedUser(user);

      // Redirect based on role
      const redirectPath = getRedirectPath(userRole);
      navigate(from?.pathname || redirectPath, { replace: true });

    } catch (err) {
      console.error("OTP verification error:", err);
      toast({
        variant: "destructive",
        title: "OTP Verification Failed",
        description: "Invalid OTP or OTP expired",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm">
        <Card className="shadow-lg">
          <CardHeader className="items-center space-y-6 pb-6">
            <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-primary shadow-lg">
              <img
                src={logo}
                alt="Target Peak"
                className="h-20 w-20 object-contain"
              />
            </div>

            <div className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold">
                OTP Verification
              </CardTitle>
              <CardDescription>
                Enter the OTP sent to{" "}
                <span className="font-medium">{mobile}</span>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {/* OTP */}
              <div className="space-y-1.5">
                <Label>OTP</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="h-10 pl-10 tracking-widest text-center"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
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
                    Verify OTP
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

export default OtpVerification;
