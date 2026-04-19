export default function VerifiedBadge({ verified = false }) {
  if (!verified) return null;
  return <span className="verified-badge">Verified</span>;
}