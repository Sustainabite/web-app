import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Typography } from '@mui/material';
import { poppins } from '../styles/fonts/fonts';
import Image from 'next/image';
import logo from '../../../public/sus_logo.png'

/**
 * @description 
 * @returns 
 */
export default function SideNav() {
    return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2 bg-green-800" >
			{/*Logo*/}
			<Link
			className="mb-2 flex h-20 items-end justify-start rounded-md bg-transparent p-4 md:h-40"
			href="/"
			>
				<div className="w-32 text-white md:w-40">
					<Image src={logo} 
					alt='Company Logo' width={400} height={150}/>
				</div>
			</Link>

			{/*Sidebar Links*/}
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 px-2">
				<h6 className={`${poppins.className} `}>
					Menu
				</h6>
				<NavLinks />
				
			<div className="hidden h-auto w-full grow rounded-md bg-transparent md:block"></div>
			
			{/*Sign Out*/}
			<form>
				<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
				<PowerIcon className="w-6" />
				<div className="hidden md:block">Sign Out</div>
				</button>
			</form>

			</div>
		</div>
    );
}
