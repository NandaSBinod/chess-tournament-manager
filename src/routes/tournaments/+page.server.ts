import { db } from '$lib/db.server'
import { fail } from '@sveltejs/kit'
import type { Actions } from './$types'
import type {PageServerLoad} from './$types'

export const actions: Actions = {
    createTournament: async ({ request }) => {
        console.log("In create")
        const info = Object.fromEntries(await request.formData()) as { 
            title: string,
            date_start: string,
            date_end: string,
            city: string,
        }
        var new_info:any
        new_info = {...info, admin_id:1}
        new_info["date_start"] = new Date(new_info["date_start"])
        new_info["date_end"] = new Date(new_info["date_end"])
        try {
            await db.tournament.create({
                data: new_info
            })
        } catch (err) {
            console.error(err)
            return fail(500, {message: 'Could not create new tournament.', action: "Create"})
        }
        return {
            success: true,
            action: "Create"
        }
    },

    editTournament: async ({ request }) => {
        const info = Object.fromEntries(await request.formData()) as { 
            id: string,
            title: string,
            date_start: string,
            date_end: string,
            city: string,
        }
        console.log("Start Dtae: ", info["date_start"])
        var new_info: {[key: string]: any} = {admin_id:1};
        new_info['id'] = +info['id'];
        if (info["title"])
            new_info["title"] = info["title"]
        if (info["date_start"])
            new_info["date_start"]= new Date(new_info["date_start"])
        if (info["date_end"])
            new_info["date_end"]= new Date(new_info["date_end"])
        if (info["city"])
            new_info["city"] = info["city"]
        try {
            await db.tournament.update ({
                where: {
                    id: new_info['id']
                },
                data: new_info
            })
        } catch (err) {
            console.error(err)
            return fail(500, {message: 'Could not edit tournament.', action: "Edit"})
        }
        return {
            success: true,
            action: "Edit"
        }

    },

    deleteTournament: async ({ request }) => {
        console.log("In delete")
        const id = Object.fromEntries(await request.formData()) as { 
            id:string
        }
        try {
            await db.tournament.delete ({
                where: {
                    id: +id.id
                }
            })
        } catch (err) {
            console.error(err)
            return fail(500, {message: 'Could not delete tournament.', action: "Delete"})
        }
        return {
            success: true,
            action: "Delete"
        }
    }
} 

export async function load({ params }) {
	return {
		tournaments: await db.tournament.findMany()
	};
}