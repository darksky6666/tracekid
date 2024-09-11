import { create } from 'zustand';

const useRouteStore = create((set) => ({
  routeEnabled: false,
  setRouteEnabled: (enabled) => set({ routeEnabled: enabled }),
  resetRouteEnabled: () => set({ routeEnabled: false }),
}));

export default useRouteStore;
