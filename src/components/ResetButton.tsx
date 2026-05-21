interface ResetButtonProps {
  onReset: () => void;
  isActive: boolean;
}

export default function ResetButton({ onReset, isActive }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={!isActive}
      className="reset-btn"
      aria-label="Reset calculator inputs and outputs"
    >
      Reset
    </button>
  );
}
