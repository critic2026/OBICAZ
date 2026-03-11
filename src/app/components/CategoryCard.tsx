import { Link } from 'react-router';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  count: number;
  color: string;
}

export function CategoryCard({ name, icon: Icon, count, color }: CategoryCardProps) {
  return (
    <Link
      to="/annonces"
      className={`${color} rounded-lg p-6 hover:shadow-lg transition group`}
    >
      <Icon className="w-10 h-10 mb-3 group-hover:scale-110 transition" />
      <h3 className="font-semibold text-lg mb-1">{name}</h3>
      <p className="text-sm opacity-80">{count} annonces</p>
    </Link>
  );
}
