import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1>Profile</h1>
    </Suspense>
  );
}
