import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  return (
    <div className="min-h-screen bg-[#f3f0ea] flex flex-col">
      {/* Header */}
      <div className="px-6 lg:px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#242422] hover:text-[#969188] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[420px] text-center">
          <span className="font-['DM_Serif_Display'] text-[24px] tracking-[0.1em] text-[#242422] uppercase">
            TRIPANYI
          </span>

          <h1 className="font-['DM_Serif_Display'] text-[32px] lg:text-[40px] text-[#242422] leading-[1.1] tracking-[-0.02em] mt-4">
            Welcome Back
          </h1>

          <p className="font-['Inter'] text-[14px] text-[#969188] mt-3 leading-[1.6]">
            Sign in to access your personalized travel dashboard and manage your
            quotes and inquiries.
          </p>

          <div className="mt-8 bg-white rounded-lg p-8 shadow-sm">
            <Button
              className="w-full h-12 bg-[#242422] text-white hover:bg-[#3a3a38] rounded-full font-['Inter'] text-[12px] uppercase tracking-[0.05em] transition-colors"
              size="lg"
              onClick={() => {
                window.location.href = getOAuthUrl();
              }}
            >
              Sign in to Tripanyi
            </Button>

            <p className="font-['Inter'] text-[11px] text-[#969188] mt-6 leading-[1.5]">
              By signing in, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>

          <Link
            to="/"
            className="inline-block mt-6 font-['Inter'] text-[12px] uppercase tracking-[0.05em] text-[#242422] underline underline-offset-4 hover:text-[#969188] transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
