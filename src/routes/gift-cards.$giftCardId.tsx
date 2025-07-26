import { createFileRoute, Link } from "@tanstack/react-router";
import { GiftCardDetail } from "../components/GiftCard";

export const Route = createFileRoute("/gift-cards/$giftCardId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { giftCardId } = Route.useParams();
  return (
    <div className="p-6">
      <Link to="/" className="text-blue-700 text-sm font-semibold">
        ← Retour vers les cartes cadeaux
      </Link>
      <GiftCardDetail giftCardId={parseInt(giftCardId)} key={giftCardId} />
    </div>
  );
}
