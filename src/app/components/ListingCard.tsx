import { Link } from 'react-router';
import { MapPin, BadgeCheck, Star, Search } from 'lucide-react';
import { Listing } from '../data/mockListings';
import { useT } from '../i18n/useT';

interface ListingCardProps {
  listing: Listing;
  featured?: boolean;
}

export function ListingCard({ listing, featured }: ListingCardProps) {
  const tr = useT();
  const lc = tr.listingCard;

  const stateLabels: Record<string, string> = {
    'neuf': tr.listingsPage.stateNew,
    'comme-neuf': tr.listingsPage.stateLikeNew,
    'bon-etat': tr.listingsPage.stateGood,
    'usage-visible': tr.listingsPage.stateVisible,
  };

  return (
    <Link
      to={`/annonces/${listing.id}`}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition group"
    >
      {/* Image */}
      <div className="relative h-20 overflow-hidden bg-gray-100">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Type badge */}
        {listing.type === 'buy' && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
            <Search className="w-3 h-3" /> {lc.wanted}
          </div>
        )}

        {/* Featured badge */}
        {featured && listing.type === 'sell' && (
          <div className="absolute top-2 right-2 bg-[#FFC107] text-gray-900 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" /> Top Deal
          </div>
        )}

        {/* State badge */}
        {listing.type === 'sell' && (
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-medium text-gray-700">
            {stateLabels[listing.state]}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-[#a07800] transition text-sm">
          {listing.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{listing.city}</span>
          {listing.seller.verified && (
            <>
              <span>·</span>
              <BadgeCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <span className="text-green-600 font-medium">{lc.verified}</span>
            </>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-black text-gray-900">
              {listing.price}€{listing.type === 'buy' ? <span className="text-base font-semibold text-blue-600"> max</span> : null}
            </div>
            <div className="text-xs text-gray-400">
              {listing.type === 'buy' ? lc.maxBudget : listing.negotiable ? lc.negotiable : lc.fixed}
            </div>
          </div>
          {listing.language && (
            <span className="text-xs text-gray-300 font-medium">
              {listing.language === 'fr' ? '🇫🇷' : '🇧🇪'}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
