import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

type GiftCard = {
  id: number;
  name: string;
  description: string;
};

export const GiftCards = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["gift-cards"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/gift-cards");
      return await response.json();
    },
  });
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="flex text-xl animate animate-bounce">Chargement</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold">Cartes cadeaux</h2>
      <ul className="list-disc cursor-pointer ml-6 mt-2">
        {data?.map((giftCard: GiftCard) => (
          <Link
            to="/gift-cards/$giftCardId"
            params={{ giftCardId: giftCard.id.toString() }}
            key={giftCard.id}
          >
            <li>
              <h3>{giftCard.name}</h3>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
