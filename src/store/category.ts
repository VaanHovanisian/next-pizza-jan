import { create } from "zustand"
interface Props {
    activeCategory: number;
    setActiveCategory: (activeCategory: number) => void;
}
export const useCategoryStore = create<Props>(set => ({

    activeCategory: 1,
    setActiveCategory: (activeCategory) => { set({ activeCategory }) }

})) 