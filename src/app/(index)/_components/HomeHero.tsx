import Image from "next/image";

const HomeHero = () => {
	return (
		<div className="flex flex-col items-center justify-center max-w-5xl">
			<div className="flex items-center">
				<div className="relative">
					<Image
						src="/home-hero.webp"
						alt="Hero image"
						width={1000}
						height={1000}
						layout="fixed"
						className="object-contain"
					/>
				</div>
			</div>
		</div>
	);
};
export default HomeHero;
