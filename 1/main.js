const extractPageIndexFromPath = (pathname) => {
	const match = pathname.match(/index(\d+)/);
	return match ? parseInt(match[1]) : null;
};

const determineTransitionType = (fromNavigationEntry, toNavigationEntry) => {
	const currentURL = new URL(fromNavigationEntry.url);
	const destinationURL = new URL(toNavigationEntry.url);

	const currentPathname = currentURL.pathname;
	const destinationPathname = destinationURL.pathname;

	if (currentPathname === destinationPathname) {
		return "reload";
	} else {
		const currentPageIndex = extractPageIndexFromPath(currentPathname);
		const destinationPageIndex = extractPageIndexFromPath(destinationPathname);

		if (currentPageIndex > destinationPageIndex) {
			return "backwards";
		}
		if (currentPageIndex < destinationPageIndex) {
			return "forwards";
		}

		return "unknown";
	}
};

window.addEventListener("pageswap", async (e) => {
	if (e.viewTransition) {
		// @TODO: If destination does not start with basePath, abort the VT

		const transitionType = determineTransitionType(e.activation.from, e.activation.entry);
		console.log(`pageSwap: ${transitionType}`);
		e.viewTransition.types.add(transitionType);
	}
});

window.addEventListener("pagereveal", async (e) => {
	if (e.viewTransition) {
		// @TODO: If destination does not start with basePath, abort the VT

		const transitionType = determineTransitionType(navigation.activation.from, navigation.activation.entry);
		console.log(`pageReveal: ${transitionType}`);
		e.viewTransition.types.add(transitionType);
	}
});
