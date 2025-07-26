import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import postData from "../../hooks/usePost";
import { useLoading, Spinner } from "../../hooks/useLoading";
import { ArrowLeftCircleIcon } from "lucide-react";

const OtpPage = () => {
  const navigate = useNavigate();
  const onBack = () => navigate(-1);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [fullotps, setFullotp] = useState({
    mobile: sessionStorage.getItem("mobile"),
    otp: "",
  });

  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const formRef = useRef();

  const { hookHandleSubmit, showError, showSuccess } = postData();
  const { loading, wrap } = useLoading();

  /** ✅ Countdown for resend */
  const [timer, setTimer] = useState(30); // 30 seconds countdown

  /** ✅ Start timer when page loads */
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  /** ✅ Handle OTP input change */
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  /** Handle backspace key navigation */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /**  Handle paste of full OTP */
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(paste)) {
      const otpArray = paste.split("");
      setOtp(otpArray);
      otpArray.forEach((digit, index) => {
        if (inputsRef.current[index]) {
          inputsRef.current[index].value = digit;
        }
      });
      inputsRef.current[5]?.focus();
      e.preventDefault();
    }
  };

  /** Submit OTP */
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < 6 || otp.includes("")) {
      setError("Please enter a valid 6-digit OTP");
      formRef.current.classList.remove("animationsubmit");
      void formRef.current.offsetWidth;
      formRef.current.classList.add("animationsubmit");
      return;
    }

    setError("");
    const numericOtp = parseInt(fullOtp);
    const updatedOtp = { ...fullotps, otp: numericOtp };
    console.log("Otp:", updatedOtp);

    wrap(async () => {
      await new Promise((r) => setTimeout(r, 1000)); // simulate async
    });

    hookHandleSubmit(
      updatedOtp,
      `${import.meta.env.VITE_BACKEND_URL}/auth/register/verifyotp`,
      "/emailregister"
    );
  };

  /** ✅ Resend OTP */
  const handleResendOtp = () => {
    if (timer === 0) {
      wrap(async () => {
        await new Promise((r) => setTimeout(r, 1000)); // Simulate API call
        toast.success("OTP resent successfully!");
        setTimer(30); // Restart countdown
      });
    }
  };

  const mobileCode = localStorage.getItem("mobilecode");

  /** Masked phone number */
  function maskPhonenumber() {
    const mobile = fullotps.mobile;
    if (mobile && mobile.length >= 10) {
      return `${mobile.slice(0, 3)}****${mobile.slice(-3)}`;
    }
    return mobile;
  }

  return (
    <>
      <div className="custom-bg max-w-screen max-h-screen w-full h-full flex justify-center items-center relative">
        <div className="absolute inset-0 z-50 flex justify-center items-center">
          <div
            ref={formRef}
            className="glass-card-short max-w-screen-lg p-8 max-h-screen flex justify-center items-center bg-transparent text-[#FFFF] rounded-3xl border-[2px] border-[#d5d0f1]"
          >
            <div className="w-full">
              <div className="w-full">
                <p className="w-full font-bold text-3xl flex justify-between items-center tracking-[0.2px]">
                  Enter OTP
                  <span className="cursor-pointer" onClick={onBack}>
                    <ArrowLeftCircleIcon />
                  </span>
                </p>
                <p className="text-base font-normal max-md:text-sm mt-2">
                  Enter the 6-digit OTP sent to{" "}
                  <span className="font-medium ml-1">
                    +{mobileCode} {maskPhonenumber()}
                  </span>
                </p>
              </div>

              <div className="w-full mt-5">
                <form
                  onSubmit={handleSubmit}
                  className="mt-2 flex flex-col gap-2"
                >
                  <div className="w-full h-[60px] flex gap-3">
                    {otp.map((digit, idx) => (
                      <input
                        placeholder="_"
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onPaste={(e) => handlePaste(e)}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        ref={(el) => (inputsRef.current[idx] = el)}
                        className={`validInputBoxOtp ${
                          error ? "invalidInputBox" : "validInputBox"
                        }`}
                      />
                    ))}
                  </div>

                  {/*Didn't receive OTP section */}
                  <div className="flex items-center justify-center mt-1 w-full text-sm">
                    <p className="text-white font-normal text-xs">Didn’t receive the OTP?</p>
                    {timer > 0 ? (
                      <p className="text-white font-medium  text-xs ml-1 -
                      ./*">Resend OTP in {timer}s</p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-white font-medium hover:underline text-xs ml-1 "
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  {/* Error & Success messages */}
                  {error && <p className="inputBoxError">{error}</p>}
                  {showError && <p className="inputBoxError">{showError}</p>}
                  {showSuccess && (
                    <p className="text-black">{showSuccess}</p>
                  )}


                  {/* Submit button */}
                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`text-[#FFFF] text-md font-semibold h-[56px] w-full my-auto px-auto py-2 rounded-xl ${
                        loading ? "bg-gray-500" : "bg-blue-800"
                      }`}
                    >
                      {loading && <Spinner />}
                      {loading ? "" : "Continue"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
         </div>
      </div>
    </>
  );
};

export default OtpPage;
