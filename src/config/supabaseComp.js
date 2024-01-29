import supabase from "./supabaseClient"

export async function signUpNewUser(email, password, username) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
            username: username
        }
    }
    });

    if (data) {
        console.log(data)
        return true
    }

    if (error) {
        console.log(error)
    }
}

export async function signInUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (data) {
        console.log(data)
        return true
    }

    if (error) {
        console.log(error)
    }
}

export async function getUser() {
    const { data, error } = await supabase.auth.getSession()

    if (data) {
        // console.log(data)
        return data
    }

    if (error) {
        console.log(error)
    }
}

export async function getAllRecipe() {
    const { data, error } = await supabase
    .from('recipe_duplicate')
    .select('*')
    .order('created_at', { ascending: false });

    if (data) {
        // console.log(data)
        return data
    }

    if (error) {
        // console.log('here')
        console.log(error)
    }
}

export async function getAllRecipeForUser(id) {
    const { data, error } = await supabase
    .from('recipe_duplicate')
    .select('*')
    .eq('parentId', id);

    if (data) {
        // console.log(data)
        return data
    }

    if (error) {
        console.log(error)
    }
}

export async function getRecipe(id) {
    const { data, error } = await supabase
    .from('recipe_duplicate')
    .select('*')
    .eq('id', id);

    if (data) {
        // console.log(data)
        return data
    }

    if (error) {
        console.log(error)
    }
}

export async function getRecipeImg(id) {
    const storage = await supabase.storage.from('images')
    const getPublicUrl = storage.getPublicUrl(`images/recipeImg/${id}`)
    return getPublicUrl.data.publicUrl
}

export async function LogOut() {  
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.log(error)
    }
}
 
export async function createRecipe(img, name, description, instructions, ingredients) {  
    let user = await getUser()

    const { data, error } = await supabase
        .from('recipe_duplicate')
        .insert({ parentId: user.user.id, name: name, description: description, instructions: JSON.stringify(instructions), ingredients: JSON.stringify(ingredients) })
        .select('id')

    if (data) {
        console.log(img.path)
        const { imgData, imgError } = await supabase
            .storage
            .from("images")
            .upload(`images/recipeImg/${data[0].id}`, img.path)
      
        if (imgData) {
            console.log(imgData)
        }
        if (imgError) {
            console.log(imgError)
        }
    }

    if (error) {
        console.log(error)
    }
}