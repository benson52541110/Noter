"use client";

import { useEffect, useState } from "react";

const useScrollTop = (threshold = 5) => {
	const [scroll, setScroll] = useState(false);
	useEffect(() => {
		const scrollHandler = () => {
			if (window.scrollY > threshold) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};
		window.addEventListener("scroll", scrollHandler);
		return () => window.removeEventListener("scroll", scrollHandler);
	}, [threshold]);
	return scroll;
};

export default useScrollTop;
