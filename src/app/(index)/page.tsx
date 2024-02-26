import Main from "./_components/main";
import HomeHero from "./_components/homeHero";

const IndexPage = () => {
	return (
		<div className="min-h-full flex flex-col">
			<div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
				<Main />
				<HomeHero />
			</div>
		</div>
	);
};
export default IndexPage;
