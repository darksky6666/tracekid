import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";

SplashScreen.preventAutoHideAsync();

const App = () => {
	useEffect(() => {
		async function prepare() {
			try {
				await new Promise((resolve) => setTimeout(resolve, 3000));
			} catch (e) {
				console.warn(e);
			} finally {
				await SplashScreen.hideAsync();
                router.replace("/home")
			}
		}
		prepare();
	}, []);
};

export default App;
