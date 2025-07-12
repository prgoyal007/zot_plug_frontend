import { Hello } from 'ui'

export default function Home() {
  return (
    <>
      {/* Tailwind in-line styling */}
      <div className="bg-red-500 w-full h-10"> test test</div>
      { /* Shared UI comp, check proj_root/ui to check how this works */}
      <Hello />
    </>
  );
}
