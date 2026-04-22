import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/App";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Login = () => {
  // Pre-fill with demo credentials
  const [formData, setFormData] = useState({ email: "demo@demo.com", password: "DemoPass123" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Directly log in dummy user for demo (no backend)
    const dummyUser = {
      id: "demo-id",
      name: "Demo User",
      email: formData.email,
      company: "Demo Company"
    };
    login(dummyUser);
    toast.success("Welcome back!");
    navigate("/dashboard");
    setLoading(false);
  };

  const benefits = [
    "Accurate cost estimates in minutes",
    "Real-time project analytics",
    "Team collaboration tools",
    "Professional branded reports",
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* ── Left — form ── */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-background">
        <div className="w-full max-w-md">

          <Link to="/" className="inline-flex items-center gap-2.5 mb-10 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center transition-shadow duration-200"
              style={{ boxShadow:"0 2px 8px hsl(var(--primary) / 0.28)" }}>
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight">Real Cost</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold mb-2">Welcome back</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to access your estimation dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
              <Input id="email" name="email" type="email"
                value={formData.email} onChange={handleChange} required
                className="rounded-xl h-11 text-sm"
                placeholder="you@company.com"
                data-testid="login-email-input" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <Link to="/forgot-password" className="text-xs font-semibold hover:underline"
                  style={{ color:"hsl(var(--primary))" }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input id="password" name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password} onChange={handleChange} required
                  className="rounded-xl h-11 pr-12 text-sm"
                  placeholder="Enter your password"
                  data-testid="login-password-input" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading}
              className="w-full rounded-xl h-11 text-sm font-semibold text-white mt-1"
              style={{ background:"hsl(var(--primary))", boxShadow:"0 2px 8px hsl(var(--primary) / 0.25)" }}
              data-testid="login-submit-btn">
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">
                Don't have an account?
              </span>
            </div>
          </div>

          <Link to="/register">
            <Button variant="outline" className="w-full rounded-xl h-11 text-sm font-semibold">
              Create a free account
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Right — brand panel ── */}
      <div className="hidden lg:flex flex-col justify-center relative overflow-hidden section-dark">
        {/* BG image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage:"url('https://images.unsplash.com/photo-1770823556202-2eba715a415b?w=1200&q=80')" }} />
        <div className="absolute inset-0 grid-pattern" />
        {/* Glow */}
        <div className="absolute rounded-full blur-3xl pointer-events-none"
          style={{ top:"10%", right:"-10%", width:"500px", height:"500px",
            background:"radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)" }} />

        <div className="relative z-10 p-14">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center"
              style={{ boxShadow:"0 4px 12px rgba(249,115,22,0.30)" }}>
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-extrabold text-lg">Real Cost</span>
          </div>

          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Precision meets<br />
            <span className="text-gradient">efficiency.</span>
          </h2>
          <p className="leading-relaxed mb-10 max-w-xs text-base"
            style={{ color:"rgba(255,255,255,0.55)" }}>
            Join thousands of construction professionals who trust Real Cost
            for accurate estimates and streamlined workflows.
          </p>

          <ul className="space-y-3.5">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background:"rgba(37,99,235,0.20)", border:"1px solid rgba(37,99,235,0.35)" }}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="text-sm" style={{ color:"rgba(255,255,255,0.72)" }}>{b}</span>
              </li>
            ))}
          </ul>

          {/* Stats row */}
          <div className="inline-flex items-center gap-4 mt-12 px-5 py-4 rounded-2xl"
            style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.10)" }}>
            {[["500+","Companies"],["98%","Accuracy"],["15K+","Projects"]].map(([val, lbl], i, arr) => (
              <>
                <div key={i} className="text-center">
                  <p className="text-white font-bold text-xl mono leading-none">{val}</p>
                  <p className="text-xs mt-0.5" style={{ color:"rgba(255,255,255,0.38)" }}>{lbl}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px h-8" style={{ background:"rgba(255,255,255,0.12)" }} />
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
