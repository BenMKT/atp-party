'use client';

import { useState } from 'react';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { resetPassword } from '@/app/lib/actions';
import { requestPasswordReset, verifyOTP } from '@/app/lib/data';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Reset Password modal
const ResetPasswordModal = ({
  isOpen,
  onClose,
  onSuccess,
}: ResetPasswordModalProps) => {
  const [step, setStep] = useState<'request' | 'verify' | 'reset'>('request');
  const [nationalId, setNationalId] = useState('');
  const [maskedPhone, setMaskedPhone] = useState('');

  // Request OTP action
  const [requestState, requestAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      const result = await requestPasswordReset(formData);
      if (result.success) {
        setNationalId(formData.get('nationalId') as string);
        setMaskedPhone(maskPhoneNumber(result.phone));
        setStep('verify');
      }
      return result;
    },
    null,
  );

  // Verify OTP action
  const [verifyState, verifyAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      formData.append('nationalId', nationalId);
      const result = await verifyOTP(formData);
      if (result.success) {
        setStep('reset');
      }
      return result;
    },
    null,
  );

  // Reset Password action 
  const [resetState, resetAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      formData.append('nationalId', nationalId);
      const newPassword = formData.get('newPassword');
      const confirmPassword = formData.get('confirmPassword');

      if (newPassword !== confirmPassword) {
        return { error: 'Passwords do not match' };
      }

      const result = await resetPassword(formData);
      if (result.success) {
        onSuccess();
        onClose();
      }
      return result;
    },
    null,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="space-y-6">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            Reset Password
          </h2>

          {/* Request OTP */}
          {step === 'request' && (
            <form action={requestAction} className="space-y-4">
              <div>
                <label
                  htmlFor="nationalId"
                  className="block text-sm font-medium text-gray-700"
                >
                  National ID
                </label>
                <input
                  type="text"
                  id="nationalId"
                  name="nationalId"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter your National ID"
                />
              </div>
              {requestState?.error && (
                <p className="text-sm text-red-600">{requestState.error}</p>
              )}
              <Button className="w-1/3 bg-opacity-70 hover:scale-105 active:scale-95">
                Send OTP
              </Button>
            </form>
          )}
          
          {/* Verify OTP */}
          {step === 'verify' && (
            <form action={verifyAction} className="space-y-4">
              <p className="text-center text-sm text-gray-600">
                A verification code has been sent to {maskedPhone}
              </p>
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  required
                  maxLength={6}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter 6-digit OTP"
                />
              </div>
              {verifyState?.error && (
                <p className="text-sm text-red-600">{verifyState.error}</p>
              )}
              <Button className="w-1/3 bg-opacity-70 hover:scale-105 active:scale-95">
                Verify OTP
              </Button>
            </form>
          )}

          {/* Reset Password */}
          {step === 'reset' && (
            <form action={resetAction} className="space-y-4">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  required
                  minLength={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  minLength={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Confirm new password"
                />
              </div>
              {resetState?.error && (
                <p className="text-sm text-red-600">{resetState.error}</p>
              )}
              <Button className="w-1/3 bg-opacity-70 hover:scale-105 active:scale-95">
                Reset Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;

// Mask phone number
const maskPhoneNumber = (phone: string) => {
  return phone.replace(/(\d{4})(\d{4})(\d{4})/, '****-****-$3');
};
