'use client';

// import {

//   UserGroupIcon,
//   HomeIcon,
//   DocumentDuplicateIcon,
// } from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InventoryIcon from '@mui/icons-material/Inventory';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: <InsertChartIcon color='warning'/> },
  {
    name: 'Products',
    href: '/dashboard/products',
    icon: <BakeryDiningIcon color='warning'/>,
  },
  { name: 'Inventory', href: '/dashboard/inventory', icon: <InventoryIcon color='warning'/> },
];

export default function NavLinks() {
  const pathname = usePathname();


	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;

				return (
				<Link
					key={link.name}
					href={link.href}
					className={clsx(
					'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-transparent p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 text-gray-300',
					{
						'bg-sky-100 text-blue-600': pathname === link.href,
					},
					)}
				>
					{link.icon}
					{/* <LinkIcon className="w-6" /> */}
					<p className="hidden md:block">{link.name}</p>
				</Link>
				);
			})}
		</>
	);
}
