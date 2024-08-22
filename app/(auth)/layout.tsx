/**
 * @description Layout for auth pages
 * @param 
 * @returns 
 */
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gradient-to-b from-white to-green-300">
			<div className="flex-grow p-6 md:overflow-y-auto md:p-12 justify-center items-center">
                {children}
            </div>
		</div>
	);
}