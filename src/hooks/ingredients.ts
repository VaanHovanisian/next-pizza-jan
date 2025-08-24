import { getIngredients } from "@/services/ingredients"
import { Ingredient } from "@prisma/client"
import React from "react"

export const useIngredient = () => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([])


    React.useEffect(() => {
        getIngredients().then(data => setIngredients(data))
    }, [])

    const niceIngredients = ingredients.map(el => ({
        name: el.name,
        value: el.id
    }))
    return { ingredients, niceIngredients }
}